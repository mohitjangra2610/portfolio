import { Briefcase, FileText, Home, Lightbulb, User } from "lucide-react";
export const navigationLinks = [
  {
    label: "Home",
    href: "/",  // ← Yeh correct hai
  },
  
  {
    label: "Work",
    href: "/work",
  },
  {
    label: "Case Study",
    href: "/case-study",
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const mobileNavigationLinks = [

  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  
  {
    label: "Work",
    href: "/work",
    icon: Briefcase,
  },
  {
    label: "Case Study",
    href: "/case-study",
    icon: FileText,
  },
  {
    label: "Insights",
    href: "/insights",
    icon: Lightbulb,
  },
  {
    label: "About",
    href: "/about",
    icon: User,
  },
];