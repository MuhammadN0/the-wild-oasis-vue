import { cabinsCollection, db } from '@/firebase/config';
import { add, differenceInDays } from 'date-fns';

function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export const Gcabins = [
  {
    name: '001',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-001.jpg-0.29822217456365596?alt=media&token=e06f94e8-b035-47e5-a1de-3cd53ea93ec5',
    description:
      'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
  },
  {
    name: '002',
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-002.jpg?alt=media&token=a6f9604f-d8b3-4ec0-bc6d-0f6c94a480aa',
    description:
      'Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.',
  },
  {
    name: '003',
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-003.jpg-0.5873397155907969?alt=media&token=df4eae61-7ae2-4158-b379-f6db6c6572fb',
    description:
      'Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.',
  },
  {
    name: '004',
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-004.jpg-0.9151820555345715?alt=media&token=bf3fd911-b8bc-48d6-bc74-ded7bfc75f2a',
    description:
      'Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.',
  },
  {
    name: '005',
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-005.jpg-0.9041344811243639?alt=media&token=60459263-ffd4-4d28-ae0b-4307b3cf2151',
    description:
      'Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.',
  },
  {
    name: '006',
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-006.jpg-0.6982711919782585?alt=media&token=45fc1617-b1e2-439e-bf5c-ec9deb1a7d2c',
    description:
      'Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.',
  },
  {
    name: '007',
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-007.jpg-0.10777236306477667?alt=media&token=0792d9fb-8031-4c46-a2a0-88adc495d4fb',
    description:
      'Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.',
  },
  {
    name: '008',
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image:
      'https://firebasestorage.googleapis.com/v0/b/the-wild-oasis-72431.appspot.com/o/cabins%2Fcabin-008.jpg-0.16431700972671925?alt=media&token=349bc6d2-81ba-497a-a711-2f2340283413',
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];
export const bookings = [
  // CABIN 001
  {
    created_at: fromToday(-20, true),
    startDate: fromToday(0),
    endDate: fromToday(7),
    cabinId: 1,
    guestId: 2,
    hasBreakfast: true,
    observations:
      'I have a gluten allergy and would like to request a gluten-free breakfast.',
    isPaid: false,
    numGuests: 1,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-33, true),
    startDate: fromToday(-23),
    endDate: fromToday(-13),
    cabinId: 1,
    guestId: 3,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 2,
    status: 'checked-out',
  },
  {
    created_at: fromToday(-27, true),
    startDate: fromToday(12),
    endDate: fromToday(18),
    cabinId: 1,
    guestId: 4,
    hasBreakfast: false,
    observations: '',
    isPaid: false,
    numGuests: 2,
    status: 'unconfirmed',
  },

  // CABIN 002
  {
    created_at: fromToday(-45, true),
    startDate: fromToday(-45),
    endDate: fromToday(-29),
    cabinId: 2,
    guestId: 5,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 2,
    status: 'checked-out',
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(15),
    endDate: fromToday(18),
    cabinId: 2,
    guestId: 6,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 2,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-5, true),
    startDate: fromToday(33),
    endDate: fromToday(48),
    cabinId: 2,
    guestId: 7,
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 2,
    status: 'unconfirmed',
  },

  // CABIN 003
  {
    created_at: fromToday(-65, true),
    startDate: fromToday(-25),
    endDate: fromToday(-20),
    cabinId: 3,
    guestId: 8,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
    status: 'checked-out',
  },
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(-2),
    endDate: fromToday(0),
    cabinId: 3,
    guestId: 9,
    hasBreakfast: false,
    observations: 'We will be bringing our small dog with us',
    isPaid: true,
    numGuests: 3,
    status: 'checked-in',
  },
  {
    created_at: fromToday(-14, true),
    startDate: fromToday(-14),
    endDate: fromToday(-11),
    cabinId: 3,
    guestId: 10,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
    status: 'checked-out'
  },

  // CABIN 004
  {
    created_at: fromToday(-30, true),
    startDate: fromToday(-4),
    endDate: fromToday(8),
    cabinId: 4,
    guestId: 11,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
    status: 'checked-in',
  },
  {
    created_at: fromToday(-1, true),
    startDate: fromToday(12),
    endDate: fromToday(17),
    cabinId: 4,
    guestId: 12,
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 4,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(18),
    endDate: fromToday(19),
    cabinId: 4,
    guestId: 13,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 1,
    status: 'unconfirmed',
  },

  // CABIN 005
  {
    created_at: fromToday(0, true),
    startDate: fromToday(14),
    endDate: fromToday(21),
    cabinId: 5,
    guestId: 14,
    hasBreakfast: true,
    observations: '',
    isPaid: false,
    numGuests: 5,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-6, true),
    startDate: fromToday(-6),
    endDate: fromToday(-4),
    cabinId: 5,
    guestId: 15,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 4,
    status: 'checked-out',
  },
  {
    created_at: fromToday(-4, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinId: 5,
    guestId: 16,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 6,
    status: 'checked-out',
  },

  // CABIN 006
  {
    created_at: fromToday(-3, true),
    startDate: fromToday(0),
    endDate: fromToday(11),
    cabinId: 6,
    guestId: 17,
    hasBreakfast: false,
    observations:
      "We will be checking in late, around midnight. Hope that's okay :)",
    isPaid: true,
    numGuests: 6,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-16, true),
    startDate: fromToday(-16),
    endDate: fromToday(-9),
    cabinId: 6,
    guestId: 18,
    hasBreakfast: true,
    observations: 'I will need a rollaway bed for one of the guests',
    isPaid: true,
    numGuests: 4,
    status: 'checked-out',
  },
  {
    created_at: fromToday(-18, true),
    startDate: fromToday(-4),
    endDate: fromToday(-1),
    cabinId: 6,
    guestId: 19,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 6,
    status: 'checked-out',
  },

  // CABIN 007
  {
    created_at: fromToday(-2, true),
    startDate: fromToday(17),
    endDate: fromToday(23),
    cabinId: 7,
    guestId: 20,
    hasBreakfast: false,
    observations: '',
    isPaid: false,
    numGuests: 8,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-7, true),
    startDate: fromToday(40),
    endDate: fromToday(50),
    cabinId: 7,
    guestId: 21,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 7,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-55, true),
    startDate: fromToday(32),
    endDate: fromToday(37),
    cabinId: 7,
    guestId: 22,
    hasBreakfast: true,
    observations: '',
    isPaid: true,
    numGuests: 6,
    status: 'unconfirmed',
  },

  // CABIN 008
  {
    created_at: fromToday(-8, true),
    startDate: fromToday(-5),
    endDate: fromToday(0),
    cabinId: 8,
    guestId: 1,
    hasBreakfast: true,
    observations:
      'My wife has a gluten allergy so I would like to request a gluten-free breakfast if possible',
    isPaid: true,
    numGuests: 9,
    status: 'checked-in',
  },
  {
    created_at: fromToday(0, true),
    startDate: fromToday(0),
    endDate: fromToday(5),
    cabinId: 8,
    guestId: 23,
    hasBreakfast: true,
    observations:
      'I am celebrating my anniversary, can you arrange for any special amenities or decorations?',
    isPaid: true,
    numGuests: 10,
    status: 'unconfirmed',
  },
  {
    created_at: fromToday(-10, true),
    startDate: fromToday(10),
    endDate: fromToday(13),
    cabinId: 8,
    guestId: 24,
    hasBreakfast: false,
    observations: '',
    isPaid: true,
    numGuests: 7,
    status: 'unconfirmed',
  },
];

export const Gguests = [
  {
    // id: 1000,
    fullName: 'Jonas Schmedtmann',
    email: 'hello@jonas.io',
    nationality: 'Portugal',
    nationalID: '3525436345',
    countryFlag: 'https://flagcdn.com/pt.svg',
  },
  {
    fullName: 'Jonathan Smith',
    email: 'johnsmith@test.eu',
    nationality: 'Great Britain',
    nationalID: '4534593454',
    countryFlag: 'https://flagcdn.com/gb.svg',
  },
  {
    fullName: 'Jonatan Johansson',
    email: 'jonatan@example.com',
    nationality: 'Finland',
    nationalID: '9374074454',
    countryFlag: 'https://flagcdn.com/fi.svg',
  },
  {
    fullName: 'Jonas Mueller',
    email: 'jonas@example.eu',
    nationality: 'Germany',
    nationalID: '1233212288',
    countryFlag: 'https://flagcdn.com/de.svg',
  },
  {
    fullName: 'Jonas Anderson',
    email: 'anderson@example.com',
    nationality: 'Bolivia (Plurinational State of)',
    nationalID: '0988520146',
    countryFlag: 'https://flagcdn.com/bo.svg',
  },
  {
    fullName: 'Jonathan Williams',
    email: 'jowi@gmail.com',
    nationality: 'United States of America',
    nationalID: '633678543',
    countryFlag: 'https://flagcdn.com/us.svg',
  },

  // GPT
  {
    fullName: 'Emma Watson',
    email: 'emma@gmail.com',
    nationality: 'United Kingdom',
    nationalID: '1234578901',
    countryFlag: 'https://flagcdn.com/gb.svg',
  },
  {
    fullName: 'Mohammed Ali',
    email: 'mohammedali@yahoo.com',
    nationality: 'Egypt',
    nationalID: '987543210',
    countryFlag: 'https://flagcdn.com/eg.svg',
  },
  {
    fullName: 'Maria Rodriguez',
    email: 'maria@gmail.com',
    nationality: 'Spain',
    nationalID: '1098765321',
    countryFlag: 'https://flagcdn.com/es.svg',
  },
  {
    fullName: 'Li Mei',
    email: 'li.mei@hotmail.com',
    nationality: 'China',
    nationalID: '102934756',
    countryFlag: 'https://flagcdn.com/cn.svg',
  },
  {
    fullName: 'Khadija Ahmed',
    email: 'khadija@gmail.com',
    nationality: 'Sudan',
    nationalID: '1023457890',
    countryFlag: 'https://flagcdn.com/sd.svg',
  },
  {
    fullName: 'Gabriel Silva',
    email: 'gabriel@gmail.com',
    nationality: 'Brazil',
    nationalID: '109283465',
    countryFlag: 'https://flagcdn.com/br.svg',
  },
  {
    fullName: 'Maria Gomez',
    email: 'maria@example.com',
    nationality: 'Mexico',
    nationalID: '108765421',
    countryFlag: 'https://flagcdn.com/mx.svg',
  },
  {
    fullName: 'Ahmed Hassan',
    email: 'ahmed@gmail.com',
    nationality: 'Egypt',
    nationalID: '1077777777',
    countryFlag: 'https://flagcdn.com/eg.svg',
  },
  {
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
    nationality: 'United States',
    nationalID: '3245908744',
    countryFlag: 'https://flagcdn.com/us.svg',
  },
  {
    fullName: 'Fatima Ahmed',
    email: 'fatima@example.com',
    nationality: 'Pakistan',
    nationalID: '1089999363',
    countryFlag: 'https://flagcdn.com/pk.svg',
  },
  {
    fullName: 'David Smith',
    email: 'david@gmail.com',
    nationality: 'Australia',
    nationalID: '44450960283',
    countryFlag: 'https://flagcdn.com/au.svg',
  },
  {
    fullName: 'Marie Dupont',
    email: 'marie@gmail.com',
    nationality: 'France',
    nationalID: '06934233728',
    countryFlag: 'https://flagcdn.com/fr.svg',
  },
  {
    fullName: 'Ramesh Patel',
    email: 'ramesh@gmail.com',
    nationality: 'India',
    nationalID: '9875412303',
    countryFlag: 'https://flagcdn.com/in.svg',
  },
  {
    fullName: 'Fatimah Al-Sayed',
    email: 'fatimah@gmail.com',
    nationality: 'Kuwait',
    nationalID: '0123456789',
    countryFlag: 'https://flagcdn.com/kw.svg',
  },
  {
    fullName: 'Nina Williams',
    email: 'nina@hotmail.com',
    nationality: 'South Africa',
    nationalID: '2345678901',
    countryFlag: 'https://flagcdn.com/za.svg',
  },
  {
    fullName: 'Taro Tanaka',
    email: 'taro@gmail.com',
    nationality: 'Japan',
    nationalID: '3456789012',
    countryFlag: 'https://flagcdn.com/jp.svg',
  },
  {
    fullName: 'Abdul Rahman',
    email: 'abdul@gmail.com',
    nationality: 'Saudi Arabia',
    nationalID: '4567890123',
    countryFlag: 'https://flagcdn.com/sa.svg',
  },
  {
    fullName: 'Julie Nguyen',
    email: 'julie@gmail.com',
    nationality: 'Vietnam',
    nationalID: '5678901234',
    countryFlag: 'https://flagcdn.com/vn.svg',
  },
  {
    fullName: 'Sara Lee',
    email: 'sara@gmail.com',
    nationality: 'South Korea',
    nationalID: '6789012345',
    countryFlag: 'https://flagcdn.com/kr.svg',
  },
  {
    fullName: 'Carlos Gomez',
    email: 'carlos@yahoo.com',
    nationality: 'Colombia',
    nationalID: '7890123456',
    countryFlag: 'https://flagcdn.com/co.svg',
  },
  {
    fullName: 'Emma Brown',
    email: 'emma@gmail.com',
    nationality: 'Canada',
    nationalID: '8901234567',
    countryFlag: 'https://flagcdn.com/ca.svg',
  },
  {
    fullName: 'Juan Hernandez',
    email: 'juan@yahoo.com',
    nationality: 'Argentina',
    nationalID: '4343433333',
    countryFlag: 'https://flagcdn.com/ar.svg',
  },
  {
    fullName: 'Ibrahim Ahmed',
    email: 'ibrahim@yahoo.com',
    nationality: 'Nigeria',
    nationalID: '2345678009',
    countryFlag: 'https://flagcdn.com/ng.svg',
  },
  {
    fullName: 'Mei Chen',
    email: 'mei@gmail.com',
    nationality: 'Taiwan',
    nationalID: '3456117890',
    countryFlag: 'https://flagcdn.com/tw.svg',
  },
];

export async function upload() {
  console.log("Loading...... Don't refresh the page");
  const cabinsSnapshots_1 = await cabinsCollection.get();
  cabinsSnapshots_1.forEach(async (doc) => {
    await cabinsCollection.doc(doc.id).delete();
  });
  Gcabins.forEach(async (cabin) => {
    await cabinsCollection.add(cabin);
  });
  const guestsCollection = db.collection('guests');
  const guestsSnapshot = await guestsCollection.get();
  guestsSnapshot.forEach(async (doc) => {
    await guestsCollection.doc(doc.id).delete();
  });
  Gguests.forEach(async (g, ind) => {
    await guestsCollection.add({ ...g, ind: ind + 1 });
  });
  const cabinsSnapshots = await cabinsCollection.orderBy('name', 'asc').get();
  let cabins = [];
  cabinsSnapshots.forEach((snapshot) => {
    cabins.push({ ...snapshot.data, id: snapshot.id });
  });
  let guests = [];
  const guestsSnapshot_2 = await guestsCollection.orderBy('ind', 'asc').get();
  guestsSnapshot_2.forEach((snapshot) => {
    guests.push({ ...snapshot.data(), id: snapshot.id });
  });
  const finalBookings = bookings.map((booking) => {
    const cabinId = cabins[booking.cabinId - 1].id;
    const guestId = guests[booking.guestId].id;
    const numNights = differenceInDays(booking.endDate, booking.startDate);
    const cabinPrice = Gcabins[booking.cabinId - 1].regularPrice * numNights;
    const extrasPrice = booking.hasBreakfast ? 20 * numNights : 0;
    const totalPrice = cabinPrice + extrasPrice;

    return {
      ...booking,
      cabinId,
      guestId,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
    };
  });
  const bookingsCollection = db.collection('bookings');
  const bookingsSnapshots = await bookingsCollection.get();
  bookingsSnapshots.forEach(async (doc) => {
    await bookingsCollection.doc(doc.id).delete();
  });
  finalBookings.forEach(async (booking) => {
    await bookingsCollection.add(booking);
  });
  console.log('Done ;)');
}
