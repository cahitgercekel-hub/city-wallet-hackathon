import { useState } from "react";
import { ArrowLeft, Pencil, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import MobileShell from "@/components/MobileShell";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  country: "",
  diet: "everything",
};

const Account = () => {
  const [form, setForm] = useState(initialForm);
  const [savedForm, setSavedForm] = useState(initialForm);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const isDirty = (Object.keys(form) as (keyof typeof form)[]).some(
    (k) => form[k] !== savedForm[k]
  );

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    setSavedForm(form);
    toast.success("Account updated");
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    toast.success("Account deletion requested");
  };

  return (
    <MobileShell>
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center gap-3 px-4 pt-4 pb-3">
          <Link
            to="/profile"
            aria-label="Back to profile"
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-base font-bold">Account Details</h1>
        </header>
        <main className={`px-4 flex flex-col flex-1 gap-6 animate-fade-in ${isDirty ? "pb-40" : "pb-24"}`}>
          {/* Avatar with edit pencil overlay */}
          <div className="flex justify-center pt-2">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <button
                aria-label="Change profile picture"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-purple text-primary-foreground flex items-center justify-center shadow-md ring-2 ring-background hover:opacity-90 transition"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted-foreground">Name</span>
              <Input value={form.name} onChange={set("name")} placeholder="Enter your name" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted-foreground">Email</span>
              <Input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="name@example.com"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted-foreground">Phone</span>
              <Input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+49 123 456789"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted-foreground">Country</span>
              <Input value={form.country} onChange={set("country")} placeholder="e.g. Germany" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-semibold text-muted-foreground">Dietary preference</span>
              <select
                value={form.diet}
                onChange={set("diet")}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="everything">I eat everything</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="not_specified">Prefer not to say</option>
              </select>
            </label>
          </div>
        </main>
      </div>

      {/* Sticky bottom action stack — pinned inside the mobile shell */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pt-3 pb-5 bg-background flex flex-col gap-2 z-40">
        {isDirty && (
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-brand-purple text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-90 transition animate-fade-in"
          >
            Save Changes
          </button>
        )}
        <button
          onClick={() => setDeleteOpen(true)}
          className="w-full py-3 rounded-xl border border-destructive/40 text-destructive font-semibold text-sm hover:bg-destructive/5 transition"
        >
          Delete Account
        </button>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All your cashback and history will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 sm:justify-end">
            <button
              onClick={() => setDeleteOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/70 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Yes, Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileShell>
  );
};

export default Account;
