import EnemyType from "./enemyType";
import {Landscape} from "../Geo/landscape";
import {RewardType} from "./reward";

const WHITE_BEAR = new EnemyType("Белый медведь", 2, Landscape.icedesert, RewardType.organ)
const ANGRY_PENGUIN = new EnemyType("Злобный пингвин", 1, Landscape.icedesert, RewardType.ingredient)

const LEECH = new EnemyType("Пиявка", 1, Landscape.swamp)
const BAGNIC = new EnemyType("Багник", 3, Landscape.swamp, RewardType.ingredient,  RewardType.money)

const BANDIT = new EnemyType("Бандит", 2, Landscape.forest, RewardType.money, RewardType.clothes)
const BEAR = new EnemyType("Медведь", 2, Landscape.forest, RewardType.organ)

const SKELETON = new EnemyType("Скелет", 2, Landscape.cave, RewardType.clothes)
const MUSHROOM = new EnemyType("Гриб", 1, Landscape.cave, RewardType.organ)

export const ENEMIES: Array<EnemyType> = [
    WHITE_BEAR,
    ANGRY_PENGUIN,
    LEECH,
    BAGNIC,
    BANDIT,
    BEAR,
    SKELETON,
    MUSHROOM
]

// создать список противников
// этап боя
// входные параметры для генерации
// несколько биомов для монстра


// цель не может покинуть локацию из-за врагов
// цель заблудилась в локации, враги просто встретились
// враги взяли цель в плен, нужно освободить
// отшельник здесь живет
// ученый-исследователь локации

// враждебность локации
//