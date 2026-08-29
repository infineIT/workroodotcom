/* Proof numbers carried over from the original stats strip. Static — no count-up. */
export const proof = [
  { value: "20+ hrs", label: "Saved per week" },
  { value: "100%", label: "Customer retention" },
  { value: "24 min", label: "Average session" },
  { value: "+30%", label: "Customer engagement" },
];

export const IMAGES = {
  bookings:
    "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/cf4c7e93a_generated_image.png",
  customerView:
    "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f72246a88_workroocustomerview-task.jpg",
  mechanic:
    "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/f53e445e5_generated_image.png",
  onThePhone:
    "https://media.base44.com/images/public/69d78b7f4ff0affa598fbcbb/40b0203b6_WorkrooOnthephone1.jpg",
};

export const steps = [
  {
    step: "01",
    title: "Bookings and jobs, in one place",
    description:
      "Bookings confirm themselves. Jobs live in a single view. Your team always knows what comes next.",
    image: IMAGES.bookings,
    alt: "Workshop booking and job management dashboard",
  },
  {
    step: "02",
    title: "Customers connect in real time",
    description:
      "The moment work begins, updates reach the customer's phone. No more wondering what's happening to the car.",
    image: IMAGES.customerView,
    alt: "Customer connected in real time on their phone",
  },
  {
    step: "03",
    title: "Mechanics document the work",
    description:
      "Technicians log each job as they go. The result is a verified record that ends disputes before they start.",
    image: IMAGES.mechanic,
    alt: "Mechanic documenting progress on a vehicle",
  },
  {
    step: "04",
    title: "Customers come back",
    description:
      "People who can see what was done, and why, return. And they tell others.",
    image: IMAGES.onThePhone,
    alt: "Satisfied returning customer checking Workroo",
  },
];
