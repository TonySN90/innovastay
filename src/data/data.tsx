import { SchedulerData } from "@bitnoi.se/react-scheduler";

export const cabinsData = [
  {
    id: "01",
    cabin: { name: "Zimmer 1", category: "Einzelzimmer" },
    capacity: 2,
    price: 250,
    discount: 220,
    img: "avatar.jpeg",
  },
  {
    id: "02",
    cabin: { name: "Zimmer 2", category: "Doppelzimmer" },
    capacity: 2,
    price: 560,
    discount: 480,
    img: "avatar.jpeg",
  },
  {
    id: "03",
    cabin: { name: "Zimmer 3", category: "Doppelzimmer" },
    capacity: 2,
    price: 780,
    discount: "",
    img: "avatar.jpeg",
  },
  {
    id: "04",
    cabin: { name: "Zimmer 4", category: "Mehrbettzimmer" },
    capacity: 3,
    price: 1080,
    discount: 960,
    img: "avatar.jpeg",
  },
  {
    id: "05",
    cabin: { name: "Zimmer 2", category: "Zweibettzimmer" },
    capacity: 2,
    price: 1300,
    discount: 1240,
    img: "avatar.jpeg",
  },
  {
    id: "06",
    cabin: { name: "Zimmer 6", category: "Familienzimmer" },
    capacity: 6,
    price: 1300,
    discount: 1240,
    img: "avatar.jpeg",
  },
];

export const bookingsData = [
  {
    bookingId: "5546",
    cabin: "01",
    guest: "Olaf Scholz",
    email: "olafscholz@bundeskanzler.de",
    startDate: "27.02.2024",
    endDate: "03.01.2024",
    numNights: 6,
    numGuests: 2,
    cabinPrice: 1320,
    extrasPrice: 300,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: false,
    totalPrice: 2000,
  },
  {
    bookingId: "5547",
    cabin: "02",
    guest: "Henriette Mayer",
    email: "h.mayer@gmail.com",
    startDate: "27.02.2024",
    endDate: "03.01.2024",
    numNights: 6,
    numGuests: 2,
    cabinPrice: 1320,
    extrasPrice: 300,
    status: "confirmed",
    hasBreakfast: true,
    isPaid: false,
    totalPrice: 1800,
  },
  {
    bookingId: "5548",
    cabin: "02",
    guest: "Daniel Güntherino",
    email: "daniel.güntherino@gmail.com",
    startDate: "27.02.2024",
    endDate: "03.01.2024",
    numNights: 6,
    numGuests: 2,
    cabinPrice: 1320,
    extrasPrice: 300,
    status: "confirmed",
    hasBreakfast: true,
    isPaid: false,
    totalPrice: 1800,
  },
];

export const mockedSchedulerData: SchedulerData = [
  {
    id: "cabin-001",
    label: {
      icon: "https://picsum.photos/24",
      title: cabinsData[0].cabin.name,
      subtitle: cabinsData[0].cabin.category,
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a7563762",
        startDate: new Date("2024-02-27T15:31:24.272Z"),
        endDate: new Date("2024-03-01T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a58456a3762",
        startDate: new Date("2024-03-04T15:31:24.272Z"),
        endDate: new Date("2024-03-10T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a2567570cc60",
    label: {
      icon: "https://picsum.photos/25",
      title: cabinsData[1].cabin.name,
      subtitle: cabinsData[1].cabin.category,
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a7567ba3762",
        startDate: new Date("2024-03-03T15:31:24.272Z"),
        endDate: new Date("2024-03-08T10:28:22.649Z"),
        occupancy: 3600,
        title: "Daniel Güntherino",
        subtitle: "2 Gäste",
        description: "daniel.güntherino@gmail.com",
        bgColor: "#C7D2FE",
      },
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a756345a3762",
        startDate: new Date("2024-03-10T15:31:24.272Z"),
        endDate: new Date("2024-03-20T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8b45637570cc60",
    label: {
      icon: "https://picsum.photos/20",
      title: cabinsData[2].cabin.name,
      subtitle: cabinsData[2].cabin.category,
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-DFGDGFD",
        startDate: new Date("2024-03-01T15:31:24.272Z"),
        endDate: new Date("2024-03-05T10:28:22.649Z"),
        occupancy: 3600,
        title: "Maria Madsen",
        subtitle: "2 Gäste",
        description: "daniel.güntherino@gmail.com",
        bgColor: "#C7D2FE",
      },
      {
        id: "8b71a8a5-33dd-4fc8-9caa-345trwete",
        startDate: new Date("2024-03-07T15:31:24.272Z"),
        endDate: new Date("2024-03-15T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0456570cc60",
    label: {
      icon: "https://picsum.photos/26",
      title: cabinsData[3].cabin.name,
      subtitle: cabinsData[3].cabin.category,
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a78ba3762",
        startDate: new Date("2024-02-28T15:31:24.272Z"),
        endDate: new Date("2024-03-14T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-045667570cc60",
    label: {
      icon: "https://picsum.photos/27",
      title: cabinsData[4].cabin.name,
      subtitle: cabinsData[4].cabin.category,
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-ba3762",
        startDate: new Date("2024-02-28T15:31:24.272Z"),
        endDate: new Date("2024-03-06T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
      {
        id: "8b71a8a5-33dd-4fc8-9caa45ba3762",
        startDate: new Date("2024-03-08T15:31:24.272Z"),
        endDate: new Date("2024-03-22T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
    ],
  },
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a25786570cc60",
    label: {
      icon: "https://picsum.photos/28",
      title: cabinsData[5].cabin.name,
      subtitle: cabinsData[5].cabin.category,
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-45667ba3762",
        startDate: new Date("2024-02-28T15:31:24.272Z"),
        endDate: new Date("2024-03-14T10:28:22.649Z"),
        occupancy: 3600,
        title: "Olaf Scholz",
        subtitle: "2 Gäste",
        description: "olafscholz@bundeskanzler.de",
        bgColor: "#C7D2FE",
      },
    ],
  },
];

export const guestsData = [
  {
    id: "8b71a8a5-33dd-4fc8-9caa-b4a7563762",
    guest: "Olaf Scholz",
    address: "Bundeskanzlerstr. 1",
    postalCode: "10435",
    city: "Berlin",
    email: "olafscholz@bundeskanzler.de",
    phone: "0160666666",
    country: "DE",
    maxStays: 2,
    lastStay: "27.02.2024 - 03.01.2024",
    information: "Der Gast war sehr unsauber bei seinem letzten Aufenthalt!",
  },
  {
    id: "8b71a8a5-33dd-4fc8-9caa-b45gh2",
    guest: "Daniel Güntherino",
    address: "Güntherinoallee. 4",
    postalCode: "10435",
    city: "Berlin",
    country: "DE",
    email: "daniel.güntherino@gmail.com",
    phone: "0160666666",
    maxStays: 2,
    lastStay: "04.02.2024 - 20.02.2024",
    information: "Soweit alles in Ordnung! Sie waren sehr zufrieden",
  },
  {
    id: "e2a3b5cd-7f8e-4a12-9f6c-cd8e2f",
    guest: "Maria Schneider",
    address: "Schneiderstr. 12",
    postalCode: "10987",
    city: "Berlin",
    country: "DE",
    email: "maria.schneider@email.com",
    phone: "01771234567",
    maxStays: 3,
    lastStay: "10.03.2023 - 25.03.2023",
    information: "Wie immer alles in Ordnung.",
  },
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-a1b2c3",
    guest: "Robert Fischer",
    address: "Fischerplatz 7",
    postalCode: "56789",
    city: "Cologne",
    country: "DE",
    email: "robert.fischer@email.com",
    phone: "01671234567",
    maxStays: 2,
    lastStay: "12.02.2024 - 15.02.2023",
    information:
      "Es gab Beschwerden aufgrund des defekten Fernsehers, die Unterkunft wurde sauber hinterlassen.",
  },
  {
    id: "5a4b3c2d-1e9f-8g7h-6i5j-a4b3c2",
    guest: "Sophie Wagner",
    address: "Wagnerstr. 15",
    postalCode: "87654",
    city: "Stuttgart",
    country: "DE",
    email: "sophie.wagner@email.com",
    phone: "01511234567",
    maxStays: 1,
    lastStay: "08.03.2024 - 18.03.2024",
    information:
      "Während des Aufenthalts was alles in Ordnung. Das Zimmer wurde aber in einem dreckigen Zustand hinterlassen!",
  },
];
