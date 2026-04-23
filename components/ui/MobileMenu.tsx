"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavigationLinks } from "@/config/navigation";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  onClose,
}: Readonly<MobileMenuProps>) {
  const pathname = usePathname();

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        {/* Header */}
        <DrawerHeader className="flex items-center justify-between">
          <div className=" w- w-full flex row-auto items-center justify-between ">
            <DrawerTitle> Mohit Jangra</DrawerTitle>
            <DrawerClose asChild>
              <button className="p-2" aria-label="Close menu">
                <X size={24} />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Navigation Links */}
        <nav className="px-4 space-y-1 pb-8">
          {mobileNavigationLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <DrawerClose key={link.href} asChild>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    isActive ? "bg-gray-100 text-gray-800" : "hover:bg-gray-200"
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              </DrawerClose>
            );
          })}
        </nav>
        <DrawerFooter className="px-4 space-y-1 pb-8">
          <Button className="w-full" variant="default" size="lg">
            Contact
          </Button>
        </DrawerFooter>
      </DrawerContent>  
    </Drawer>
  );
}
