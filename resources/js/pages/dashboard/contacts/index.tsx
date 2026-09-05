import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Search, ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';

export default function Contacts({ contacts, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/dashboard/contacts',
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
            '/dashboard/contacts',
            { search: filters.search, sort: field, direction: newDirection },
            { preserveState: true }
        );
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (filters.sort !== field) return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50 inline" />;
        return filters.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4 inline" /> : <ArrowDown className="ml-1 h-4 w-4 inline" />;
    };

    const handleDelete = (id: number) => {
        router.delete(`/dashboard/contacts/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Contacts" />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
                    <form onSubmit={handleSearch} className="flex max-w-sm w-full items-center space-x-2">
                        <Input
                            type="search"
                            placeholder="Search contacts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button type="submit" size="sm" variant="secondary">
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                    </form>
                </div>

                <div className="rounded-md border bg-white dark:bg-neutral-950 overflow-hidden">
                    <div className="w-full overflow-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-neutral-50 dark:bg-neutral-900 border-b">
                                <tr>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('full_name')}>
                                        Name <SortIcon field="full_name" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('email')}>
                                        Email <SortIcon field="email" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('phone_no')}>
                                        Phone <SortIcon field="phone_no" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('subject')}>
                                        Subject <SortIcon field="subject" />
                                    </th>
                                    <th className="p-4 font-medium cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => handleSort('created_at')}>
                                        Date <SortIcon field="created_at" />
                                    </th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-neutral-500">
                                            No contacts found.
                                        </td>
                                    </tr>
                                ) : (
                                    contacts.data.map((contact: any) => (
                                        <tr key={contact.id} className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                            <td className="p-4">{contact.full_name}</td>
                                            <td className="p-4">{contact.email}</td>
                                            <td className="p-4">{contact.phone_no}</td>
                                            <td className="p-4">{contact.subject}</td>
                                            <td className="p-4">{new Date(contact.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="secondary" size="sm">
                                                                Show
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogTitle>Contact Details</DialogTitle>
                                                            <DialogDescription className="space-y-4 pt-4 text-neutral-900 dark:text-neutral-100">
                                                                <div>
                                                                    <strong>Name:</strong> {contact.full_name}
                                                                </div>
                                                                <div>
                                                                    <strong>Email:</strong> {contact.email}
                                                                </div>
                                                                <div>
                                                                    <strong>Phone:</strong> {contact.phone_no}
                                                                </div>
                                                                <div>
                                                                    <strong>Subject:</strong> {contact.subject}
                                                                </div>
                                                                <div>
                                                                    <strong>Date:</strong> {new Date(contact.created_at).toLocaleString()}
                                                                </div>
                                                                <div className="border-t pt-4 mt-4">
                                                                    <strong>Comment:</strong>
                                                                    <p className="mt-2 whitespace-pre-wrap">{contact.comment}</p>
                                                                </div>
                                                            </DialogDescription>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Close</Button>
                                                                </DialogClose>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                Delete
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogTitle>Confirm Deletion</DialogTitle>
                                                            <DialogDescription>
                                                                Are you sure you want to delete the contact from {contact.full_name}? This action cannot be undone.
                                                            </DialogDescription>
                                                            <DialogFooter>
                                                                <DialogClose asChild>
                                                                    <Button variant="outline">Cancel</Button>
                                                                </DialogClose>
                                                                <DialogClose asChild>
                                                                    <Button variant="destructive" onClick={() => handleDelete(contact.id)}>
                                                                        Delete Contact
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
                        Showing {contacts.from || 0} to {contacts.to || 0} of {contacts.total} entries
                    </div>
                    <div className="flex space-x-2">
                        {contacts.links.map((link: any, i: number) => {
                            const isPrevOrNext = link.label.includes('Previous') || link.label.includes('Next');
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

Contacts.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contacts', href: '/dashboard/contacts' },
    ],
};
