import {
  Camera,
  MessageSquare,
  BellRing,
  Cloud,
  CalendarDays,
  LayoutGrid,
  FileText,
  Users,
  Truck,
  Wrench,
  BarChart3,
} from "lucide-react";

/* The 11 Workroo capabilities. Copy is carried over verbatim from the
   original site; `slug` powers deep-link anchors on /features. */
export const features = [
  {
    number: "01",
    slug: "live-work-capture",
    icon: Camera,
    title: "Live work capture",
    headline: "Make every repair visible",
    description:
      "Give customers a live, visual capture of the work on their vehicle. Every step is documented in real time — a true record of the car that builds trust and loyalty.",
    highlight: "30% more customer engagement",
  },
  {
    number: "02",
    slug: "real-time-customer-connection",
    icon: MessageSquare,
    title: "Real-time customer connection",
    headline: "Answer questions instantly",
    description:
      "Workroo opens a direct channel between your team and your customers. No missed calls, no guessing. A clear conversation at every stage of the job.",
    highlight: "Answered questions build trust",
  },
  {
    number: "03",
    slug: "intelligent-alerts",
    icon: BellRing,
    title: "Intelligent alerts",
    headline: "Never miss a beat",
    description:
      "Send automated alerts for bookings, pickups and drop-offs. Build custom alert sequences that match your workshop's workflow — no coding required.",
    highlight: "Custom alerts, on your schedule",
  },
  {
    number: "04",
    slug: "cloud-first-workshop",
    icon: Cloud,
    title: "Cloud-first workshop",
    headline: "Do business anywhere",
    description:
      "Connect to your workshop from any device, anywhere. Stay across every job in progress and manage operations remotely — even on holiday.",
    highlight: "Full visibility, from anywhere",
  },
  {
    number: "05",
    slug: "booking-diary",
    icon: CalendarDays,
    title: "Booking diary",
    headline: "Bookings made simple",
    description:
      "Create, reschedule or delete bookings in a few clicks. Bookings convert straight into jobs, which saves you time.",
    highlight: "Faster bookings, less admin",
  },
  {
    number: "06",
    slug: "job-management",
    icon: LayoutGrid,
    title: "Job management",
    headline: "Your workshop at a glance",
    description:
      "Keep up to date with every job in your workshop at a glance. Manage jobs with your colleagues centrally and in real time.",
    highlight: "Every job, in view",
  },
  {
    number: "07",
    slug: "invoicing-and-quoting",
    icon: FileText,
    title: "Invoicing and quoting",
    headline: "Quick and easy invoicing",
    description:
      "Invoice and quote fast with preconfigured items. Convert invoices and quotes into jobs or bookings directly.",
    highlight: "Invoice faster, get paid sooner",
  },
  {
    number: "08",
    slug: "customer-and-vehicle-management",
    icon: Users,
    title: "Customer and vehicle management",
    headline: "Know your customers",
    description:
      "Store customer details once and use them across the system, with auto-suggest and auto-complete doing the typing for you.",
    highlight: "Smart suggestions, less typing",
  },
  {
    number: "09",
    slug: "supplier-management",
    icon: Truck,
    title: "Supplier management",
    headline: "Stay on top of supply",
    description:
      "Reorder from your trusted suppliers in a dash. Keep bills and payments organised without effort.",
    highlight: "Suppliers organised, cash flow clear",
  },
  {
    number: "10",
    slug: "service-scheduling",
    icon: Wrench,
    title: "Service scheduling",
    headline: "Never miss a service",
    description:
      "Know which vehicles are due or overdue for service, and send reminders to customers by email or SMS.",
    highlight: "Reminders that send themselves",
  },
  {
    number: "11",
    slug: "reporting",
    icon: BarChart3,
    title: "Reporting",
    headline: "Understand your business",
    description:
      "See the numbers that matter — sales, payments received, stock value and team efficiency — in one reporting system.",
    highlight: "Decisions backed by numbers",
  },
];

export const featureBySlug = (slug) => features.find((f) => f.slug === slug);
