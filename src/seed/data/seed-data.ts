interface TicketSeed {
    title: string;
    description: string;
    price: number;
    stock?: number;
}

interface EventSeed {
    title: string;
    description: string;
    date: string;
    image?: string;
    tickets: TicketSeed[];
}

interface SeedData {
    events: EventSeed[];
}

export const seedData: SeedData = {
    events: [
        {
            title: "Electric Summer Dreams",
            description: "A weekend of electronic beats at the hottest beach party.",
            date: "2024-07-15T15:00:00Z",
            tickets: [
                {
                    title: "General Admission",
                    description: "Access to all stages and general areas.",
                    price: 99.99,
                    stock: 1000
                },
                {
                    title: "VIP Experience",
                    description: "Exclusive access to VIP areas with premium amenities.",
                    price: 299.99,
                    stock: 200
                }
            ]
        },
        {
            title: "Night Beats Festival",
            description: "Dance all night under the stars with world-renowned DJs.",
            date: "2024-08-23T00:00:00Z",
            image: "path/to/night-beats.jpg",
            tickets: [
                {
                    title: "One Night Pass",
                    description: "Full access for one night of non-stop music.",
                    price: 79.99,
                    stock: 500
                },
                {
                    title: "Weekend Warrior",
                    description: "All-access pass for the entire weekend.",
                    price: 159.99,
                    stock: 150
                }
            ]
        },
        {
            title: "Downtown Electronica",
            description: "Experience the city vibes with a mix of electronic music and urban art.",
            date: "2024-09-10T00:00:00Z",
            image: "path/to/downtown-electronica.jpg",
            tickets: [
                {
                    title: "Day Pass",
                    description: "Enjoy a single day of music, art, and culture.",
                    price: 65.99,
                    stock: 400
                },
                {
                    title: "Full Pass",
                    description: "Full access to all days of the festival, including exclusive events.",
                    price: 180.99,
                    stock: 100
                }
            ]
        },
        {
            title: "Beats on the Bay",
            description: "Groove to the best electronic beats at this scenic waterfront festival.",
            date: "2024-10-05T00:00:00Z",
            image: "path/to/beats-on-bay.jpg",
            tickets: [
                {
                    title: "Standard Ticket",
                    description: "Standard access to all performances.",
                    price: 55.99,
                    stock: 600
                },
                {
                    title: "VIP Ticket",
                    description: "VIP seating and meet-and-greet opportunities with the DJs.",
                    price: 255.99,
                    stock: 75
                }
            ]
        },
        {
            title: "Urban Sound Project",
            description: "Join the urban revolution of sound with this exclusive electronic music event.",
            date: "2024-11-20T00:00:00Z",
            image: "path/to/urban-sound.jpg",
            tickets: [
                {
                    title: "General Access",
                    description: "Access to all general areas and live performances.",
                    price: 45.99,
                    stock: 800
                },
                {
                    title: "Premium Experience",
                    description: "Enjoy backstage passes and premium viewing areas.",
                    price: 195.99,
                    stock: 150
                }
            ]
        }, {
            title: "Neon Pulse Festival",
            description: "Experience the vibrant lights and beats of the Neon Pulse Festival.",
            date: "2024-12-01T00:00:00Z",
            image: "path/to/neon-pulse.jpg",
            tickets: [
                {
                    title: "Entry Ticket",
                    description: "General admission to all performances and light shows.",
                    price: 39.99,
                    stock: 700
                },
                {
                    title: "VIP Access",
                    description: "Includes VIP lounge access and front-row seating.",
                    price: 149.99,
                    stock: 120
                }
            ]
        },
        {
            title: "Future Beats Summit",
            description: "A summit of the latest trends and innovations in electronic music.",
            date: "2024-10-15T00:00:00Z",
            image: "path/to/future-beats.jpg",
            tickets: [
                {
                    title: "Conference Pass",
                    description: "Access to all panel discussions and keynote speeches.",
                    price: 89.99,
                    stock: 200
                },
                {
                    title: "All Access Pass",
                    description: "Includes entry to all sessions, workshops, and exclusive parties.",
                    price: 249.99,
                    stock: 50
                }
            ]
        },
        {
            title: "Solar Flare Festival",
            description: "A day-long festival with the hottest electronic acts under the sun.",
            date: "2024-08-10T00:00:00Z",
            image: "path/to/solar-flare.jpg",
            tickets: [
                {
                    title: "Early Bird",
                    description: "Early bird access to the festival.",
                    price: 39.99,
                    stock: 300
                },
                {
                    title: "Full Access",
                    description: "Full access to all stages and VIP areas.",
                    price: 129.99,
                    stock: 100
                }
            ]
        },
        {
            title: "Techno Nights",
            description: "An electrifying night of techno beats with the best DJs in the world.",
            date: "2024-09-25T00:00:00Z",
            image: "path/to/techno-nights.jpg",
            tickets: [
                {
                    title: "Standard Ticket",
                    description: "Access to the main stage and dance floor.",
                    price: 49.99,
                    stock: 400
                },
                {
                    title: "VIP Access",
                    description: "Includes VIP lounge access and complimentary drinks.",
                    price: 179.99,
                    stock: 80
                }
            ]
        },
        {
            title: "Eclipse Beats Festival",
            description: "Celebrate the celestial event with beats and lights in an otherworldly setting.",
            date: "2024-06-30T00:00:00Z",
            image: "path/to/eclipse-beats.jpg",
            tickets: [
                {
                    title: "General Entry",
                    description: "Access to all performances and viewing areas.",
                    price: 69.99,
                    stock: 600
                },
                {
                    title: "VIP Viewing",
                    description: "Premium viewing area and exclusive DJ meet-and-greet.",
                    price: 299.99,
                    stock: 100
                }
            ]
        },
        {
            title: "Bassline Blast",
            description: "A night of deep bass and hard-hitting beats with top bass DJs.",
            date: "2024-07-30T00:00:00Z",
            image: "path/to/bassline-blast.jpg",
            tickets: [
                {
                    title: "General Admission",
                    description: "Access to all bass stages and dance areas.",
                    price: 39.99,
                    stock: 500
                },
                {
                    title: "VIP Experience",
                    description: "Includes VIP seating, complimentary drinks, and meet-and-greet.",
                    price: 149.99,
                    stock: 150
                }
            ]
        },
        {
            title: "Synthwave Summer",
            description: "Immerse yourself in the retro-futuristic sounds of Synthwave music.",
            date: "2024-08-18T00:00:00Z",
            image: "path/to/synthwave-summer.jpg",
            tickets: [
                {
                    title: "Early Bird",
                    description: "Early bird access to the festival.",
                    price: 49.99,
                    stock: 250
                },
                {
                    title: "VIP Pass",
                    description: "VIP access with front-row views and exclusive amenities.",
                    price: 199.99,
                    stock: 100
                }
            ]
        },
        {
            title: "Electric Wonderland",
            description: "An enchanting night with dazzling lights and electronic beats.",
            date: "2024-09-05T00:00:00Z",
            image: "path/to/electric-wonderland.jpg",
            tickets: [
                {
                    title: "General Entry",
                    description: "Access to all main stages and attractions.",
                    price: 59.99,
                    stock: 600
                },
                {
                    title: "VIP Access",
                    description: "VIP area access with premium views and complimentary drinks.",
                    price: 229.99,
                    stock: 80
                }
            ]
        },
        {
            title: "Vibe City Music Fest",
            description: "The ultimate urban electronic music experience, featuring the hottest EDM artists.",
            date: "2024-11-10T00:00:00Z",
            image: "path/to/vibe-city.jpg",
            tickets: [
                {
                    title: "Day Pass",
                    description: "Access to all performances for a single day.",
                    price: 85.99,
                    stock: 500
                },
                {
                    title: "Festival Pass",
                    description: "Full access to the festival for all three days.",
                    price: 225.99,
                    stock: 200
                }
            ]
        },
        {
            title: "Digital Dreams Concert",
            description: "A surreal journey through electronic music, with stunning visual and sound displays.",
            date: "2024-11-28T00:00:00Z",
            image: "path/to/digital-dreams.jpg",
            tickets: [
                {
                    title: "General Access",
                    description: "General access to the concert area.",
                    price: 49.99,
                    stock: 800
                },
                {
                    title: "Dreamer’s VIP",
                    description: "VIP access with exclusive backstage passes and artist meet-ups.",
                    price: 199.99,
                    stock: 100
                }
            ]
        },
        {
            title: "The Soundwave Expo",
            description: "Explore the future of electronic music at this innovative expo.",
            date: "2024-12-05T00:00:00Z",
            image: "path/to/soundwave-expo.jpg",
            tickets: [
                {
                    title: "Expo Pass",
                    description: "Entry to all expo days, including seminars and live demos.",
                    price: 59.99,
                    stock: 300
                },
                {
                    title: "Ultimate Soundwave",
                    description: "All-inclusive pass with special sessions and limited-edition merch.",
                    price: 159.99,
                    stock: 50
                }
            ]
        }

    ]
}
