import { SchedulerData } from "@bitnoi.se/react-scheduler";

export const cabinsData = [
  {
    cabin: "01",
    capacity: 2,
    price: 250,
    discount: 220,
    img: "avatar.jpeg",
  },
  {
    cabin: "02",
    capacity: 4,
    price: 560,
    discount: 480,
    img: "avatar.jpeg",
  },
  {
    cabin: "03",
    capacity: 6,
    price: 780,
    discount: "",
    img: "avatar.jpeg",
  },
  {
    cabin: "04",
    capacity: 8,
    price: 1080,
    discount: 960,
    img: "avatar.jpeg",
  },
  {
    cabin: "05",
    capacity: 10,
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
    id: "070ac5b5-8369-4cd2-8ba2-0a209130cc60",
    label: {
      icon: "https://picsum.photos/24",
      title: "Zimmer 1",
      subtitle: "Doppelzimmer",
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
      title: "Zimmer 2",
      subtitle: "Doppelzimmer",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a7567ba3762",
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
    id: "070ac5b5-8369-4cd2-8b45637570cc60",
    label: {
      icon: "https://picsum.photos/20",
      title: "Zimmer 3",
      subtitle: "Doppelzimmer",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa34537ba3762",
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
    id: "070ac5b5-8369-4cd2-8ba2-0456570cc60",
    label: {
      icon: "https://picsum.photos/26",
      title: "Zimmer 4",
      subtitle: "Doppelzimmer",
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
      title: "Zimmer 5",
      subtitle: "Doppelzimmer",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa4567ba3762",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a25786570cc60",
    label: {
      icon: "https://picsum.photos/28",
      title: "Zimmer 6",
      subtitle: "Doppelzimmer",
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
  {
    id: "070ac5b5-8369-4cd2-8ba2-0a2789570cc60",
    label: {
      icon: "https://picsum.photos/29",
      title: "Zimmer 7",
      subtitle: "Doppelzimmer",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b4a7568ba3762",
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
    id: "070ac5b5-8369-4cd2-8ba2-0a278570cc60",
    label: {
      icon: "https://picsum.photos/30",
      title: "Zimmer 8",
      subtitle: "Doppelzimmer",
    },
    data: [
      {
        id: "8b71a8a5-33dd-4fc8-9caa-b56a7567ba3762",
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
