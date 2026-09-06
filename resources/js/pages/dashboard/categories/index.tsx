import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, ArrowDown, ArrowUp, Plus, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function Categories({ categories, allCategories, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/dashboard/categories',
            { search, sort: filters.sort, direction: filters.direction },
            { preserveState: true, replace: true }
        );
    };

    const handleSort = (field: string) => {
        let newDirection = 'asc';
        if (filters.sort === field && filters.direction === 'asc') {
            newDirection = 'desc';
        }
        
        router.get(
            '/dashboard/categories',
            { search: filters.search, sort: field, direction: newDirection },
            { preserveState: true }
        );
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (filters.sort !== field) return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50 inline" />;
        return filters.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4 inline" /> : <ArrowDown className="ml-1 h-4 w-4 inline" />;
    };

    const handleDelete = (id: number) => {
        router.delete(`/dashboard/categories/${id}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Category deleted successfully.'),
        });
    };

    const { data: createData, setData: setCreateData, post: createPost, processing: createProcessing, errors: createErrors, reset: createReset } = useForm({
        name: '',
        slug: '',
        parent_category_id: '',
        desc: '',
        image_file: null as File | null,
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createPost('/dashboard/categories', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createReset();
                toast.success('Category created successfully.');
            },
        });
    };

    const { data: editData, setData: setEditData, post: editPost, processing: editProcessing, errors: editErrors, reset: editReset } = useForm({
        name: '',
        slug: '',
        parent_category_id: '',
        desc: '',
        image_file: null as File | null,
        _method: 'put',
    });

    const openEditModal = (cat: any) => {
        setEditingCategory(cat);
        setEditData({
            name: cat.name,
            slug: cat.slug,
            parent_category_id: cat.parent_category_id || '',
            desc: cat.desc || '',
            image_file: null,
            _method: 'put',
        });
        setIsEditOpen(true);
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;
        
        editPost(`/dashboard/categories/${editingCategory.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsEditOpen(false);
                setEditingCategory(null);
                editReset();
                toast.success('Category updated successfully.');
            },
        });
    };

    // Auto-generate slug from name if slug is empty
    const handleNameChange = (val: string, type: 'create' | 'edit') => {
        if (type === 'create') {
            setCreateData('name', val);
            if (!createData.slug || createData.slug === val.slice(0, -1).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
                setCreateData(data => ({ ...data, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
            }
        } else {
            setEditData('name', val);
        }
    };

    return (
        <>
            <Head title="Categories" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <form onSubmit={handleSearch} className="flex max-w-sm w-full items-center space-x-2">
                            <Input
                                type="search"
                                placeholder="Search categories..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button type="submit" size="sm" variant="secondary">
                                <Search className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">Search</span>
                            </Button>
                        </form>

                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" /> Add Category
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Create Category</DialogTitle>
                                <form onSubmit={handleCreate} className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="create_name">Name</Label>
                                        <Input
                                            id="create_name"
                                            value={createData.name}
                                            onChange={(e) => handleNameChange(e.target.value, 'create')}
                                        />
                                        {createErrors.name && <p className="text-sm text-red-500">{createErrors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="create_slug">Slug</Label>
                                        <Input
                                            id="create_slug"
                                            value={createData.slug}
                                            onChange={(e) => setCreateData('slug', e.target.value)}
                                        />
                                        {createErrors.slug && <p className="text-sm text-red-500">{createErrors.slug}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="create_parent">Parent Category (Optional)</Label>
                                        <select
                                            id="create_parent"
                                            value={createData.parent_category_id}
                                            onChange={(e) => setCreateData('parent_category_id', e.target.value)}
                                            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                        >
                                            <option value="">None (Top Level)</option>
                                            {allCategories.map((c: any) => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        {createErrors.parent_category_id && <p className="text-sm text-red-500">{createErrors.parent_category_id}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="create_desc">Description</Label>
                                        <Textarea id="create_desc" value={createData.desc} onChange={(e) => setCreateData('desc', e.target.value)} />
                                        {createErrors.desc && <p className="text-sm text-red-500">{createErrors.desc}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="create_image">Category Image</Label>
                                        <Input id="create_image" type="file" accept="image/*" onChange={(e) => setCreateData('image_file', e.target.files?.[0] || null)} />
                                        {createErrors.image_file && <p className="text-sm text-red-500">{createErrors.image_file}</p>}
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline" type="button">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={createProcessing}>Create</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Edit Modal */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent>
                        <DialogTitle>Edit Category</DialogTitle>
                        <form onSubmit={handleEdit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit_name">Name</Label>
                                <Input
                                    id="edit_name"
                                    value={editData.name}
                                    onChange={(e) => handleNameChange(e.target.value, 'edit')}
                                />
                                {editErrors.name && <p className="text-sm text-red-500">{editErrors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit_slug">Slug</Label>
                                <Input
                                    id="edit_slug"
                                    value={editData.slug}
                                    onChange={(e) => setEditData('slug', e.target.value)}
                                />
                                {editErrors.slug && <p className="text-sm text-red-500">{editErrors.slug}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit_parent">Parent Category</Label>
                                <select
                                    id="edit_parent"
                                    value={editData.parent_category_id}
                                    onChange={(e) => setEditData('parent_category_id', e.target.value)}
                                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                >
                                    <option value="">None (Top Level)</option>
                                    {allCategories.map((c: any) => (
                                        <option key={c.id} value={c.id} disabled={c.id === editingCategory?.id}>{c.name}</option>
                                    ))}
                                </select>
                                {editErrors.parent_category_id && <p className="text-sm text-red-500">{editErrors.parent_category_id}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit_desc">Description</Label>
                                <Textarea id="edit_desc" value={editData.desc} onChange={(e) => setEditData('desc', e.target.value)} />
                                {editErrors.desc && <p className="text-sm text-red-500">{editErrors.desc}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit_image">Category Image</Label>
                                <Input id="edit_image" type="file" accept="image/*" onChange={(e) => setEditData('image_file', e.target.files?.[0] || null)} />
                                {editingCategory?.image && <img src={editingCategory.image} alt={editingCategory.name} className="mt-2 h-20 w-20 rounded-md object-cover" />}
                                {editErrors.image_file && <p className="text-sm text-red-500">{editErrors.image_file}</p>}
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={editProcessing}>Update</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <div className="rounded-md border bg-white dark:bg-neutral-950 overflow-hidden">
                    <div className="w-full overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b">
                                <tr>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('name')}>
                                        Name <SortIcon field="name" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('slug')}>
                                        Slug <SortIcon field="slug" />
                                    </th>
                                    <th className="p-4 font-medium">
                                        Image
                                    </th>
                                    <th className="p-4 font-medium">
                                        Description
                                    </th>
                                    <th className="p-4 font-medium">
                                        Parent Category
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('created_at')}>
                                        Created At <SortIcon field="created_at" />
                                    </th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-neutral-500">
                                            No categories found.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.data.map((cat: any) => (
                                        <tr key={cat.id} className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                            <td className="p-4 font-medium">{cat.name}</td>
                                            <td className="p-4 text-neutral-500">{cat.slug}</td>
                                            <td className="p-4">{cat.image ? <img src={cat.image} alt={cat.name} className="h-10 w-10 rounded-md object-cover" /> : <span className="text-xs text-neutral-400">No image</span>}</td>
                                            <td className="max-w-xs p-4 text-neutral-500">{cat.desc || <span className="text-xs italic text-neutral-400">No description</span>}</td>
                                            <td className="p-4">
                                                {cat.parent ? (
                                                    <span className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-0.5 text-xs font-semibold text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                        {cat.parent.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-neutral-400 italic text-xs">Top Level</span>
                                                )}
                                            </td>
                                            <td className="p-4">{new Date(cat.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => openEditModal(cat)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                Delete
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogTitle>Confirm Deletion</DialogTitle>
                                                            <DialogDescription>
                                                                Are you sure you want to delete the category "{cat.name}"? This will also remove any child categories associated with it if constrained. This action cannot be undone.
                                                            </DialogDescription>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button variant="destructive" onClick={() => handleDelete(cat.id)}>
                                                                        Delete Category
                                                                    </Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-500">
                        Showing {categories.from || 0} to {categories.to || 0} of {categories.total} entries
                    </div>
                    <div className="flex space-x-2">
                        {categories.links.map((link: any, i: number) => {
                            let label = link.label;
                            if (label.includes('Previous')) label = 'Previous';
                            if (label.includes('Next')) label = 'Next';

                            return (
                                <Button
                                    key={i}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (link.url) router.get(link.url, { search: filters.search, sort: filters.sort, direction: filters.direction }, { preserveState: true });
                                    }}
                                    className={link.active ? '' : 'text-neutral-500'}
                                >
                                    {label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

Categories.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/dashboard/categories' },
    ],
};
