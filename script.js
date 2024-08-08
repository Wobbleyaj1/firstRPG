let fighting;
let monsterHealth;

const healAmount = 10;
const healthPrice = 10;
const maxHealth = 100;

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

//Map locations
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
        "button text": ['Fight slime', 'Fight beast', 'Go to town square'],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ['Attack', 'Dodge', 'Run'],
        "button functions": [attack, dodge, goTown],
        text: 'You encounter a monster.'
    }
];

//Entities
let human = {
        xp: 1,
        gold: 50,
        health: 100,
        damage: 0
    }

const monsters = [
    {
        name: "Slime",
        health: 25,
        level: 1,
        damage: 5
    },
    {
        name: "Beast",
        health: 100,
        level: 10,
        damage: 15
    },
    {
        name: "Dragon",
        health: 1500,
        level: 100,
        damage: 45
    }
];

//Weapons
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
let maxWeapon = weapons.length - 1;

// #region initialize buttons
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
// #endregion

// #region Warp functions
function goTown() {
    update(locations[0])
}

function goStore() {
    update(locations[1])
}

function goCave() {
    update(locations[2])
}

function goFight(){
    update(locations[3])
}
// #endregion

// #region Fight functions
function fightSlime() {
    fighting = 0;
    prepFight();
}

function fightBeast() {
    fighting = 1;
    prepFight();
}

function fightDragon() {
    fighting = 2;
    prepFight();
}

function prepFight() {
    goFight();
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    human.damage = (1 + Math.log(human.xp)) * weapons[currentWeapon].power;
}

function attack() {
    text.innerText = `You attack it with your ${weapons[currentWeapon].name} and deal ${human.damage} damage.`;
    monsterHealth -= human.damage;
    if (monsterHealth <= 0)
    {
        monsterHealthText.innerText = 0;
        human.xp += monsters[fighting].level;
        human.gold += (monsters[fighting].level * (getRandomInt(5)));
        defeatMonster();
    }
    else
    {
        monsterHealthText.innerText = monsterHealth;
    }
    text.innerText += `\nThe ${monsters[fighting].name} attacks.`;
    human.health -= monsters[fighting].damage;
    if (human.health <= 0)
    {
        healthText.innerText = 0;
        gameOver();
    }
    else
    {
        healthText.innerText = human.health;
    }

}

function dodge() {
    
}
// #endregion

// #region Shop functions
function buyHealth() {
    if (human.gold >= healthPrice && human.health <= maxHealth - healAmount)
    {
        human.gold -= healthPrice;
        human.health += healAmount;
    }
    else if (human.health = maxHealth)
    {
        text.innerText = "You have reached the health limit."
    }
    else if (human.gold < healthPrice)
    {
        text.innerText = "You have insufficient funds."
    }
    else if (human.health < maxHealth)
    {
        human.health = maxHealth
    }
    goldText.innerText = human.gold;
    healthText.innerText = human.health;
}

function upgradeWeapon() {
    if (currentWeapon == maxWeapon)
    {
        text.innerText = "You already have the best weapon in the lands."
    }
    else if (human.gold < weapons[currentWeapon + 1].price)
    {
        text.innerText = "You have insufficient funds."
    }
    else
    {
        currentWeapon++;
        text.innerText = `You have upgraded your weapon to a ${weapons[currentWeapon].name}`;
        human.gold -= weapons[currentWeapon].price;
        goldText.innerText = human.gold;
    }
}
// #endregion

// #region Helper functions
    function getRandomInt(max) {
        return Math.floor(Math.random() * (max - 1)) + 1;
    }
// #endregion

// This is a new branch off of origin