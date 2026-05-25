"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OrganizationMember } from "@/types";
import { User, Users } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

interface OrgTreeProps {
  members: OrganizationMember[];
}

export function OrgTree({ members }: OrgTreeProps) {
  // Group members by level
  const groupedByLevel: Record<number, OrganizationMember[]> = {};
  
  members.forEach(member => {
    const level = member.level ?? 0;
    if (!groupedByLevel[level]) {
      groupedByLevel[level] = [];
    }
    groupedByLevel[level].push(member);
  });

  // Sort each level by order
  Object.keys(groupedByLevel).forEach(level => {
    groupedByLevel[parseInt(level)].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  });

  // Get sorted level keys
  const levels = Object.keys(groupedByLevel).map(Number).sort((a, b) => a - b);

  const MemberCard = ({ member, size = "normal" }: { member: OrganizationMember; size?: "large" | "normal" | "small" }) => {
    const isLarge = size === "large";
    const hasPhoto = member.photo && !member.photo.includes("placeholder.png");
    const displayPhoto = hasPhoto ? getImageUrl(member.photo) : null;
    const initialLetter = member.name ? member.name.charAt(0).toUpperCase() : "";

    return (
      <div className={`${isLarge ? "w-56 md:w-64 lg:w-72" : "w-40 md:w-48 lg:w-56"}`}>
        <div className={`
          bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col items-center
          ${isLarge 
            ? "border-primary/20 shadow-md p-5 md:p-6 scale-105 z-10 hover:shadow-lg hover:-translate-y-1" 
            : "border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/20 p-4 md:p-5"
          }
        `}>
          {/* Avatar Container */}
          <div className="relative flex justify-center mb-4 shrink-0">
            <div className={`
              rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 text-primary shadow-inner
              ${isLarge ? "w-16 h-16 md:w-20 md:h-20" : "w-12 h-12 md:w-14 md:h-14"}
            `}>
              {displayPhoto ? (
                <img
                  src={displayPhoto}
                  alt={member.name || member.position}
                  className="w-full h-full object-cover"
                />
              ) : initialLetter ? (
                <span className={`font-black tracking-tight text-primary/80 ${isLarge ? "text-2xl" : "text-lg"}`}>
                  {initialLetter}
                </span>
              ) : isLarge ? (
                <User size={32} className="md:w-10 md:h-10 text-primary/70" />
              ) : (
                <Users size={20} className="md:w-6 md:h-6 text-primary/70" />
              )}
            </div>
          </div>

          {/* Details */}
          <div className="text-center space-y-2 w-full">
            {member.name && (
              <h3 className={`font-bold text-gray-900 leading-tight truncate ${isLarge ? "text-base md:text-lg" : "text-sm"}`}>
                {member.name}
              </h3>
            )}
            
            <div className={`
              inline-flex items-center rounded-full bg-primary/5 px-2.5 py-0.5 font-semibold text-primary tracking-wider uppercase
              ${isLarge ? "text-[10px] md:text-xs" : "text-[9px] md:text-[10px]"}
            `}>
              {member.position}
            </div>

            {member.description && (
              <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed line-clamp-2 mt-1">
                {member.description.replace(/^(\s*-\s*)/, "")}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {/* Scroll Shadow Indicators */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none lg:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none lg:hidden" />

      <div className="w-full py-12 px-4 overflow-x-auto scrollbar-hide">
        <div className="min-w-[max-content] md:min-w-[800px] mx-auto flex flex-col items-center space-y-16 pb-8">
          {levels.map((level, levelIndex) => {
            const levelMembers = groupedByLevel[level];
            const isFirst = levelIndex === 0;
            const cardSize = level === 0 ? "large" : level <= 2 ? "normal" : "small";
            
            return (
              <div key={level} className="relative w-full flex justify-center">
                {!isFirst && (
                  <div className="absolute -top-16 left-0 w-full h-16 flex justify-center">
                    <div className="absolute top-0 w-[2px] h-8 bg-gray-200" />
                    {levelMembers.length > 1 && (
                      <div className="absolute top-8 h-[2px] bg-gray-200" style={{ 
                        width: `calc(100% - ${cardSize === 'large' ? 240 : 180}px)`, 
                        maxWidth: `${(levelMembers.length - 1) * 240}px` 
                      }} />
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap justify-center gap-12 relative">
                  {levelMembers.map((member, idx) => (
                    <div key={member.id} className="relative flex flex-col items-center">
                      {!isFirst && <div className="absolute -top-8 w-[2px] h-8 bg-gray-200" />}
                      <MemberCard member={member} size={cardSize} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Mobile View Hint */}
      <div className="lg:hidden text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-2">
        <span className="animate-pulse">←</span> Geser untuk melihat struktur lengkap <span className="animate-pulse">→</span>
      </div>
      
      {members.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>Belum ada data struktur organisasi.</p>
        </div>
      )}
    </div>
  );
}
