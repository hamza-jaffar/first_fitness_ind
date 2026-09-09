import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Search, ArrowUpDown, ArrowDown, ArrowUp, Plus, Edit, Trash2, ExternalLink, Image as ImageIcon, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SliderItem {
    id: number;
    badge_text: string | null;
    title: string | null;
    desc: string | null;
    button_text: string | null;
    button_url: string | null;
    image: string | null;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface SlidersPagination {
    data: SliderItem[];
    from: number | null;
    to: number | null;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Filters {
    search?: string;
    status?: string;
    sort?: string;
    direction?: string;
    per_page?: number;
}

interface BannerIndexProps {
    sliders: SlidersPagination;
    filters: Filters;
}

export default function BannerIndex({ sliders, filters }: BannerIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingSlider, setEditingSlider] = useState<SliderItem | null>(null);
    const [createImagePreview, setCreateImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/dashboard/banner',
            { 
                search, 
                status: statusFilter === 'all' ? undefined : statusFilter, 
                sort: filters.sort, 
                direction: filters.direction 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleStatusFilterChange = (val: string) => {
        setStatusFilter(val);
        router.get(
            '/dashboard/banner',
            { 
                search, 
                status: val === 'all' ? undefined : val, 
                sort: filters.sort, 
                direction: filters.direction 
            },
            { preserveState: true, replace: true }
        );
    };

    const handleSort = (field: string) => {
        let newDirection = 'asc';
        if (filters.sort === field && filters.direction === 'asc') {
            newDirection = 'desc';
        }
        
        router.get(
            '/dashboard/banner',
            { 
                search: filters.search, 
                status: filters.status, 
                sort: field, 
                direction: newDirection 
            },
            { preserveState: true }
        );
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (filters.sort !== field) return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50 inline" />;
        return filters.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4 inline" /> : <ArrowDown className="ml-1 h-4 w-4 inline" />;
    };

    const handleDelete = (id: number) => {
        router.delete(`/dashboard/banner/${id}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Slider deleted successfully.'),
        });
    };

    const handleToggleStatus = (slider: SliderItem) => {
        router.patch(`/dashboard/banner/${slider.id}/toggle-status`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                const nextStatus = slider.status === 'active' ? 'inactive' : 'active';
                toast.success(`Slider marked as ${nextStatus}.`);
            },
        });
    };

    // Create Form State
    const { data: createData, setData: setCreateData, post: createPost, processing: createProcessing, errors: createErrors, reset: createReset } = useForm({
        badge_text: '',
        title: '',
        desc: '',
        button_text: '',
        button_url: '',
        image_file: null as File | null,
        status: 'active',
    });

    const handleCreateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCreateData('image_file', file);
        if (file) {
            setCreateImagePreview(URL.createObjectURL(file));
        } else {
            setCreateImagePreview(null);
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createPost('/dashboard/banner', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createReset();
                setCreateImagePreview(null);
                toast.success('Slider created successfully.');
            },
        });
    };

    // Edit Form State
    const { data: editData, setData: setEditData, post: editPost, processing: editProcessing, errors: editErrors, reset: editReset } = useForm({
        badge_text: '',
        title: '',
        desc: '',
        button_text: '',
        button_url: '',
        image_file: null as File | null,
        status: 'active',
        _method: 'put',
    });

    const openEditModal = (slider: SliderItem) => {
        setEditingSlider(slider);
        setEditData({
            badge_text: slider.badge_text || '',
            title: slider.title || '',
            desc: slider.desc || '',
            button_text: slider.button_text || '',
            button_url: slider.button_url || '',
            image_file: null,
            status: slider.status,
            _method: 'put',
        });
        setEditImagePreview(null);
        setIsEditOpen(true);
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setEditData('image_file', file);
        if (file) {
            setEditImagePreview(URL.createObjectURL(file));
        } else {
            setEditImagePreview(null);
        }
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSlider) return;

        editPost(`/dashboard/banner/${editingSlider.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsEditOpen(false);
                setEditingSlider(null);
                editReset();
                setEditImagePreview(null);
                toast.success('Slider updated successfully.');
            },
        });
    };

    return (
        <>
            <Head title="Manage Sliders" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Sliders & Banners</h1>
                        <p className="text-sm text-muted-foreground">
                            Create, update, and manage hero sliders displayed on the frontend.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                        <form onSubmit={handleSearch} className="flex max-w-sm w-full items-center space-x-2">
                            <Input
                                type="search"
                                placeholder="Search sliders..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button type="submit" size="sm" variant="secondary">
                                <Search className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">Search</span>
                            </Button>
                        </form>

                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" /> Add Slider
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Create New Slider</DialogTitle>
                                    <DialogDescription>
                                        Fill in the banner details and upload a high-quality slide image.
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleCreate} className="space-y-4 pt-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="create_badge_text">Badge Text (Optional)</Label>
                                            <Input
                                                id="create_badge_text"
                                                placeholder="e.g. SPECIAL OFFER"
                                                value={createData.badge_text}
                                                onChange={(e) => setCreateData('badge_text', e.target.value)}
                                            />
                                            {createErrors.badge_text && <p className="text-xs text-red-500">{createErrors.badge_text}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="create_status">Status</Label>
                                            <select
                                                id="create_status"
                                                value={createData.status}
                                                onChange={(e) => setCreateData('status', e.target.value)}
                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                            {createErrors.status && <p className="text-xs text-red-500">{createErrors.status}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="create_title">Title</Label>
                                        <Input
                                            id="create_title"
                                            placeholder="e.g. Premium Fitness Equipment"
                                            value={createData.title}
                                            onChange={(e) => setCreateData('title', e.target.value)}
                                        />
                                        {createErrors.title && <p className="text-xs text-red-500">{createErrors.title}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="create_desc">Description</Label>
                                        <Textarea
                                            id="create_desc"
                                            placeholder="Enter a brief tagline or description..."
                                            rows={3}
                                            value={createData.desc}
                                            onChange={(e) => setCreateData('desc', e.target.value)}
                                        />
                                        {createErrors.desc && <p className="text-xs text-red-500">{createErrors.desc}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="create_button_text">Button Text (Optional)</Label>
                                            <Input
                                                id="create_button_text"
                                                placeholder="e.g. Shop Collection"
                                                value={createData.button_text}
                                                onChange={(e) => setCreateData('button_text', e.target.value)}
                                            />
                                            {createErrors.button_text && <p className="text-xs text-red-500">{createErrors.button_text}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="create_button_url">Button URL (Optional)</Label>
                                            <Input
                                                id="create_button_url"
                                                placeholder="e.g. /category/fitness"
                                                value={createData.button_url}
                                                onChange={(e) => setCreateData('button_url', e.target.value)}
                                            />
                                            {createErrors.button_url && <p className="text-xs text-red-500">{createErrors.button_url}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="create_image">Slider Banner Image</Label>
                                        <Input
                                            id="create_image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCreateFileChange}
                                        />
                                        {createImagePreview && (
                                            <div className="mt-2 rounded-md overflow-hidden border max-h-48 w-full bg-neutral-100 flex items-center justify-center">
                                                <img src={createImagePreview} alt="Preview" className="max-h-48 object-contain" />
                                            </div>
                                        )}
                                        {createErrors.image_file && <p className="text-xs text-red-500">{createErrors.image_file}</p>}
                                    </div>

                                    <DialogFooter className="pt-2">
                                        <DialogClose asChild>
                                            <Button variant="outline" type="button">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit" disabled={createProcessing}>
                                            {createProcessing ? 'Creating...' : 'Create Slider'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Edit Modal */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Slider</DialogTitle>
                            <DialogDescription>
                                Modify slider content, change status, or upload a new banner image.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleEdit} className="space-y-4 pt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit_badge_text">Badge Text</Label>
                                    <Input
                                        id="edit_badge_text"
                                        value={editData.badge_text}
                                        onChange={(e) => setEditData('badge_text', e.target.value)}
                                    />
                                    {editErrors.badge_text && <p className="text-xs text-red-500">{editErrors.badge_text}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit_status">Status</Label>
                                    <select
                                        id="edit_status"
                                        value={editData.status}
                                        onChange={(e) => setEditData('status', e.target.value)}
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    {editErrors.status && <p className="text-xs text-red-500">{editErrors.status}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_title">Title</Label>
                                <Input
                                    id="edit_title"
                                    value={editData.title}
                                    onChange={(e) => setEditData('title', e.target.value)}
                                />
                                {editErrors.title && <p className="text-xs text-red-500">{editErrors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_desc">Description</Label>
                                <Textarea
                                    id="edit_desc"
                                    rows={3}
                                    value={editData.desc}
                                    onChange={(e) => setEditData('desc', e.target.value)}
                                />
                                {editErrors.desc && <p className="text-xs text-red-500">{editErrors.desc}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit_button_text">Button Text</Label>
                                    <Input
                                        id="edit_button_text"
                                        value={editData.button_text}
                                        onChange={(e) => setEditData('button_text', e.target.value)}
                                    />
                                    {editErrors.button_text && <p className="text-xs text-red-500">{editErrors.button_text}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="edit_button_url">Button URL</Label>
                                    <Input
                                        id="edit_button_url"
                                        value={editData.button_url}
                                        onChange={(e) => setEditData('button_url', e.target.value)}
                                    />
                                    {editErrors.button_url && <p className="text-xs text-red-500">{editErrors.button_url}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit_image">Slider Banner Image</Label>
                                <Input
                                    id="edit_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleEditFileChange}
                                />
                                {(editImagePreview || editingSlider?.image) && (
                                    <div className="mt-2 rounded-md overflow-hidden border max-h-48 w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center p-2">
                                        <img
                                            src={editImagePreview || editingSlider?.image || ''}
                                            alt="Preview"
                                            className="max-h-44 object-contain rounded-md"
                                        />
                                    </div>
                                )}
                                {editErrors.image_file && <p className="text-xs text-red-500">{editErrors.image_file}</p>}
                            </div>

                            <DialogFooter className="pt-2">
                                <DialogClose asChild>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={editProcessing}>
                                    {editProcessing ? 'Updating...' : 'Update Slider'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Main Table */}
                <div className="rounded-md border bg-card text-card-foreground shadow-xs overflow-hidden">
                    <div className="w-full overflow-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="p-4 font-medium w-28">Banner</th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => handleSort('badge_text')}>
                                        Badge <SortIcon field="badge_text" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => handleSort('title')}>
                                        Title & Description <SortIcon field="title" />
                                    </th>
                                    <th className="p-4 font-medium">Button Link</th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => handleSort('status')}>
                                        Status <SortIcon field="status" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-muted/80 transition-colors" onClick={() => handleSort('created_at')}>
                                        Created <SortIcon field="created_at" />
                                    </th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {sliders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                            No sliders found. Click "Add Slider" to create your first slider.
                                        </td>
                                    </tr>
                                ) : (
                                    sliders.data.map((slider) => (
                                        <tr key={slider.id} className="hover:bg-muted/40 transition-colors">
                                            <td className="p-4">
                                                {slider.image ? (
                                                    <div className="h-14 w-24 rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                                                        <img
                                                            src={slider.image}
                                                            alt={slider.title || 'Slider image'}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-14 w-24 rounded-md border border-dashed flex items-center justify-center text-muted-foreground bg-muted/30">
                                                        <ImageIcon className="h-5 w-5 opacity-40" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {slider.badge_text ? (
                                                    <Badge variant="secondary" className="font-mono text-xs">
                                                        {slider.badge_text}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground italic">None</span>
                                                )}
                                            </td>
                                            <td className="p-4 max-w-xs">
                                                <div className="font-semibold text-foreground truncate">
                                                    {slider.title || <span className="text-muted-foreground italic font-normal">Untitled</span>}
                                                </div>
                                                {slider.desc && (
                                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                                        {slider.desc}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {slider.button_text || slider.button_url ? (
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <span className="font-medium text-foreground">
                                                            {slider.button_text || 'Link'}
                                                        </span>
                                                        {slider.button_url && (
                                                            <a
                                                                href={slider.button_url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-primary hover:underline inline-flex items-center"
                                                            >
                                                                <ExternalLink className="h-3 w-3 ml-0.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground italic">None</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleStatus(slider)}
                                                    className="inline-flex items-center gap-1.5 focus:outline-none"
                                                    title="Click to toggle status"
                                                >
                                                    {slider.status === 'active' ? (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
                                                            <XCircle className="h-3.5 w-3.5" />
                                                            Inactive
                                                        </span>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">
                                                {new Date(slider.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => openEditModal(slider)}
                                                        title="Edit Slider"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="sm" title="Delete Slider">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>Confirm Deletion</DialogTitle>
                                                                <DialogDescription>
                                                                    Are you sure you want to delete this slider banner ({slider.title || 'Untitled'})? This action cannot be undone and will delete the associated image file.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <DialogFooter className="mt-4">
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button variant="destructive" onClick={() => handleDelete(slider.id)}>
                                                                        Delete Slider
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

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="text-xs text-muted-foreground">
                        Showing {sliders.from || 0} to {sliders.to || 0} of {sliders.total} sliders
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {sliders.links.map((link, i) => {
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
                                        if (link.url) {
                                            router.get(
                                                link.url, 
                                                { 
                                                    search: filters.search, 
                                                    status: filters.status, 
                                                    sort: filters.sort, 
                                                    direction: filters.direction 
                                                }, 
                                                { preserveState: true }
                                            );
                                        }
                                    }}
                                    className={link.active ? '' : 'text-muted-foreground'}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: label }} />
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

BannerIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Sliders', href: '/dashboard/banner' },
    ],
};
