"use client";
 
import { OrgTree } from "@/components/about/org-tree";
import { OrganizationMember } from "@/types";
 
interface OrgTreeSectionProps {
  members: OrganizationMember[];
}
 
export function OrgTreeSection({ members }: OrgTreeSectionProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 text-amber-700 p-4 mb-8 text-sm text-center">
        Belum ada data struktur organisasi atau gagal memuat data.
      </div>
    );
  }
 
  return <OrgTree members={members} />;
}
