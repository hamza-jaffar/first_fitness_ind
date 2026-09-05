import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRef } from 'react';

export default function SiteSettings({ settings }: any) {
    const { data, setData, post, processing, errors } = useForm({
        name: settings.name || '',
        description: settings.description || '',
        location: settings.location || '',
        email: settings.email || '',
        phone: settings.phone || '',
        instagram: settings.instagram || '',
        facebook: settings.facebook || '',
        linkedin: settings.linkedin || '',
        // For files, we initialize as null. The backend will ignore if not provided.
        logo_black: null,
        logo_white: null,
        favicon: null,
        breadcrumb_img: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // We use POST instead of PUT because Inertia/Laravel file uploads 
        // sometimes have issues with PUT requests unless we simulate them.
        // The backend route is defined as POST.
        post('/dashboard/settings/site', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success('Site settings updated successfully!'),
            onError: () => toast.error('Failed to update settings. Please check the form.'),
        });
    };

    const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData(field as any, e.target.files[0]);
        }
    };

    return (
        <>
            <Head title="Site Settings" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-8">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
                </div>

                <form onSubmit={submit} className="space-y-8 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* General Info */}
                        <div className="space-y-6">
                            <h3 className="font-medium text-lg border-b pb-2">General Information</h3>

                            <div className="space-y-2">
                                <Label htmlFor="name">Site Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>
                        </div>

                        {/* Contact & Social Info */}
                        <div className="space-y-6">
                            <h3 className="font-medium text-lg border-b pb-2">Contact & Social</h3>

                            <div className="space-y-2">
                                <Label htmlFor="location">Address / Location</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram URL</Label>
                                <Input
                                    id="instagram"
                                    value={data.instagram}
                                    onChange={(e) => setData('instagram', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook URL</Label>
                                <Input
                                    id="facebook"
                                    value={data.facebook}
                                    onChange={(e) => setData('facebook', e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn URL</Label>
                                <Input
                                    id="linkedin"
                                    value={data.linkedin}
                                    onChange={(e) => setData('linkedin', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Media & Images */}
                        <div className="space-y-6 md:col-span-2">
                            <h3 className="font-medium text-lg border-b pb-2">Media & Assets</h3>
                            <p className="text-sm text-neutral-500 mb-4">Upload new images to replace the existing ones. Leave empty to keep current images.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <Label>Logo (Black)</Label>
                                    {settings.logo_black && (
                                        <div className="mb-2 w-24 h-24 bg-neutral-100 rounded-md flex items-center justify-center p-2 border">
                                            <img src={`/storage/${settings.logo_black}`} alt="Logo Black" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                    <Input type="file" onChange={(e) => handleFileChange('logo_black', e)} accept="image/*" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Logo (White)</Label>
                                    {settings.logo_white && (
                                        <div className="mb-2 w-24 h-24 bg-neutral-900 rounded-md flex items-center justify-center p-2 border">
                                            <img src={`/storage/${settings.logo_white}`} alt="Logo White" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                    <Input type="file" onChange={(e) => handleFileChange('logo_white', e)} accept="image/*" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Favicon</Label>
                                    {settings.favicon && (
                                        <div className="mb-2 w-24 h-24 bg-neutral-100 rounded-md flex items-center justify-center p-2 border">
                                            <img src={`/storage/${settings.favicon}`} alt="Favicon" className="max-w-full max-h-full object-contain" />
                                        </div>
                                    )}
                                    <Input type="file" onChange={(e) => handleFileChange('favicon', e)} accept="image/*" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Breadcrumb Image</Label>
                                    {settings.breadcrumb_img && (
                                        <div className="mb-2 w-full h-24 bg-neutral-100 rounded-md overflow-hidden border">
                                            <img src={`/storage/${settings.breadcrumb_img}`} alt="Breadcrumb" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <Input type="file" onChange={(e) => handleFileChange('breadcrumb_img', e)} accept="image/*" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" disabled={processing} className="w-full md:w-auto px-8">
                            {processing ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

SiteSettings.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Site Settings', href: '/dashboard/settings/site' },
    ],
};
