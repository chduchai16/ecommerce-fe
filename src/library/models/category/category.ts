export interface Category {
    id: number;
    name: string;
    description?: string | null;
    parent_id?: number | null;
    image?: string | null;
    status?: number;
    created_at?: string;
    updated_at?: string;
    children?: Category[];
}