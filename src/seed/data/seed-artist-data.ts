interface SocialMediaSeed {
    type: string;
    url: string;
}

interface ArtistSeed {
    name: string;
    about: string;
    country_code: string;
    image?: string;
    slug?: string;
    social_media?: SocialMediaSeed[];
}

interface SeedArtistData {
    artists: ArtistSeed[];
}

export const seedArtistData: SeedArtistData = {
    artists: [
        {
            "name": "Daft Punk",
            "about": "French electronic music duo known for their robotic costumes and hits like 'One More Time'.",
            "country_code": "FR",
            "image": "https://example.com/images/daftpunk.jpg",
            "slug": "daft-punk",
            "social_media": [
                {
                    "type": "soundcloud",
                    "url": "https://soundcloud.com/daftpunk"
                }
            ]
        },
        {
            "name": "Deadmau5",
            "about": "Canadian DJ and music producer known for wearing a large mouse helmet during performances.",
            "country_code": "CA",
            "image": "https://example.com/images/deadmau5.jpg",
            "social_media": [
                {
                    "type": "spotify",
                    "url": "https://open.spotify.com/artist/deadmau5"
                }
            ]
        },
        {
            "name": "Skrillex",
            "about": "American DJ and producer known for popularizing dubstep, with hits like 'Scary Monsters and Nice Sprites'.",
            "country_code": "US",
            "social_media": [
                {
                    "type": "instagram",
                    "url": "https://instagram.com/skrillex"
                }
            ]
        },
        {
            "name": "Diplo",
            "about": "American DJ and record producer, one of the creators of Major Lazer.",
            "country_code": "US",
            "social_media": [
                {
                    "type": "soundcloud",
                    "url": "https://soundcloud.com/diplo"
                }
            ]
        },
        {
            "name": "Tiesto",
            "about": "Dutch DJ and record producer known for his trance music and spectacular live shows.",
            "country_code": "NL",
            "slug": "tiesto",
            "social_media": [
                {
                    "type": "spotify",
                    "url": "https://open.spotify.com/artist/tiesto"
                }
            ]
        },
        {
            "name": "Avicii",
            "about": "Swedish DJ and music producer known for hits like 'Levels' and 'Wake Me Up'.",
            "country_code": "SE",
            "image": "https://example.com/images/avicii.jpg",
            "social_media": [
                {
                    "type": "instagram",
                    "url": "https://instagram.com/avicii"
                }
            ]
        },
        {
            "name": "Calvin Harris",
            "about": "Scottish DJ, record producer, singer, and songwriter known for numerous hits and collaborations.",
            "country_code": "GB",
            "social_media": [
                {
                    "type": "soundcloud",
                    "url": "https://soundcloud.com/calvinharris"
                }
            ]
        },
        {
            "name": "Zedd",
            "about": "Russian-German DJ and music producer known for his clarity of sound and precision in electronic music production.",
            "country_code": "DE",
            "social_media": [
                {
                    "type": "instagram",
                    "url": "https://instagram.com/zedd"
                }
            ]
        },
        {
            "name": "Kaskade",
            "about": "American DJ and record producer known for his contributions to the progressive house scene.",
            "country_code": "US",
            "social_media": [
                {
                    "type": "spotify",
                    "url": "https://open.spotify.com/artist/kaskade"
                }
            ]
        },
        {
            "name": "Kygo",
            "about": "Norwegian DJ known for popularizing Tropical House and his piano-based compositions.",
            "country_code": "NO",
            "image": "https://example.com/images/kygo.jpg",
            "social_media": [
                {
                    "type": "instagram",
                    "url": "https://instagram.com/kygo"
                }
            ]
        },
        {
            "name": "Dillon Francis",
            "about": "American electronic musician, record producer, and DJ known for his moombahton music.",
            "country_code": "US",
            "social_media": [
                {
                    "type": "soundcloud",
                    "url": "https://soundcloud.com/dillonfrancis"
                }
            ]
        },
        {
            "name": "Alesso",
            "about": "Swedish DJ and record producer known for his energetic dance music and numerous EDM hits.",
            "country_code": "SE",
            "image": "https://example.com/images/alesso.jpg",
            "social_media": [
                {
                    "type": "spotify",
                    "url": "https://open.spotify.com/artist/alesso"
                }
            ]
        },
        {
            "name": "Marshmello",
            "about": "American electronic music producer and DJ known for wearing a custom helmet resembling a marshmallow.",
            "country_code": "US",
            "slug": "marshmello",
            "social_media": [
                {
                    "type": "instagram",
                    "url": "https://instagram.com/marshmello"
                }
            ]
        },
        {
            "name": "Flume",
            "about": "Australian record producer and musician known for his unique style of electronic and experimental music.",
            "country_code": "AU"
        },
        {
            "name": "The Chainsmokers",
            "about": "American electronic DJ and production duo known for their hit singles like 'Closer' and 'Don't Let Me Down'.",
            "country_code": "US",
            "image": "https://example.com/images/thechainsmokers.jpg",
            "social_media": [
                {
                    "type": "instagram",
                    "url": "https://instagram.com/thechainsmokers"
                }
            ]
        },
        {
            "name": "Martin Garrix",
            "about": "Dutch DJ and record producer known for his chart-topping electronic dance music tracks.",
            "country_code": "NL",
            "slug": "martin-garrix",
            "social_media": [
                {
                    "type": "soundcloud",
                    "url": "https://soundcloud.com/martin-garrix"
                }
            ]
        }
    ]
}
