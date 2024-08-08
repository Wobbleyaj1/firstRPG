let xp = 0;
let gold = 50;
let fighting;
let monsterHealth;

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

//Health variables
const healAmount = 10;
const healthPrice = 10;
const maxHealth = 100;
let health = 100;

//Weapon variables
const weapons = [
    {
        name: "Stick",
        power: 5,
        price: 0
    },
    {
        name: "Livid Dagger",
        power: 30,
        price: 30
    },
    {
        name: "Giant sword",
        power: 50,
        price: 250
    },
    {
        name: "Dark Claymore",
        power: 100,
        price: 1500
    }
];
let currentWeapon = 0;
let maxWeapon = 3;

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
        "button functions": [buyHealth, upgradeWeapon, goTown],
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

function upgradeWeapon() {
    if (currentWeapon == maxWeapon)
    {
        text.innerText = "You already have the best weapon in the lands."
    }
    else if (gold < weapons[currentWeapon + 1].price)
    {
        text.innerText = "You have insufficient funds."
    }
    else
    {
        currentWeapon++;
        text.innerText = `You have upgraded your weapon to a ${weapons[currentWeapon].name}`;
        gold -= weapons[currentWeapon].price;
        goldText.innerText = gold;
    }
}

// This is a new branch off of origin