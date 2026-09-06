import { useForm } from '@inertiajs/react';
import JoditEditor from 'jodit-react';
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

type Category = { id: number; name: string };

type ProductData = {
    category_id: string;
    title: string;
    art_no: string;
    sku: string;
    short_desc: string;
    desc: string;
    material: string;
    gender: string;
    fit: string;
    sizes: string[];
    colors: string[];
    thumbnail: string;
    thumbnail_file: File | null;
    existing_images: string[];
    image_files: File[];
    meta_title: string;
    meta_description: string;
    meta_keywords: string[];
    is_active: boolean;
    is_featured: boolean;
    _method?: string;
};

type ProductFormProps = {
    categories: Category[];
    product?: Partial<ProductData> & { id?: number; category_id?: number; images?: string[] };
    submitUrl: string;
    method: 'post' | 'put';
    submitLabel: string;
};

const editorButtons = [
    'source', '|', 'bold', 'strikethrough', 'underline', 'italic', '|',
    'ul', 'ol', '|', 'outdent', 'indent', '|', 'font', 'fontsize', 'brush',
    'paragraph', '|', 'image', 'video', 'table', 'link', '|', 'align',
    'undo', 'redo', '|', 'hr', 'eraser', 'copyformat', '|', 'fullsize',
];

export default function ProductForm({ categories, product, submitUrl, method, submitLabel }: ProductFormProps) {
    const editor = useRef(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(product?.thumbnail ?? '');
    const form = useForm<ProductData>({
        category_id: (product?.category_id as number | string | undefined)?.toString() ?? '',
        title: product?.title ?? '',
        art_no: product?.art_no ?? '',
        sku: product?.sku ?? '',
        short_desc: product?.short_desc ?? '',
        desc: product?.desc ?? '',
        material: product?.material ?? '',
        gender: product?.gender ?? '',
        fit: product?.fit ?? '',
        sizes: product?.sizes ?? [],
        colors: product?.colors ?? [],
        thumbnail: product?.thumbnail ?? '',
        thumbnail_file: null,
        existing_images: product?.existing_images ?? product?.images ?? [],
        image_files: [],
        meta_title: product?.meta_title ?? '',
        meta_description: product?.meta_description ?? '',
        meta_keywords: product?.meta_keywords ?? [],
        is_active: product?.is_active ?? true,
        is_featured: product?.is_featured ?? false,
    });

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Write the full product description...',
        enableDragAndDropFileToEditor: true,
        uploader: { insertImageAsBase64URI: true },
        minHeight: 360,
        buttons: editorButtons,
    }), []);

    const fieldError = (field: keyof ProductData) => form.errors[field] && <p className="text-sm text-destructive">{form.errors[field]}</p>;
    const update = <K extends keyof ProductData>(field: K, value: ProductData[K]) => form.setData(field, value as never);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.transform((data) => ({ ...data, _method: method === 'put' ? 'put' : undefined }));
        form.post(submitUrl, { forceFormData: true, preserveScroll: true });
    };

    const selectThumbnail = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        update('thumbnail_file', file);
        if (file) setThumbnailPreview(URL.createObjectURL(file));
    };

    const selectImages = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        update('image_files', [...form.data.image_files, ...files]);
        event.target.value = '';
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <section className="space-y-5 rounded-lg border bg-card p-5">
                <div><h2 className="text-lg font-semibold">Product identity</h2><p className="text-sm text-muted-foreground">The identifiers customers and staff use to find this item.</p></div>
                <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Title" error={fieldError('title')}><Input value={form.data.title} onChange={(e) => update('title', e.target.value)} required /></Field>
                    <Field label="Category" error={fieldError('category_id')}><select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={form.data.category_id} onChange={(e) => update('category_id', e.target.value)} required><option value="">Select a category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
                    <Field label="Article number" error={fieldError('art_no')}><Input value={form.data.art_no} onChange={(e) => update('art_no', e.target.value)} required /></Field>
                    <Field label="SKU" error={fieldError('sku')}><Input value={form.data.sku} onChange={(e) => update('sku', e.target.value)} /></Field>
                </div>
                <Field label="Short description" error={fieldError('short_desc')}><Textarea value={form.data.short_desc} onChange={(e) => update('short_desc', e.target.value)} /></Field>
            </section>

            <section className="space-y-5 rounded-lg border bg-card p-5">
                <div><h2 className="text-lg font-semibold">Product details</h2><p className="text-sm text-muted-foreground">Describe the construction and available variants.</p></div>
                <div className="grid gap-5 md:grid-cols-3">
                    <Field label="Material" error={fieldError('material')}><Input value={form.data.material} onChange={(e) => update('material', e.target.value)} /></Field>
                    <Field label="Gender" error={fieldError('gender')}><Input placeholder="Men, Women, Unisex" value={form.data.gender} onChange={(e) => update('gender', e.target.value)} /></Field>
                    <Field label="Fit" error={fieldError('fit')}><Input placeholder="Regular, Slim, Compression" value={form.data.fit} onChange={(e) => update('fit', e.target.value)} /></Field>
                    <Field label="Sizes" hint="Type a size, press Enter or comma to add it" error={fieldError('sizes')}><TagInput values={form.data.sizes} onChange={(value) => update('sizes', value)} placeholder="Add size" /></Field>
                    <Field label="Colors" hint="Type a color, press Enter or comma to add it" error={fieldError('colors')}><TagInput values={form.data.colors} onChange={(value) => update('colors', value)} placeholder="Add color" /></Field>
                </div>
                <Field label="Description" error={fieldError('desc')}><div className="overflow-hidden rounded-md border"><JoditEditor ref={editor} value={form.data.desc} config={config} onBlur={(value) => update('desc', value)} /></div></Field>
            </section>

            <section className="space-y-5 rounded-lg border bg-card p-5">
                <div><h2 className="text-lg font-semibold">Media and SEO</h2><p className="text-sm text-muted-foreground">Upload a thumbnail and as many gallery images as you need.</p></div>
                <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Thumbnail" error={fieldError('thumbnail_file')}><Input type="file" accept="image/*" onChange={selectThumbnail} />{thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail preview" className="mt-3 aspect-video max-h-48 rounded-md object-cover" />}</Field>
                    <Field label="Gallery images" hint="Select multiple image files" error={fieldError('image_files')}><Input type="file" accept="image/*" multiple onChange={selectImages} /><div className="mt-3 flex flex-wrap gap-2">{form.data.existing_images.map((image) => <ImageChip key={image} src={image} onRemove={() => update('existing_images', form.data.existing_images.filter((item) => item !== image))} />)}{form.data.image_files.map((file, index) => <ImageChip key={`${file.name}-${index}`} src={URL.createObjectURL(file)} label={file.name} onRemove={() => update('image_files', form.data.image_files.filter((_, itemIndex) => itemIndex !== index))} />)}</div></Field>
                    <Field label="Meta title" error={fieldError('meta_title')}><Input value={form.data.meta_title} onChange={(e) => update('meta_title', e.target.value)} /></Field>
                    <Field label="Meta description" error={fieldError('meta_description')}><Textarea value={form.data.meta_description} onChange={(e) => update('meta_description', e.target.value)} /></Field>
                    <Field label="Meta keywords" hint="Type a keyword, press Enter or comma to add it" error={fieldError('meta_keywords')}><TagInput values={form.data.meta_keywords} onChange={(value) => update('meta_keywords', value)} placeholder="Add keyword" /></Field>
                </div>
            </section>

            <section className="flex flex-wrap gap-6 rounded-lg border bg-card p-5">
                <label className="flex items-center gap-3 text-sm font-medium"><Checkbox checked={form.data.is_active} onCheckedChange={(value) => update('is_active', value === true)} /> Active</label>
                <label className="flex items-center gap-3 text-sm font-medium"><Checkbox checked={form.data.is_featured} onCheckedChange={(value) => update('is_featured', value === true)} /> Featured</label>
            </section>

            <div className="flex justify-end gap-3"><Button type="submit" disabled={form.processing}>{form.processing ? 'Saving...' : submitLabel}</Button></div>
        </form>
    );
}

function TagInput({ values, onChange, placeholder }: { values: string[]; onChange: (values: string[]) => void; placeholder: string }) {
    const [draft, setDraft] = useState('');
    const add = () => {
        const next = draft.split(',').map((value) => value.trim()).filter(Boolean).filter((value) => !values.includes(value));
        if (next.length) onChange([...values, ...next]);
        setDraft('');
    };
    return <div className="min-h-20 rounded-md border border-input p-2"><div className="flex flex-wrap gap-2">{values.map((value) => <span key={value} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">{value}<button type="button" aria-label={`Remove ${value}`} onClick={() => onChange(values.filter((item) => item !== value))}><X className="h-3 w-3" /></button></span>)}</div><div className="mt-2 flex gap-2"><Input className="h-8 border-0 px-1 shadow-none focus-visible:ring-0" value={draft} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); add(); } }} /><Button type="button" variant="secondary" size="sm" onClick={add}>Add</Button></div></div>;
}

function ImageChip({ src, label, onRemove }: { src: string; label?: string; onRemove: () => void }) {
    return <div className="relative overflow-hidden rounded-md border"><img src={src} alt={label ?? 'Product image'} className="h-20 w-20 object-cover" /><button type="button" aria-label={`Remove ${label ?? 'image'}`} onClick={onRemove} className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"><X className="h-3 w-3" /></button>{label && <span className="block max-w-20 truncate px-1 py-1 text-[10px] text-muted-foreground">{label}</span>}</div>;
}

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: React.ReactNode; children: React.ReactNode }) {
    return <div className="space-y-2"><Label>{label}</Label>{hint && <p className="text-xs text-muted-foreground">{hint}</p>}{children}{error}</div>;
}
