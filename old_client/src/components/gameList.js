import stalker from '../img/stalker.webp';
import gta from '../img/gta.webp';
import skyrim from '../img/skyrim.jpg';
import spider from '../img/spider.webp';
import little from '../img/little.jpg';
import red from '../img/red.jpg';
import payback from '../img/payback.jpg';
import horizon from '../img/horizon.webp';
import fz from '../img/fz.jpg';
import mb from '../img/mb.jpg';
import rev from '../img/rev.jpg';
import detfc from '../img/detfc.webp';


const gamelist = [
    {
        name: 'Stalker Shadow of Chernobyl',
        price: 50,
        image: stalker,
        tag: ['All', 'Action'],
        platform: ['PC'],
    },
    {
        name: 'GTA 5',
        price: 60,
        image: gta,
        tag: ['All', 'Racing', 'Action'],
        platform: ['PC', ' ', 'PS4'],
    },
    {
        name: 'The Elder Scrolls V Skyrim',
        price: 40,
        image: skyrim,
        tag: ['All', 'Action', 'RPG'],
        platform: ['PC', ' ', 'PS4'],
    },
    {
        name: 'Spider-Man: Miles Morales',
        price: 55,
        image: spider,
        tag: ['All', 'Adventure', 'Action'],
        platform: ['PC', ' ', 'PS4', ' ', 'PS5'],
    },
    {
        name: 'Little Nightmares 2',
        price: 43,
        image: little,
        tag: ['All', 'Adventure'],
        platform: ['PC', ' ', 'PS5'],
    },
    {
        name: 'Red Dead Redemption 2',
        price: 45,
        image: red,
        tag: ['All', 'Adventure', 'Action'],
        platform: ['PC', ' ', 'PS5'],
    },
    {
        name: 'Need for Speed Payback',
        price: 49,
        image: payback,
        tag: [ 'All','Racing', 'Arcade'],
        platform: ['PC', ' ', 'PS4'],
    },
    {
        name: 'Horizon Zero Dawn Complete Edition',
        price: 69,
        image: horizon,
        tag: ['All', 'Action', 'Adventure', 'RPG'],
        platform: ['PC', ' ', 'PS4', ' ', 'PS5'],
    },
    {
        name: 'Resident Evil 8 Village',
        price: 25,
        image: rev,
        tag: ['All', 'Action'],
        platform: ['PC', ' ', 'PS4'],
    },
    {
        name: 'Forza Horizon 5',
        price: 30,
        image: fz,
        tag: ['All', 'Racing', 'Arcade'],
        platform: ['PC', ' ', 'PS4'],
    },
    {
        name: 'Mount & Blade 2 Bannerlord',
        price: 20,
        image: mb,
        tag: ['All', 'Action', 'RPG'],
        platform: ['PC'],
    },
    {
        name: 'Disco Elysium The Final Cut',
        price: 48,
        image: detfc,
        tag: ['All', 'Action', 'RPG'],
        platform: ['PC'],
    },
]

export default gamelist;