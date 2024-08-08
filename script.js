let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon;
let fighting;
let monsterHealth
let inventory = ['stick'];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText');

//Health constants
const healAmount = 10;
const healthPrice = 10;
const maxHealth = 100;

//Weapon constants
const weapons = [
    {
        name: "stick",
        power: 5,
        price: 0
    },
    {
        name: "dagger",
        power: 30,
        price: 50
    },
    {
        name: "giant sword",
        power: 50,
        price: 250
    },
    {
        name: "dark claymore",
        power: 100,
        price: 1500
    }
];

const locations = [
    {
        name: "town square",
        "button text": ['Go to store', 'Go to cave', 'fightDragon'],
        "button functions": [goStore, goCave, fightDragon],
        text: 'You are in the town square. You see a sign that says \"store\".'
    },
    {
        name: "store",
        "button text": [`Buy ${healAmount} health (${healthPrice} gold)`, 'Upgrade weapon (30 gold)', 'Go to town square'],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ['Fight slime', 'Fight fanged beast', 'Go to town square'],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    }
];

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}
function goTown() {
    update(locations[0])
}

function goStore() {
    update(locations[1])
}

function goCave() {
    update(locations[2])
}

function fightSlime() {
    console.log("Fighting slime.")
}

function fightBeast() {
    console.log("Fighting beast.")
}

function fightDragon() {
    console.log("Fighting dragon.")
}

function buyHealth() {
    if (gold >= healthPrice && health <= maxHealth - healAmount)
    {
        gold -= healthPrice;
        health += healAmount;
    }
    else if (health = maxHealth)
    {
        text.innerText = "You have reached the health limit."
    }
    else if (gold < healthPrice)
    {
        text.innerText = "You have insufficient funds."
    }
    else if (health < maxHealth)
    {
        health = maxHealth
    }
    goldText.innerText = gold;
    healthText.innerText = health;
}

function buyWeapon() {

}