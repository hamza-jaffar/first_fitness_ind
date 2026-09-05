import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import JoditEditor from 'jodit-react';
import { useRef, useMemo } from 'react';

export default function PageEdit({ page }: any) {
    const editor = useRef(null);
    const { data, setData, put, processing, errors } = useForm({
        name: page.name || '',
        slug: page.slug || '',
        content: page.content || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
        canonical_url: page.canonical_url || '',
        og_title: page.og_title || '',
        og_description: page.og_description || '',
        og_image: page.og_image || '',
        status: page.status || 'draft',
    });

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typing...',
            enableDragAndDropFileToEditor: true,
            uploader: {
                insertImageAsBase64URI: true
            },
            minHeight: 400,
            buttons: [
                'source', '|',
                'bold', 'strikethrough', 'underline', 'italic', '|',
                'ul', 'ol', '|',
                'outdent', 'indent', '|',
                'font', 'fontsize', 'brush', 'paragraph', '|',
                'image', 'video', 'table', 'link', '|',
                'align', 'undo', 'redo', '|',
                'hr', 'eraser', 'copyformat', '|',
                'symbol', 'fullsize', 'print', 'about'
            ],
            // Adding specific headings to the paragraph dropdown explicitly just in case
            controls: {
                paragraph: {
                    list: {
                        p: 'Normal',
                        h1: 'Heading 1',
                        h2: 'Heading 2',
                        h3: 'Heading 3',
                        h4: 'Heading 4',
                        h5: 'Heading 5',
                        h6: 'Heading 6',
                    }
                }
            }
        }),
        []
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/pages/${page.slug}`, {
            preserveScroll: true,
            onSuccess: () => toast.success('Page updated successfully!'),
            onError: () => toast.error('Failed to update page. Please check the form.'),
        });
    };

    return (
        <>
            <Head title={`Edit Page - ${page.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold tracking-tight">Edit Page: {page.name}</h1>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Page Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <div className="prose-editor dark:text-black">
                                    <JoditEditor
                                        ref={editor}
                                        value={data.content}
                                        config={config}
                                        onBlur={(newContent) => setData('content', newContent)}
                                    />
                                </div>
                                {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        value={data.meta_title}
                                        onChange={(e) => setData('meta_title', e.target.value)}
                                    />
                                    {errors.meta_title && <p className="text-sm text-red-500">{errors.meta_title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="meta_keywords">Meta Keywords</Label>
                                    <Input
                                        id="meta_keywords"
                                        value={data.meta_keywords}
                                        onChange={(e) => setData('meta_keywords', e.target.value)}
                                    />
                                    {errors.meta_keywords && <p className="text-sm text-red-500">{errors.meta_keywords}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Input
                                        id="meta_description"
                                        value={data.meta_description}
                                        onChange={(e) => setData('meta_description', e.target.value)}
                                    />
                                    {errors.meta_description && <p className="text-sm text-red-500">{errors.meta_description}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-md border p-4 bg-white dark:bg-neutral-900 space-y-4">
                                <h3 className="font-medium text-lg border-b pb-2">Publishing</h3>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (URL)</Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        disabled
                                        className="bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                    />
                                    <p className="text-xs text-neutral-500">The slug cannot be changed.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="publish">Publish</option>
                                    </select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>

                            <div className="rounded-md border p-4 bg-white dark:bg-neutral-900 space-y-4">
                                <h3 className="font-medium text-lg border-b pb-2">Open Graph (SEO)</h3>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="og_title">OG Title</Label>
                                    <Input
                                        id="og_title"
                                        value={data.og_title}
                                        onChange={(e) => setData('og_title', e.target.value)}
                                    />
                                    {errors.og_title && <p className="text-sm text-red-500">{errors.og_title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="og_description">OG Description</Label>
                                    <Input
                                        id="og_description"
                                        value={data.og_description}
                                        onChange={(e) => setData('og_description', e.target.value)}
                                    />
                                    {errors.og_description && <p className="text-sm text-red-500">{errors.og_description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="og_image">OG Image URL</Label>
                                    <Input
                                        id="og_image"
                                        type="url"
                                        value={data.og_image}
                                        onChange={(e) => setData('og_image', e.target.value)}
                                    />
                                    {errors.og_image && <p className="text-sm text-red-500">{errors.og_image}</p>}
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="canonical_url">Canonical URL</Label>
                                    <Input
                                        id="canonical_url"
                                        type="url"
                                        value={data.canonical_url}
                                        onChange={(e) => setData('canonical_url', e.target.value)}
                                    />
                                    {errors.canonical_url && <p className="text-sm text-red-500">{errors.canonical_url}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

PageEdit.layout = (page: any) => {
    // Determine the title based on the slug from the page props if available
    const pageName = page.props.page?.name || 'Page';
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '#' },
        { title: pageName, href: '#' },
    ];
    
    // We import AppLayout dynamically or just define the layout property 
    // to return the AppLayout. However since inertia handles it, let's just 
    // export the layout object.
    return page;
};

// Re-defining layout to match standard app.tsx resolution
PageEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '#' },
    ],
};
