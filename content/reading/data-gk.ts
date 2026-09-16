/**
 * 悦读馆内容包（高中高考）——由 scripts/reading/generate-content.mjs 按蓝图生成，
 * 内容全部自产，请勿手工编辑本文件；改蓝图后重新生成。
 */

import type { ReadingRegion, ReadingRegionSet, ReadingStory } from "./types";

export const REGION_SET: ReadingRegionSet = {
  track: "gaokao",
  theme: "racing",
  cnLabel: "悦读馆 · 高考",
  regions: [
  {
    "id": "gk-r1",
    "name": "Nature & Science",
    "cnName": "自然与科学",
    "icon": "🌍",
    "storyCount": 14
  },
  {
    "id": "gk-r2",
    "name": "Tech & Society",
    "cnName": "科技与社会",
    "icon": "🛰️",
    "storyCount": 14
  },
  {
    "id": "gk-r3",
    "name": "Humanities",
    "cnName": "人文历史",
    "icon": "🏛️",
    "storyCount": 13
  },
  {
    "id": "gk-r4",
    "name": "Health & Life",
    "cnName": "健康生活",
    "icon": "🫀",
    "storyCount": 13
  },
  {
    "id": "gk-r5",
    "name": "Education & Growth",
    "cnName": "教育与成长",
    "icon": "🎓",
    "storyCount": 12
  },
  {
    "id": "gk-r6",
    "name": "Business & Economy",
    "cnName": "商业与经济",
    "icon": "📈",
    "storyCount": 12
  },
  {
    "id": "gk-r7",
    "name": "Future Visions",
    "cnName": "未来思考",
    "icon": "🔮",
    "storyCount": 12
  }
],
};

export const STORIES: ReadingStory[] = [
  {
    "id": "gk-r1-s01",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 1,
    "title": "The Ocean's Invisible Forest",
    "titleCn": "海洋里看不见的森林",
    "coverEmoji": "🌊",
    "paragraphs": [
      {
        "text": "Standing on a beach, you may think that the ocean is simply a vast sheet of blue water. In fact, it is filled with billions of tiny plants, which drift near the surface and are far too small to see. Few people ever notice them.",
        "translation": "站在海滩上，你也许会觉得海洋不过是一大片蓝色的水。事实上，它里面充满了数以十亿计的微小植物，它们漂浮在海面附近，小得根本看不见。很少有人会注意到它们。"
      },
      {
        "text": "Scientists call these microscopic plants phytoplankton. Like trees on land, they use sunlight to make their own food, taking carbon dioxide from the water and releasing oxygen. Drifting with currents, they travel thousands of kilometres, forming what researchers describe as an invisible forest.",
        "translation": "科学家把这些微小的植物称为浮游植物。就像陆地上的树木一样，它们利用阳光制造自己的食物，从水中吸收二氧化碳并释放出氧气。它们随洋流漂移，能行进数千公里，形成了研究者所说的“看不见的森林”。"
      },
      {
        "text": "Although each cell is tiny, the total mass of phytoplankton is enormous. The fact that they produce about half of the oxygen on Earth surprises many people. Every second breath you take, scientists say, comes from the sea rather than from a forest.",
        "translation": "尽管每一个细胞都很小，浮游植物的总质量却极为庞大。它们制造出地球上大约一半的氧气，这一事实让许多人感到惊讶。科学家说，你每吸两口气，就有一口来自海洋，而不是来自森林。"
      },
      {
        "text": "These plants also play a key role in the climate, which is why scientists watch them closely. Absorbing carbon dioxide from the atmosphere, they help to keep our planet cooler. When they die, some of them sink to the deep ocean, carrying carbon away from the air for centuries.",
        "translation": "这些植物在气候中也起着关键作用，正因如此，科学家密切地关注着它们。它们吸收大气中的二氧化碳，帮助我们的星球保持凉爽。当它们死亡时，其中一些会沉入深海，把碳从空气中带走，长达数百年之久。"
      },
      {
        "text": "Warming water, however, may weaken this system, because hotter oceans hold fewer of the nutrients that phytoplankton need. Protecting these invisible forests is therefore not just about saving the sea; it is about protecting the air we all breathe.",
        "translation": "然而，变暖的海水可能会削弱这一系统，因为更热的海水所含的、浮游植物所需的养分更少。因此，保护这些看不见的森林不仅仅是在拯救海洋，更是在保护我们大家所呼吸的空气。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, where does about half of the oxygen on Earth come from?",
        "audioText": "According to the passage, where does about half of the oxygen on Earth come from?",
        "options": [
          {
            "emoji": "🌲",
            "value": "forest",
            "text": "Forests on land"
          },
          {
            "emoji": "🌊",
            "value": "sea",
            "text": "Tiny plants in the sea"
          },
          {
            "emoji": "🏔️",
            "value": "mountain",
            "text": "High mountains"
          }
        ],
        "answer": "sea"
      },
      {
        "type": "word_builder",
        "word": "oxygen",
        "audioText": "oxygen"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Scientists",
          "call",
          "these",
          "microscopic",
          "plants",
          "phytoplankton"
        ],
        "audioText": "Scientists call these microscopic plants phytoplankton."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Few",
          "people",
          "ever",
          "notice",
          "them"
        ],
        "audioText": "Few people ever notice them."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Drifting with ___, they travel thousands of kilometres, forming what researchers describe as an invisible forest.",
        "choices": [
          "currents",
          "clouds",
          "ships"
        ],
        "answer": "currents",
        "audioText": "Drifting with currents, they travel thousands of kilometres, forming what researchers describe as an invisible forest."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Warming water, however, may weaken this system, because hotter oceans hold fewer of the ___ that phytoplankton need.",
        "choices": [
          "nutrients",
          "colours",
          "sounds"
        ],
        "answer": "nutrients",
        "audioText": "Warming water, however, may weaken this system, because hotter oceans hold fewer of the nutrients that phytoplankton need."
      }
    ]
  },
  {
    "id": "gk-r1-s02",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 2,
    "title": "The Hidden Network Under the Forest",
    "titleCn": "森林地下的隐秘网络",
    "coverEmoji": "🌳",
    "paragraphs": [
      {
        "text": "Beneath the soil of almost every forest lies a hidden network that few people ever notice. It is built from tiny threads of fungus, which wrap themselves around the roots of the trees. Joined together in this way, trees can share food and information with their distant neighbours. Scientists, who have studied these threads for many years, now call the whole system the 'wood wide web'.",
        "translation": "几乎每一片森林的土壤之下，都藏着一张很少有人会注意到的隐秘网络。它由极细的真菌丝构成，这些菌丝缠绕在树根上。以这种方式彼此相连之后，树木就能与远方的邻居分享养分和信息。多年来一直在研究这些菌丝的科学家，如今把整个系统称为“林中互联网”。"
      },
      {
        "text": "Fungi are neither plants nor animals, and they grow in the dark soil as long, thin threads. Searching for water and minerals, these long threads spread through the ground in every direction. When a thread finally meets a tree root, the two may form a close and useful partnership. The fungus receives sugar, which the tree makes in its leaves, and gives back water and minerals. The partnership clearly works in both directions.",
        "translation": "真菌既不是植物也不是动物，它们以细长丝状在黑暗的土壤里生长。为了寻找水分和矿物质，这些长丝向四面八方在土中蔓延。当一条菌丝最终遇到树根时，二者可能结成紧密而有益的伙伴关系。真菌获得糖分——那是树叶制造的——并回馈水分和矿物质。这种合作显然对双方都有好处。"
      },
      {
        "text": "Using this ancient partnership, trees can send each other several different kinds of useful help. A tree growing in deep shade may receive sugar from a taller and much stronger neighbour. When insects attack its leaves, a damaged tree can release chemicals that warn the others. Receiving the warning, nearby trees start to produce their own chemical defences in good time.",
        "translation": "借助这种古老的伙伴关系，树木之间可以传递好几种有用的帮助。生长在浓荫下的树，可能从更高更壮的邻居那里得到糖分。当昆虫啃食树叶时，受伤的树会释放化学物质，向其他树发出警告。收到警告后，附近的树会及时开始制造自己的化学防御。"
      },
      {
        "text": "The idea that forests act as one single living community has excited many people around the world. Some scientists, however, doubt the whole story, arguing that the evidence is still far too thin. The fact that trees share sugar in a laboratory does not prove they do so in the wild. More careful research, these experts say, is needed before we can accept the complete picture. The debate is far from settled.",
        "translation": "“森林是一个活的共同体”这一想法让世界各地许多人感到兴奋。不过，也有科学家对整个说法表示怀疑，认为证据仍然太薄弱。树木在实验室里分享糖分这一事实，并不能证明它们在野外也会这么做。这些专家表示，在我们可以接受完整结论之前，还需要更严谨的研究。这场争论远未定论。"
      },
      {
        "text": "Whatever the final answer may be, the hidden network reminds us of something truly important. Forests are not simply collections of separate trees, standing side by side in complete silence. Protecting just one tree, therefore, may mean protecting the whole system that lies beneath it. Understanding this web could change the way we care for the natural world around us.",
        "translation": "无论最终的答案是什么，这个隐秘的网络都提醒我们一件真正重要的事。森林并不只是一棵棵彼此分离、默默并排站立的树。因此，保护一棵树，也许就意味着保护它下方的一整套系统。理解这张网，可能会改变我们对待身边自然界的方式。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which picture shows what connects the trees underground?",
        "audioText": "Which picture shows what connects the trees underground?",
        "options": [
          {
            "emoji": "🧵",
            "value": "threads",
            "text": "Thin threads"
          },
          {
            "emoji": "🌰",
            "value": "seeds",
            "text": "Seeds"
          },
          {
            "emoji": "🍃",
            "value": "leaves",
            "text": "Leaves"
          }
        ],
        "answer": "threads"
      },
      {
        "type": "word_builder",
        "word": "network",
        "audioText": "network"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "partnership",
          "clearly",
          "works",
          "in",
          "both",
          "directions."
        ],
        "audioText": "The partnership clearly works in both directions."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "debate",
          "is",
          "far",
          "from",
          "settled."
        ],
        "audioText": "The debate is far from settled."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Joined together in this way, trees can share food and ___ with their distant neighbours.",
        "choices": [
          "information",
          "direction",
          "pollution"
        ],
        "answer": "information",
        "audioText": "Joined together in this way, trees can share food and information with their distant neighbours."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The fungus receives ___, which the tree makes in its leaves, and gives back water and minerals.",
        "choices": [
          "sugar",
          "salt",
          "sand"
        ],
        "answer": "sugar",
        "audioText": "The fungus receives sugar, which the tree makes in its leaves, and gives back water and minerals."
      }
    ]
  },
  {
    "id": "gk-r1-s03",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 3,
    "title": "The Cooling Power of City Trees",
    "titleCn": "城市树木的降温力量",
    "coverEmoji": "🌳",
    "paragraphs": [
      {
        "text": "On a hot summer afternoon, the temperature in a city center can be several degrees higher than in the nearby countryside. Scientists call this difference the urban heat island effect, which grows stronger as cities expand. Caused mainly by dark roads and buildings that soak up sunlight, it makes city summers increasingly uncomfortable.",
        "translation": "在炎热的夏日午后，市中心的温度可能比附近的乡村高出好几度。科学家把这种差异称为城市热岛效应，随着城市不断扩张，这种效应也愈发明显。它主要由吸收阳光的深色道路和建筑物造成，使城市的夏天越来越难熬。"
      },
      {
        "text": "Trees offer one of the simplest solutions. Standing between the sun and the ground, a large tree can block much of the sunlight before it warms the streets below. Its leaves also release water into the air, a process that cools the surroundings just as sweat cools our skin.",
        "translation": "树木为这个问题提供了最简单的解决办法之一。一棵大树站在太阳和地面之间，能在阳光把下方的街道晒热之前挡住大部分光线。它的叶子还会向空气中释放水分，这一过程会让周围变凉，就像汗水让我们皮肤变凉一样。"
      },
      {
        "text": "Beyond cooling the air, trees improve city life in several other important ways. They trap tiny dust particles, which would otherwise pass into our lungs. Their roots also help rainwater sink into the soil instead of flooding the busy streets. The fact that a single healthy tree can support hundreds of insects and birds shows how much wildlife depends on these green neighbors.",
        "translation": "除了给空气降温，树木还在其他几个重要方面改善着城市生活。它们能吸附微小的尘粒，否则这些尘粒就会进入我们的肺里。树根还能帮助雨水渗入土壤，而不是让繁忙的街道积水。一棵健康的树能为数百只昆虫和鸟类提供栖息之所，这一事实说明野生动物多么依赖这些绿色的邻居。"
      },
      {
        "text": "However, planting trees is not as easy as it sounds. Young trees need years of watering and protection before they can cool a street, and many die in their first summers. Encouraged by new research, some cities are now choosing native species that survive heat and drought far better than foreign ones do.",
        "translation": "然而，种树并不像听起来那么容易。幼树需要多年的浇水和保护才能为街道降温，许多树在第一个夏天就死掉了。在新研究的推动下，一些城市如今正在选择那些比外来树种更能耐热耐旱的本土树种。"
      },
      {
        "text": "For ordinary citizens, the message is quite simple. Supporting local tree projects, we can all help our cities stay cooler and greener. A city that plants for the future is a city that truly cares about the people living in it.",
        "translation": "对普通市民来说，这个信息相当简单。支持本地的植树项目，我们就能帮助城市保持更凉爽、更绿意盎然。毕竟，一座为未来种树的城市，才是一座真正关心居住其中的人们的城市。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, which of these helps cool the air around a tree?",
        "audioText": "According to the text, which of these helps cool the air around a tree?",
        "options": [
          {
            "emoji": "💧",
            "value": "water",
            "text": "Water released by its leaves"
          },
          {
            "emoji": "🔥",
            "value": "heat",
            "text": "Heat stored in the road"
          },
          {
            "emoji": "🧱",
            "value": "bricks",
            "text": "Bricks used in buildings"
          }
        ],
        "answer": "water"
      },
      {
        "type": "word_builder",
        "word": "drought",
        "audioText": "drought"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Trees",
          "offer",
          "one",
          "of",
          "the",
          "simplest",
          "solutions."
        ],
        "audioText": "Trees offer one of the simplest solutions."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "For",
          "ordinary",
          "citizens,",
          "the",
          "message",
          "is",
          "quite",
          "simple."
        ],
        "audioText": "For ordinary citizens, the message is quite simple."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Scientists call this difference the urban heat island ___.",
        "choices": [
          "effect",
          "affect",
          "effort"
        ],
        "answer": "effect",
        "audioText": "Scientists call this difference the urban heat island effect."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ by new research, some cities are now choosing native species.",
        "choices": [
          "Encouraged",
          "Encouraging",
          "Encourage"
        ],
        "answer": "Encouraged",
        "audioText": "Encouraged by new research, some cities are now choosing native species."
      }
    ]
  },
  {
    "id": "gk-r1-s04",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 4,
    "title": "The Great Green Wall",
    "titleCn": "绿色长城",
    "coverEmoji": "🌳",
    "paragraphs": [
      {
        "text": "The Sahara, which stretches across the north of Africa, is the largest hot desert on Earth. For decades, scientists have watched it creep southward, turning farmland into dry and dusty ground. Faced with this problem, African leaders came together in 2007 and agreed on a bold plan. The idea was simple: build a wall of trees across the continent.",
        "translation": "撒哈拉沙漠横贯非洲北部，是地球上最大的热带沙漠。几十年来，科学家们眼看着它缓缓向南推进，把农田变成干燥多尘的土地。面对这一问题，非洲各国领导人于2007年齐聚一堂，商定了一项大胆的计划。这个想法很简单：在整个非洲大陆上种起一道树墙。"
      },
      {
        "text": "The Great Green Wall is not a wall in the usual sense. It is a wide band of trees and grass, stretching about 8,000 kilometers from west to east. The belief that trees can stop the desert is at the heart of the project. Working together, farmers plant trees that hold water in the soil and protect crops from strong winds.",
        "translation": "绿色长城并不是通常意义上的墙。它是一条宽阔的树木和草地，自西向东绵延约8000公里。树木能够阻止沙漠扩张，这一信念正是该项目的核心。农民们合力种下树木，这些树能把水分留在土壤中，并保护庄稼不受强风侵袭。"
      },
      {
        "text": "Progress has been slower than many people hoped. Some young trees died because of drought. Money was not always enough. However, the news that millions of trees have already been planted gives people hope. Local people, who once cut trees for firewood, now care for them as a source of food and income.",
        "translation": "进展比许多人期望的要慢。一些幼苗因干旱而枯死，资金也常常不足。不过，已有数百万棵树被种下的消息给人们带来了希望。当地居民过去砍树当柴烧，如今却把这些树当作食物和收入的来源来悉心照料。"
      },
      {
        "text": "The benefits go far beyond farming. Trees cool the air, so the land around them becomes less hot. Shade provided by new trees helps animals survive the dry season. Surprised by the change, some villagers say that birds and insects have returned to places where they had disappeared.",
        "translation": "这些好处远不止于农业。树木能降低气温，因此周围的土地不再那么炎热。新树投下的阴凉帮助动物度过旱季。一些村民对这种变化感到惊讶，他们说鸟和昆虫已经回到了曾经消失的地方。"
      },
      {
        "text": "The project is far from finished, and experts warn that trees alone cannot solve every problem. Yet the Great Green Wall shows what people can achieve when they share a common purpose. Greening the desert is slow work. Still, it may leave a greener world for the next generation.",
        "translation": "这一项目远未完成，专家也提醒说，仅靠树木无法解决所有问题。但绿色长城展示了当人们拥有共同目标时能够取得的成就。绿化沙漠是一项缓慢的工程。不过，它也许能为下一代留下一个更绿的世界。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is the Great Green Wall actually made of?",
        "audioText": "What is the Great Green Wall actually made of?",
        "options": [
          {
            "emoji": "🌳",
            "value": "trees",
            "text": "Trees and grass"
          },
          {
            "emoji": "🧱",
            "value": "bricks",
            "text": "Bricks and stones"
          },
          {
            "emoji": "🌊",
            "value": "water",
            "text": "Rivers and lakes"
          }
        ],
        "answer": "trees"
      },
      {
        "type": "word_builder",
        "word": "drought",
        "audioText": "drought"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Some",
          "young",
          "trees",
          "died",
          "because",
          "of",
          "drought"
        ],
        "audioText": "Some young trees died because of drought."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Greening",
          "the",
          "desert",
          "is",
          "slow",
          "work"
        ],
        "audioText": "Greening the desert is slow work."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The Sahara, ___ stretches across the north of Africa, is the largest hot desert on Earth.",
        "choices": [
          "which",
          "who",
          "what"
        ],
        "answer": "which",
        "audioText": "The Sahara, which stretches across the north of Africa, is the largest hot desert on Earth."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Faced ___ this problem, African leaders came together in 2007 and agreed on a bold plan.",
        "choices": [
          "with",
          "by",
          "of"
        ],
        "answer": "with",
        "audioText": "Faced with this problem, African leaders came together in 2007 and agreed on a bold plan."
      }
    ]
  },
  {
    "id": "gk-r1-s05",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 5,
    "title": "The Tree That Keeps a Diary",
    "titleCn": "会写日记的树",
    "coverEmoji": "🌳",
    "paragraphs": [
      {
        "text": "Look at the cut surface of a tree trunk, and you will notice a series of rings spreading from the centre. Each ring marks one year of growth, which makes the trunk a natural diary. Growing in a wet, warm summer, a tree adds a wide ring; facing a cold, dry season, it adds a narrow one. These patterns, hidden in the wood, have recorded the weather for centuries.",
        "translation": "看一看树干被锯开的截面，你会注意到一圈圈从中心向外扩散的纹路。每一圈代表一年的生长，这让树干成了一本天然的日记。遇上湿润温暖的夏天，树就长出一圈宽纹；面对寒冷干燥的季节，它就长出一圈窄纹。这些藏在木质里的纹路，已经记录了数百年的天气。"
      },
      {
        "text": "Scientists who study these rings work like detectives. The idea that a tree keeps a record of rainfall is not new, but modern methods are far more exact. Measuring the width of each ring, researchers can date a piece of wood to the very year. This skill, developed over the past century, now supports many other fields.",
        "translation": "研究这些年轮的科学家像侦探一样工作。树木会记录降雨量，这个想法并不新鲜，但现代方法要精确得多。通过测量每一圈年轮的宽度，研究人员能把一块木头确定到具体年份。这项在过去一百年里发展起来的技能，如今支撑着许多其他领域。"
      },
      {
        "text": "A ring that is unusually narrow may point to a year of drought, when the tree struggled to grow. Reading hundreds of rings together, scientists have rebuilt the climate of the past two thousand years. Builders and historians also depend on this method, since the wood in an old roof can tell its own age.",
        "translation": "如果某一圈年轮窄得反常，那可能意味着那一年发生了干旱，树木长得很艰难。把成百上千圈年轮放在一起解读，科学家重建了过去两千年的气候。建筑者和历史学家也依赖这种方法，因为老屋顶上的木料能说出自己的年纪。"
      },
      {
        "text": "Sometimes the story becomes dramatic. After a huge volcano sends dust into the sky, the following summer is cool and grey, so the ring for that year stays thin. Such marks, found in trees on several continents, help us date ancient volcanoes. Known as 'frost rings', they are like special notes in the diary.",
        "translation": "有时，这本日记里的故事会变得很戏剧化。一座巨大的火山把尘埃送入天空后，接下来那个夏天又冷又阴暗，于是那一年的年轮就很薄。这些在几大洲的树木中都能找到的痕迹，帮助我们确定古代火山喷发的时间。它们被称为“霜轮”，就像是日记里特别的批注。"
      },
      {
        "text": "Today the diaries are still being written. As the climate changes, new rings are adding pages that no one has read yet. Whether the coming rings will be wide or narrow depends partly on us, because the air around every tree is shaped by the choices we make.",
        "translation": "今天，这些日记仍在被书写。随着气候变化，新的年轮正在增添还没有人读过的页面。未来的年轮是宽是窄，部分取决于我们，因为每棵树周围的空气，都由我们做出的选择塑造。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what appears on the cut surface of a tree trunk?",
        "audioText": "According to the text, what appears on the cut surface of a tree trunk?",
        "options": [
          {
            "emoji": "⭕",
            "value": "rings",
            "text": "Rings spreading from the centre"
          },
          {
            "emoji": "➖",
            "value": "lines",
            "text": "Straight parallel lines"
          },
          {
            "emoji": "🔺",
            "value": "triangles",
            "text": "Sharp triangles"
          }
        ],
        "answer": "rings"
      },
      {
        "type": "word_builder",
        "word": "diary",
        "audioText": "diary"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Each",
          "ring",
          "marks",
          "one",
          "year",
          "of",
          "growth"
        ],
        "audioText": "Each ring marks one year of growth."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sometimes",
          "the",
          "story",
          "becomes",
          "dramatic"
        ],
        "audioText": "Sometimes the story becomes dramatic."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Growing in a wet, warm summer, a tree ___ a wide ring.",
        "choices": [
          "adds",
          "removes",
          "hides"
        ],
        "answer": "adds",
        "audioText": "Growing in a wet, warm summer, a tree adds a wide ring."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The idea ___ a tree keeps a record of rainfall is not new.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "The idea that a tree keeps a record of rainfall is not new."
      }
    ]
  },
  {
    "id": "gk-r1-s06",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 6,
    "title": "Why Desert Nights Turn Cold",
    "titleCn": "沙漠之夜为何寒冷",
    "coverEmoji": "🏜️",
    "paragraphs": [
      {
        "text": "Most people picture a desert as a place of burning sand and endless afternoon heat. Yet the same landscape, once the sun goes down, may become surprisingly cold within hours. Travellers, having packed only thin shirts, often spend the night shivering beside their small tents. This dramatic change, which happens in almost every dry region on Earth, has a simple scientific explanation.",
        "translation": "大多数人把沙漠想象成一片烈日炙烤、热浪不断的沙地。然而同一片土地，一旦太阳落下，几小时内就可能变得出奇地寒冷。只带了薄衬衫的旅行者，常常整夜缩在小小的帐篷旁瑟瑟发抖。这种几乎发生在地球上每一片干旱地区的剧烈变化，其实有着简单的科学解释。"
      },
      {
        "text": "Deserts contain very little water, and water is what controls temperature in most places on Earth. During the day, the dry ground absorbs a huge amount of energy from the sunlight. When evening comes, that energy should be released back into the air, warming the land slowly. Dry air, however, holds almost no water vapour, the gas that usually traps heat near the surface. Without this natural blanket, the warmth simply escapes into space very quickly.",
        "translation": "沙漠中几乎没有水，而在地球上大多数地方，正是水在调节气温。白天，干燥的地面从阳光中吸收巨大的能量。到了傍晚，这些能量本应重新释放到空气中，使地面慢慢变暖。然而干燥的空气几乎不含水蒸气——这种通常把热量留在地表附近的气体。少了这层天然的“毯子”，热量很快就直接散逸到太空中去了。"
      },
      {
        "text": "The sky above a desert is usually cloudless, which makes the loss of heat even faster. Clouds act like a roof. They reflect some warmth back to the ground below, keeping the night air slightly warmer. Knowing this, scientists can explain why a cloudy night in the desert feels less cold than a clear one. Sand and rock, having little water inside them, also cool down faster than wet soil. As a result, the temperature may fall by twenty degrees or more within a few hours.",
        "translation": "沙漠上空的天空通常没有云，这让热量的散失更加迅速。云层就像屋顶。它们会把一部分热量反射回下方的地面，使夜里的空气稍微暖和一些。明白了这一点，科学家就能解释为什么沙漠里多云的夜晚没有晴朗的夜晚那么冷。沙子和岩石内部含水极少，因此也比潮湿的土壤降温更快。结果，气温可能在几个小时内下降二十度甚至更多。"
      },
      {
        "text": "This daily cycle, a fact that local animals have long understood, shapes life in the desert. Many small creatures, avoiding the midday heat, sleep deep underground during the day. Others come out only after sunset. By then, the air is cool and comfortable. The idea that deserts are simply hot places is therefore far from the whole truth. Understanding this, we can see deserts as places of extreme change, not endless heat.",
        "translation": "这种昼夜循环——当地动物早已了解的事实——塑造着沙漠中的生命。许多小动物为了避开正午的酷热，白天在深深的地下睡觉。另一些则只在日落后才出来活动。那时空气凉爽舒适。因此，“沙漠只是炎热之地”这种想法远非全部真相。理解了这一点，我们就能把沙漠看作极端变化之地，而不只是无尽的炎热。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, which kind of sky helps a desert lose heat faster?",
        "audioText": "According to the text, which kind of sky helps a desert lose heat faster?",
        "options": [
          {
            "emoji": "🌙",
            "value": "clear",
            "text": "A clear, cloudless sky"
          },
          {
            "emoji": "☁️",
            "value": "cloudy",
            "text": "A sky full of clouds"
          },
          {
            "emoji": "🌧️",
            "value": "rainy",
            "text": "A rainy, stormy sky"
          }
        ],
        "answer": "clear"
      },
      {
        "type": "word_builder",
        "word": "blanket",
        "audioText": "blanket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Clouds",
          "act",
          "like",
          "a",
          "roof"
        ],
        "audioText": "Clouds act like a roof."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Others",
          "come",
          "out",
          "only",
          "after",
          "sunset"
        ],
        "audioText": "Others come out only after sunset."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Dry air, however, holds almost no water ___, the gas that usually traps heat near the surface.",
        "choices": [
          "vapour",
          "oxygen",
          "dust"
        ],
        "answer": "vapour",
        "audioText": "Dry air, however, holds almost no water vapour, the gas that usually traps heat near the surface."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The idea ___ deserts are simply hot places is far from the whole truth.",
        "choices": [
          "that",
          "which",
          "whose"
        ],
        "answer": "that",
        "audioText": "The idea that deserts are simply hot places is far from the whole truth."
      }
    ]
  },
  {
    "id": "gk-r1-s07",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 7,
    "title": "A Sunbeam's Long Journey",
    "titleCn": "一束阳光的漫长旅程",
    "coverEmoji": "☀️",
    "paragraphs": [
      {
        "text": "Every morning, sunlight reaches your face after a journey of about eight minutes. That light, however, began as energy deep inside the sun, where the temperature reaches fifteen million degrees.",
        "translation": "每天早上，阳光在经历了大约八分钟的旅程后照到你的脸上。然而，那束光最初只是太阳深处的一股能量，而那里的温度高达一千五百万度。"
      },
      {
        "text": "In the sun's core, simple atoms join together to form heavier ones. Joining together, they release huge amounts of energy. This energy first appears as invisible rays. These rays, which carry far more power than the light we can see, cannot travel far at first.",
        "translation": "在太阳的核心，简单的原子彼此结合，形成更重的原子。在结合的过程中，它们释放出巨大的能量。这种能量最初以看不见的射线形式出现。这些射线携带的力量远远超过我们肉眼能看到的光，因此一开始它们走不了多远。"
      },
      {
        "text": "The journey outward is slow. Surrounded by thick layers of gas, a single ray strikes one atom after another. Bouncing from atom to atom, the energy may take a hundred thousand years to reach the surface.",
        "translation": "向外走的这段旅程十分缓慢。被厚厚的燃气层包围着，一束射线只能撞上一个又一个原子。就这样在原子之间弹来弹去，这股能量也许要花上十万年才能到达太阳表面。"
      },
      {
        "text": "Once it reaches the surface, the light is free. Travelling through empty space at 300,000 kilometres per second, it covers the distance to Earth in just over eight minutes. This fact, that ancient energy arrives as fresh morning light, still surprises many students.",
        "translation": "一旦到达表面，光就自由了。它以每秒三十万千米的速度穿行于空旷的太空，用八分钟多一点的时间走完通往地球的路程。这个事实——古老的能源竟以清晨新鲜的阳光抵达我们身边——至今仍让许多学生感到惊讶。"
      },
      {
        "text": "So the next time you stand in the sun, remember the long story behind that warmth. Nothing arrives instantly, and even a simple sunbeam carries the memory of a journey longer than our species.",
        "translation": "所以，下次你站在阳光下时，请记住那份温暖背后漫长的故事。没有什么东西是瞬间到来的，即使是一束简单的阳光，也承载着一段比我们人类这一物种还要久远的旅程的记忆。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what travels through empty space and reaches Earth in just over eight minutes?",
        "audioText": "According to the text, what travels through empty space and reaches Earth in just over eight minutes?",
        "options": [
          {
            "emoji": "☀️",
            "value": "sunlight",
            "text": "Sunlight"
          },
          {
            "emoji": "🌙",
            "value": "moonlight",
            "text": "Moonlight"
          },
          {
            "emoji": "🌬️",
            "value": "wind",
            "text": "Wind"
          }
        ],
        "answer": "sunlight"
      },
      {
        "type": "word_builder",
        "word": "surface",
        "audioText": "surface"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "journey",
          "outward",
          "is",
          "slow."
        ],
        "audioText": "The journey outward is slow."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "energy",
          "first",
          "appears",
          "as",
          "invisible",
          "rays."
        ],
        "audioText": "This energy first appears as invisible rays."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ from atom to atom, the energy may take a hundred thousand years to reach the surface.",
        "choices": [
          "Bouncing",
          "Bounced",
          "To bounce"
        ],
        "answer": "Bouncing",
        "audioText": "Bouncing from atom to atom, the energy may take a hundred thousand years to reach the surface."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Travelling through empty space at 300,000 kilometres per second, it covers the distance to Earth in just over ___ minutes.",
        "choices": [
          "eight",
          "eighteen",
          "eighty"
        ],
        "answer": "eight",
        "audioText": "Travelling through empty space at 300,000 kilometres per second, it covers the distance to Earth in just over eight minutes."
      }
    ]
  },
  {
    "id": "gk-r1-s08",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 8,
    "title": "The Desert That Feeds a Forest",
    "titleCn": "喂养森林的沙漠",
    "coverEmoji": "🏜️",
    "paragraphs": [
      {
        "text": "Every year, the Sahara Desert, which covers much of northern Africa, lifts hundreds of millions of tons of dust into the sky. Driven by strong winds, this fine dust rises high above the ground and begins a long journey west. Within days, it reaches the Atlantic Ocean, where it can travel for weeks before touching land again.",
        "translation": "每年，覆盖北非大部分地区的撒哈拉沙漠都会把数亿吨沙尘扬入天空。在强风的推动下，这些细小的尘埃升到高空，开始向西的长途旅行。几天之内，它就抵达大西洋，而此后可能要在海上飘行数周才会再一次接触陆地。"
      },
      {
        "text": "This dust is not just sand. It is a mixture of minerals, including phosphorus, which green plants need in order to grow. Carried west by the trade winds, this dust crosses more than 2,500 kilometres of open ocean. Satellites have tracked these enormous clouds, showing that the journey takes about a week.",
        "translation": "这些尘埃并不只是沙子。它是多种矿物质的混合物，其中含有磷，而绿色植物需要磷才能生长。在信风的吹送下，这些尘埃向西越过两千五百多公里的开阔洋面。卫星追踪过这些巨大的尘云，显示这趟旅程大约需要一周时间。"
      },
      {
        "text": "When the dust finally falls, it lands on the Amazon rainforest, one of the wettest places on Earth. Here the soil is ancient and poor. The minerals in the dust act like a natural fertilizer, feeding plants that would otherwise struggle to survive. The fact that a distant desert helps to feed the world's largest rainforest surprises many people.",
        "translation": "当尘埃最终落下时，它落到了亚马孙雨林——地球上最湿润的地方之一。这里的土壤古老而贫瘠。尘埃中的矿物质就像天然肥料，滋养着那些本来难以存活的植物。一片遥远的沙漠竟然帮助养育着世界上最大的雨林，这一事实让许多人感到惊讶。"
      },
      {
        "text": "Researchers collect samples in both places, comparing African dust with rain water collected from the Amazon. They also use satellites, which can measure how much dust crosses the ocean in a single year. The two regions are closely linked.",
        "translation": "研究人员在两处采集样本，把非洲的尘埃与从亚马孙收集来的雨水进行比较。他们还借助卫星，卫星能够测量出每年有多少尘埃越过大洋。这两个地区紧密相连。"
      },
      {
        "text": "This connection reminds us that the planet works as a single system, where every part affects the others. Protecting the Amazon, therefore, may also depend on protecting the Sahara and the winds above it. If one region changes, the effects may be felt far away, in ways we are only beginning to understand.",
        "translation": "这种联系提醒我们：地球是一个整体系统，其中每一部分都影响着其他部分。因此，保护亚马孙也许同样有赖于保护撒哈拉以及它上空的风。如果一个地区发生变化，其影响可能会在很远的地方被感受到，而我们对这些影响才刚刚开始有所了解。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What carries the Saharan dust across the ocean?",
        "audioText": "What carries the Saharan dust across the ocean?",
        "options": [
          {
            "emoji": "💨",
            "value": "wind",
            "text": "Wind"
          },
          {
            "emoji": "🌊",
            "value": "current",
            "text": "Ocean current"
          },
          {
            "emoji": "☀️",
            "value": "sunlight",
            "text": "Sunlight"
          }
        ],
        "answer": "wind"
      },
      {
        "type": "word_builder",
        "word": "phosphorus",
        "audioText": "phosphorus"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "dust",
          "is",
          "not",
          "just",
          "sand."
        ],
        "audioText": "This dust is not just sand."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Here",
          "the",
          "soil",
          "is",
          "ancient",
          "and",
          "poor."
        ],
        "audioText": "Here the soil is ancient and poor."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Driven by strong winds, this fine dust ___ high above the ground and begins a long journey west.",
        "choices": [
          "rises",
          "falls",
          "stops"
        ],
        "answer": "rises",
        "audioText": "Driven by strong winds, this fine dust rises high above the ground and begins a long journey west."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The fact ___ a distant desert helps to feed the world's largest rainforest surprises many people.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "The fact that a distant desert helps to feed the world's largest rainforest surprises many people."
      }
    ]
  },
  {
    "id": "gk-r1-s09",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 9,
    "title": "The Ice That Keeps Ancient Air",
    "titleCn": "冰层里封存的远古空气",
    "coverEmoji": "🧊",
    "paragraphs": [
      {
        "text": "Far from any city, the ice sheets of Antarctica grow slowly, layer by layer, as snow falls and never melts. Each year adds a thin new sheet, which presses the older snow beneath it into solid ice. Buried in that ice are countless tiny bubbles, and inside them lies a sample of the ancient atmosphere. Each bubble holds a breath of ancient air. Together, they form a natural record of the planet's past.",
        "translation": "远离城市的南极冰盖，在积雪落下却永不融化的过程中，一层层缓慢增厚。每年都会多出一层薄薄的新雪，它把下面更古老的雪压成坚硬的冰。埋在那冰层中的，是无数微小的气泡，气泡里封存着一份远古大气的样本。每个气泡都含着一口远古的空气。它们共同构成了地球过去的天然记录。"
      },
      {
        "text": "To read this record, scientists drill deep into the ice and pull out long cylinders called cores. Working in temperatures far below zero, they cut each core into sections and send the pieces to laboratories. There the trapped air is released and measured, which gives researchers a direct view of gases from hundreds of thousands of years ago. The evidence that carbon dioxide and temperature rise and fall together has become one of the clearest results in climate science.",
        "translation": "为了读懂这份记录，科学家向冰层深处钻孔，取出被称为冰芯的长柱状样本。他们在远低于零度的环境里工作，把每根冰芯切成小段，再把这些样品送进实验室。在那里，被封住的气体被释放并测量，这为研究者打开了一扇直接观察数十万年前气体的窗口。二氧化碳与气温同升同降，这一证据已成为气候科学中最清晰的结论之一。"
      },
      {
        "text": "One core from East Antarctica, which reaches back more than 800,000 years, has changed how we understand the climate. During that long period, the Earth passed through eight ice ages and eight warm periods, none of which our species experienced. Surprisingly, the level of carbon dioxide stayed within a narrow range, rarely rising above about 300 parts per million. In other words, the air above us today is not the same as the air our ancestors knew.",
        "translation": "一根来自南极东部的冰芯可回溯到八十多万年前，它改变了我们对气候的认识。在那段漫长岁月里，地球经历了八次冰期和八个温暖期，而其中任何一个时期，我们人类都未曾经历。令人意外的是，二氧化碳的含量始终停留在很窄的范围内，极少超过百万分之三百左右。换句话说，今天在我们头顶的空气，已不同于我们祖先熟悉的那种空气。"
      },
      {
        "text": "Since the industrial age began, that figure has climbed past 420 parts per million, and it is still rising. Compared with the natural shifts recorded in the ice, the change is happening far too fast. Plants and animals now have very little time to adapt. Coastal communities, which depend on fishing and farming, are already noticing warmer seas and stranger weather.",
        "translation": "自工业时代开始以来，这个数字已攀升到百万分之四百二十以上，而且仍在上升。与冰芯中记录的自然变化相比，这次变化发生得实在太快了。动植物如今几乎没有时间适应。依赖捕鱼和耕作的沿海社区，已经开始察觉到更温暖的海洋和更反常的天气。"
      },
      {
        "text": "Knowing what happened in the past, researchers can make better predictions about the future. The ice does not tell us what we should do, but it shows clearly what happens when the air changes quickly. Silent and frozen, it keeps a story that we have only begun to read.",
        "translation": "了解了过去发生过什么，研究者就能对未来作出更准确的预测。冰层不会告诉我们该做什么，但它清楚地显示出：当空气迅速变化时会发生什么。它沉默而冰冷，保存着一个我们才刚刚开始阅读的故事。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what do scientists pull out of the ice?",
        "audioText": "According to the text, what do scientists pull out of the ice?",
        "options": [
          {
            "emoji": "🧊",
            "value": "cylinder",
            "text": "A long cylinder of ice"
          },
          {
            "emoji": "💧",
            "value": "water",
            "text": "A bottle of water"
          },
          {
            "emoji": "🪨",
            "value": "rock",
            "text": "A piece of rock"
          }
        ],
        "answer": "cylinder"
      },
      {
        "type": "word_builder",
        "word": "atmosphere",
        "audioText": "atmosphere"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Each",
          "bubble",
          "holds",
          "a",
          "breath",
          "of",
          "ancient",
          "air"
        ],
        "audioText": "Each bubble holds a breath of ancient air."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "change",
          "is",
          "happening",
          "far",
          "too",
          "fast"
        ],
        "audioText": "The change is happening far too fast."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ in that ice are countless tiny bubbles.",
        "choices": [
          "Buried",
          "Burying",
          "To bury"
        ],
        "answer": "Buried",
        "audioText": "Buried in that ice are countless tiny bubbles."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "To read this record, scientists drill deep into the ice and pull out long ___ called cores.",
        "choices": [
          "cylinders",
          "bubbles",
          "layers"
        ],
        "answer": "cylinders",
        "audioText": "To read this record, scientists drill deep into the ice and pull out long cylinders called cores."
      }
    ]
  },
  {
    "id": "gk-r1-s10",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 10,
    "title": "The Dust That Feeds a Rainforest",
    "titleCn": "喂养雨林的尘埃",
    "coverEmoji": "🏜️",
    "paragraphs": [
      {
        "text": "Every year, strong winds lift millions of tons of fine dust from the Sahara, the largest hot desert on Earth. Rising high into the air, this dust may travel for thousands of kilometres. Many people see it as a nuisance, for it dirties cars and darkens the sky. Scientists, however, have found that it carries something valuable.",
        "translation": "每年，强风从撒哈拉——地球上最大的炎热沙漠——卷起数百万吨细尘。这些尘埃升入高空，可以飘行数千公里。许多人把它看作一种麻烦，因为它弄脏汽车、遮暗天空。然而科学家发现，它携带着某种宝贵的东西。"
      },
      {
        "text": "Crossing the Atlantic Ocean, the dust finally reaches the Amazon, which is home to the largest rainforest on Earth. There it falls with the rain. The soil of the forest is surprisingly poor. The dust brings back the minerals that heavy rain has washed away over millions of years.",
        "translation": "尘埃横越整个大西洋，最终抵达亚马孙——地球上最大雨林的家园。在那里，它随雨水落下。这片森林的土壤贫瘠得令人意外。尘埃带回了数百万年来大雨冲走的矿物质。"
      },
      {
        "text": "The key mineral is phosphorus, which plants need in order to grow. The idea that a desert could feed a rainforest once seemed strange to many researchers. Today, however, satellite images have made the journey easy to follow. They show huge clouds of dust moving west. Such clouds are especially thick in spring, when the winds are strong.",
        "translation": "其中最关键的矿物质是磷，植物要靠它才能生长。沙漠竟然能供养一片雨林，这个想法一度让许多研究者觉得古怪。但如今，卫星图像让这段旅程变得容易追踪。它们显示出巨大的尘云向西移动。这类尘云在春季尤其浓密，那时风力很强。"
      },
      {
        "text": "The journey has another effect, which scientists are still studying. Some of the dust reflects sunlight, cooling the surface of the sea slightly. Other particles help clouds to form, changing rainfall patterns far from Africa. Given such complex links, researchers warn that the desert should not be treated as a useless place.",
        "translation": "这段旅程还有另一种效应，科学家仍在研究它。一部分尘埃反射阳光，使海面略微降温。另一些颗粒则有助于成云，改变着远离非洲的降雨格局。鉴于这些复杂的联系，研究者提醒我们，不该把沙漠当作无用之地。"
      },
      {
        "text": "Nature, it seems, keeps its accounts in unexpected ways. Having travelled across an entire ocean, a grain of sand from the Sahara may end up inside a leaf in Brazil. Understanding these connections helps us see the planet as one system, not a collection of separate parts.",
        "translation": "看来，大自然记账的方式出人意料。在横越整片海洋之后，一粒来自撒哈拉的沙，也许最终会落进巴西的一片叶子里。理解这些联系，有助于我们把地球看成一个完整的系统，而不是若干孤立部分的集合。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, which journey does the dust make?",
        "audioText": "According to the text, which journey does the dust make?",
        "options": [
          {
            "emoji": "🏜️➡️🌳",
            "value": "desert_rainforest",
            "text": "From a desert to a rainforest"
          },
          {
            "emoji": "🌊➡️🏔️",
            "value": "ocean_mountain",
            "text": "From an ocean to a mountain"
          },
          {
            "emoji": "🌙➡️⭐",
            "value": "moon_star",
            "text": "From the moon to a star"
          }
        ],
        "answer": "desert_rainforest"
      },
      {
        "type": "word_builder",
        "word": "minerals",
        "audioText": "minerals"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "soil",
          "of",
          "the",
          "forest",
          "is",
          "surprisingly",
          "poor."
        ],
        "audioText": "The soil of the forest is surprisingly poor."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "show",
          "huge",
          "clouds",
          "of",
          "dust",
          "moving",
          "west."
        ],
        "audioText": "They show huge clouds of dust moving west."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Every year, strong winds lift millions of tons of fine dust from the ___.",
        "choices": [
          "Sahara",
          "Amazon",
          "Atlantic"
        ],
        "answer": "Sahara",
        "audioText": "Every year, strong winds lift millions of tons of fine dust from the Sahara."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The key mineral is phosphorus, which plants need in order to ___.",
        "choices": [
          "grow",
          "travel",
          "reflect"
        ],
        "answer": "grow",
        "audioText": "The key mineral is phosphorus, which plants need in order to grow."
      }
    ]
  },
  {
    "id": "gk-r1-s11",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 11,
    "title": "The Lights Above the Poles",
    "titleCn": "极地上空的灯光",
    "coverEmoji": "🌌",
    "paragraphs": [
      {
        "text": "On a clear winter night, the dark sky suddenly fills with moving curtains of green and red light. Local people call this the aurora, a light show that has amazed humans for thousands of years. Though it looks like magic, the aurora is a scientific event, and its story begins 150 million kilometres away.",
        "translation": "在一个晴朗的冬夜，漆黑的天空突然布满一片片移动的绿色与红色光幕。当地人把它称作极光，一场让人类惊叹了数千年的光影表演。虽然它看上去像魔法，但极光其实是一种科学现象，而它的故事要从一亿五千万公里之外说起。"
      },
      {
        "text": "The sun constantly sends out a stream of charged particles, which we call the solar wind. Travelling at hundreds of kilometres per second, these particles reach the Earth in a few days. Luckily, our planet is protected by a magnetic field, which works like an invisible shield. The field guides them toward the poles.",
        "translation": "太阳不断向外抛射带电粒子流，我们称之为太阳风。这些粒子以每秒数百公里的速度飞行，几天后就会抵达地球。幸运的是，我们的星球被一个磁场保护着，它就像一面看不见的盾牌。磁场把这些粒子引向地球的两极。"
      },
      {
        "text": "High above the poles, these fast-moving particles crash into the thin gases of the upper atmosphere. Excited by the energy they receive, atoms of oxygen and nitrogen release that energy as light. Oxygen produces green and red. Nitrogen, on the other hand, usually adds blue and purple to the edges of the display. The exact colour depends on the height and the gas involved, so a single display may contain several shades.",
        "translation": "在两极高空，这些高速粒子撞上上层大气中稀薄的气体。氧原子和氮原子获得能量后受到激发，又把这份能量以光的形式释放出来。氧产生绿色和红色。而氮则通常给同一片光幕的边缘添上蓝色和紫色。具体的颜色取决于高度和所涉及的气体，因此一次极光可能包含好几种色调。"
      },
      {
        "text": "Scientists have long known that the aurora follows the activity of the sun. The fact that large solar storms create brighter auroras helps researchers predict them a day or two ahead. Such storms can also disturb satellites, radio signals and power lines. That is why space weather forecasts now matter to everyone, from airlines to phone companies.",
        "translation": "科学家早就知道，极光与太阳的活动有关。大型太阳风暴会带来更明亮的极光，这一事实帮助研究人员提前一两天做出预测。这类风暴还会干扰卫星、无线电信号和电力线路。正因如此，太空天气预报如今对每个人都变得重要，从航空公司到电话公司都不例外。"
      },
      {
        "text": "For most travellers, however, the aurora is simply a beautiful sight that is worth waiting for. Standing in the cold, many people say they finally understand how small our planet really is. The lights remind us that the Earth and the sun are connected, and that space itself is full of motion.",
        "translation": "不过对大多数旅行者来说，极光只是一道值得等待的美丽风景。站在寒冷中，许多人说他们终于明白我们的星球有多么渺小。这束光提醒我们：地球与太阳是相连的，而太空本身也充满运动。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what colour does nitrogen add to the aurora?",
        "audioText": "According to the text, what colour does nitrogen add to the aurora?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "word_builder",
        "word": "magnetic",
        "audioText": "magnetic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "field",
          "guides",
          "them",
          "toward",
          "the",
          "poles."
        ],
        "audioText": "The field guides them toward the poles."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Oxygen",
          "produces",
          "green",
          "and",
          "red."
        ],
        "audioText": "Oxygen produces green and red."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Excited by the energy they receive, atoms of oxygen and nitrogen release that energy as ___.",
        "choices": [
          "light",
          "heat",
          "noise"
        ],
        "answer": "light",
        "audioText": "Excited by the energy they receive, atoms of oxygen and nitrogen release that energy as light."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Travelling at hundreds of kilometres per second, these ___ reach the Earth in a few days.",
        "choices": [
          "particles",
          "shadows",
          "signals"
        ],
        "answer": "particles",
        "audioText": "Travelling at hundreds of kilometres per second, these particles reach the Earth in a few days."
      }
    ]
  },
  {
    "id": "gk-r1-s12",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 12,
    "title": "The Seeds That Sleep for Centuries",
    "titleCn": "沉睡百年的种子",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Most people think of a seed as something small and simple, yet it is really a tiny survival machine. Wrapped in a hard coat, a seed can wait for years before it starts to grow at all. While it rests, its life processes slow down almost to a stop, which helps it live through hard times.",
        "translation": "多数人把种子看作又小又简单的东西，其实它是一台微型的生存机器。种子裹在坚硬的种皮里，可以等上好几年才开始发芽。在它休眠的时候，体内的生命活动几乎慢到停止，这帮助它熬过艰难的时期。"
      },
      {
        "text": "Scientists call this long sleep dormancy, a state in which a seed uses almost no energy. Seeds buried in cold soil can stay alive through winters, droughts and even fires. The hard coat keeps water out, and this simple barrier decides when growth can safely begin.",
        "translation": "科学家把这种长时间的睡眠叫做休眠，即一种几乎不消耗能量的状态。埋在寒冷土壤里的种子，可以熬过冬天、干旱甚至火灾而存活。坚硬的种皮挡住水分，这层简单的屏障决定着生长何时才能安全开始。"
      },
      {
        "text": "Some seeds sleep far longer than anyone expected. In the frozen ground of Siberia, scientists found seeds buried for tens of thousands of years. The news that a seed could survive so long surprised the whole team. Carefully fed with warmth and water, one of the oldest seeds finally opened. It grew into a small white flower.",
        "translation": "有些种子沉睡的时间远比任何人预想的要长。在西伯利亚的冻土中，科学家发现了被埋藏数万年的种子。一颗种子竟能存活如此之久，这个消息让整个团队感到惊讶。在温暖和水的悉心照料下，其中一颗最古老的种子终于裂开了。它长成了一朵白色的小花。"
      },
      {
        "text": "Because such stories matter for our future, people have built seed banks around the world. The most famous one, which lies inside a mountain in Norway, holds more than a million samples. The idea that we might lose a useful crop forever worries many scientists today. If a disease or a drought destroys a harvest, farmers can ask for those seeds. Stored safely in the dark, they wait for the day when they are needed again.",
        "translation": "因为这类故事关系到我们的未来，人们已在世界各地建起了种子库。其中最著名的一座坐落在挪威的一座山体内部，保存着一百多万份种子样本。一想到我们可能永远失去某种有用的作物，许多科学家就深感忧虑。如果某种病害或干旱毁掉了一季收成，农民就可以申请取用那些种子。它们被安全地存放在黑暗中，等待再次被需要的那一天。"
      },
      {
        "text": "Seeds are therefore much more than food; they are small libraries of living time. Sleeping quietly in soil or in a frozen vault, they carry the past into the future. So the next time you see a seed, remember the quiet patience hidden inside it.",
        "translation": "所以种子远不只是食物，它们是一座座活着的时光图书馆。它们静静睡在土壤里或冰冷的种子库中，把过去带向未来。所以下次你看到一粒种子时，请记住藏在它里面的那份安静的耐心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what did one of the ancient seeds finally grow into?",
        "audioText": "According to the passage, what did one of the ancient seeds finally grow into?",
        "options": [
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "A small white flower"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tall tree"
          },
          {
            "emoji": "🌾",
            "value": "rice",
            "text": "A field of rice"
          }
        ],
        "answer": "flower"
      },
      {
        "type": "word_builder",
        "word": "survive",
        "audioText": "survive"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Some",
          "seeds",
          "sleep",
          "far",
          "longer",
          "than",
          "anyone",
          "expected."
        ],
        "audioText": "Some seeds sleep far longer than anyone expected."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "grew",
          "into",
          "a",
          "small",
          "white",
          "flower."
        ],
        "audioText": "It grew into a small white flower."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The hard coat keeps water ___, and this simple barrier decides when growth can safely begin.",
        "choices": [
          "out",
          "in",
          "off"
        ],
        "answer": "out",
        "audioText": "The hard coat keeps water out, and this simple barrier decides when growth can safely begin."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The news ___ a seed could survive so long surprised the whole team.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "The news that a seed could survive so long surprised the whole team."
      }
    ]
  },
  {
    "id": "gk-r1-s13",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 13,
    "title": "The Dunes That Sing",
    "titleCn": "会唱歌的沙丘",
    "coverEmoji": "🏜️",
    "paragraphs": [
      {
        "text": "Standing at the foot of a desert dune, travellers sometimes hear a strange low note, like a distant engine. The sound, produced by sliding sand, can last for several minutes and travel several kilometres. Local people have told stories about it for centuries, calling the dunes \"singing mountains\". Science, however, has only recently begun to explain how such a quiet landscape produces such a powerful sound.",
        "translation": "站在沙丘脚下，旅行者有时会听到一种奇怪的低音，像是远处传来的发动机声。这种由沙粒滑落产生的声音可以持续好几分钟，还能传出好几公里。几个世纪以来，当地一直在讲述关于它的故事，把那些沙丘称作“唱歌的山”。然而，科学直到最近才开始解释：如此安静的风景，怎么会发出如此洪亮的声音。"
      },
      {
        "text": "Sand dunes sing when dry grains slide down the steep, sheltered side of the dune. As the upper layer collapses, thousands of grains begin to move together, creating a steady vibration. This vibration then passes through the body of the dune, which acts like a natural loudspeaker. The result is a deep, steady note that can carry for several kilometres across the open desert.",
        "translation": "当干燥的沙粒沿着沙丘陡峭的背风一侧滑落时，沙丘就开始“唱歌”。随着表层崩塌，成千上万的沙粒开始一起移动，形成稳定的振动。这种振动随后穿过沙丘的丘体，而丘体就像一个天然的扩音器。结果便是低沉而稳定的音调，能在开阔的沙漠中传出好几公里。"
      },
      {
        "text": "The exact note that a dune produces depends on the size and shape of its grains. Scientists have found that dunes made of fine, well-rounded sand usually produce much lower sounds. The idea that the note comes from the surface layer alone has been carefully tested in the laboratory. When those grains are mixed with dust, however, the song becomes weaker or disappears altogether.",
        "translation": "沙丘发出的确切音高，取决于沙粒的大小和形状。科学家发现，由细小、圆润的沙粒构成的沙丘，发出的声音通常要低得多。而“这种声音只来自表层”的说法，已在实验室里得到仔细检验。不过，当这些沙粒混入尘土后，“歌声”就会变弱，甚至完全消失。"
      },
      {
        "text": "To study the phenomenon, researchers have climbed singing dunes in Morocco, China and the United States. Recording the sound with sensitive microphones, they measured both its frequency and its volume. Their results suggest that singing sand must be dry and clean, with a slightly damp layer below. Rain, strong wind and even human footsteps can silence a singing dune for several days.",
        "translation": "为了研究这一现象，研究人员攀登过摩洛哥、中国和美国的鸣沙丘。他们用灵敏的麦克风录下声音，测量了它的频率和音量。研究结果表明，会“唱歌”的沙子必须干燥、洁净，下面还得有一层略微潮湿的沙。降雨、强风，甚至人的脚步，都能让一座鸣沙丘沉默好几天。"
      },
      {
        "text": "Singing dunes remind us that the physical world still holds plenty of surprises for us. Although the sound had been reported for more than a thousand years, its true cause was explained only recently. For travellers, the experience remains unforgettable: a whole mountain of sand, humming like a living creature. Perhaps the lesson is simple — even grains of sand can speak to us, if we listen carefully enough.",
        "translation": "会唱歌的沙丘提醒我们：物质世界依然充满惊喜。尽管这种声音被记载了一千多年，但它真正的成因直到最近才得到解释。对旅行者而言，这种体验令人难忘：整整一座沙山，像活的生物一样低吟。也许道理很简单——只要用心倾听，连沙粒也能对我们说话。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the text, the sound of a singing dune is compared to which of the following?",
        "audioText": "In the text, the sound of a singing dune is compared to which of the following?",
        "options": [
          {
            "emoji": "🚂",
            "value": "engine",
            "text": "A distant engine"
          },
          {
            "emoji": "🌊",
            "value": "waves",
            "text": "Crashing waves"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A singing bird"
          }
        ],
        "answer": "engine"
      },
      {
        "type": "word_builder",
        "word": "vibration",
        "audioText": "vibration"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "thousands",
          "of",
          "grains",
          "begin",
          "to",
          "move",
          "together"
        ],
        "audioText": "Thousands of grains begin to move together."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "This vibration then passes through the body of the dune, ___ acts like a natural loudspeaker.",
        "choices": [
          "which",
          "who",
          "whose"
        ],
        "answer": "which",
        "audioText": "This vibration then passes through the body of the dune, which acts like a natural loudspeaker."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "song",
          "becomes",
          "weaker",
          "or",
          "disappears",
          "altogether"
        ],
        "audioText": "The song becomes weaker or disappears altogether."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The idea ___ the note comes from the surface layer alone has been carefully tested in the laboratory.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "The idea that the note comes from the surface layer alone has been carefully tested in the laboratory."
      }
    ]
  },
  {
    "id": "gk-r1-s14",
    "track": "gaokao",
    "regionId": "gk-r1",
    "order": 14,
    "title": "The Mountain That Is Still Growing",
    "titleCn": "仍在长高的山",
    "coverEmoji": "🏔️",
    "paragraphs": [
      {
        "text": "Mount Everest, which stands 8,849 metres above sea level, is the highest point on our planet. Surprisingly, this famous peak is still growing, rising by a few millimetres every single year. The fact that a mountain can slowly grow taller still surprises many people today.",
        "translation": "珠穆朗玛峰海拔8849米，是我们这个星球上的最高点。令人惊讶的是，这座著名的山峰至今仍在长高，每年上升几毫米。一座山竟能慢慢变高，这一事实今天仍让许多人感到意外。"
      },
      {
        "text": "Millions of years ago, the land that we now call India was a large island moving north. Pushing slowly into the Asian continent, it pressed the ground into huge folds. Lifted and folded over ages, the ancient seabed gradually became the Himalayas. Climbers can still find sea shells near the top, which shows that this rock once lay under water.",
        "translation": "数百万年前，我们如今称为印度的这片陆地是一个向北移动的大岛。它缓缓挤入亚洲大陆，把地面挤压成巨大的褶皱。经过漫长岁月被抬升、被折叠，古老的海床渐渐变成了喜马拉雅山脉。登山者至今仍能在接近峰顶的地方找到海贝壳，这说明这里的岩石曾经位于水下。"
      },
      {
        "text": "Scientists track this movement with satellites, which send signals down to fixed points on the rocks. Comparing the measurements year after year, they build a clear picture of the slow rise. The belief that the ground beneath our feet never moves has proved completely wrong.",
        "translation": "科学家用卫星追踪这一运动，卫星向岩石上固定的观测点发送信号。年复一年地比较这些测量数据，他们拼出了一幅缓慢抬升的清晰图景。认为我们脚下的地面永不移动，这个看法已被证明是完全错误的。"
      },
      {
        "text": "At the same time, wind, ice and rivers are wearing these mountains down. Carved by deep valleys and broken by winter frost, the peaks lose height almost as fast as they gain it. What we see today, therefore, is a balance between building and breaking.",
        "translation": "与此同时，风、冰和河流正在把这些山脉一点点削低。被深谷切割、被冬日的霜冻冻裂，山峰降低的速度几乎和它升高的速度一样快。因此，我们今天看到的，是建造与破坏之间的一种平衡。"
      },
      {
        "text": "This slow battle shapes far more than the landscape itself. Pushed upward, the mountains force the air to rise, which cools it and brings heavy rain. The monsoon, which waters much of South Asia, depends on the growth of the Himalayas. The idea that mountains and climate are separate systems is no longer accepted by scientists.",
        "translation": "这场缓慢的较量塑造的远不止地貌本身。被向上推起的山脉迫使空气上升，空气因此冷却并带来大雨。滋养南亚大片地区的季风，依赖于喜马拉雅山的生长。认为山脉与气候是两个互不相干的系统，这一想法已不再被科学家接受。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What can climbers still find near the top of the Himalayas?",
        "audioText": "What can climbers still find near the top of the Himalayas?",
        "options": [
          {
            "emoji": "🐚",
            "value": "shells",
            "text": "Sea shells"
          },
          {
            "emoji": "🌵",
            "value": "cactus",
            "text": "Desert plants"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Living fish"
          }
        ],
        "answer": "shells"
      },
      {
        "type": "word_builder",
        "word": "monsoon",
        "audioText": "monsoon"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Scientists",
          "track",
          "this",
          "movement",
          "with",
          "satellites"
        ],
        "audioText": "Scientists track this movement with satellites."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "ancient",
          "seabed",
          "gradually",
          "became",
          "the",
          "Himalayas"
        ],
        "audioText": "The ancient seabed gradually became the Himalayas."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The idea ___ mountains and climate are separate systems is no longer accepted by scientists.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "The idea that mountains and climate are separate systems is no longer accepted by scientists."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Climbers can still find sea shells near the top, ___ shows that this rock once lay under water.",
        "choices": [
          "which",
          "that",
          "who"
        ],
        "answer": "which",
        "audioText": "Climbers can still find sea shells near the top, which shows that this rock once lay under water."
      }
    ]
  },
  {
    "id": "gk-r2-s01",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 1,
    "title": "What Your Phone Knows About You",
    "titleCn": "你的手机知道些什么",
    "coverEmoji": "📱",
    "paragraphs": [
      {
        "text": "Every day, millions of small decisions are being made by software that most of us never notice. Your phone suggests a song, a shop, or a friend. It seems that these choices come from nowhere. In fact, they are produced by programs that study what you tap and where you pause. It is easy to forget that someone may be reading the same information about you.",
        "translation": "每一天，数以百万计的小决定正由我们大多数人从未留意的软件做出。你的手机会推荐一首歌、一家店，或者一个朋友。这些选择看上去像是凭空冒出来的。事实上，它们是由那些研究你点了什么、在哪里停顿的程序产生的。人们很容易忘记，某个地方的某个人也许正在读着关于你的同样的信息。"
      },
      {
        "text": "This kind of personal data has been collected for years, often without clear permission. Companies explain that the information is used to improve their services, and in many ways it truly is. Yet it is not always obvious whether the benefits are shared fairly with the people who provide the data. When a free app asks for your location, the real price may be hidden in rules that nobody reads.",
        "translation": "这类个人数据已经被收集了很多年，而且常常没有明确的许可。公司解释说，这些信息是被用来改进它们的服务的，而在许多方面，情况确实如此。然而，这些好处是否被公平地分享给了提供数据的人，这一点并不总是显而易见。当一款免费应用索要你的位置时，真正的代价可能就藏在那份没人会去读的规则里。"
      },
      {
        "text": "It is therefore important that young people learn to ask simple but powerful questions. Who owns the pictures that I upload? What happens to my messages after I delete them? Could my face be recognized in a crowd without my knowledge? Such questions are not about refusing technology, because they are really about understanding it. A citizen who knows how these systems work is much harder to fool.",
        "translation": "因此，年轻人学会提出简单却有力的问题就很重要了。我上传的照片归谁所有？我删掉的消息接下来会怎样？在人群里，没有我的知情，我的脸会被识别出来吗？这些问题并不是要拒绝技术，因为它们其实关乎理解技术。懂得这些系统如何运作的公民，要难被糊弄得多。"
      },
      {
        "text": "Governments and companies are now being asked to explain their rules more clearly. In some countries, new laws have been written to protect personal information. Companies that break these rules can be given heavy fines. It remains uncertain whether such protection will travel fast enough to catch up with the technology itself. Still, the direction seems right, and public pressure is part of the reason.",
        "translation": "政府和公司如今正被要求更清楚地解释它们的规则。在一些国家，新的法律已经被制定出来，用来保护个人信息。违反这些规则的公司可能被处以巨额罚款。这样的保护能否足够快地追上技术本身，仍不确定。不过，方向看起来是对的，而公众压力正是原因之一。"
      },
      {
        "text": "For all its problems, the digital world has given us tools that earlier generations could only dream of. The aim is not to fear it, but to shape it. If enough people ask what a machine is doing with their data, better answers will be demanded. That is how a fairer digital life is built, one question at a time.",
        "translation": "尽管有种种问题，数字世界还是给了我们前人只能梦想的工具。目的不是害怕它，而是塑造它。如果有足够多的人追问机器正拿他们的数据做什么，人们就会要求更好的答案。一个更公平的数字生活就是这样建立起来的——一次一个问题。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In paragraph 1, what do the programs study?",
        "audioText": "In paragraph one, what do the programs study?",
        "options": [
          {
            "emoji": "👆",
            "value": "taps",
            "text": "What you tap"
          },
          {
            "emoji": "😴",
            "value": "sleep",
            "text": "When you sleep"
          },
          {
            "emoji": "🍜",
            "value": "meals",
            "text": "What you eat"
          }
        ],
        "answer": "taps"
      },
      {
        "type": "word_builder",
        "word": "permission",
        "audioText": "permission"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "seems",
          "that",
          "these",
          "choices",
          "come",
          "from",
          "nowhere."
        ],
        "audioText": "It seems that these choices come from nowhere."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Who",
          "owns",
          "the",
          "pictures",
          "that",
          "I",
          "upload?"
        ],
        "audioText": "Who owns the pictures that I upload?"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "This kind of personal data has ___ collected for years, often without clear permission.",
        "choices": [
          "been",
          "being",
          "be"
        ],
        "answer": "been",
        "audioText": "This kind of personal data has been collected for years, often without clear permission."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It remains uncertain ___ such protection will travel fast enough to catch up with the technology itself.",
        "choices": [
          "whether",
          "what",
          "which"
        ],
        "answer": "whether",
        "audioText": "It remains uncertain whether such protection will travel fast enough to catch up with the technology itself."
      }
    ]
  },
  {
    "id": "gk-r2-s02",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 2,
    "title": "The Hidden Price of Free Apps",
    "titleCn": "免费应用的隐藏代价",
    "coverEmoji": "📱",
    "paragraphs": [
      {
        "text": "Almost every app on your phone is offered for free, and it is often assumed that this service costs nothing at all. However, a question that is being asked more frequently by researchers is whether free really means what we think it does. The user is the product. It is now widely accepted that personal information has become the currency which users pay with.",
        "translation": "你手机上的几乎每个应用都是免费提供给你的，人们也常常认为这项服务根本不花一分钱。然而，研究者们越来越频繁地提出的一个问题是：“免费”是否真的意味着我们所想的那样。用户就是产品。如今人们普遍接受，个人信息已经成了用户用来支付的货币。"
      },
      {
        "text": "Every time you open an app, small amounts of data are being collected in the background without any obvious signal. Where you are, what you search for, and how long you pause on a picture may all be recorded and later sold. It is not surprising that many users feel uneasy when they discover how detailed these records have become.",
        "translation": "每次你打开一个应用，都会有少量数据在后台被悄悄收集，没有任何明显的提示。你在哪里、你搜索什么、你在一张图片上停留多久，这些都可能被记录下来，并在之后被出售。许多用户发现这些记录竟如此详细时感到不安，这并不奇怪。"
      },
      {
        "text": "Companies usually explain that this information is needed to improve their products, and part of that claim is certainly true. Yet whether such collection should be allowed to continue unchecked is a matter that governments are now being forced to discuss. In several countries, new rules have been introduced so that users can see what is stored about them.",
        "translation": "公司通常解释说，这些信息是改进产品所必需的，而这种说法有一部分确实没错。然而，这种收集是否应该被允许不受约束地继续下去，是各国政府如今被迫要讨论的问题。在一些国家，新的规则已经被引入，以便用户能看到关于自己的哪些信息被储存了下来。"
      },
      {
        "text": "What matters most, perhaps, is that ordinary people start asking better questions about the tools they use every day. Being informed does not mean that you must abandon technology, but it means your choices should be made with clear eyes. When you understand what is really happening behind the screen, you are in a much stronger position.",
        "translation": "也许最重要的是，普通人开始就自己每天使用的工具提出更好的问题。知情并不意味着你必须放弃科技，但它意味着你的选择应该是在清醒的眼光下做出的。当你明白屏幕背后真正在发生什么时，你就处于一个更有力的位置。"
      },
      {
        "text": "None of this means that technology itself is the enemy, or that every company is acting in bad faith. It is simply being pointed out that convenience and privacy must be balanced, and that this balance is shaped by ordinary choices. Once lost, trust is hard to rebuild.",
        "translation": "这一切都不意味着科技本身就是敌人，也不意味着每家公司都在弄虚作假。我们只是想指出，便利与隐私必须取得平衡，而这种平衡是由一个个普通的选择塑造的。一旦失去，信任就很难重建。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what has become the currency that users pay with?",
        "audioText": "According to the passage, what has become the currency that users pay with?",
        "options": [
          {
            "emoji": "💰",
            "value": "money",
            "text": "Money"
          },
          {
            "emoji": "📊",
            "value": "info",
            "text": "Personal information"
          },
          {
            "emoji": "⏰",
            "value": "time",
            "text": "Time"
          }
        ],
        "answer": "info"
      },
      {
        "type": "word_builder",
        "word": "privacy",
        "audioText": "privacy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "user",
          "is",
          "the",
          "product"
        ],
        "audioText": "The user is the product."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Once",
          "lost",
          "trust",
          "is",
          "hard",
          "to",
          "rebuild"
        ],
        "audioText": "Once lost, trust is hard to rebuild."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Small amounts of data are ___ collected in the background without any obvious signal.",
        "choices": [
          "being",
          "been",
          "be"
        ],
        "answer": "being",
        "audioText": "Small amounts of data are being collected in the background without any obvious signal."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Yet ___ such collection should be allowed to continue unchecked is a matter that governments are being forced to discuss.",
        "choices": [
          "Whether",
          "What",
          "Which"
        ],
        "answer": "Whether",
        "audioText": "Yet whether such collection should be allowed to continue unchecked is a matter that governments are being forced to discuss."
      }
    ]
  },
  {
    "id": "gk-r2-s03",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 3,
    "title": "When AI Makes a Mistake",
    "titleCn": "当人工智能犯错时",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Every day, millions of small decisions are being made by machines instead of by human beings. Some programs decide who gets a job, who receives a loan, and even who is stopped by the police. Machines do not have feelings, so it is easy to say that a computer is always fair. However, a machine only repeats what it has been taught by the data of human beings.",
        "translation": "每一天，数以百万计的小决定正由机器而不是人来做出。有些程序决定谁能得到一份工作、谁能拿到贷款，甚至谁会被警察拦下。机器没有感情，所以人们很容易说电脑永远公正。然而，机器只是重复它从人类数据中被教给的东西。"
      },
      {
        "text": "Last year, a large company used a new system to read the applications of job hunters. The system had been trained on ten years of successful employees, so it learned to prefer certain schools and certain names. Hundreds of good applications were refused within seconds, and nobody in the office could explain why. What the program had really learned was not skill, but the old habits of the past.",
        "translation": "去年，一家大公司用一套新系统来阅读求职者的申请。这套系统曾用十年成功员工的数据进行训练，于是它学会了偏爱某些学校和某些名字。数百份优秀的申请在几秒钟内被拒绝，办公室里没人能解释为什么。这个程序真正学到的不是技能，而是过去的旧习惯。"
      },
      {
        "text": "It is not clear whether the company broke any law, because the rules were written before such systems appeared. Lawyers are now arguing about who should be blamed when a machine makes a wrong choice. Should the programmer be punished for the mistake, or should the manager who bought the software be responsible? Some people even ask whether the machine itself should be treated as the guilty one.",
        "translation": "目前还不清楚这家公司是否违法，因为相关规则早在这类系统出现之前就已写下。律师们正在争论：当机器做出错误选择时，该由谁来承担责任。程序员应该为这个错误受到惩罚吗？还是买下这款软件的经理该负责？甚至有人问，机器本身是否应该被当作有罪的一方。"
      },
      {
        "text": "Most experts agree that the answer cannot be found in a single sentence. A system can be tested again and again, but it cannot explain its own choices. After all, the system cannot be interviewed. What people really need is a clear record of every decision, so that mistakes can be found early. Some governments are now asking companies to explain how their programs work.",
        "translation": "多数专家认为，答案不是一句话就能找到的。一套系统可以反复测试，却无法解释自己的选择。毕竟，系统是无法被访谈的。人们真正需要的是每一次决定的清晰记录，这样错误才能被及早发现。一些国家的政府正要求公司解释它们的程序如何运作。"
      },
      {
        "text": "None of this means that AI should be thrown away, since it has already helped doctors and scientists in many ways. It simply means that we should not hand over everything to a program. A human must make the final decision. Whether we like it or not, machines will keep judging us, and it is our job to judge them in return.",
        "translation": "这一切并不意味着人工智能应该被抛弃，因为它已经在很多方面帮助了医生和科学家。它只是意味着，我们不该把所有事情都交给程序。最终的决定必须由人来做出。不管我们喜不喜欢，机器都会继续评判我们，而评判它们，正是我们的责任。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the company's new system learn to prefer?",
        "audioText": "What did the company's new system learn to prefer?",
        "options": [
          {
            "emoji": "🏫",
            "value": "school",
            "text": "Certain schools and names"
          },
          {
            "emoji": "🧠",
            "value": "skill",
            "text": "Real skills and experience"
          },
          {
            "emoji": "⏰",
            "value": "time",
            "text": "The working hours"
          }
        ],
        "answer": "school"
      },
      {
        "type": "word_builder",
        "word": "blamed",
        "audioText": "blamed"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "A",
          "human",
          "must",
          "make",
          "the",
          "final",
          "decision."
        ],
        "audioText": "A human must make the final decision."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "After",
          "all,",
          "the",
          "system",
          "cannot",
          "be",
          "interviewed."
        ],
        "audioText": "After all, the system cannot be interviewed."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It is not clear ___ the company broke any law.",
        "choices": [
          "whether",
          "that",
          "what"
        ],
        "answer": "whether",
        "audioText": "It is not clear whether the company broke any law."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The system had ___ trained on ten years of successful employees.",
        "choices": [
          "been",
          "be",
          "being"
        ],
        "answer": "been",
        "audioText": "The system had been trained on ten years of successful employees."
      }
    ]
  },
  {
    "id": "gk-r2-s04",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 4,
    "title": "The Quiet Decisions Behind Your Screen",
    "titleCn": "屏幕背后的无声决定",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Every time you open a video app, a quiet decision has already been made for you. The clips on your screen were chosen by a system that was trained on millions of earlier clicks. Nobody typed those rules by hand. The patterns were learned, stored and then used again the next morning.",
        "translation": "每当你打开一个视频应用，一个无声的决定早已替你做好了。你屏幕上的那些短片，是由一个系统挑选出来的，而这个系统是用数百万次早先的点击训练出来的。没有人用手写下那些规则。这些模式被学习、被储存，然后在第二天早上再次被使用。"
      },
      {
        "text": "This kind of automation is now being introduced into schools, hospitals and banks, where the stakes are much higher. A model may decide whether a student needs extra help or whether a loan should be refused. What worries researchers is not the technology itself but the human choices hidden inside it.",
        "translation": "这类自动化如今正被引入学校、医院和银行，而在这些地方，风险要高得多。一个模型可能决定一名学生是否需要额外帮助，也可能决定一笔贷款是否应被拒绝。让研究者担心的并不是技术本身，而是藏在其中的人的选择。"
      },
      {
        "text": "It is easy to assume that numbers are fair, yet data can carry old mistakes. If a hiring system has been fed years of unequal decisions, it may quietly repeat them. That is why testing teams are now asked to check not only how fast a model works but also whom it fails to serve.",
        "translation": "人们很容易以为数字是公平的，但数据可能带着旧的错误。如果一个招聘系统被喂进了多年不平等的决定，它可能会悄悄地把这些决定重复一遍。这就是为什么测试团队现在被要求检查的不只是一个模型运行得多快，还包括它没能服务到谁。"
      },
      {
        "text": "Privacy belongs in the same discussion, because personal data is the fuel that these systems run on. Much of that data was collected without any clear conversation with the people involved. It should be explained, in plain language, what is being kept, why it is needed and how long it will stay. When users understand the deal, they can give real permission instead of a careless click.",
        "translation": "隐私属于同一场讨论，因为个人数据正是这些系统赖以运转的燃料。其中大量数据是在没有与当事人进行任何清楚沟通的情况下被收集的。应该用平实的语言说明：哪些信息被保存下来、为什么需要它、它会保留多久。当用户理解了这笔交易，他们给出的才是真正的许可，而不是一次随手点击。"
      },
      {
        "text": "None of this means we should turn our backs on useful tools. It simply means that the questions must be asked early, while the code is still being written. Machines will keep making choices for us. What matters is whether we keep choosing the rules.",
        "translation": "这一切并不意味着我们应该背弃有用的工具。它只是意味着，这些问题必须在代码仍在被编写的时候就早早被提出。机器会继续替我们做选择。真正重要的是，我们是否继续在选择规则。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what was the system that chooses your video clips trained on?",
        "audioText": "According to the text, what was the system that chooses your video clips trained on?",
        "options": [
          {
            "emoji": "👆",
            "value": "clicks",
            "text": "Millions of earlier clicks"
          },
          {
            "emoji": "📚",
            "value": "books",
            "text": "Printed school books"
          },
          {
            "emoji": "🌦️",
            "value": "weather",
            "text": "Daily weather records"
          }
        ],
        "answer": "clicks"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It should be ___ in plain language what is being kept.",
        "choices": [
          "explained",
          "explaining",
          "explain"
        ],
        "answer": "explained",
        "audioText": "It should be explained in plain language what is being kept."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Nobody",
          "typed",
          "those",
          "rules",
          "by",
          "hand."
        ],
        "audioText": "Nobody typed those rules by hand."
      },
      {
        "type": "word_builder",
        "word": "privacy",
        "audioText": "privacy"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "What matters is ___ we keep choosing the rules.",
        "choices": [
          "whether",
          "that",
          "which"
        ],
        "answer": "whether",
        "audioText": "What matters is whether we keep choosing the rules."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Machines",
          "will",
          "keep",
          "making",
          "choices",
          "for",
          "us."
        ],
        "audioText": "Machines will keep making choices for us."
      }
    ]
  },
  {
    "id": "gk-r2-s05",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 5,
    "title": "When an Algorithm Says No",
    "titleCn": "当算法说“不”",
    "coverEmoji": "⚖️",
    "paragraphs": [
      {
        "text": "Every day, decisions that used to be made by people are now being made by software. An algorithm may decide whether you get a loan, a job interview or a place at a university. Most of us never meet the person who designed it, and we are rarely told why it said no. The answer simply arrives, and there is no one to argue with.",
        "translation": "每天，过去由人做出的决定如今正由软件做出。算法可能决定你能否获得贷款、得到面试机会或被大学录取。我们大多数人从未见过设计它的人，也很少被告知它为什么说了“不”。答案就这样到来，而你找不到任何人可以争辩。"
      },
      {
        "text": "These systems are trained on huge amounts of data that has been collected from our past behaviour. What they learn is not always fair, because the data itself may carry old unfairness. If a company has mostly hired one kind of worker, the program will simply repeat that pattern. It is easy to believe that a machine judges fairly, yet unfairness can be built in from the very beginning.",
        "translation": "这些系统是用从我们过去的行为中收集来的海量数据训练出来的。它们学到的东西并不总是公平的，因为数据本身可能带着旧有的不公。如果一家公司过去大多雇用某一类员工，程序就会简单地重复这种模式。人们很容易相信机器判断公正，然而不公可能从一开始就被编了进去。"
      },
      {
        "text": "When someone is refused, the reasons usually stay hidden. It is hard to know what went wrong, and even harder to prove it. The company often explains that the decision was made by a computer system, as if no one were responsible. This answer satisfies no one. A machine cannot explain itself, and the rules inside it are protected as business secrets. Whether the process is fair has become a question that courts are now being asked to answer.",
        "translation": "当有人被拒绝时，原因通常不会公开。人们很难知道哪里出了问题，更难去证明。公司往往解释说，这个决定是由电脑系统做出的，仿佛没有人需要负责。这样的回答谁也无法接受。机器无法解释自己，而它内部的规则又被当作商业秘密保护起来。这个流程是否公平，如今已成为法院被要求回答的问题。"
      },
      {
        "text": "Some governments have started to act. New laws require that people be told when a machine decides about them, and that they be given a chance to ask for a human review. Whether these rules will work is still unclear, but the direction certainly seems right. Responsibility cannot be downloaded into a program.",
        "translation": "一些政府已经开始行动。新法律要求：当机器对人做出决定时，必须告知当事人，并给他们机会要求人工复核。这些规定是否有效仍不清楚，但方向无疑是正确的。责任，终究无法被下载进程序里。"
      },
      {
        "text": "It is time to ask a simpler question: who actually benefits when nobody is blamed? If companies are allowed to hide behind their algorithms, public trust in technology will slowly disappear. The real test of a smart society is not how clever its machines are, but how honestly their limits are admitted.",
        "translation": "是时候问一个更简单的问题了：当没有人被追责时，究竟是谁获益？如果公司被允许躲在算法背后，公众对技术的信任将会慢慢消失。一个智慧社会真正的考验，不在于它的机器有多聪明，而在于人们有多坦诚地承认机器的局限。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what may an algorithm decide for you?",
        "audioText": "According to the passage, what may an algorithm decide for you?",
        "options": [
          {
            "emoji": "🏦",
            "value": "loan",
            "text": "A loan"
          },
          {
            "emoji": "🍔",
            "value": "lunch",
            "text": "Your lunch"
          },
          {
            "emoji": "🎵",
            "value": "song",
            "text": "A song"
          }
        ],
        "answer": "loan"
      },
      {
        "type": "word_builder",
        "word": "algorithm",
        "audioText": "algorithm"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "answer",
          "satisfies",
          "no",
          "one."
        ],
        "audioText": "This answer satisfies no one."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Responsibility",
          "cannot",
          "be",
          "downloaded",
          "into",
          "a",
          "program."
        ],
        "audioText": "Responsibility cannot be downloaded into a program."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Whether these rules will work ___ still unclear, but the direction certainly seems right.",
        "choices": [
          "is",
          "are",
          "be"
        ],
        "answer": "is",
        "audioText": "Whether these rules will work is still unclear, but the direction certainly seems right."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If companies are allowed to hide behind their algorithms, public ___ in technology will slowly disappear.",
        "choices": [
          "trust",
          "trouble",
          "truth"
        ],
        "answer": "trust",
        "audioText": "If companies are allowed to hide behind their algorithms, public trust in technology will slowly disappear."
      }
    ]
  },
  {
    "id": "gk-r2-s06",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 6,
    "title": "Who Taught the Machine to Judge?",
    "titleCn": "谁教会了机器去评判？",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Every day, quiet decisions are being made about us by software that few people ever see. These programs are said to decide which students get a place, who receives a loan, and who gets a job interview. It is easy to believe that a machine is fairer than a tired human, because numbers seem neutral. But is that really true? What a computer learns depends completely on the information that people have chosen to feed it.",
        "translation": "每天，都有一些悄无声息的判断由我们几乎看不见的软件替我们做出，而这些判断关乎每一个人。据说这些程序会决定哪些学生能获得录取名额、谁能拿到贷款、谁能得到面试机会。人们很容易相信，机器比疲惫的人更公正，因为数字看起来是中立的。但事实真的如此吗？计算机学到什么，完全取决于人们选择喂给它的信息。"
      },
      {
        "text": "If the past is unfair, the machine will copy that unfairness and repeat it at a much greater speed. A famous example has been discussed in many technology reports over the last few years. A large company built a tool to read job applications and pick the best ones. It had been trained on ten years of the company's own hiring records. Because most of those earlier workers were men, the system quietly learned to prefer male candidates. The tool may have been designed with good intentions, but nobody asked what it was really learning.",
        "translation": "如果过去是不公平的，机器就会复制这种不公平，并以快得多的速度把它重复下去。过去几年里，许多科技报道都讨论过一个著名的例子：一家大公司开发了一款工具，用来阅读求职申请并挑出最好的那些。它是用该公司自己十年的招聘记录训练出来的。由于早年的员工大多是男性，这套系统悄悄学会了偏爱男性应聘者。这款工具的设计初衷或许是好的，但没有人追问它究竟在学什么。"
      },
      {
        "text": "This is not a story about one bad company, and it is not really about computers at all. Whether a system is fair depends on the data it has been given and the goals it has been set. It is often said that technology is neutral, yet every choice made by designers is a value judgment. Someone decides what counts as a good worker, a good student, or a safe customer. Those decisions are then hidden inside code that ordinary people can never read.",
        "translation": "这并不是一个关于某家坏公司的故事，也根本不只是关于计算机。一个系统是否公平，取决于它被给予的数据和它被设定的目标。人们常说技术是中立的，然而设计者做出的每一个选择都是一种价值判断。总得有人来定义什么算好员工、好学生或安全客户。而这些判断随后就被藏进了普通人根本读不到的代码里。"
      },
      {
        "text": "What can be done about this problem is now being discussed in parliaments, schools, and living rooms. It is important that human beings stay in the loop and check the answers a machine gives. New rules are being written to demand explanations for choices that affect people's lives. Some companies have already promised to publish how their systems were built and tested. Whether such promises will be kept is a question we should keep asking.",
        "translation": "如何应对这一问题，如今正在议会、学校和客厅里被讨论着。重要的是，人必须留在流程之中，去核查机器给出的答案。新的规则正在被制定，要求对影响人们生活的判断作出解释。一些公司已经承诺公开其系统是如何被构建和测试的。这些承诺能否被遵守，是我们应当持续追问的问题。"
      },
      {
        "text": "None of this means that we should fear every new tool or refuse to use it. It means that we should ask better questions before we hand over our decisions. A machine can only repeat what it has been taught, so the real question is about us. What kind of world do we want our clever new helpers to copy?",
        "translation": "这一切并不意味着我们应当害怕每一件新工具，或者拒绝使用它。它意味着，在把自己的决定交出去之前，我们应当提出更好的问题。机器只能重复它被教过的东西，所以真正的问题其实关乎我们自己：我们希望这些聪明的新帮手去复制一个怎样的世界呢？"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the text, what did the company's hiring tool quietly learn to prefer?",
        "audioText": "In the text, what did the company's hiring tool quietly learn to prefer?",
        "options": [
          {
            "emoji": "👨",
            "value": "men",
            "text": "Male candidates"
          },
          {
            "emoji": "👩",
            "value": "women",
            "text": "Female candidates"
          },
          {
            "emoji": "🎓",
            "value": "students",
            "text": "Young students"
          }
        ],
        "answer": "men"
      },
      {
        "type": "word_builder",
        "word": "neutral",
        "audioText": "neutral"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Nobody",
          "asked",
          "what",
          "it",
          "was",
          "really",
          "learning"
        ],
        "audioText": "Nobody asked what it was really learning."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Those",
          "decisions",
          "are",
          "then",
          "hidden",
          "inside",
          "code"
        ],
        "audioText": "Those decisions are then hidden inside code."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "New rules are being ___ to demand explanations for choices that affect people's lives.",
        "choices": [
          "written",
          "writing",
          "wrote"
        ],
        "answer": "written",
        "audioText": "New rules are being written to demand explanations for choices that affect people's lives."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Whether such promises will be ___ is a question we should keep asking.",
        "choices": [
          "kept",
          "keeping",
          "keeps"
        ],
        "answer": "kept",
        "audioText": "Whether such promises will be kept is a question we should keep asking."
      }
    ]
  },
  {
    "id": "gk-r2-s07",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 7,
    "title": "Teaching Machines to Be Fair",
    "titleCn": "教机器学会公平",
    "coverEmoji": "⚖️",
    "paragraphs": [
      {
        "text": "Every day, quiet decisions are being made about us by software that we will never see. A bank may refuse a loan, or a company may reject a job applicant, because an algorithm has been trained on old records. Few people are ever told how these systems reach their conclusions. It seems that machines now judge us, yet almost nobody checks whether their judgments are fair.",
        "translation": "每天，一些悄无声息的决定正由我们永远看不到的软件替我们做出。银行可能拒绝一笔贷款，公司可能拒绝一位求职者，只因为某个算法是用旧记录训练出来的。很少有人被告知这些系统是如何得出结论的。看起来机器如今在评判我们，却几乎没有人去核查这些评判是否公平。"
      },
      {
        "text": "The problem is not that computers are evil. It is that they copy what they are shown. If past hiring was unfair to women, that unfairness will be learned and repeated by the new system. What the machine calls normal is simply what it has seen most often in the data.",
        "translation": "问题并不在于计算机本身邪恶，而在于它们会照抄自己被输入的东西。如果过去的招聘对女性不公平，这种不公平就会被新系统学会并重复。机器口中的“正常”，不过是它在数据里见得最多的东西。"
      },
      {
        "text": "Some companies are now trying to fix this, and new rules are being written in several countries. Data scientists are asked to test their models for bias before the software is released to the public. It is important that such checks should be repeated, because the society the system serves keeps changing.",
        "translation": "一些公司正在设法解决这个问题，若干国家也在制定新的规则。数据科学家被要求在软件向公众发布之前，先检测自己的模型是否存在偏见。重要的是，这样的检查应当反复进行，因为系统所服务的社会本身一直在变化。"
      },
      {
        "text": "But can fairness really be programmed? Whether a decision is fair depends on values that no data can contain. Someone has to decide, for example, how much weight should be given to past experience and how much to equal treatment. Those choices are human ones, and they should never be hidden deep inside code.",
        "translation": "可是公平真的能被编程实现吗？一个决定是否公平，取决于任何数据都无法包含的价值观。比如，必须由人来决定：过去的经验该占多大权重，平等对待又该占多大权重。这些选择属于人，它们绝不该被深藏在代码里。"
      },
      {
        "text": "Whether we like it or not, these systems will shape more of our lives every year. It is therefore up to us to ask uncomfortable questions and to demand clear answers. If machines are going to be taught to be fair, we should be the ones who say what fair means.",
        "translation": "无论我们愿不愿意，这些系统每年都会塑造我们生活中更多的部分。因此，提出让人不舒服的问题、要求清楚的答案，就成了我们自己的事。如果要教机器做到公平，那么说清楚“公平”是什么意思的人，应该是我们。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what is the real problem with computers that make decisions?",
        "audioText": "According to the text, what is the real problem with computers that make decisions?",
        "options": [
          {
            "emoji": "📋",
            "value": "copy",
            "text": "They copy unfair patterns from old records"
          },
          {
            "emoji": "⚡",
            "value": "speed",
            "text": "They make decisions far too quickly"
          },
          {
            "emoji": "💰",
            "value": "cost",
            "text": "They cost too much money to build"
          }
        ],
        "answer": "copy"
      },
      {
        "type": "word_builder",
        "word": "fairness",
        "audioText": "fairness"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "problem",
          "is",
          "not",
          "that",
          "computers",
          "are",
          "evil."
        ],
        "audioText": "The problem is not that computers are evil."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "But",
          "can",
          "fairness",
          "really",
          "be",
          "programmed?"
        ],
        "audioText": "But can fairness really be programmed?"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "New rules are being ___ in several countries.",
        "choices": [
          "written",
          "wrote",
          "writing"
        ],
        "answer": "written",
        "audioText": "New rules are being written in several countries."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Whether a decision is fair depends on ___ that no data can contain.",
        "choices": [
          "values",
          "voices",
          "versions"
        ],
        "answer": "values",
        "audioText": "Whether a decision is fair depends on values that no data can contain."
      }
    ]
  },
  {
    "id": "gk-r2-s08",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 8,
    "title": "When Your Face Becomes a Password",
    "titleCn": "当你的脸变成密码",
    "coverEmoji": "📸",
    "paragraphs": [
      {
        "text": "Last September, a large secondary school in the south of England replaced its library cards with a facial recognition system. Students simply look at a small camera, and the machine recognises their faces in about half a second. Nobody has to queue, and nobody has to remember a password that might easily be forgotten. The head teacher called the system a small change that saves everyone a little time every single day.",
        "translation": "去年九月，英格兰南部一所大型中学用面部识别系统取代了图书馆借书卡。学生只要看一眼前面那个小小的摄像头，机器就会在半秒左右认出他们的脸。没有人需要排队，也没有人需要去记一个很容易被忘掉的密码。校长把这一系统称为「一个每天为每个人省下一点时间的小改动」。"
      },
      {
        "text": "But behind that quick blink of a camera, something much larger is being built. Every face is turned into a long string of numbers, and those numbers are stored on a server somewhere. What is collected is not only the shape of a nose or the distance between two eyes. Details such as how often a student enters the building are also being recorded, and these records can be kept for years.",
        "translation": "但在摄像头那轻轻一闪的背后，某个庞大得多的东西正在被搭建起来。每一张脸都被转换成一长串数字，而这些数字被存放在某个服务器上。被收集的不只是鼻子的形状或两眼之间的距离。像一名学生多久进出一次教学楼这样的细节也会被记录下来，而这些记录可能被保存很多年。"
      },
      {
        "text": "Whether parents were properly asked for permission remains an open question. In many schools, students are simply told that the new system will be used from Monday, and no letter is sent home. What worries critics most is the silence that follows: once a face has been stored, it can never be taken back. Consent is rarely as clear as it sounds.",
        "translation": "家长是否被正式征求过同意，至今仍是一个悬而未决的问题。在许多学校里，学生只是被告知新系统从周一开始使用，而家里根本收不到任何通知信。最让批评者担忧的是随之而来的沉默：一张脸一旦被存下来，就再也无法收回。所谓「同意」，很少像听起来那么明确。"
      },
      {
        "text": "It is now widely accepted that personal data deserves legal protection, yet the rules differ from country to country. Some governments require that clear consent be given before any face is scanned. Others allow schools and shops to collect such information as long as a notice is placed near the door. This gap between countries is what makes the technology so difficult to control.",
        "translation": "如今人们普遍认同，个人数据理应受到法律保护，但各国的规则并不相同。有些政府要求在扫描任何一张脸之前必须先获得明确的同意；另一些则允许学校和商店收集这类信息，只要在门口贴一张告示即可。正是国家之间的这种差距，让这项技术如此难以管控。"
      },
      {
        "text": "None of this means that facial recognition should be thrown away completely. It can help a blind student find a seat, or let a busy hospital track who comes and goes. What matters is whether the people being watched know about it, and whether they can say no. A face is not a password. It cannot simply be reset.",
        "translation": "这一切并不意味着面部识别就该被彻底抛弃。它能帮一位盲人学生找到座位，也能让一家繁忙的医院掌握人员进出情况。真正重要的是：被拍摄的人是否知道这件事，以及他们能不能说不。脸不是密码。它没法被简单重置。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what is every face turned into before it is stored?",
        "audioText": "According to the text, what is every face turned into before it is stored?",
        "options": [
          {
            "emoji": "🔢",
            "value": "numbers",
            "text": "Numbers"
          },
          {
            "emoji": "🖼️",
            "value": "pictures",
            "text": "Pictures"
          },
          {
            "emoji": "🏷️",
            "value": "names",
            "text": "Names"
          }
        ],
        "answer": "numbers"
      },
      {
        "type": "word_builder",
        "word": "consent",
        "audioText": "consent"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Consent",
          "is",
          "rarely",
          "as",
          "clear",
          "as",
          "it",
          "sounds."
        ],
        "audioText": "Consent is rarely as clear as it sounds."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "A",
          "face",
          "is",
          "not",
          "a",
          "password."
        ],
        "audioText": "A face is not a password."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "What worries critics most is the ___ that follows.",
        "choices": [
          "silence",
          "system",
          "camera"
        ],
        "answer": "silence",
        "audioText": "What worries critics most is the silence that follows."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It ___ now widely accepted that personal data deserves legal protection.",
        "choices": [
          "is",
          "are",
          "be"
        ],
        "answer": "is",
        "audioText": "It is now widely accepted that personal data deserves legal protection."
      }
    ]
  },
  {
    "id": "gk-r2-s09",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 9,
    "title": "The Right to Be Forgotten",
    "titleCn": "被遗忘的权利",
    "coverEmoji": "🗑️",
    "paragraphs": [
      {
        "text": "Every time you search for a restaurant or watch a video, a small piece of information about you is being recorded. Over the years, these details have been collected by countless companies, often without you noticing. It is hard to imagine how much of your daily life now exists as data on someone else's computer.",
        "translation": "每次你搜索一家餐厅或观看一个视频，关于你的一条小信息正被记录下来。多年来，这些细节一直被无数公司收集，而你常常毫无察觉。很难想象，你的日常生活有多少如今已作为数据存在于别人的电脑里。"
      },
      {
        "text": "This is why the idea of “the right to be forgotten” has been discussed so widely. In simple terms, it means that people should be able to ask a company to remove personal information about them. Whether such a request should be granted, however, is not always clear. A hospital may need your records to protect your health, while a news website may argue that the public has a right to know. The law is still being written.",
        "translation": "这就是“被遗忘权”这一理念被如此广泛讨论的原因。简单来说，它意味着人们应该能够要求公司删除关于自己的个人信息。然而，这样的请求是否应该被批准，并不总是清楚的。医院可能需要你的记录来保护你的健康，而新闻网站则可能主张公众有权知情。这条法律仍在书写之中。"
      },
      {
        "text": "Supporters say the right protects people from being judged forever by a single mistake. A photo posted at seventeen, they argue, should not decide what a person can do at thirty. When old information is searched by employers or strangers, it may cause harm that was never intended. It is unfair that a careless moment can follow someone for a lifetime.",
        "translation": "支持者说，这项权利保护人们不会因一次错误而被永远评判。他们主张，十七岁时发布的一张照片，不应该决定一个人三十岁能做什么。当旧信息被雇主或陌生人搜索到时，它可能造成本无意造成的伤害。一个粗心的瞬间能跟随一个人一辈子，这是不公平的。"
      },
      {
        "text": "Critics, however, warn that the right could be used to hide serious facts. If records are quietly removed, journalists may find it harder to report the truth, and the public may lose what it needs to hold power accountable. Besides, once information has been copied and shared, it is almost impossible to pull it back.",
        "translation": "然而，批评者警告说，这项权利可能被用来隐藏严重的事实。如果记录被悄悄删除，记者可能会发现更难报道真相，公众也可能失去监督权力所需的东西。此外，一旦信息被复制和分享，几乎不可能把它收回来。"
      },
      {
        "text": "Perhaps the real question is not whether we can delete data, but who should decide. A balanced rule is being tested in several countries: personal details may be removed unless there is a strong public reason to keep them. What matters most is that ordinary users are given a voice in a system that was built, in many ways, without them.",
        "translation": "也许真正的问题不是我们能否删除数据，而是谁应该来决定。一种平衡的规则正在几个国家被试行：个人细节可以被删除，除非有强烈的公共理由保留它们。最重要的是，普通用户在一个很大程度上并非由他们参与建立的系统中被赋予了发言权。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, which symbol best stands for the right being discussed?",
        "audioText": "According to the passage, which symbol best stands for the right being discussed?",
        "options": [
          {
            "emoji": "🗑️",
            "value": "delete",
            "text": "Delete"
          },
          {
            "emoji": "🔒",
            "value": "lock",
            "text": "Lock"
          },
          {
            "emoji": "📢",
            "value": "announce",
            "text": "Announce"
          }
        ],
        "answer": "delete"
      },
      {
        "type": "word_builder",
        "word": "records",
        "audioText": "records"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "law",
          "is",
          "still",
          "being",
          "written."
        ],
        "audioText": "The law is still being written."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "is",
          "almost",
          "impossible",
          "to",
          "pull",
          "it",
          "back."
        ],
        "audioText": "It is almost impossible to pull it back."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Over the years, these details have been ___ by countless companies, often without you noticing.",
        "choices": [
          "collected",
          "removed",
          "judged"
        ],
        "answer": "collected",
        "audioText": "Over the years, these details have been collected by countless companies, often without you noticing."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Personal details may be ___ unless there is a strong public reason to keep them.",
        "choices": [
          "removed",
          "copied",
          "searched"
        ],
        "answer": "removed",
        "audioText": "Personal details may be removed unless there is a strong public reason to keep them."
      }
    ]
  },
  {
    "id": "gk-r2-s10",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 10,
    "title": "Should AI Explain Itself?",
    "titleCn": "AI 该不该解释自己？",
    "coverEmoji": "🔍",
    "paragraphs": [
      {
        "text": "Every day, decisions that used to be made by people are now being handed to machines. A program decides whether you get a loan, a job interview, or a place at a university. Most of us never learn why.",
        "translation": "每一天，那些过去由人做出的决定，如今正被交到机器手中。一个程序决定你能否拿到贷款、能否获得面试机会、能否被大学录取。而我们大多数人从来不知道原因。"
      },
      {
        "text": "What makes these systems so powerful is that they are trained on huge amounts of data. The trouble is that the rules they discover are often hidden inside millions of numbers. It is almost impossible for an engineer to point at one line and say, 'Here is the reason.' This is the famous black box problem.",
        "translation": "这些系统之所以如此强大，是因为它们在海量数据上接受训练。问题在于，它们所发现的规则往往隐藏在数百万个数字之中。工程师几乎不可能指着某一行说：“原因就在这里。”这就是著名的“黑箱”难题。"
      },
      {
        "text": "Consider a worker who is rejected by an automated system and never told what went wrong. Without an explanation, she cannot show that a mistake has been made. It seems unfair that a decision about her future should be locked in a machine that nobody can question. Silence is not a fair answer.",
        "translation": "设想一位求职者被自动系统筛掉，却从未被告知哪里出了问题。没有解释，她就无法证明其中出了错。她的未来竟然被锁在一台无人能质疑的机器里，这似乎很不公平。沉默不是公正的答案。"
      },
      {
        "text": "Some governments have already passed laws that require such decisions to be explained in plain language. Companies, in turn, are being pushed to design tools that show how a result was reached. Whether these rules will work in practice is still being debated.",
        "translation": "一些国家的政府已经通过法律，要求这类决定必须用通俗易懂的语言加以解释。相应地，企业也正被推动去设计能展示结果如何得出的工具。这些规定在实践中是否有效，目前仍在争论之中。"
      },
      {
        "text": "Accuracy and openness often pull in opposite directions, and neither can be ignored. What matters most, perhaps, is that a human being remains responsible for the final choice. A machine may be allowed to advise, but it should never be allowed to hide behind its own complexity.",
        "translation": "准确性与公开性常常朝着相反的方向拉扯，而二者都不能被忽视。也许最重要的是，最终的选择仍要由人来负责。机器可以被允许提供建议，但绝不应被允许躲在自己的复杂性背后。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what is often hidden inside millions of numbers?",
        "audioText": "According to the passage, what is often hidden inside millions of numbers?",
        "options": [
          {
            "emoji": "📜",
            "value": "rules",
            "text": "The rules a system discovers"
          },
          {
            "emoji": "💰",
            "value": "money",
            "text": "The money a company spends"
          },
          {
            "emoji": "🔑",
            "value": "passwords",
            "text": "The passwords of users"
          }
        ],
        "answer": "rules"
      },
      {
        "type": "word_builder",
        "word": "explained",
        "audioText": "explained"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Most",
          "of",
          "us",
          "never",
          "learn",
          "why."
        ],
        "audioText": "Most of us never learn why."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "is",
          "the",
          "famous",
          "black",
          "box",
          "problem."
        ],
        "audioText": "This is the famous black box problem."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Companies, in turn, are being ___ to design tools that show how a result was reached.",
        "choices": [
          "pushed",
          "pulled",
          "praised"
        ],
        "answer": "pushed",
        "audioText": "Companies, in turn, are being pushed to design tools that show how a result was reached."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It seems unfair that a decision about her future should be ___ in a machine that nobody can question.",
        "choices": [
          "locked",
          "counted",
          "drawn"
        ],
        "answer": "locked",
        "audioText": "It seems unfair that a decision about her future should be locked in a machine that nobody can question."
      }
    ]
  },
  {
    "id": "gk-r2-s11",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 11,
    "title": "When Convenience Asks for Permission",
    "titleCn": "当便利来向你索取许可",
    "coverEmoji": "🔐",
    "paragraphs": [
      {
        "text": "The permission you gave was never really a choice, because the button had already been pressed for you. Every time an app is opened, a small request is being sent from your pocket to a distant server. What most people never notice is how much of that information is stored, copied and quietly passed on.",
        "translation": "你给出的那份“许可”其实从来算不上选择，因为那个按钮早已经替你按下了。每当一个应用被打开，一个小请求就会从你的口袋发往远方的服务器。而大多数人从不会注意的是：这些信息究竟有多少被存储、复制，又被悄悄转手。"
      },
      {
        "text": "It is easy to forget that permission, once given, is rarely taken back by the person who agreed to it. Quiet profiles are being built while we sleep, and by the time the warning is read, our habits may have been sold several times over. The record that follows us keeps growing, and it is passed among companies whose names we have never heard.",
        "translation": "人们很容易忘记：许可一旦给出，当初答应的人就很难再把它收回。我们睡觉的时候，一份份安静的档案正在被建立；等到我们终于读到那句提醒时，我们的习惯或许已经被转卖了好几轮。跟着我们的那份记录还在不断变大，它在一些我们从未听过名字的公司之间被传来传去。"
      },
      {
        "text": "Designers now argue that users should be told, in plain language, what will be done with the information they hand over. It seems fair to ask a company how long a file will be kept, and who will eventually be allowed to open it. What people want is not a longer document that nobody reads, but a clearer promise that can be checked.",
        "translation": "如今设计者们主张，应当用平实的语言告诉用户：他们交出去的信息会被怎样使用。去问一家公司一份文件会保存多久、最终谁会被允许查看它，看来是很合理的要求。人们想要的并不是一份没人会读的更长的文件，而是一个可以被核对的、更清楚的承诺。"
      },
      {
        "text": "What makes the situation harder is that convenience is being offered as a reward for silence. A map that already knows your route is far more useful than one that does not, so the trade feels gentle and almost kind. By the time anyone asks whether the deal was fair, the deal has been accepted.",
        "translation": "让局面更难处理的是：便利正被当作沉默的奖赏送到你面前。一张已经认得你路线的地图，比一张不认路的地图有用得多，于是这笔交易显得温和，甚至近乎体贴。等到有人去问这桩买卖是否公平时，买卖早已成交。"
      },
      {
        "text": "None of this means that we should live without our phones or refuse every new service. It means that the question of permission should come before the click, rather than long after it. When the asking is honest and the answer is understood, technology can be trusted a little more.",
        "translation": "这一切并不意味着我们要离开手机生活，或者拒绝每一项新服务。它的意思是：关于许可的那个问题，应该在点击之前被提出，而不是在很久之后才被想起。当询问是诚实的、答案也被真正理解时，技术就能多赢得一点信任。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what is sent from your pocket every time an app is opened?",
        "audioText": "According to the text, what is sent from your pocket every time an app is opened?",
        "options": [
          {
            "emoji": "📨",
            "value": "request",
            "text": "A small request"
          },
          {
            "emoji": "📸",
            "value": "photo",
            "text": "A photo"
          },
          {
            "emoji": "🎵",
            "value": "song",
            "text": "A song"
          }
        ],
        "answer": "request"
      },
      {
        "type": "word_builder",
        "word": "permission",
        "audioText": "permission"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "record",
          "that",
          "follows",
          "us",
          "keeps",
          "growing"
        ],
        "audioText": "The record that follows us keeps growing."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "trade",
          "feels",
          "gentle",
          "and",
          "almost",
          "kind"
        ],
        "audioText": "The trade feels gentle and almost kind."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ people want is not a longer document that nobody reads, but a clearer promise that can be checked.",
        "choices": [
          "What",
          "That",
          "Which"
        ],
        "answer": "What",
        "audioText": "What people want is not a longer document that nobody reads, but a clearer promise that can be checked."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Every time an app is opened, a small request is being ___ from your pocket to a distant server.",
        "choices": [
          "sent",
          "sending",
          "sends"
        ],
        "answer": "sent",
        "audioText": "Every time an app is opened, a small request is being sent from your pocket to a distant server."
      }
    ]
  },
  {
    "id": "gk-r2-s12",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 12,
    "title": "Keeping a Human in the Loop",
    "titleCn": "把人类留在决策环路中",
    "coverEmoji": "🧑⚖️",
    "paragraphs": [
      {
        "text": "Banks, hospitals and schools now rely on software to sort, rank and recommend. A loan application can be scored in seconds, and a patient's scan may be flagged before a doctor sees it. A shortlist of job candidates is often produced before any human being has read a single file. Companies usually describe this arrangement as simple efficiency, and in many cases it really is.",
        "translation": "银行、医院和学校如今都依赖软件来分类、排序和推荐。一份贷款申请几秒钟就能被打分，一张病人的扫描片可能在医生看到之前就已被标记。一份求职者名单往往在任何人读过一份文件之前就已生成。公司通常把这种安排称为简单的效率，而在许多情况下，它确实如此。"
      },
      {
        "text": "What worries many researchers is not the software itself but the comfortable promise that follows it. We are told that a person reviews every decision, so the machine is merely helping. Whether that person truly reviews anything is a question that few companies have been asked to answer. In some workplaces, it is considered normal to approve dozens of recommendations in an hour. Real checking takes time.",
        "translation": "让许多研究者担心的并不是软件本身，而是随之而来的那句令人安心的承诺。我们被告知，每一项决定都有人审核，所以机器只是在帮忙。而那个人是否真的审核了什么，这个问题很少有公司被要求回答。在一些工作场所，一小时内批准几十条推荐被视为正常。真正的核查是需要时间的。"
      },
      {
        "text": "When a worker approves hundreds of results a day, the review can become an empty ritual. It is easy to click accept when the system is usually right and the queue is always long. Psychologists have a name for this habit: automation bias, the tendency to trust a machine more than our own judgment. Trust, however, is not the same as truth. Once such trust has been established, mistakes may be passed along without being noticed at all.",
        "translation": "当一名员工一天要批准数百个结果时，所谓的审核就可能变成一种空洞的仪式。当系统通常是对的、待办队列又永远排得很长时，点一下“接受”实在太容易了。心理学家给这种习惯起了个名字：自动化偏差，即倾向于相信机器胜过相信自己的判断。然而，信任并不等于真相。一旦这样的信任被建立起来，错误就可能在无人察觉的情况下被一路传递下去。"
      },
      {
        "text": "Some governments are now trying to make the human role something more than a signature. New rules require that important decisions can be explained, and that people are told when a machine has judged them. Under these laws, an applicant must be offered a way to ask for a real person's opinion. It is not yet clear, however, whether such rights will be respected in everyday practice.",
        "translation": "一些国家的政府正试图让人所扮演的角色不只是签个名。新的规定要求重要决定必须能被解释，而且当机器对人作出评判时，当事人应当被告知。根据这些法律，申请人必须有机会要求听取真人的意见。不过，这些权利在日常实践中是否会被尊重，目前还不清楚。"
      },
      {
        "text": "The aim is not to remove machines from decision-making, which would be neither possible nor wise. What really matters, according to critics, is that responsibility can still be located somewhere. If nobody can be blamed for a wrong result, then nobody has any reason to correct the system. A human in the loop, then, should work as a genuine safeguard rather than as a decoration. That, in the end, is the real test.",
        "translation": "目标并不是把机器从决策中赶出去，那既不可能也不明智。在批评者看来，真正重要的是责任依然能落到某个具体的地方。如果错误的结果谁都怪不上，那么谁也没有理由去修正系统。因此，处于决策环路中的人，应当是真正的保障，而不是一种装饰。归根结底，这才是真正的考验。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the writer, what should a human in the loop really be?",
        "audioText": "According to the writer, what should a human in the loop really be?",
        "options": [
          {
            "emoji": "🧐",
            "value": "checker",
            "text": "Someone who genuinely checks decisions"
          },
          {
            "emoji": "✍️",
            "value": "signature",
            "text": "Someone who simply signs results"
          },
          {
            "emoji": "🤖",
            "value": "machine",
            "text": "A machine that corrects itself"
          }
        ],
        "answer": "checker"
      },
      {
        "type": "word_builder",
        "word": "bias",
        "audioText": "bias"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Real",
          "checking",
          "takes",
          "time."
        ],
        "audioText": "Real checking takes time."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Trust,",
          "however,",
          "is",
          "not",
          "the",
          "same",
          "as",
          "truth."
        ],
        "audioText": "Trust, however, is not the same as truth."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ worries many researchers is not the software itself but the comfortable promise that follows it.",
        "choices": [
          "What",
          "That",
          "Which"
        ],
        "answer": "What",
        "audioText": "What worries many researchers is not the software itself but the comfortable promise that follows it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Under these laws, an applicant must ___ offered a way to ask for a real person's opinion.",
        "choices": [
          "be",
          "been",
          "being"
        ],
        "answer": "be",
        "audioText": "Under these laws, an applicant must be offered a way to ask for a real person's opinion."
      }
    ]
  },
  {
    "id": "gk-r2-s13",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 13,
    "title": "When Machines Guess How We Feel",
    "titleCn": "当机器猜测我们的感受",
    "coverEmoji": "🎭",
    "paragraphs": [
      {
        "text": "Cameras are now being installed in shops, classrooms and job interviews, where software has been trained to guess how people feel. Supporters claim such tools make services friendlier, while critics say a private emotion is being turned into a product.",
        "translation": "如今，摄像头正被安装在商店、教室甚至求职面试中，而其背后的软件经过训练，用来推测人们的感受。支持者声称这类工具能让服务更友善，批评者则说，一种私人的情绪正在被变成商品。"
      },
      {
        "text": "How does it work? The system studies facial expressions, voice tone and heart rate, then compares them with what it has learned from millions of labelled examples. It is easy to forget that the software only reports a pattern, not a feeling. Whether a smile means joy or polite patience depends on culture, context and the person.",
        "translation": "它是如何运作的呢？系统会研究面部表情、语调以及心率，再把它们与从数百万条标注样本中学到的东西作比较。人们很容易忘记：软件报告的只是一种模式，而不是一种情感。一个微笑意味着喜悦还是礼貌的耐心，取决于文化、情境和具体的人。"
      },
      {
        "text": "Accuracy is another worry. Studies suggest that these systems are less reliable when they are tested on faces that were rare in the training data. So people whose expressions do not match the sample may be misread far more often. The results are often treated as facts. A wrong guess can then follow someone into a hiring decision or a medical record.",
        "translation": "准确性是另一个令人担忧的问题。研究表明，当这些系统被用来测试训练数据中少见的面孔时，可靠性会降低。因此，那些表情与样本不符的人可能会被更频繁地误读。结果常常被当作事实。于是一个错误的判断可能跟着某人进入一次招聘决定，或者一份医疗记录。"
      },
      {
        "text": "Consent is the harder question. Most of us have never agreed to have our moods measured while we shop or study. In some cities such tools have been banned in public places, and new rules are being written about emotion data. It is argued that clear permission should be required before any feeling is analysed.",
        "translation": "同意是更难的问题。我们大多数人都从未同意在购物或学习时让自己的情绪被测量。在一些城市，这类工具在公共场所已被禁止，关于情绪数据的新规也正在制定中。有人认为，在分析任何情绪之前，都应该先获得明确的许可。"
      },
      {
        "text": "None of this means the technology is useless. Clear, honest systems might help a teacher notice a quiet student who is struggling. But what a machine records about our inner life should not be decided by companies alone. Before the guessing spreads further, we should ask whether some parts of us ought to stay unmeasured.",
        "translation": "这一切并不意味着这项技术毫无用处。清晰、诚实的系统也许能帮助老师注意到一个正在苦苦挣扎的安静学生。但机器记录下的关于我们内心生活的内容，不应只由公司来决定。在“猜测”进一步扩散之前，我们应该问一问：我们身上的某些部分是否应当保持不被测量。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what does the software really report?",
        "audioText": "According to the text, what does the software really report?",
        "options": [
          {
            "emoji": "💗",
            "value": "feeling",
            "text": "A true feeling"
          },
          {
            "emoji": "📊",
            "value": "pattern",
            "text": "A pattern in the data"
          },
          {
            "emoji": "✍️",
            "value": "promise",
            "text": "A written promise"
          }
        ],
        "answer": "pattern"
      },
      {
        "type": "word_builder",
        "word": "consent",
        "audioText": "consent"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "None",
          "of",
          "this",
          "means",
          "the",
          "technology",
          "is",
          "useless"
        ],
        "audioText": "None of this means the technology is useless."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "results",
          "are",
          "often",
          "treated",
          "as",
          "facts"
        ],
        "audioText": "The results are often treated as facts."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Before the guessing spreads further, we should ask ___ some parts of us ought to stay unmeasured.",
        "choices": [
          "whether",
          "that",
          "what"
        ],
        "answer": "whether",
        "audioText": "Before the guessing spreads further, we should ask whether some parts of us ought to stay unmeasured."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Most of us have never agreed to have our moods ___ while we shop or study.",
        "choices": [
          "measured",
          "measuring",
          "measure"
        ],
        "answer": "measured",
        "audioText": "Most of us have never agreed to have our moods measured while we shop or study."
      }
    ]
  },
  {
    "id": "gk-r2-s14",
    "track": "gaokao",
    "regionId": "gk-r2",
    "order": 14,
    "title": "The Shadow Profile You Never Made",
    "titleCn": "你从未创建过的影子档案",
    "coverEmoji": "🕵️",
    "paragraphs": [
      {
        "text": "Most people believe that a private life is still possible. They imagine that if you never post a photo or share a location, no company can build a file about you. This comfortable idea has been quietly challenged by researchers who study data markets. It turns out that a detailed picture of you can be created without your permission — and without a single click of your own.",
        "translation": "多数人相信，私生活仍然是可能的。他们以为，只要你从不发照片、不分享位置，就没有哪家公司能为你建立一份档案。这个令人安心的想法，已经被研究数据市场的研究者们悄悄推翻了。事实证明，一份关于你的详细画像可以在未经你许可的情况下生成——而且不需要你点击任何一次。"
      },
      {
        "text": "Such a picture is called a shadow profile. It is assembled from the traces that other people leave behind, and it can keep growing without your knowledge. When a friend uploads a group photo, your face may be scanned and matched to a name. When a relative lists the family members on a shopping site, that connection is quietly stored in a database. Phone numbers, home addresses and even the names of your old classmates are being traded every day. None of this information was given by you. Yet all of it is being used, every day, to describe who you are.",
        "translation": "这样的画像被称为“影子档案”。它是用别人留下的痕迹拼凑而成的，而且会在你毫不知情的情况下不断长大。当朋友上传一张合影时，你的脸可能被扫描，然后与一个名字对应起来。当亲戚在购物网站上列出家庭成员时，那条关系就被悄悄存进了数据库。电话号码、家庭住址，甚至你老同学的名字，每天都在被交易。这些信息没有一条是你提供的。然而它们全都被用来描述你是谁，每一天都是如此。"
      },
      {
        "text": "It is estimated that a typical shadow profile contains hundreds of data points. Whether those points are accurate is often impossible to check, because the companies involved are not required to show them. What worries lawyers most is not the collecting itself but the deciding. A score that has been calculated in secret may decide whether you are offered a job, a loan or a place at university. It is the secrecy, rather than the technology, that makes the system so hard to fight.",
        "translation": "据估计，一份典型的影子档案包含数百个数据点。这些数据点是否准确，往往无法核实，因为相关公司没有被要求公开它们。最让律师们担忧的不是收集本身，而是做出判断。一个秘密计算出来的分数，可能决定你是否能获得一份工作、一笔贷款或一个大学名额。让这套系统如此难以对抗的，是它的隐秘性，而不是技术。"
      },
      {
        "text": "Some governments have started to respond. Under new rules, citizens must be told what information is held about them and why it was collected. Companies that ignore these rules can be fined, and in a few cases their databases have been ordered to be deleted. Critics argue, however, that the rules are easy to avoid and hard to enforce. A firm based in one country can simply move its servers to another, and the shadow profile follows the person, not the machine.",
        "translation": "一些政府已经开始作出回应。根据新规，公民必须被告知自己被掌握了哪些信息、这些信息为何被收集。无视这些规定的公司可能被罚款，在少数情况下，它们的数据库已被下令删除。然而，批评者认为，这些规定既容易被规避，又难以执行。一家设在某国的公司只需把服务器搬到另一个国家，而影子档案跟随的是人，不是机器。"
      },
      {
        "text": "Perhaps the real question is not whether technology can protect us, but whether we are willing to ask for protection. A shadow profile is invisible, and what is invisible is rarely discussed. If digital privacy is treated as a luxury rather than a right, the people with the least power will be the ones most carefully watched. That is a future which should not be accepted without a serious argument.",
        "translation": "也许真正的问题不是技术能否保护我们，而是我们是否愿意主动要求保护。影子档案是无形的，而无形的存在很少被人讨论。如果数字隐私被当作一种奢侈，而不是一项权利，那么权力最小的人将是被监视得最仔细的人。这样的未来，不该在一场严肃争论缺席的情况下被接受。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, where does the information in a shadow profile mainly come from?",
        "audioText": "According to the text, where does the information in a shadow profile mainly come from?",
        "options": [
          {
            "emoji": "📸",
            "value": "photos",
            "text": "Photos and posts shared by friends"
          },
          {
            "emoji": "📝",
            "value": "forms",
            "text": "Forms you fill in yourself"
          },
          {
            "emoji": "🏦",
            "value": "bank",
            "text": "Bank records you sign"
          }
        ],
        "answer": "photos"
      },
      {
        "type": "word_builder",
        "word": "profile",
        "audioText": "profile"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Such",
          "a",
          "picture",
          "is",
          "called",
          "a",
          "shadow",
          "profile."
        ],
        "audioText": "Such a picture is called a shadow profile."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "None",
          "of",
          "this",
          "information",
          "was",
          "given",
          "by",
          "you."
        ],
        "audioText": "None of this information was given by you."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It ___ that a typical shadow profile contains hundreds of data points.",
        "choices": [
          "is estimated",
          "estimates",
          "has estimated"
        ],
        "answer": "is estimated",
        "audioText": "It is estimated that a typical shadow profile contains hundreds of data points."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ those points are accurate is often impossible to check.",
        "choices": [
          "Whether",
          "What",
          "That"
        ],
        "answer": "Whether",
        "audioText": "Whether those points are accurate is often impossible to check."
      }
    ]
  },
  {
    "id": "gk-r3-s01",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 1,
    "title": "The Man Who Opened the Silk Road",
    "titleCn": "开辟丝绸之路的人",
    "coverEmoji": "🧭",
    "paragraphs": [
      {
        "text": "More than two thousand years ago, a young official named Zhang Qian received a task that would change the world. It was Emperor Wu of the Han Dynasty who chose him to travel west and look for powerful allies. If Zhang Qian had refused this dangerous mission, the Silk Road might never have come into being.",
        "translation": "两千多年前，一位名叫张骞的年轻官员接到了一项将改变世界的任务。正是汉武帝派他西行，去寻找强大的盟友。如果张骞当初拒绝了这项危险的使命，丝绸之路也许永远不会出现。"
      },
      {
        "text": "Not only did the young man cross burning deserts, but he was also caught by the Xiongnu and held for about ten years. He never forgot his task. Even in those hard years, he kept in mind the purpose of his journey and waited patiently for a chance to escape. When the chance finally came, he escaped and continued westward, reaching lands that no Chinese official had ever seen.",
        "translation": "这位年轻人不仅要穿越灼热的沙漠，还被匈奴人抓住，扣留了大约十年。他从未忘记自己的任务。即使在那些艰难的岁月里，他也始终记着此行的目的，耐心等待逃走的机会。当机会终于来临时，他逃了出来，继续向西，抵达了从来没有任何中国官员见过的土地。"
      },
      {
        "text": "No sooner had he returned home than he reported everything he had learned to the emperor. His description of the western regions, including their rivers, cities and markets, was full of valuable details. It was this report that changed everything. The Han court finally understood how wide and rich the world beyond the mountains was.",
        "translation": "他一回到家乡，就马上把自己了解到的一切报告给皇帝。他对西域——那里的河流、城市和集市——的描述充满了宝贵的细节。正是这份报告改变了一切。汉朝终于明白，山那边的世界有多么辽阔、多么富饶。"
      },
      {
        "text": "Though Zhang Qian did not live to see it, the road he opened soon carried silk, spices and ideas between East and West. If he had not made that first long journey, goods and knowledge would have moved far more slowly. Today we call it the Silk Road. We still remember him today as a pioneer of cultural exchange.",
        "translation": "虽然张骞没能活着看到这一切，但他开辟的这条路很快就让丝绸、香料和思想在东西方之间流动起来。如果他没有完成那第一次漫长的旅行，货物和知识的传播会缓慢得多。今天我们称它为丝绸之路。我们至今仍记得他，把他看作文化交流的先行者。"
      },
      {
        "text": "History books often give us dates and names, but the stories behind them are what truly matter. Zhang Qian's story shows us that one determined person can connect whole worlds. If we look carefully at the roads we travel today, we may find that his footsteps are still there.",
        "translation": "历史书常常只给我们日期和名字，但真正重要的是这些名字背后的故事。张骞的故事告诉我们，一个坚定的人可以连接起整个世界。如果我们仔细看看今天所走的道路，也许会发现他的足迹依然在那里。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what did the road opened by Zhang Qian carry between East and West?",
        "audioText": "According to the text, what did the road opened by Zhang Qian carry between East and West?",
        "options": [
          {
            "emoji": "🧵",
            "value": "silk",
            "text": "Silk, spices and ideas"
          },
          {
            "emoji": "⚔️",
            "value": "weapons",
            "text": "Weapons and soldiers"
          },
          {
            "emoji": "💰",
            "value": "coins",
            "text": "Only gold coins"
          }
        ],
        "answer": "silk"
      },
      {
        "type": "word_builder",
        "word": "pioneer",
        "audioText": "pioneer"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "never",
          "forgot",
          "his",
          "task."
        ],
        "audioText": "He never forgot his task."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "this",
          "report",
          "that",
          "changed",
          "everything."
        ],
        "audioText": "It was this report that changed everything."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If Zhang Qian ___ refused this dangerous mission, the Silk Road might never have come into being.",
        "choices": [
          "had",
          "has",
          "have"
        ],
        "answer": "had",
        "audioText": "If Zhang Qian had refused this dangerous mission, the Silk Road might never have come into being."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ the young man cross burning deserts, but he was also caught by the Xiongnu.",
        "choices": [
          "did",
          "does",
          "was"
        ],
        "answer": "did",
        "audioText": "Not only did the young man cross burning deserts, but he was also caught by the Xiongnu."
      }
    ]
  },
  {
    "id": "gk-r3-s02",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 2,
    "title": "An Army Beneath the Field",
    "titleCn": "田地下沉睡的军队",
    "coverEmoji": "🏺",
    "paragraphs": [
      {
        "text": "In the spring of 1974, a group of farmers in Shaanxi Province were digging a well in a dry field. Suddenly their spades hit something hard, and they pulled out a broken head made of clay. If they had thrown it away and gone home, one of the greatest discoveries in history would have been lost. Instead, they carried the pieces to a local office and told the officials what they had found.",
        "translation": "1974年春天，陕西省的一群农民正在一块干旱的田地里打井。突然，他们的铁锹碰到了硬物，他们挖出了一个破损的陶土人头。如果他们当时把它扔掉、回家去了，史上最伟大的发现之一就会永远遗失。但他们没有这样做，而是把碎片送到了当地的一个办事处，把自己发现的东西告诉了工作人员。"
      },
      {
        "text": "No sooner had experts arrived than they realized the farmers had stumbled upon an ancient army. It was more than eight thousand life-sized clay soldiers that had been buried for over two thousand years. They had been made for Qin Shi Huang, the first emperor of a unified China. Not only did the figures guard his tomb, but they also showed the power of his empire.",
        "translation": "专家们一到就意识到，这些农民偶然发现了一支古代的军队。那是八千多个真人大小的陶土士兵，已经被埋藏了两千多年。它们是为秦始皇——中国第一位统一天下的皇帝——而制作的。这些陶俑不仅守卫着他的陵墓，也彰显了他帝国的强大。"
      },
      {
        "text": "Each soldier carries a different face, and modern visitors are often amazed by the details. If the craftsmen had worked less carefully, the faces would all look the same today. The figures were once painted in bright colours, but most of the paint disappeared long ago. Scientists say that if the pits were opened too quickly now, the remaining colour would fade within hours.",
        "translation": "每个士兵都有一张不同的面孔，今天的参观者常常为这些细节惊叹。如果当年的工匠做得不那么用心，今天所有的面孔就会一模一样。这些陶俑曾经色彩鲜艳，但大部分颜料很久以前就消失了。科学家说，如果现在把俑坑打开得太快，残留的颜色会在几个小时内褪去。"
      },
      {
        "text": "Digging has continued slowly since then, and three large pits have been found so far. Hundreds of figures have been repaired, yet thousands more still lie quietly under the soil. It is patience, rather than speed, that has protected this cultural heritage. If workers had rushed the excavation, much of the evidence would have been destroyed forever.",
        "translation": "从那以后，发掘工作一直在缓慢进行，到目前为止已经发现了三个大俑坑。数百个陶俑已经修复，但仍有成千上万个静静地躺在泥土之下。正是耐心，而非速度，保护了这份文化遗产。如果当初工人们赶进度，许多证据就会永远被毁掉。"
      },
      {
        "text": "Today the site is a museum, and it attracts millions of visitors from around the world every year. The story reminds us that great history is sometimes found by ordinary people with simple tools. If those farmers had kept silent, we would know far less about our shared past. It is their honesty, not their luck, that we should remember most.",
        "translation": "如今这里是一座博物馆，每年吸引着来自世界各地的数百万游客。这个故事提醒我们，伟大的历史有时是由普通人用简单的工具发现的。如果那些农民当时保持沉默，我们对共同过去的了解会少得多。我们最应该记住的，是他们的诚实，而不是他们的运气。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If they ___ thrown it away and gone home, one of the greatest discoveries in history would have been lost.",
        "choices": [
          "have",
          "had",
          "has"
        ],
        "answer": "had",
        "audioText": "If they had thrown it away and gone home, one of the greatest discoveries in history would have been lost."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "No sooner ___ experts arrived than they realized the farmers had stumbled upon an ancient army.",
        "choices": [
          "have",
          "were",
          "had"
        ],
        "answer": "had",
        "audioText": "No sooner had experts arrived than they realized the farmers had stumbled upon an ancient army."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It is patience, rather than speed, ___ has protected this cultural heritage.",
        "choices": [
          "what",
          "that",
          "who"
        ],
        "answer": "that",
        "audioText": "It is patience, rather than speed, that has protected this cultural heritage."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Suddenly",
          "their",
          "spades",
          "hit",
          "something",
          "hard"
        ],
        "audioText": "Suddenly their spades hit something hard."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "remaining",
          "colour",
          "would",
          "fade",
          "within",
          "hours"
        ],
        "audioText": "The remaining colour would fade within hours."
      },
      {
        "type": "word_builder",
        "word": "heritage",
        "audioText": "heritage"
      }
    ]
  },
  {
    "id": "gk-r3-s03",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 3,
    "title": "The Songs That Almost Vanished",
    "titleCn": "几乎消失的歌谣",
    "coverEmoji": "🎶",
    "paragraphs": [
      {
        "text": "Long before recorders became common, a young teacher named Lin Hui carried a notebook into a mountain village. She had heard that the old songs of that valley were slowly disappearing, and she wanted to hear them herself. At first the villagers stayed silent, for they believed their songs were too plain to interest any outsider. If she had not smiled and waited so patiently, they might never have sung a single note for her.",
        "translation": "早在录音机普及之前，一位名叫林慧的年轻教师就带着一个笔记本走进了山村。她听说那个山谷里的古老歌谣正在慢慢消失，便想亲耳听一听。起初村民们沉默不语，因为他们觉得自己的歌太朴素，引不起外人的兴趣。如果她没有微笑着耐心等待，他们也许一个音都不会为她唱。"
      },
      {
        "text": "Not only did she write down the words, but she also marked the rhythm with small dots above them. It was the grandmothers who remembered those verses. Each evening, Lin Hui sat beside the fire and repeated every line until her ear could hold it.",
        "translation": "她不仅把歌词记了下来，还在上面用小圆点标出节奏。记住那些歌词的，正是村里的祖母们。每天傍晚，林慧坐在火堆旁，把每一句反复念到耳朵能记住为止。"
      },
      {
        "text": "No sooner had she filled one notebook than she bought another, and then another after that. Were it not for her patience, most of these songs would be found in no library today. Had she stopped, the songs would have vanished. She walked from valley to valley, and every village gave her something that no printed page contained.",
        "translation": "她刚记满一个笔记本，就又买了一个，接着再买一个。若不是她有这份耐心，这些歌谣如今在图书馆里一本都找不到。假如她当时停下来，这些歌就永远消失了。她从一个山谷走到另一个山谷，每个村子都给了她印刷书页里没有的东西。"
      },
      {
        "text": "Years later, a music professor asked her why she had spent her whole youth on such a lonely task. She answered that a song is like a road: if nobody walks it, it quietly returns to grass. \"If I had stayed at home,\" she said, \"I would have kept my comfort, but I would have lost their voices.\"",
        "translation": "多年以后，一位音乐教授问她，为什么要把整个青春花在这样一件寂寞的事上。她回答说，一首歌就像一条路：如果没有人走，它就会悄悄变回草地。“如果我当初留在家里，”她说，“我保住了安逸，却会失去他们的声音。”"
      },
      {
        "text": "Her notebooks now rest in a small museum, and students still sing the songs that she saved. Money and fame fade quickly, she once wrote; it is the memory of a people that we must keep.",
        "translation": "她的笔记本如今安放在一座小博物馆里，学生们仍在唱她保存下来的那些歌。金钱与名声很快会消散，她曾写道；我们必须留住的，是一个民族的记忆。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lin Hui carry into the mountain village?",
        "audioText": "What did Lin Hui carry into the mountain village?",
        "options": [
          {
            "emoji": "📓",
            "value": "notebook",
            "text": "A notebook"
          },
          {
            "emoji": "🎻",
            "value": "violin",
            "text": "A violin"
          },
          {
            "emoji": "📷",
            "value": "camera",
            "text": "A camera"
          }
        ],
        "answer": "notebook"
      },
      {
        "type": "word_builder",
        "word": "patience",
        "audioText": "patience"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "the",
          "grandmothers",
          "who",
          "remembered",
          "those",
          "verses."
        ],
        "audioText": "It was the grandmothers who remembered those verses."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Had",
          "she",
          "stopped,",
          "the",
          "songs",
          "would",
          "have",
          "vanished."
        ],
        "audioText": "Had she stopped, the songs would have vanished."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If she ___ not smiled and waited so patiently, they might never have sung a single note for her.",
        "choices": [
          "had",
          "has",
          "did"
        ],
        "answer": "had",
        "audioText": "If she had not smiled and waited so patiently, they might never have sung a single note for her."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ she write down the words, but she also marked the rhythm with small dots above them.",
        "choices": [
          "did",
          "does",
          "had"
        ],
        "answer": "did",
        "audioText": "Not only did she write down the words, but she also marked the rhythm with small dots above them."
      }
    ]
  },
  {
    "id": "gk-r3-s04",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 4,
    "title": "A Library Hidden in the Desert",
    "titleCn": "藏在沙漠里的图书馆",
    "coverEmoji": "📜",
    "paragraphs": [
      {
        "text": "About twenty-five kilometres southeast of Dunhuang, a line of caves runs along a dry river valley. For more than a thousand years, travellers, traders and monks stopped here before crossing the desert. They cut rooms into the soft rock and filled the walls with colourful paintings and statues. Today we call the place the Mogao Caves, and it is one of the greatest art sites in Asia.",
        "translation": "在敦煌东南约二十五公里处，一列洞窟沿着干涸的河谷延伸。一千多年间，旅人、商人和僧侣在穿越沙漠之前都会在此停留。他们把松软的岩石凿成一个个房间，用色彩斑斓的壁画和塑像填满四壁。今天，我们称这里为莫高窟，它是亚洲最伟大的艺术遗址之一。"
      },
      {
        "text": "If the desert air had been wet, those paintings would have disappeared many centuries ago. Not only did the dry climate protect the colours, but it also kept every piece of paper safe. For centuries, monks, artists and passing travellers worked on the site, generation after generation. No sooner had one dynasty fallen than the next added its own rooms and pictures.",
        "translation": "如果沙漠的空气是潮湿的，那些壁画早在几百年前就会消失得无影无踪。干燥的气候不仅保护了色彩，也让每一张纸都安然无恙。几个世纪里，僧侣、画工和路过的旅人一代又一代地在这里劳作。一个王朝刚刚覆灭，下一个王朝又添上自己的洞窟和画作。"
      },
      {
        "text": "In 1900, a caretaker who was cleaning one of the caves noticed a hidden doorway behind the wall. Behind it lay a small room, packed from floor to ceiling with ancient documents. It was this one small room that held tens of thousands of papers, waiting quietly in the dark. Some were written in Chinese, while others used languages that no one could read any more.",
        "translation": "1900年，一位正在打扫其中一座洞窟的看护人发现墙后有一道隐蔽的门。门后是一间小屋，从地面到天花板堆满了古代文书。正是这间小屋，收藏着数以万计的文件，静静地在黑暗中等待。有些用中文写成，另一些则使用已经无人能读懂的语言。"
      },
      {
        "text": "Scholars say the papers record daily life, trade and belief along the old Silk Road. If that little door had never been opened, much of this history would still be unknown to us. Had the room been found later, the documents might have been lost forever. Today, teams of young workers are making digital copies so that anyone can study them online.",
        "translation": "学者们说，这些文书记录了古丝绸之路上的日常生活、贸易与信仰。如果那扇小门从未被打开，这段历史的很大一部分至今仍不为我们所知。倘若这间屋子更晚才被发现，这些文书也许早已永远失散。如今，一支支年轻的工作团队正在制作数字副本，让任何人都能在网上研究它们。"
      },
      {
        "text": "Visiting the caves, you may feel that the past is not so far away after all. It is ordinary people, not kings, who keep a culture alive through patient, quiet work.",
        "translation": "走进这些洞窟，你也许会感到过去其实并不遥远。让一种文化延续下去的，正是那些耐心而默默劳作的普通人，而不是帝王。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What kept the wall paintings bright for so long?",
        "audioText": "What kept the wall paintings bright for so long?",
        "options": [
          {
            "emoji": "🏜️",
            "value": "dry",
            "text": "Dry desert air"
          },
          {
            "emoji": "🌧️",
            "value": "rain",
            "text": "Heavy summer rain"
          },
          {
            "emoji": "🔥",
            "value": "fire",
            "text": "Fires in the caves"
          }
        ],
        "answer": "dry"
      },
      {
        "type": "word_builder",
        "word": "dynasty",
        "audioText": "dynasty"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Today",
          "we",
          "call",
          "the",
          "place",
          "the",
          "Mogao",
          "Caves"
        ],
        "audioText": "Today we call the place the Mogao Caves."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Behind",
          "it",
          "lay",
          "a",
          "small",
          "room"
        ],
        "audioText": "Behind it lay a small room."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ the dry climate protect the colours, but it also kept every piece of paper safe.",
        "choices": [
          "did",
          "does",
          "had"
        ],
        "answer": "did",
        "audioText": "Not only did the dry climate protect the colours, but it also kept every piece of paper safe."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If that little door had never been opened, much of this history ___ still be unknown to us.",
        "choices": [
          "would",
          "will",
          "is"
        ],
        "answer": "would",
        "audioText": "If that little door had never been opened, much of this history would still be unknown to us."
      }
    ]
  },
  {
    "id": "gk-r3-s05",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 5,
    "title": "The Man Who Made Ideas Travel",
    "titleCn": "让思想传播的人",
    "coverEmoji": "🖨️",
    "paragraphs": [
      {
        "text": "Before the eleventh century, almost every book in China was copied by hand, one character at a time. A skilled copyist might spend several months on a single volume, so only wealthy families could own a small library. If paper had been cheaper and copying had been faster, new ideas would have travelled much further than they did.",
        "translation": "在十一世纪之前，中国的几乎每一本书都是靠人手一字一字抄写而成的。一位熟练的抄书人要花上几个月才能抄完一卷书，因此只有富裕人家才买得起一个小小的藏书室。假如当年纸张更便宜、抄写更快，新思想本会比那时传播得远得多。"
      },
      {
        "text": "In about 1040, a craftsman named Bi Sheng began to experiment with a completely new method of printing. He cut Chinese characters into soft clay, baked every block until it was hard, and arranged them on an iron plate. Not only did these small blocks make printing much faster, but they could also be used again and again.",
        "translation": "大约在1040年，一位名叫毕昇的工匠开始尝试一种全新的印刷方法。他把汉字刻在柔软的胶泥上，把每个字块烘硬，再把它们排在一块铁板上。这些小字块不仅让印刷快了许多，而且还能一次又一次地重复使用。"
      },
      {
        "text": "Because Chinese has thousands of characters, sorting the blocks correctly was the hardest part of his work. No sooner had the blocks been sorted by sound than a printer could set a whole page. It was this simple system of ordering that allowed workers to find any character quickly. If he had kept his method secret, the whole craft might have died together with him.",
        "translation": "由于汉字有成千上万个，把字块正确地分类是他工作中最难的部分。字块刚一按读音排好，印刷工就能排出一整页。正是这套简单的排序方法，让工匠们能迅速找到任何一个字。假如他把自己的方法秘而不宣，这门手艺也许就随他一起消失了。"
      },
      {
        "text": "Fortunately, a scholar named Shen Kuo wrote the method down, so nothing was lost to history. It was through this careful written record that later printers in many lands learned his clever technique. Printing spread slowly across Asia and Europe. Knowledge that had once belonged to a few wealthy readers now reached millions of ordinary people.",
        "translation": "幸运的是，一位名叫沈括的学者把这种方法记录了下来，于是它没有在历史中失传。正是通过这份细致的文字记录，后来许多地方的印刷工才学会了他巧妙的技术。印刷术缓缓传遍亚洲和欧洲。曾经只属于少数富裕读书人的知识，如今传到了千千万万普通人手中。"
      },
      {
        "text": "Bi Sheng never became rich or famous, and history records few details of his daily life. Yet every time we open a printed book, we are using an idea that began with his hands. Great changes do not always arrive with noise. Sometimes they arrive quietly, in the humble shape of small clay blocks.",
        "translation": "毕昇一生既没有富贵，也没有名声，史书上几乎没留下他日常生活的细节。然而每当我们翻开一本印刷的书，我们用的都是始于他双手的一个想法。巨大的变化并不总是伴着喧哗到来。有时它们悄然而至，模样就是一块块不起眼的胶泥字。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What material did Bi Sheng cut Chinese characters into?",
        "audioText": "What material did Bi Sheng cut Chinese characters into?",
        "options": [
          {
            "emoji": "🧱",
            "value": "clay",
            "text": "Clay"
          },
          {
            "emoji": "🪵",
            "value": "wood",
            "text": "Wood"
          },
          {
            "emoji": "🪨",
            "value": "stone",
            "text": "Stone"
          }
        ],
        "answer": "clay"
      },
      {
        "type": "word_builder",
        "word": "printing",
        "audioText": "printing"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Printing",
          "spread",
          "slowly",
          "across",
          "Asia",
          "and",
          "Europe"
        ],
        "audioText": "Printing spread slowly across Asia and Europe."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Great",
          "changes",
          "do",
          "not",
          "always",
          "arrive",
          "with",
          "noise"
        ],
        "audioText": "Great changes do not always arrive with noise."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If movable type had never been invented, the modern world ___ very different.",
        "choices": [
          "would look",
          "will look",
          "looks"
        ],
        "answer": "would look",
        "audioText": "If movable type had never been invented, the modern world would look very different."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was through this careful written record ___ later printers in many lands learned his clever technique.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "It was through this careful written record that later printers in many lands learned his clever technique."
      }
    ]
  },
  {
    "id": "gk-r3-s06",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 6,
    "title": "The Scroll That Remembers a City",
    "titleCn": "记得一座城的画卷",
    "coverEmoji": "📜",
    "paragraphs": [
      {
        "text": "In China's long history, only a few paintings have managed to carry a whole city on their shoulders. The one that does this best is a long silk scroll called Along the River During the Qingming Festival, painted by Zhang Zeduan. It was in Bianjing, today's Kaifeng, that the artist found his subject, and he spent years watching the streets of the Northern Song capital.",
        "translation": "在中国漫长的历史中，只有少数几幅画能够把整座城市扛在自己的肩上。其中最出色的一幅，是一卷名为《清明上河图》的长绢画，作者是张择端。正是在汴京，也就是今天的开封，这位画家找到了他的题材，他花了多年时间观察这座北宋都城的街市。"
      },
      {
        "text": "If you were to unroll the scroll slowly, you would meet more than eight hundred people. Not only does it show rich merchants in fine clothes, but it also shows porters, cooks, doctors and children at play. A wooden bridge crosses the river in the middle of the scene, where a boat is about to hit the bank and the crew are shouting for help. No sooner has the reader noticed this small drama than the eye moves on to shops, tea houses and busy streets.",
        "translation": "如果你慢慢展开这卷画，你会遇见八百多个人物。它不仅画出衣着讲究的富商，也画出了脚夫、厨子、医生和玩耍的孩子。画面中央有一座木桥横跨河面，那里有一条船就要撞上河岸，船员们正大声呼救。读者刚注意到这个小插曲，目光便又移向店铺、茶馆和熙熙攘攘的街道。"
      },
      {
        "text": "Zhang Zeduan could not have known how soon that busy world would end. If the Northern Song had not lost its capital in the war of 1127, later copies of his scroll might never have been made with such care. Had the original been destroyed in the fighting, artists in the south would have had nothing to copy. The court moved to Hangzhou, and painters there tried to rebuild Bianjing on silk, using Zhang's quiet record as their guide.",
        "translation": "张择端不可能知道，那个热闹的世界会结束得如此之快。如果北宋没有在1127年的战争中失去都城，他这卷画的后世摹本或许永远不会被如此用心地绘制。假如原作在战火中被毁，南方的画家就无物可临摹了。朝廷迁往杭州，那里的画家们试图在绢上重建汴京，而张择端这份安静的记录就成了他们的向导。"
      },
      {
        "text": "The scroll itself is about five metres long, and it is now kept in the Palace Museum in Beijing. It has been copied many times, and every copy tells us something about the period that produced it. Historians value the painting not because it shows emperors or battles, but because it shows ordinary work, trade and daily life. No sooner do they study one corner than they discover a new detail, such as a child reaching for a toy.",
        "translation": "这卷画本身长约五米，如今收藏在北京的故宫博物院。它被临摹过许多次，每一份摹本都能告诉我们一些关于绘制它的那个时代的事情。历史学家看重这幅画，不是因为它画了皇帝或战争，而是因为它画出了普通人的劳作、交易与日常生活。他们刚研究完一个角落，就会发现一个新的细节，比如一个孩子伸手去够玩具。"
      },
      {
        "text": "In the end, it is the small, ordinary moments that a nation remembers longest. If we had only official histories, we would know the names of kings but not the sound of a market. A painting like this reminds us that heritage is not only about monuments, but also about how people once lived, worked and laughed together.",
        "translation": "说到底，一个民族记得最久的，往往是那些细小的、普通的瞬间。假如我们只有官方史书，我们会知道国王的名字，却听不到集市的声音。像这样的画作提醒我们：文化遗产不只关乎纪念碑，也关乎人们曾经怎样一起生活、劳作和欢笑。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what stands in the middle of the scene?",
        "audioText": "According to the text, what stands in the middle of the scene?",
        "options": [
          {
            "emoji": "🌉",
            "value": "bridge",
            "text": "A wooden bridge"
          },
          {
            "emoji": "👑",
            "value": "palace",
            "text": "A royal palace"
          },
          {
            "emoji": "⛰️",
            "value": "mountain",
            "text": "A mountain village"
          }
        ],
        "answer": "bridge"
      },
      {
        "type": "word_builder",
        "word": "heritage",
        "audioText": "heritage"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Had",
          "the",
          "original",
          "been",
          "destroyed",
          "in",
          "the",
          "fighting"
        ],
        "audioText": "Had the original been destroyed in the fighting, artists in the south would have had nothing to copy."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "No",
          "sooner",
          "do",
          "they",
          "study",
          "one",
          "corner"
        ],
        "audioText": "No sooner do they study one corner than they discover a new detail, such as a child reaching for a toy."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we ___ only official histories, we would know the names of kings but not the sound of a market.",
        "choices": [
          "had",
          "have",
          "has"
        ],
        "answer": "had",
        "audioText": "If we had only official histories, we would know the names of kings but not the sound of a market."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It ___ in Bianjing, today's Kaifeng, that the artist found his subject.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "It was in Bianjing, today's Kaifeng, that the artist found his subject."
      }
    ]
  },
  {
    "id": "gk-r3-s07",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 7,
    "title": "The River That United an Empire",
    "titleCn": "连接帝国的大河",
    "coverEmoji": "🛶",
    "paragraphs": [
      {
        "text": "Imagine a river that runs not from the mountains to the sea, but from the north of China to the south. If the ancient engineers had never built such a waterway, grain from the south might never have reached the northern capital. It was the canal that united the country.",
        "translation": "想象一条河，它不是从山间流向大海，而是从中国北方流向南方。倘若古代的工匠从未修建这样一条水道，南方的粮食也许永远无法运抵北方的都城。正是这条运河把整个国家连在了一起。"
      },
      {
        "text": "The oldest sections of the canal appeared more than two thousand years ago, but they were separate and short. In the early seventh century, workers joined these pieces into one long route across the country. Not only did they dig new channels, but they also repaired old ones so that boats could travel for many days.",
        "translation": "运河最古老的部分出现在两千多年前，但它们彼此分隔，而且很短。七世纪初，工匠们把这些片段连接成一条横贯全国的长长水道。他们不仅开凿了新的河道，还修整了旧河道，让船只能够连续航行许多天。"
      },
      {
        "text": "No sooner had the harvest been gathered in the south than boats loaded with rice set off for the north. The canal soon became the empire's busiest road. Along this route, goods, ideas and even music moved from one end of the country to the other. Had it not been for this waterway, the capital would have depended on slow carts and muddy roads. Workers, meanwhile, had to keep the water deep enough for the largest ships of the age.",
        "translation": "南方的庄稼一收割完毕，装满大米的船只便向北出发。这条运河很快成了帝国最繁忙的道路。沿着这条路线，货物、思想甚至音乐从国家的一端流向另一端。若不是有这样一条水道，都城就只能依靠缓慢的车马和泥泞的道路。而与此同时，工匠们还必须让水足够深，以承载当时最大的船只。"
      },
      {
        "text": "Today, more than a thousand years later, the canal still carries water and ships through several provinces of eastern China. If you walked along its banks at night, you would hear the low sound of water that travellers heard long ago. It is this quiet connection with the past, perhaps, that makes the canal a living museum.",
        "translation": "一千多年后的今天，这条运河依然流经中国东部的几个省份，运送着水和船只。假如你在夜里沿着河岸散步，你会听到很久以前的旅人所听到的那低低的水声。也许正是这种与过去的静静相连，使这条运河成为一座活的博物馆。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the boats carry from the south to the north?",
        "audioText": "What did the boats carry from the south to the north?",
        "options": [
          {
            "emoji": "🌾",
            "value": "rice",
            "text": "Rice"
          },
          {
            "emoji": "🧱",
            "value": "bricks",
            "text": "Bricks"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          }
        ],
        "answer": "rice"
      },
      {
        "type": "word_builder",
        "word": "canal",
        "audioText": "canal"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "the",
          "canal",
          "that",
          "united",
          "the",
          "country."
        ],
        "audioText": "It was the canal that united the country."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "canal",
          "soon",
          "became",
          "the",
          "empire's",
          "busiest",
          "road."
        ],
        "audioText": "The canal soon became the empire's busiest road."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "No sooner had the harvest been gathered in the south ___ boats loaded with rice set off for the north.",
        "choices": [
          "than",
          "then",
          "when"
        ],
        "answer": "than",
        "audioText": "No sooner had the harvest been gathered in the south than boats loaded with rice set off for the north."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Had it not ___ for this waterway, the capital would have depended on slow carts and muddy roads.",
        "choices": [
          "been",
          "be",
          "being"
        ],
        "answer": "been",
        "audioText": "Had it not been for this waterway, the capital would have depended on slow carts and muddy roads."
      }
    ]
  },
  {
    "id": "gk-r3-s08",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 8,
    "title": "The Stone That Learned to Speak",
    "titleCn": "重新开口的石头",
    "coverEmoji": "🪨",
    "paragraphs": [
      {
        "text": "In 1799, French soldiers repairing a wall in an Egyptian town found a large stone covered with three different kinds of writing. The same message appeared three times: in picture signs, in everyday writing and in Greek. Scholars who could read Greek understood the meaning at once, but nobody could read the picture signs. If the stone had never been found, would we still be unable to hear ancient Egypt speak?",
        "translation": "1799 年，法国士兵在埃及一座小镇修缮一堵墙时，发现了一块刻有三种不同文字的大石头。同一段话出现了三次：图画符号、日常文字和希腊文。能读懂希腊文的学者立刻明白了它的意思，却没有人能读懂那些图画符号。假如这块石头从未被发现，我们是否至今仍无法听见古埃及开口说话？"
      },
      {
        "text": "For more than twenty years, the puzzle defeated every expert who tried to solve it. Some argued that the picture signs simply stood for ideas, and that each sign had one fixed meaning. A young French teacher named Jean-François Champollion refused to accept this simple explanation. He had taught himself several ancient languages, and he believed that the signs might also record sounds.",
        "translation": "二十多年里，这道谜题难倒了每一位试图破解它的专家。有人认为图画符号只表示意思，而且每个符号都有一个固定的含义。一位名叫让-弗朗索瓦·商博良的年轻法语教师拒绝接受这种过于简单的解释。他自学了好几种古代语言，并相信这些符号也可能记录声音。"
      },
      {
        "text": "Not only did Champollion learn how to read old Egyptian documents, but he also compared the names of rulers with the Greek text on the stone. It was the repeated pattern of one particular name that finally gave him the key. If he had trusted the experts instead of his own careful reading, the breakthrough would never have come. In 1822, after years of patient work, he announced that the picture signs could be read at last.",
        "translation": "商博良不仅学会了阅读古埃及文献，还把统治者的名字同石头上的希腊文作了对比。正是一个特殊名字反复出现的规律，最终给了他打开大门的钥匙。倘若他当时相信专家而不是自己细致的阅读，这一突破就永远不会到来。1822 年，经过多年耐心的工作，他宣布这些图画符号终于可以被读出来了。"
      },
      {
        "text": "No sooner had the news spread than students and travelers hurried to Egypt to copy every wall they could reach. Thanks to one quiet young man, a civilization silent for more than a thousand years began to tell its story again. Not only do we now know the names of forgotten kings, but we can also read their letters and songs. It is ordinary human curiosity, not wealth or power, that keeps the past alive.",
        "translation": "消息一传开，学生和旅行者就纷纷赶往埃及，抄写他们能够接触到的每一面墙。多亏了这位沉默的年轻人，一个沉寂了一千多年的文明重新开始讲述自己的故事。如今我们不仅知道了那些被遗忘的国王的名字，还能读到他们的书信和歌谣。让过去活下来的，正是普通人那种好奇心，而不是财富或权力。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did French soldiers find in an Egyptian town in 1799?",
        "audioText": "What did French soldiers find in an Egyptian town in 1799?",
        "options": [
          {
            "emoji": "🪨",
            "value": "stone",
            "text": "A large stone covered with writing"
          },
          {
            "emoji": "👑",
            "value": "crown",
            "text": "A golden crown"
          },
          {
            "emoji": "🗺️",
            "value": "map",
            "text": "An old map"
          }
        ],
        "answer": "stone"
      },
      {
        "type": "word_builder",
        "word": "puzzle",
        "audioText": "puzzle"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "puzzle",
          "defeated",
          "every",
          "expert"
        ],
        "audioText": "For more than twenty years, the puzzle defeated every expert who tried to solve it."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "picture",
          "signs",
          "could",
          "be",
          "read",
          "at",
          "last"
        ],
        "audioText": "In 1822, after years of patient work, he announced that the picture signs could be read at last."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If he ___ trusted the experts instead of his own careful reading, the breakthrough would never have come.",
        "choices": [
          "had",
          "has",
          "have"
        ],
        "answer": "had",
        "audioText": "If he had trusted the experts instead of his own careful reading, the breakthrough would never have come."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ Champollion learn how to read old Egyptian documents, but he also compared the names of rulers with the Greek text on the stone.",
        "choices": [
          "did",
          "does",
          "had"
        ],
        "answer": "did",
        "audioText": "Not only did Champollion learn how to read old Egyptian documents, but he also compared the names of rulers with the Greek text on the stone."
      }
    ]
  },
  {
    "id": "gk-r3-s09",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 9,
    "title": "The Boy Who Painted Mountains",
    "titleCn": "画出群山的少年",
    "coverEmoji": "🏔️",
    "paragraphs": [
      {
        "text": "In a quiet hall of a museum in Beijing hangs a handscroll that is almost twelve metres long. The long silk is covered with brilliant blues and greens that seem to glow with their own light. It shows quiet rivers, crowded bridges, small villages and endless mountains stretching towards the far horizon. The work is called A Thousand Li of Rivers and Mountains, and for centuries people believed that only an old master could have painted it. The truth is more surprising still.",
        "translation": "在北京一家博物馆安静的大厅里，悬挂着一幅近十二米长的手卷。长长的绢帛上铺满明亮的青绿色，仿佛自身在发光。画中绘有安静的河流、拥挤的桥梁、小小的村庄，以及一直延伸到远方地平线的群山。这幅作品名为《千里江山图》，几个世纪以来，人们都相信只有年迈的大师才能画得出它。而真相更加出人意料。"
      },
      {
        "text": "It was a teenager named Wang Ximeng who created this masterpiece when he was only eighteen years old. Emperor Huizong, who ruled China in the early twelfth century, had set up a special school for young painters. Not only did he choose the students himself, but he also corrected their brushwork with his own hand. If the emperor had not noticed this shy boy, the famous scroll would never have come into being.",
        "translation": "画出这幅杰作的，是一位名叫王希孟的少年，当时他年仅十八岁。十二世纪初统治中国的皇帝宋徽宗，曾创办了一所专门培养年轻画家的学校。他不仅亲自挑选学生，还亲手批改他们的笔法。倘若皇帝没有留意到这个腼腆的少年，这幅名卷就永远不会诞生。"
      },
      {
        "text": "Wang Ximeng worked for half a year, covering the long silk with colours made from rare and costly minerals. His blues and greens have never faded. Even after nine hundred years, the mountains still look as fresh as they did on the day he finished them. No sooner had he completed the scroll than he fell ill and died, leaving behind only a single work.",
        "translation": "王希孟画了半年之久，用珍稀而昂贵的矿石制成的颜料铺满长长的绢帛。他的青绿之色从未褪去。即使过了九百年，那些山峦看上去仍像他画完那天一样新鲜。可就在他完成这幅长卷之后，他便病倒离世，只留下一件作品。"
      },
      {
        "text": "Only one work by his hand survives today, and it is protected as a national treasure. What we know about the painter comes from a short note added to the scroll by an official of that time. Without that short note, the name of the painter might have been lost forever. If the official had kept silent, we would never have known who painted these blue mountains.",
        "translation": "如今，出自他手的作品仅存这一件，被当作国宝一样保护着。我们对这位画家所知的一切，都来自当时一位官员在卷后写下的简短题记。若没有那段题记，这位画家的名字也许早已湮没无闻。假如那位官员当时保持沉默，我们便永远不会知道是谁画下了这些青绿群山。"
      },
      {
        "text": "Today crowds wait patiently in long lines to see the scroll inside its glass case. Visitors often say that they feel quite small before such a long and detailed landscape. It reminds them that great art does not always come from long years of experience. Were it not for one gifted teenager, this view of old China would not exist at all.",
        "translation": "今天，人们排着长队耐心等待，只为看一眼玻璃展柜中的这幅长卷。参观者常说，面对这样一幅绵长而精细的山水，他们会觉得自己十分渺小。它提醒人们：伟大的艺术并不总是来自长年的经验。若不是这位天赋异禀的少年，这幅古老中国的景象便根本不会存在。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the handscroll mainly show?",
        "audioText": "What does the handscroll mainly show?",
        "options": [
          {
            "emoji": "🏔️",
            "value": "mountains",
            "text": "Mountains and rivers"
          },
          {
            "emoji": "🐎",
            "value": "horses",
            "text": "Horses and riders"
          },
          {
            "emoji": "⛵",
            "value": "ships",
            "text": "Ships and sailors"
          }
        ],
        "answer": "mountains"
      },
      {
        "type": "word_builder",
        "word": "emperor",
        "audioText": "emperor"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "truth",
          "is",
          "more",
          "surprising",
          "still."
        ],
        "audioText": "The truth is more surprising still."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "His",
          "blues",
          "and",
          "greens",
          "have",
          "never",
          "faded."
        ],
        "audioText": "His blues and greens have never faded."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "No sooner had he completed the scroll ___ he fell ill and died.",
        "choices": [
          "than",
          "then",
          "when"
        ],
        "answer": "than",
        "audioText": "No sooner had he completed the scroll than he fell ill and died."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If the official had kept silent, we ___ never have known who painted these blue mountains.",
        "choices": [
          "would",
          "will",
          "must"
        ],
        "answer": "would",
        "audioText": "If the official had kept silent, we would never have known who painted these blue mountains."
      }
    ]
  },
  {
    "id": "gk-r3-s10",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 10,
    "title": "The Dictionary That Took Nine Years",
    "titleCn": "九年写成的词典",
    "coverEmoji": "📖",
    "paragraphs": [
      {
        "text": "In the middle of the eighteenth century, English still had no dictionary that ordinary readers could trust. Nobody could agree on what its words really meant, and every writer spelled them in his own personal way. Across the Channel, forty French scholars had spent forty years building a similar work. Everyone therefore assumed that an English dictionary would need exactly the same small army of helpers. Had anyone asked a London publisher in 1746 whether one writer could finish such a task, the answer would have been a firm no.",
        "translation": "十八世纪中叶，英语还没有一部普通读者能够信赖的词典。没人能就词义达成一致，每位作家都按自己的一套拼写单词。在海峡对岸，四十位法国学者已经花了四十年打造一部类似的巨著。于是人人都认定，一部英语词典同样需要那样一支小小的助手队伍。假如在1746年有人问一位伦敦出版商，一位作家能否独自完成这样的工作，得到的回答一定会是一个干脆的“不”。"
      },
      {
        "text": "Samuel Johnson, a struggling poet and essayist with almost no money, accepted the job anyway and promised to finish it in three years. Not only did he rent a large house in Gough Square, but he also hired six assistants to copy quotations onto paper slips. Together they read through thousands of books, marking every sentence that showed how a word was truly used. If Johnson had relied on his own memory alone, the book would never have grown so rich.",
        "translation": "塞缪尔·约翰逊是一位几乎身无分文的落魄诗人和随笔作家，却接下了这份工作，并承诺三年内完成。他不仅在高尔广场租了一栋大房子，还雇了六名助手，把引文抄到纸片上。他们一起读遍成千上万本书，凡是能说明一个词真正用法的句子都标记下来。假如约翰逊只依赖自己的记忆，这部书绝不会如此丰富。"
      },
      {
        "text": "The work took far longer than promised. About forty thousand words went in, each one explained with examples carefully drawn from real books and letters. It was in this crowded, noisy room that the first truly modern English dictionary slowly took shape. No sooner had the last pages gone to the printer than Johnson noticed how much he had left out.",
        "translation": "这项工作花的时间远远超出了他的承诺。约四万个词被收录进来，每个词都用取自真实书籍和信件的例句仔细解释。正是在这间拥挤嘈杂的屋子里，第一部真正现代意义上的英语词典慢慢成形。最后几页刚送进印刷厂，约翰逊就发现他漏掉了多少内容。"
      },
      {
        "text": "The finished dictionary appeared in 1755, nine long years after Johnson had begun the work. It was not a perfect book. Its writer knew that better than anyone. What he offered readers was not only a list of words, but a new way of thinking about language. Had he waited for perfection, he would have published nothing at all. The volume stayed in use for more than a century, and some of its definitions are still quoted today.",
        "translation": "1755年，这部词典终于问世，距约翰逊动笔已过去整整九年。它并非完美的书，它的作者比谁都清楚这一点。他交给读者的不只是一份词表，更是一种思考语言的新方式。倘若他非要等到完美才出版，那他什么也出版不了。这部词典沿用了百余年，其中一些释义至今仍被引用。"
      },
      {
        "text": "Johnson's house in Gough Square is a small museum now, and visitors still climb its narrow wooden stairs. A single writer, working slowly in his own house, had done what an army of scholars was expected to do.",
        "translation": "约翰逊在高尔广场的故居如今是一座小小的博物馆，游客依然会攀登那狭窄的木楼梯。一位独自伏案的写作者，缓慢地做成了人们本以为需要一支学者大军才能完成的事。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Johnson's assistants copy onto paper slips?",
        "audioText": "What did Johnson's assistants copy onto paper slips?",
        "options": [
          {
            "emoji": "📜",
            "value": "quotations",
            "text": "Quotations from books"
          },
          {
            "emoji": "✏️",
            "value": "opinions",
            "text": "Their own opinions"
          },
          {
            "emoji": "🗺️",
            "value": "maps",
            "text": "Maps of London"
          }
        ],
        "answer": "quotations"
      },
      {
        "type": "word_builder",
        "word": "dictionary",
        "audioText": "dictionary"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "work",
          "took",
          "far",
          "longer",
          "than",
          "promised."
        ],
        "audioText": "The work took far longer than promised."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "not",
          "a",
          "perfect",
          "book."
        ],
        "audioText": "It was not a perfect book."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was in this crowded, noisy room ___ the first truly modern English dictionary slowly took shape.",
        "choices": [
          "that",
          "where",
          "which"
        ],
        "answer": "that",
        "audioText": "It was in this crowded, noisy room that the first truly modern English dictionary slowly took shape."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ he rent a large house in Gough Square, but he also hired six assistants to copy quotations onto paper slips.",
        "choices": [
          "did",
          "does",
          "had"
        ],
        "answer": "did",
        "audioText": "Not only did he rent a large house in Gough Square, but he also hired six assistants to copy quotations onto paper slips."
      }
    ]
  },
  {
    "id": "gk-r3-s11",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 11,
    "title": "A History Written in Silence",
    "titleCn": "沉默中写成的历史",
    "coverEmoji": "🖌️",
    "paragraphs": [
      {
        "text": "More than two thousand years ago, a young man travelled across China with a brush and a roll of bamboo slips. His father had begun a great history of the known world but had died before he could finish it. If the son had refused that task, the memory of three thousand years might have disappeared forever. It was this promise, made at his father's bedside, that shaped the rest of his life.",
        "translation": "两千多年前，一个年轻人带着一支笔和一卷竹简走遍了中国。他的父亲曾着手撰写一部关于已知世界的伟大历史，却没写完就去世了。倘若儿子拒绝了这项使命，三千年的记忆也许会永远消失。正是这个在父亲病榻前许下的承诺，塑造了他此后的一生。"
      },
      {
        "text": "The young man's name was Sima Qian, and he believed that a historian must be patient as well as honest. Not only did he read every ancient book in the royal library, but he also walked to the places where history had happened. He stood on old battlefields and asked farmers and soldiers what their grandparents had told them. Wherever a story sounded too perfect, he compared it with another version and recorded his own doubts.",
        "translation": "这个年轻人名叫司马迁，他相信历史学家既要诚实，也要有耐心。他不仅读遍了皇家藏书中的每一部古书，还亲自走到历史发生的地方。他站在古老的战场上，向农夫和士兵询问他们的祖辈讲过什么。凡是某个故事听起来太过完美，他都会与另一个版本对照，并记下自己的疑问。"
      },
      {
        "text": "Then disaster arrived, and it arrived because of a single honest opinion. He spoke up for a general who had lost a battle, and the emperor was furious. The punishment that followed was so terrible that many people thought death would have been the easier choice. Had he chosen to die, he would have been remembered as a loyal official, but the great history in his hands would never have been completed.",
        "translation": "后来灾难降临了，而起因只是一句诚实的看法。他为一位打了败仗的将军辩护，皇帝勃然大怒。随之而来的惩罚如此严酷，以至于许多人都认为死反而是更轻松的选择。如果他选择去死，他会被后人记作一位忠臣，但他手中的那部伟大历史却永远不会完成。"
      },
      {
        "text": "Sima Qian chose to live, although he knew that many people would never understand why. For years he worked in silence, correcting, cutting and adding, until the bamboo slips filled a small room. It was not fame that kept him writing, but the belief that the past can guide the future. In the end his book contained one hundred and thirty chapters and covered three thousand years.",
        "translation": "司马迁选择了活下去，尽管他知道很多人永远不会理解为什么。多年来他默默工作，修改、删减、添补，直到竹简堆满了一间小屋。让他坚持写作的并不是名声，而是“过去能够指引未来”这一信念。最终，他的书有一百三十篇，记述了三千年的历史。"
      },
      {
        "text": "He called his great work the Records of the Grand Historian, a book that has been read for over two thousand years. Were it not for that quiet decision, later generations would have lost a mirror in which to see themselves. Students today still turn his pages, learning that courage sometimes means waiting and working rather than fighting. Not every hero carries a sword; some simply carry a brush and a promise.",
        "translation": "他把这部巨著称为《史记》，一本两千多年来始终被人阅读的书。若不是那个安静的决定，后世便会失去一面照见自己的镜子。今天的学生仍在翻阅他的书页，从中懂得：勇气有时意味着等待和耕耘，而不是争斗。并非每个英雄都手持长剑；有些英雄只是握着一支笔和一个承诺。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what did Sima Qian use to record history?",
        "audioText": "According to the text, what did Sima Qian use to record history?",
        "options": [
          {
            "emoji": "🖌️",
            "value": "brush",
            "text": "A brush"
          },
          {
            "emoji": "⚔️",
            "value": "sword",
            "text": "A sword"
          },
          {
            "emoji": "🥁",
            "value": "drum",
            "text": "A drum"
          }
        ],
        "answer": "brush"
      },
      {
        "type": "word_builder",
        "word": "historian",
        "audioText": "historian"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Not",
          "only",
          "did",
          "he",
          "read",
          "every",
          "ancient",
          "book"
        ],
        "audioText": "Not only did he read every ancient book."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "not",
          "fame",
          "that",
          "kept",
          "him",
          "writing"
        ],
        "audioText": "It was not fame that kept him writing."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If the son ___ that task, the memory of three thousand years might have disappeared forever.",
        "choices": [
          "had refused",
          "refused",
          "would refuse"
        ],
        "answer": "had refused",
        "audioText": "If the son had refused that task, the memory of three thousand years might have disappeared forever."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ it not for that quiet decision, later generations would have lost a mirror in which to see themselves.",
        "choices": [
          "Were",
          "Was",
          "Had"
        ],
        "answer": "Were",
        "audioText": "Were it not for that quiet decision, later generations would have lost a mirror in which to see themselves."
      }
    ]
  },
  {
    "id": "gk-r3-s12",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 12,
    "title": "The Bridge That Time Could Not Break",
    "titleCn": "时间冲不垮的石桥",
    "coverEmoji": "🌉",
    "paragraphs": [
      {
        "text": "In the south of Hebei Province, a grey stone bridge has crossed the Jiao River for more than fourteen hundred years. Most people know it as the Zhaozhou Bridge, and it was built around 605 by a craftsman named Li Chun. If Li Chun had copied older designs, the river would have blocked itself with ice and mud every spring. He chose a single arch instead.",
        "translation": "在河北省南部，一座灰色的石桥横跨洨河，已经屹立了一千四百多年。大多数人称它为赵州桥，它大约建于公元605年，建造者是一位名叫李春的工匠。假如李春照搬了更早的桥梁设计，这条河每年春天都会被冰块和泥沙堵住。他没有那样做，而是选择了一道单拱。"
      },
      {
        "text": "The arch is huge, yet the stone is surprisingly thin, and the whole structure looks lighter than it should. Not only did the single arch save stone, but it also let flood water rush away freely. Four small arches, two at each end, carry away extra water when the river rises. It was these openings that saved the bridge.",
        "translation": "这道拱巨大无比，可石料却出奇地薄，整个结构看上去比它应有的样子轻巧得多。单拱不仅节省了石料，还让洪水能够顺畅地冲走。四个小拱分列两端，每当河水上涨时就分走多余的水流。正是这些小开口救了这座桥。"
      },
      {
        "text": "Earthquakes shook the region many times, and wars destroyed the towns on both banks of the river. No sooner had the water dropped than farmers were driving their carts across the stones again. Craftsmen in later dynasties repaired small parts, but they never had to rebuild the great arch itself. A Tang official who saw it in 725 called it the finest bridge under heaven.",
        "translation": "地震多次震动这一带，战火也摧毁过河两岸的城镇。洪水刚一退去，农人又赶着车从石桥上经过。后世各朝的工匠修补过一些小部件，却从不需要重建那道大拱。一位唐代官员在公元725年见到它，称它是天下最好的桥。"
      },
      {
        "text": "Today the Zhaozhou Bridge is a protected monument, and visitors walk across it in every season. Heavy trucks are no longer allowed, for the ancient stones could not carry such weight. If the stones could speak, they would tell us about a thousand years of footsteps, wheels and horses. It is the patience of a good design that keeps a bridge alive long after its builders are gone.",
        "translation": "如今，赵州桥是一处受保护的历史遗迹，一年四季都有游人在桥上走过。重型卡车不再获准通行，因为古老的石料承受不了那样的重量。假如石头会说话，它们会向我们讲述一千年的脚步、车轮与马匹。正是好设计里的那份耐心，让一座桥在建造者逝去很久之后依然存在。"
      },
      {
        "text": "Li Chun left no statue behind, and only a short line in an old book records his name. Yet every spring, when the river rises, his answer to a hard problem still carries the road above the water. If he had built only for praise, his work might have been forgotten long ago. Perhaps that quiet, useful kind of fame is the truest of all.",
        "translation": "李春没有留下雕像，只有古书中短短一行字记下了他的名字。然而每到春天河水上涨时，他给那个难题的答案依然托着路面，让它悬在水面之上。假如他只为赞誉而建，他的作品也许早已被遗忘。或许，那种安静而有用的名声，才是最真实的名声。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which feature of the bridge does the text say saved it during floods?",
        "audioText": "Which feature of the bridge does the text say saved it during floods?",
        "options": [
          {
            "emoji": "🧱",
            "value": "walls",
            "text": "Thick stone walls"
          },
          {
            "emoji": "🕳️",
            "value": "openings",
            "text": "Small openings for water"
          },
          {
            "emoji": "🚪",
            "value": "gates",
            "text": "Heavy iron gates"
          }
        ],
        "answer": "openings"
      },
      {
        "type": "word_builder",
        "word": "earthquake",
        "audioText": "earthquake"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "these",
          "openings",
          "that",
          "saved",
          "the",
          "bridge."
        ],
        "audioText": "It was these openings that saved the bridge."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "chose",
          "a",
          "single",
          "arch",
          "instead."
        ],
        "audioText": "He chose a single arch instead."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If Li Chun ___ copied older designs, the river would have blocked itself with ice and mud every spring.",
        "choices": [
          "has",
          "had",
          "would have"
        ],
        "answer": "had",
        "audioText": "If Li Chun had copied older designs, the river would have blocked itself with ice and mud every spring."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ the single arch save stone, but it also let flood water rush away freely.",
        "choices": [
          "did",
          "does",
          "was"
        ],
        "answer": "did",
        "audioText": "Not only did the single arch save stone, but it also let flood water rush away freely."
      }
    ]
  },
  {
    "id": "gk-r3-s13",
    "track": "gaokao",
    "regionId": "gk-r3",
    "order": 13,
    "title": "The Stage That Taught a City",
    "titleCn": "教化一座城邦的舞台",
    "coverEmoji": "🎭",
    "paragraphs": [
      {
        "text": "Long before books were cheap, the citizens of Athens gathered outdoors to watch stories acted out beneath the sun. If there had been no theatre, most of them would never have met a hero, a queen or a traitor at all. What they saw on those stone steps was not simply entertainment but a lesson about being human.",
        "translation": "早在书籍还很便宜之前，雅典的公民就聚集在露天，观看在阳光下演出的故事。假如没有戏剧，他们中的大多数人根本不会遇见英雄、女王或叛徒。他们在那些石阶上看到的，不只是娱乐，而是一堂关于如何做人的课。"
      },
      {
        "text": "Not only did the actors wear masks, but they also changed their voices, so that one man could play several parts. A wide mouth in the mask carried the words to the furthest row. The painted face told you at once whether the character was young or old, honest or dangerous. No sooner had the audience sat down than the chorus began to speak for the whole community.",
        "translation": "演员不仅戴着面具，还变换嗓音，于是一个人就能扮演好几个角色。面具上宽大的嘴把台词送到最远的一排。彩绘的脸让你一眼就能看出这个角色是年轻还是年老，是诚实还是危险。观众刚一坐下，歌队就开始为整个城邦发声。"
      },
      {
        "text": "Many of these plays asked uncomfortable questions. A tragedy might show a ruler who destroys his own family because he refuses to listen to advice. A comedy might laugh at a politician who talks far too much. Because every citizen was expected to attend, the theatre became a place where a city argued with itself in public.",
        "translation": "这些剧作中有许多提出了令人不安的问题。悲剧可能展示一位统治者因为拒绝听取建议而毁掉自己的家庭。喜剧则可能嘲笑一个话太多的政客。由于每个公民都被期待到场，剧场便成了一个城邦公开与自身争论的地方。"
      },
      {
        "text": "The stone buildings themselves were engineering marvels of their age. It was the shape of the seating, not any machine, that carried a whisper to the back row. No sooner had the Romans taken Greece than they copied these designs and built theatres across their empire. Not only did they keep the old plays alive, but they also spread the habit of listening together.",
        "translation": "这些石头建筑本身就是那个时代的工程奇迹。把一句低语送到后排的，是座位的形状，而不是任何机器。罗马人一拿下希腊，就照搬了这些设计，并在帝国各地修建剧场。他们不仅让古老的剧本活了下来，还把一起聆听的习惯传播开来。"
      },
      {
        "text": "If you sat in one of those theatres today, you would still feel the same trick at work. A single voice reaches every ear. That is why these ruins still matter. They remind us that a city is held together not by walls but by the stories its people agree to share.",
        "translation": "如果你今天坐在其中一座剧场里，你仍会感到同样的机关在起作用——一个声音就能传到每一只耳朵。这就是这些废墟至今仍然重要的原因。它们提醒我们：把一座城市联结在一起的，不是城墙，而是人们愿意共同分享的故事。"
      }
    ],
    "quiz": [
      {
        "type": "word_builder",
        "word": "tragedy",
        "audioText": "tragedy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Many",
          "of",
          "these",
          "plays",
          "asked",
          "uncomfortable",
          "questions."
        ],
        "audioText": "Many of these plays asked uncomfortable questions."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "is",
          "why",
          "these",
          "ruins",
          "still",
          "matter."
        ],
        "audioText": "That is why these ruins still matter."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ the actors wear masks, but they also changed their voices.",
        "choices": [
          "did",
          "do",
          "had"
        ],
        "answer": "did",
        "audioText": "Not only did the actors wear masks, but they also changed their voices."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If there ___ no theatre, most of them would never have met a hero, a queen or a traitor at all.",
        "choices": [
          "had been",
          "were",
          "has been"
        ],
        "answer": "had been",
        "audioText": "If there had been no theatre, most of them would never have met a hero, a queen or a traitor at all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was the shape of the seating, not any machine, ___ carried a whisper to the back row.",
        "choices": [
          "that",
          "what",
          "whose"
        ],
        "answer": "that",
        "audioText": "It was the shape of the seating, not any machine, that carried a whisper to the back row."
      }
    ]
  },
  {
    "id": "gk-r4-s01",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 1,
    "title": "Small Habits, Big Health",
    "titleCn": "小习惯，大健康",
    "coverEmoji": "🫀",
    "paragraphs": [
      {
        "text": "Sleep is not a luxury, and treating it like one always costs you later. Getting enough sleep is one of the simplest ways to protect your health. Yet many students treat sleep as something they can always cut short when a screen is waiting. If you often feel tired in class, you should have gone to bed earlier instead of watching one more video.",
        "translation": "睡眠不是奢侈品，而把它当成奢侈品，早晚会让你付出代价。睡够觉是保护健康最简单的方法之一。然而很多学生把睡眠当成随时可以压缩的事，只要还有一块屏幕在等着他们。如果你上课常常觉得累，那你早就该去睡觉，而不是再多看一个视频。"
      },
      {
        "text": "Moving your body for just twenty minutes a day can change how your brain works. Exercise releases chemicals that lift your mood and help you think more clearly. Trying to study all evening without a break usually makes you slower, not faster.",
        "translation": "每天只需活动身体二十分钟，就能改变大脑的运作方式。运动会释放某些化学物质，让你心情变好、思路更清晰。想整个晚上一直学习而不休息，通常只会让你更迟钝，而不是更快。"
      },
      {
        "text": "Eating well does not mean giving up every snack that you enjoy. What matters is balance, not perfection: fruit, vegetables and whole grains most of the time, with sweets saved for special moments. Skipping breakfast to save ten minutes is a habit you should have dropped long ago.",
        "translation": "吃得好并不意味着要放弃所有你喜欢的零食。重要的是平衡，而不是完美：大部分时候吃水果、蔬菜和全谷物，把甜食留给特别的时刻。为了省十分钟而不吃早餐，是你早该改掉的习惯。"
      },
      {
        "text": "Looking after your mind matters just as much as looking after your body. When stress builds up, talking to a friend or a teacher can make a real difference. Nobody was ever meant to carry every worry alone, so asking for help is a sign of strength.",
        "translation": "照顾心理和照顾身体同样重要。当压力不断累积时，和朋友或老师聊一聊真的会带来改变。没有人天生就该独自承担所有的烦恼，所以主动求助是坚强的表现。"
      },
      {
        "text": "None of these changes has to happen overnight. Choosing one small habit and keeping it for a month is far better than planning a perfect routine you never begin. Small habits beat perfect plans. Your future self will thank you for the choice you make today.",
        "translation": "这些改变都不必一夜之间完成。选一个小习惯并坚持一个月，远比制定一个完美却从未开始的计划要好得多。小习惯胜过完美计划。未来的你，会感谢你今天做出的选择。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, which activity can lift your mood and help you think more clearly?",
        "audioText": "According to the passage, which activity can lift your mood and help you think more clearly?",
        "options": [
          {
            "emoji": "🏃",
            "value": "exercise",
            "text": "Exercise"
          },
          {
            "emoji": "🍬",
            "value": "sweets",
            "text": "Sweets"
          },
          {
            "emoji": "📱",
            "value": "screens",
            "text": "Screens"
          }
        ],
        "answer": "exercise"
      },
      {
        "type": "word_builder",
        "word": "balance",
        "audioText": "balance"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Small",
          "habits",
          "beat",
          "perfect",
          "plans"
        ],
        "audioText": "Small habits beat perfect plans."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "None",
          "of",
          "these",
          "changes",
          "has",
          "to",
          "happen",
          "overnight."
        ],
        "audioText": "None of these changes has to happen overnight."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you often feel tired in class, you should have ___ to bed earlier instead of watching one more video.",
        "choices": [
          "gone",
          "went",
          "going"
        ],
        "answer": "gone",
        "audioText": "If you often feel tired in class, you should have gone to bed earlier instead of watching one more video."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ breakfast to save ten minutes is a habit you should have dropped long ago.",
        "choices": [
          "Skipping",
          "Skip",
          "Skipped"
        ],
        "answer": "Skipping",
        "audioText": "Skipping breakfast to save ten minutes is a habit you should have dropped long ago."
      }
    ]
  },
  {
    "id": "gk-r4-s02",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 2,
    "title": "Small Habits, Strong Mind",
    "titleCn": "小习惯，强心智",
    "coverEmoji": "🧠",
    "paragraphs": [
      {
        "text": "Getting enough sleep each night is one of the simplest ways to protect your mental health. Many students believe that staying up late gives them more time to study for exams. However, research shows that losing even one hour of sleep can affect your mood and memory. To feel calm and focused during the day, teenagers need about eight hours of rest.",
        "translation": "每晚睡够觉，是保护心理健康最简单的方法之一。很多学生认为，熬夜能让他们有更多时间备考。然而研究表明，哪怕只是少睡一小时，也会影响你的情绪和记忆力。想在白天保持平静和专注，青少年需要大约八小时的休息。"
      },
      {
        "text": "Exercise matters for the mind as much as for the body. Walking, swimming or cycling for thirty minutes a day helps your brain release chemicals that improve your mood. Doctors suggest choosing an activity you actually enjoy, because you are more likely to keep doing it. A short walk after dinner can reduce stress.",
        "translation": "运动对心智的重要性，不亚于对身体。每天散步、游泳或骑车三十分钟，能帮助大脑释放改善情绪的化学物质。医生建议选择一项你真正喜欢的活动，因为这样你更有可能坚持下去。晚饭后散一小会儿步就能减轻压力。"
      },
      {
        "text": "What you eat also plays an important part in how you feel. Skipping breakfast may seem like a quick way to save time. Yet starting the day without food often makes it harder to concentrate in class. Nutrition experts recommend eating fruits, vegetables and whole grains. Drinking water is a better choice than sugary drinks.",
        "translation": "你吃什么，也在很大程度上影响你的感受。不吃早餐看起来像是省时间的快捷办法。可是空着肚子开始一天，往往让你在课堂上更难集中注意力。营养专家建议多吃水果、蔬菜和全谷物。喝水比喝含糖饮料更好。"
      },
      {
        "text": "Building healthy habits takes patience. Nobody gets everything right at once. If you stayed up too late last week, you should have gone to bed earlier. Blaming yourself for small mistakes, however, will only make you feel worse. Instead, try to change one habit at a time. Remember that looking after your mind is just as important as looking after your body.",
        "translation": "养成健康习惯需要耐心。没有人能一次就把一切都做对。如果上周你熬得太晚，你本应该早点上床睡觉。不过，为小失误责怪自己，只会让你感觉更糟。不如一次只改掉一个习惯。记住，照顾好自己的心理，和照顾好自己的身体同样重要。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "About how many hours of rest do teenagers need each night?",
        "audioText": "About how many hours of rest do teenagers need each night?",
        "options": [
          {
            "emoji": "🕗",
            "value": "eight",
            "text": "Eight hours"
          },
          {
            "emoji": "🕔",
            "value": "five",
            "text": "Five hours"
          },
          {
            "emoji": "🕛",
            "value": "twelve",
            "text": "Twelve hours"
          }
        ],
        "answer": "eight"
      },
      {
        "type": "word_builder",
        "word": "breakfast",
        "audioText": "breakfast"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Doctors suggest ___ an activity you actually enjoy.",
        "choices": [
          "choosing",
          "choose",
          "chose"
        ],
        "answer": "choosing",
        "audioText": "Doctors suggest choosing an activity you actually enjoy."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "A",
          "short",
          "walk",
          "after",
          "dinner",
          "can",
          "reduce",
          "stress."
        ],
        "audioText": "A short walk after dinner can reduce stress."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you stayed up too late last week, you should have ___ to bed earlier.",
        "choices": [
          "gone",
          "go",
          "went"
        ],
        "answer": "gone",
        "audioText": "If you stayed up too late last week, you should have gone to bed earlier."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Building",
          "healthy",
          "habits",
          "takes",
          "patience."
        ],
        "audioText": "Building healthy habits takes patience."
      }
    ]
  },
  {
    "id": "gk-r4-s03",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 3,
    "title": "The Secret Power of Sleep",
    "titleCn": "睡眠的隐秘力量",
    "coverEmoji": "😴",
    "paragraphs": [
      {
        "text": "Most teenagers treat sleep as something they can simply skip when life gets busy. Yet scientists now believe that getting enough rest is as important to your health as eating well. Choosing to sleep eight hours a night may improve your memory, your mood and even your grades.",
        "translation": "大多数青少年把睡眠看成一件忙起来就可以直接跳过的事。然而科学家现在认为，获得充足的休息对你的健康来说和吃得好一样重要。选择每晚睡够八小时，也许能改善你的记忆力、情绪，甚至成绩。"
      },
      {
        "text": "During deep sleep, your brain sorts through everything you learned that day and stores it carefully. If you stay up late studying, you may remember less than you expect the next morning. Losing just a few hours of rest can make a whole lesson harder to recall.",
        "translation": "在深度睡眠中，你的大脑会把当天学到的所有内容整理一遍，并仔细储存起来。如果你熬夜学习，第二天早上你能记住的东西可能比预想的要少。仅仅少睡几个小时，就可能让一整节课的内容都更难回想起来。"
      },
      {
        "text": "Sleep and mood are closely connected, so it is hardly surprising that tired students feel anxious easily. Many doctors recommend taking a short walk outside when worries seem too heavy to carry. Moving your body for twenty minutes can calm your mind and help you think clearly again.",
        "translation": "睡眠和情绪关系密切，所以疲惫的学生容易焦虑，一点也不奇怪。当烦恼沉重得难以承受时，许多医生建议到户外散一小会儿步。让身体活动二十分钟，可以让你静下心来，重新清晰地思考。"
      },
      {
        "text": "What you eat also plays a part, since heavy meals late at night disturb your sleep. Perhaps you should have gone to bed earlier instead of checking your phone for another hour. Small changes are easy to start, but keeping them going is what really matters.",
        "translation": "你吃的东西也起作用，因为深夜的大餐会扰乱你的睡眠。也许你本该早点上床，而不是再刷一个小时手机。小小的改变容易开始，但真正重要的是坚持下去。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, which activity helps your brain store what you learned?",
        "audioText": "According to the passage, which activity helps your brain store what you learned?",
        "options": [
          {
            "emoji": "🛏️",
            "value": "sleep",
            "text": "Sleeping well"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "Checking your phone"
          },
          {
            "emoji": "🍔",
            "value": "meal",
            "text": "A heavy late meal"
          }
        ],
        "answer": "sleep"
      },
      {
        "type": "word_builder",
        "word": "memory",
        "audioText": "memory"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Small",
          "changes",
          "are",
          "easy",
          "to",
          "start"
        ],
        "audioText": "Small changes are easy to start."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "tired",
          "students",
          "feel",
          "anxious",
          "easily"
        ],
        "audioText": "tired students feel anxious easily"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Choosing to sleep eight hours a night ___ improve your memory, your mood and even your grades.",
        "choices": [
          "may",
          "must",
          "need"
        ],
        "answer": "may",
        "audioText": "Choosing to sleep eight hours a night may improve your memory, your mood and even your grades."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Perhaps you ___ have gone to bed earlier instead of checking your phone for another hour.",
        "choices": [
          "should",
          "would",
          "can"
        ],
        "answer": "should",
        "audioText": "Perhaps you should have gone to bed earlier instead of checking your phone for another hour."
      }
    ]
  },
  {
    "id": "gk-r4-s04",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 4,
    "title": "Three Keys to a Healthier Mind",
    "titleCn": "让内心更健康的三个关键",
    "coverEmoji": "🧠",
    "paragraphs": [
      {
        "text": "Many students believe that studying for longer hours is the only way to do well in exams. However, doctors and teachers now say that resting well matters just as much as working hard. In fact, the way you sleep, move and eat may shape your mood more than you realise. Here are three simple keys to a calmer and healthier mind.",
        "translation": "许多学生认为，长时间学习是考出好成绩的唯一途径。然而，医生和老师现在都说，休息好和努力学习同样重要。事实上，你睡觉、运动和饮食的方式，可能比你想的更能影响你的情绪。以下是让内心更平静、更健康的三把钥匙。"
      },
      {
        "text": "Getting enough sleep is not a waste of time, because your brain keeps working while you rest. During deep sleep, it quietly sorts out everything you learned and stores it away. Teenagers need about eight to ten hours each night, yet many of them get far less. Sleep is when your brain repairs itself. If you often feel tired in class, you should have gone to bed earlier instead of watching videos. Trying to stay up late to study usually makes your memory worse, not better.",
        "translation": "睡够觉并不是浪费时间，因为你休息时大脑仍在工作。在深度睡眠中，它会悄悄整理你白天学到的一切，并把它们储存起来。青少年每晚大约需要八到十个小时的睡眠，但很多人远远不够。睡眠是大脑自我修复的时候。如果你上课常常觉得累，你本该早点上床睡觉，而不是看视频。想靠熬夜来学习，通常只会让你的记忆力更糟，而不是更好。"
      },
      {
        "text": "Moving your body is another key to feeling calm and focused during a busy week. When you exercise, your brain releases chemicals that improve your mood and reduce stress. You do not need to run a marathon; even a short walk after dinner helps. Some students prefer to play ball games, while others enjoy dancing with friends. The important thing is to choose an activity you actually like doing.",
        "translation": "让身体动起来，是在忙碌的一周里保持平静和专注的另一把钥匙。运动时，大脑会释放改善情绪、减轻压力的化学物质。你不必去跑马拉松；晚饭后哪怕只是散散步也有帮助。有些学生喜欢打球，另一些则喜欢和朋友一起跳舞。重要的是选择一项你真正喜欢的活动。"
      },
      {
        "text": "What you eat matters too. Skipping breakfast may leave you unable to concentrate during your morning lessons. Instead of reaching for sugary drinks and snacks, try to eat fruit, eggs or nuts. Drinking enough water sounds simple, but it keeps your brain working properly all day. A balanced diet does not mean being perfect; it means making sensible choices most of the time.",
        "translation": "你吃什么也很重要。不吃早餐可能让你在上午的课堂上无法集中注意力。与其伸手去拿含糖饮料和零食，不如试着吃点水果、鸡蛋或坚果。喝够水听起来很简单，但它能让你的大脑一整天正常运转。均衡饮食并不意味着做到完美，而是意味着大部分时间做出明智的选择。"
      },
      {
        "text": "None of these habits costs much money or requires special equipment. To build a healthier mind, you simply need to start with one small change and keep going. Remember that it is never too late to take better care of yourself.",
        "translation": "这些习惯都不怎么花钱，也不需要特别的器材。要养成更健康的心态，你只需从一个小小的改变开始，并坚持下去。记住，更好地照顾自己，永远都不算晚。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, which activity helps your brain reduce stress?",
        "audioText": "According to the text, which activity helps your brain reduce stress?",
        "options": [
          {
            "emoji": "🏃",
            "value": "exercise",
            "text": "Exercise"
          },
          {
            "emoji": "📱",
            "value": "videos",
            "text": "Watching videos"
          },
          {
            "emoji": "🍬",
            "value": "sweets",
            "text": "Sugary snacks"
          }
        ],
        "answer": "exercise"
      },
      {
        "type": "word_builder",
        "word": "breakfast",
        "audioText": "breakfast"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sleep",
          "is",
          "when",
          "your",
          "brain",
          "repairs",
          "itself."
        ],
        "audioText": "Sleep is when your brain repairs itself."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "What",
          "you",
          "eat",
          "matters",
          "too."
        ],
        "audioText": "What you eat matters too."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you often feel tired in class, you ___ have gone to bed earlier instead of watching videos.",
        "choices": [
          "should",
          "must",
          "can"
        ],
        "answer": "should",
        "audioText": "If you often feel tired in class, you should have gone to bed earlier instead of watching videos."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ enough water sounds simple, but it keeps your brain working properly all day.",
        "choices": [
          "Drinking",
          "Drink",
          "Drank"
        ],
        "answer": "Drinking",
        "audioText": "Drinking enough water sounds simple, but it keeps your brain working properly all day."
      }
    ]
  },
  {
    "id": "gk-r4-s05",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 5,
    "title": "Exercise: A Medicine For The Mind",
    "titleCn": "运动：治愈心灵的良药",
    "coverEmoji": "🏃",
    "paragraphs": [
      {
        "text": "Taking care of your mental health is just as important as keeping your body strong and fit. Many students believe that lying in bed for hours is the best cure for a bad mood. Movement often works faster. If you have felt low for several weeks, you should have asked for help much earlier. Even a short walk in the fresh air is still a good first step.",
        "translation": "照顾心理健康，和保持身体强壮健康同样重要。许多学生认为，在床上躺上几个小时是治疗坏心情的最佳办法。而运动往往见效更快。如果你已经情绪低落好几个星期了，你早该去寻求帮助。不过，哪怕只是在清新的空气中散一小会儿步，仍然是很好的第一步。"
      },
      {
        "text": "Scientists have found that moving your body changes the chemistry of your brain in helpful ways. When you run, swim or dance, your brain releases chemicals that calm worry and improve your mood. Your mood can change within minutes. Understanding this process helps us to see exercise as a kind of medicine rather than a duty.",
        "translation": "科学家发现，活动身体会以有益的方式改变大脑的化学状态。当你跑步、游泳或跳舞时，大脑会释放出让人平静、让人心情变好的化学物质。你的情绪可能在几分钟内就发生变化。理解这一过程，有助于我们把运动看成一种药，而不是一项任务。"
      },
      {
        "text": "You do not need to train for hours at a gym to feel the benefit. Walking to school, cycling to a friend's house or dancing in your room all count. Choosing an activity that you really enjoy is more important than following a strict plan, because you are more likely to keep it up.",
        "translation": "你不需要在健身房里练上好几个小时才能感受到好处。走路上学、骑车去朋友家，或者在自己房间里跳舞，都算数。选择一个你真正喜欢的活动，比照着严格的计划去做更重要，因为这样你更有可能坚持下去。"
      },
      {
        "text": "Sleep and food work together with regular exercise to keep your mind steady and calm. Going to bed at the same time each night helps your body to rest properly. Skipping breakfast may leave you tired in class, so eating a simple meal each morning is worth the effort.",
        "translation": "睡眠和饮食与规律的运动共同作用，让你的心情保持平稳。每晚在同一时间上床睡觉，有助于身体得到充分的休息。不吃早餐可能会让你在课堂上感到疲惫，所以每天早上吃一顿简单的饭是值得的。"
      },
      {
        "text": "Nobody expects you to change everything about your life in a single day. Starting with just ten minutes of movement or one extra hour of sleep is usually enough. You should have treated your mind kindly long ago, and now is a perfect moment to begin.",
        "translation": "没人指望你在一天之内改变生活的一切。从仅仅十分钟的运动，或者多睡一个小时开始，通常就已经足够了。你早就应该善待自己的心，而现在正是开始的绝佳时机。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ to bed at the same time each night helps your body to rest properly.",
        "choices": [
          "Going",
          "Go",
          "Gone"
        ],
        "answer": "Going",
        "audioText": "Going to bed at the same time each night helps your body to rest properly."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Movement",
          "often",
          "works",
          "faster."
        ],
        "audioText": "Movement often works faster."
      },
      {
        "type": "word_builder",
        "word": "movement",
        "audioText": "movement"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you have felt low for several weeks, you should ___ asked for help much earlier.",
        "choices": [
          "have",
          "has",
          "had"
        ],
        "answer": "have",
        "audioText": "If you have felt low for several weeks, you should have asked for help much earlier."
      },
      {
        "type": "image_choice",
        "question": "According to the text, which activity helps your brain release chemicals that calm worry?",
        "audioText": "According to the text, which activity helps your brain release chemicals that calm worry?",
        "options": [
          {
            "emoji": "🏃",
            "value": "running",
            "text": "Running"
          },
          {
            "emoji": "🛌",
            "value": "resting",
            "text": "Resting In Bed"
          },
          {
            "emoji": "🍿",
            "value": "watching",
            "text": "Watching A Film"
          }
        ],
        "answer": "running"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Your",
          "mood",
          "can",
          "change",
          "within",
          "minutes."
        ],
        "audioText": "Your mood can change within minutes."
      }
    ]
  },
  {
    "id": "gk-r4-s06",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 6,
    "title": "Feed Your Brain, Lift Your Mood",
    "titleCn": "喂饱大脑，照亮心情",
    "coverEmoji": "🥗",
    "paragraphs": [
      {
        "text": "Have you ever felt tired, angry or unable to concentrate after eating a large meal of fast food? Scientists now believe that what we eat every day can slowly change the way we feel. The two are closely connected. Choosing healthy meals is not only about keeping a good weight; it is also about protecting our mood. Skipping breakfast, for example, may make it much harder to focus during morning lessons.",
        "translation": "你有没有在吃了一顿快餐大餐之后，感到疲惫、生气，或者无法集中注意力？科学家现在认为，我们每天吃的东西会慢慢改变我们的感受。两者密切相关。选择健康的饮食不仅仅是为了保持合适的体重，也是为了保护我们的情绪。比如，不吃早餐会让你在上午的课上更难集中精神。"
      },
      {
        "text": "To keep the brain working well, we need to give it certain nutrients every day. Omega-3 fats, which are found in fish and nuts, help to build strong brain cells. Vitamins from vegetables and fruit support the chemicals that control our feelings. Eating a colourful plate at every meal is a simple way to get enough of them.",
        "translation": "为了让大脑良好运转，我们需要每天给它提供某些营养素。鱼类和坚果中含有的欧米伽-3脂肪酸，有助于构建强健的脑细胞。来自蔬菜和水果的维生素，则支撑着那些控制我们情绪的化学物质。每餐都吃一盘色彩丰富的食物，是摄取足够营养的简单方法。"
      },
      {
        "text": "Blood sugar also plays an important part in our mood. When we eat sweets, our energy rises quickly and then falls just as fast. That sudden drop can make us anxious. If you felt tired an hour after lunch yesterday, you should have chosen a handful of nuts instead of a sweet drink.",
        "translation": "血糖也在我们的情绪中扮演着重要角色。当我们吃甜食时，能量会迅速升高，然后又同样迅速地下降。这种骤降会让我们感到焦虑。如果你昨天午饭后一小时就觉得累，那你本应该选一把坚果，而不是一杯甜饮料。"
      },
      {
        "text": "How we eat matters just as much as what we eat. Eating slowly helps the body to notice when it is full. Sharing meals makes us feel connected. Turning off your phone at dinner is a small change, but it allows you to enjoy your food and your company.",
        "translation": "我们怎么吃，和我们吃什么同样重要。细嚼慢咽能帮助身体察觉到什么时候已经吃饱了。和别人一起吃饭会让我们感到与人相连。晚餐时关掉手机是个小小的改变，但它能让你好好享受食物和身边人的陪伴。"
      },
      {
        "text": "Improving your diet does not mean giving up everything you love. Trying to add one healthy food each day is a realistic goal. Your brain will thank you, and studying may feel easier too.",
        "translation": "改善饮食并不意味着要放弃所有你爱吃的东西。试着每天增加一种健康食物，是一个切实可行的目标。你的大脑会感谢你，学习也可能变得轻松一些。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, which food helps to build strong brain cells?",
        "audioText": "According to the passage, which food helps to build strong brain cells?",
        "options": [
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🍬",
            "value": "candy",
            "text": "Candy"
          },
          {
            "emoji": "🥤",
            "value": "sweet drink",
            "text": "Sweet drink"
          }
        ],
        "answer": "fish"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Skipping ___, for example, may make it much harder to focus during morning lessons.",
        "choices": [
          "breakfast",
          "homework",
          "exercise"
        ],
        "answer": "breakfast",
        "audioText": "Skipping breakfast, for example, may make it much harder to focus during morning lessons."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "two",
          "are",
          "closely",
          "connected."
        ],
        "audioText": "The two are closely connected."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you felt tired an hour after lunch yesterday, you should have ___ a handful of nuts instead of a sweet drink.",
        "choices": [
          "chosen",
          "choose",
          "choosing"
        ],
        "answer": "chosen",
        "audioText": "If you felt tired an hour after lunch yesterday, you should have chosen a handful of nuts instead of a sweet drink."
      },
      {
        "type": "word_builder",
        "word": "vitamins",
        "audioText": "vitamins"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sharing",
          "meals",
          "makes",
          "us",
          "feel",
          "connected."
        ],
        "audioText": "Sharing meals makes us feel connected."
      }
    ]
  },
  {
    "id": "gk-r4-s07",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 7,
    "title": "Good Food, Better Mood",
    "titleCn": "好食物，好心情",
    "coverEmoji": "🥗",
    "paragraphs": [
      {
        "text": "Most people choose their food by taste alone, but scientists have found a strong link between diet and mood. Choosing the right meals can help you think more clearly and feel calmer during a busy week. To eat well is not just to feed your body; it is also to support your mind.",
        "translation": "大多数人只凭口味挑食物，但科学家发现饮食与情绪之间有着密切的联系。选择合适的三餐能帮你思路更清晰，在忙碌的一周里心情更平静。吃得好不只是喂饱身体，也是在支持你的大脑。"
      },
      {
        "text": "Starting the day with a proper breakfast is one of the simplest habits to build. When you skip it, your blood sugar drops, and you may find it hard to concentrate in class. Many students should have eaten something before the first lesson, but they chose an extra ten minutes in bed instead. A bowl of porridge with fruit, or an egg and some wholemeal bread, will keep you going until lunch.",
        "translation": "用一顿像样的早餐开启一天，是最容易养成的习惯之一。不吃早餐，血糖就会下降，你可能会发现上课很难集中注意力。很多学生本应在第一节课前吃点东西，却选择在床上多赖十分钟。一碗加水果的燕麦粥，或者一个鸡蛋加全麦面包，能让你撑到午饭。"
      },
      {
        "text": "Mood and food are linked. Doctors now suggest eating more colourful vegetables, fruit, nuts and fish, which protect the brain and steady our emotions. These foods contain vitamins and healthy fats that help the body produce chemicals connected with a good mood. Avoiding too much sugar is equally important, because sweet drinks give a quick high followed by a long low. Snacking on an apple instead of a chocolate bar is a small change with a real effect.",
        "translation": "情绪和食物是有关联的。医生如今建议多吃各种颜色的蔬菜、水果、坚果和鱼，它们能保护大脑、稳定情绪。这些食物含有的维生素和健康脂肪，能帮助身体生成与好心情相关的化学物质。少吃糖同样重要，因为甜饮料带来的兴奋来得快，低落也持续得久。把巧克力换成苹果当零食，是小小的改变，却真的有效。"
      },
      {
        "text": "Water is easy to forget. Drinking enough water matters more than most of us realise; even mild thirst can make us tired and irritable. Eating at regular times, and sharing meals with friends or family, also lifts the spirit. Talking and laughing over dinner slows us down and helps us notice when we are full.",
        "translation": "水很容易被忽略。喝够水比我们大多数人意识到的更重要；哪怕只是轻微口渴，也会让人疲倦、烦躁。按时吃饭，和朋友或家人一起用餐，也能提升情绪。晚餐时聊天说笑让我们慢下来，也帮我们察觉自己已经吃饱。"
      },
      {
        "text": "Good eating, then, is not a strict rule but a friendly habit. Enjoying your food, choosing it with care, and giving your body regular fuel will reward you with better moods and sharper thinking.",
        "translation": "所以，好好吃饭不是一条严格的规矩，而是一个友善的习惯。享受食物、用心选择，并给身体规律的能量，你收获的将是更好的心情和更敏锐的思维。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which snack does the passage suggest instead of a chocolate bar?",
        "audioText": "Which snack does the passage suggest instead of a chocolate bar?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "🍫",
            "value": "chocolate",
            "text": "A chocolate bar"
          },
          {
            "emoji": "🥤",
            "value": "sweet_drink",
            "text": "A sweet drink"
          }
        ],
        "answer": "apple"
      },
      {
        "type": "word_builder",
        "word": "breakfast",
        "audioText": "breakfast"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Mood",
          "and",
          "food",
          "are",
          "linked."
        ],
        "audioText": "Mood and food are linked."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Water",
          "is",
          "easy",
          "to",
          "forget."
        ],
        "audioText": "Water is easy to forget."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Many students ___ something before the first lesson, but they chose an extra ten minutes in bed instead.",
        "choices": [
          "should have eaten",
          "should eat",
          "would eat"
        ],
        "answer": "should have eaten",
        "audioText": "Many students should have eaten something before the first lesson, but they chose an extra ten minutes in bed instead."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ well is not just to feed your body.",
        "choices": [
          "To eat",
          "Eat",
          "Eating to"
        ],
        "answer": "To eat",
        "audioText": "To eat well is not just to feed your body."
      }
    ]
  },
  {
    "id": "gk-r4-s08",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 8,
    "title": "Stress: A Signal, Not an Enemy",
    "titleCn": "压力：是信号，不是敌人",
    "coverEmoji": "🧘",
    "paragraphs": [
      {
        "text": "Stress is a signal, not an enemy. Most people treat it as a problem that must be removed as quickly as possible, yet the truth is simpler. Feeling your heart beat faster before an exam means your brain is preparing to help you perform. Learning to read that signal calmly is a skill, and like any skill, it improves with practice.",
        "translation": "压力是一种信号，而不是敌人。多数人把它当作一个必须尽快清除的问题，但事实其实更简单。考试前感到心跳加快，意味着你的大脑正在为帮助你发挥做准备。学会平静地解读这个信号是一项技能，而像任何技能一样，它可以通过练习不断提高。"
      },
      {
        "text": "When stress lasts for weeks without a break, however, the body starts to pay a price. Sleep becomes lighter, and attention wanders more easily. Small problems start to feel enormous. If you have been in that state for a while, you should have told someone earlier instead of carrying it alone. Talking to a friend or writing down your worries often helps more than you expect.",
        "translation": "然而，当压力持续数周而得不到缓解时，身体就开始付出代价。睡眠变浅，注意力也更容易游走。小问题开始显得无比巨大。如果你已经处在这种状态一段时间了，你本该早点告诉别人，而不是独自扛着。跟朋友聊聊，或者把担忧写下来，往往比你预想的更有帮助。"
      },
      {
        "text": "Movement is one of the most reliable ways to lower stress, and it does not require a gym. Standing up and walking for three minutes every hour can steady both your mood and your thoughts. Researchers have found that these short bursts, sometimes called movement snacks, work almost as well as a long workout. Choosing to move a little, often, is easier than promising to exercise for an hour.",
        "translation": "运动是缓解压力最可靠的方式之一，而且它并不需要健身房。每小时站起来走动三分钟，就能让你的情绪和思绪都稳定下来。研究人员发现，这些短暂的爆发——有时被称为“运动零食”——效果几乎和一次长时间锻炼一样好。选择经常动一点点，比承诺去锻炼一小时更容易做到。"
      },
      {
        "text": "Sleep and food support each other in ways that are easy to ignore. Eating at regular times helps your body clock stay steady, which in turn makes falling asleep at night much simpler. To keep your energy stable, it is better to eat a real breakfast than to skip it and snack later. Skipping meals may seem harmless, yet it often leaves you tired and unusually sensitive.",
        "translation": "睡眠和饮食以一种容易被忽视的方式相互支撑。按时吃饭有助于你的生物钟保持稳定，而这又让晚上入睡变得简单得多。为了让精力保持稳定，吃一顿真正的早餐，比不吃早餐、之后再吃零食更好。不吃饭看起来没什么害处，但它常常让你感到疲倦，并且异常敏感。"
      },
      {
        "text": "None of these habits requires a complete change of life, and that is exactly why they last. To build them, start with one small decision you can repeat tomorrow. Seeing stress as a signal, moving every hour, and protecting your sleep are choices that slowly reshape how you feel. Your body has been waiting for you to listen; the first step is simply to begin.",
        "translation": "这些习惯都不需要彻底改变生活，而这正是它们能够长期坚持的原因。要养成它们，先从明天就能重复的一个小决定开始。把压力看作信号、每小时活动一次、保护好自己的睡眠，这些选择会慢慢重塑你的感受。你的身体一直在等你倾听；第一步就是开始。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, which activity can steady both your mood and your thoughts?",
        "audioText": "According to the passage, which activity can steady both your mood and your thoughts?",
        "options": [
          {
            "emoji": "🚶",
            "value": "walking",
            "text": "Walking for three minutes every hour"
          },
          {
            "emoji": "🍔",
            "value": "bigmeal",
            "text": "Eating a very large meal"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "Checking your phone all day"
          }
        ],
        "answer": "walking"
      },
      {
        "type": "word_builder",
        "word": "movement",
        "audioText": "movement"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Stress",
          "is",
          "a",
          "signal,",
          "not",
          "an",
          "enemy."
        ],
        "audioText": "Stress is a signal, not an enemy."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sleep",
          "becomes",
          "lighter,",
          "and",
          "attention",
          "wanders",
          "more",
          "easily."
        ],
        "audioText": "Sleep becomes lighter, and attention wanders more easily."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you have been in that state for a while, you should have ___ someone earlier instead of carrying it alone.",
        "choices": [
          "told",
          "tell",
          "telling"
        ],
        "answer": "told",
        "audioText": "If you have been in that state for a while, you should have told someone earlier instead of carrying it alone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Choosing to move a little, often, is easier than ___ to exercise for an hour.",
        "choices": [
          "promising",
          "promise",
          "promised"
        ],
        "answer": "promising",
        "audioText": "Choosing to move a little, often, is easier than promising to exercise for an hour."
      }
    ]
  },
  {
    "id": "gk-r4-s09",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 9,
    "title": "The Mind-Body Link",
    "titleCn": "身心之间的纽带",
    "coverEmoji": "🧘",
    "paragraphs": [
      {
        "text": "Feeling tired after a long week is normal, but your body may be sending a message. Many students believe that pushing through stress is brave, yet scientists say that ignoring such signals is a serious mistake. Learning to notice them early can protect both your mind and your body.",
        "translation": "漫长的一周过后感到疲惫是正常的，但你的身体也许正在向你传递某个信号。许多学生认为咬牙硬扛压力才算勇敢，然而科学家表示，忽视这些信号是个严重的错误。学会及早察觉它们，既能保护你的心理，也能保护你的身体。"
      },
      {
        "text": "Doctors recommend moving your body for at least thirty minutes every day. To walk quickly, swim, or dance is enough to change your mood. When you exercise, your brain releases chemicals that reduce worry and help you think more clearly. Refusing to move because you feel sad is like refusing to eat because you feel tired.",
        "translation": "医生建议每天至少活动身体三十分钟。快走、游泳或跳舞，就足以改变你的情绪。运动时，大脑会释放出能减少忧虑、帮助你更清晰思考的化学物质。因为心情低落而拒绝运动，就好比因为疲惫而拒绝吃饭一样。"
      },
      {
        "text": "Sleep is not wasted time; it is when your brain repairs itself. Trying to study until three in the morning usually makes learning harder, not easier. Experts suggest going to bed at the same hour and avoiding bright screens before sleep. Students who should have slept earlier often find that they cannot concentrate the next day.",
        "translation": "睡眠不是被浪费掉的时间，它正是大脑自我修复的时段。硬撑到凌晨三点还在学习，通常只会让学习更难，而不是更容易。专家建议每天在同一时间上床，并在睡前远离明亮的屏幕。那些本该早点睡觉的学生常常发现，第二天自己根本无法集中注意力。"
      },
      {
        "text": "What you eat also shapes how you feel, both today and in the long run. Choosing whole grains, fruit, and fresh vegetables can keep your energy steady through a busy day. It is wiser to eat a proper breakfast than to skip it and buy sweets at noon. Many people should have drunk more water instead of reaching for sweet drinks every afternoon.",
        "translation": "你吃的东西同样塑造着你的感受，无论是当下还是长远来看。选择全谷物、水果和新鲜蔬菜，能让你在忙碌的一天里精力保持稳定。好好吃顿早餐，比不吃早餐、中午再去买甜食要明智得多。很多人本该多喝水，而不是每到下午就伸手去拿含糖饮料。"
      },
      {
        "text": "Luckily, none of these ideas requires a perfect daily routine or any expensive equipment. Starting with one small change, such as walking after dinner, is easier than changing everything at once. Paying attention to your body is not a sign of weakness; it is simply good science. Your mind and body work as a team, so you should have treated them as one all along.",
        "translation": "幸运的是，这些做法都不需要完美的日常安排，也不需要昂贵的器材。从一个小改变开始，比如晚饭后散散步，比一次把所有事情都改掉要容易得多。关注自己的身体并非软弱的表现，它只是简单的科学道理。你的心理和身体是一支队伍，所以从一开始你就该把它们当作一个整体来对待。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what is enough to change your mood?",
        "audioText": "According to the text, what is enough to change your mood?",
        "options": [
          {
            "emoji": "🏊",
            "value": "swimming",
            "text": "Swimming"
          },
          {
            "emoji": "🎂",
            "value": "sweets",
            "text": "Sweets"
          },
          {
            "emoji": "📺",
            "value": "tv",
            "text": "Watching TV"
          }
        ],
        "answer": "swimming"
      },
      {
        "type": "word_builder",
        "word": "routine",
        "audioText": "routine"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sleep",
          "is",
          "not",
          "wasted",
          "time"
        ],
        "audioText": "Sleep is not wasted time."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Doctors recommend ___ your body for at least thirty minutes every day.",
        "choices": [
          "moving",
          "to move",
          "move"
        ],
        "answer": "moving",
        "audioText": "Doctors recommend moving your body for at least thirty minutes every day."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "What",
          "you",
          "eat",
          "also",
          "shapes",
          "how",
          "you",
          "feel"
        ],
        "audioText": "What you eat also shapes how you feel."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Students who should have ___ earlier often find that they cannot concentrate the next day.",
        "choices": [
          "slept",
          "sleep",
          "sleeping"
        ],
        "answer": "slept",
        "audioText": "Students who should have slept earlier often find that they cannot concentrate the next day."
      }
    ]
  },
  {
    "id": "gk-r4-s10",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 10,
    "title": "Move More, Worry Less",
    "titleCn": "多动一动，烦恼少一点",
    "coverEmoji": "🏃",
    "paragraphs": [
      {
        "text": "When exams are near, many students sit at their desks for hours without moving their bodies at all. They believe that studying longer is the only way to do better in their tests. However, scientists have found that moving your body regularly can improve both your mood and your memory.",
        "translation": "考试临近时，很多学生一连几个小时坐在书桌前，身体一动不动。他们相信学得更久才是考得更好的唯一办法。然而科学家发现，经常活动身体既能改善情绪，也能增强记忆力。"
      },
      {
        "text": "Regular exercise works on the brain in ways that may genuinely surprise you. To keep your mind sharp, you should stand up and stretch between lessons instead of sitting still. Doing twenty minutes of exercise helps your brain release chemicals that make you feel calm. Choosing an activity you truly enjoy matters far more than exercising for a long time.",
        "translation": "规律运动对大脑起作用的方式可能真的会让你惊讶。想让头脑保持敏锐，你该在课间站起来伸展一下，而不是一直坐着。做二十分钟运动，能帮助大脑释放让你感到平静的化学物质。选一项你真正喜欢的活动，远比长时间锻炼更重要。"
      },
      {
        "text": "Sleep is another important part of the picture. Going to bed at the same time each night trains your body clock and protects your daily energy. If you slept badly last week, you should have gone to bed earlier instead of checking your phone. Refusing to look at your phone before sleep is a simple habit that is worth building.",
        "translation": "睡眠是这幅图景中另一个重要的部分。每晚在同一时间上床，能训练你的生物钟，守住你每天的精力。如果你上周没睡好，你本该早点上床，而不是一直刷手机。睡前不去看手机，是一个值得养成的简单习惯。"
      },
      {
        "text": "What you eat also shapes how you feel during the whole day, from morning to night. Eating too much sugar can make your energy rise and then fall suddenly. To keep your mood steady, choose whole grains, fruit, and vegetables at every meal. Missing breakfast may leave you feeling tired and unable to focus properly in class.",
        "translation": "你吃的东西还会影响你一整天的状态，从早到晚都是如此。摄入过多糖分，会让你的精力先升后骤降。为了让情绪保持平稳，每餐都应选择全谷物、水果和蔬菜。不吃早餐可能会让你感到疲惫，上课时无法好好集中注意力。"
      },
      {
        "text": "None of these habits works alone. Trying to change everything at once usually ends in failure, so pick one habit and give it enough time. Starting with one small change is enough. To take care of your mind, you must first take care of your body and your daily routine.",
        "translation": "这些习惯没有一个是单独起作用的。想一次改变所有事情，往往以失败告终，所以挑一个习惯，给它足够的时间。从一个小小的改变开始，就已经足够。要照顾好自己的心理，你必须先照顾好自己的身体和日常作息。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you slept badly last week, you ___ gone to bed earlier instead of checking your phone.",
        "choices": [
          "should have",
          "should",
          "will have"
        ],
        "answer": "should have",
        "audioText": "If you slept badly last week, you should have gone to bed earlier instead of checking your phone."
      },
      {
        "type": "word_builder",
        "word": "memory",
        "audioText": "memory"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "None",
          "of",
          "these",
          "habits",
          "works",
          "alone."
        ],
        "audioText": "None of these habits works alone."
      },
      {
        "type": "image_choice",
        "question": "According to the text, what helps your brain release chemicals that make you feel calm?",
        "audioText": "According to the text, what helps your brain release chemicals that make you feel calm?",
        "options": [
          {
            "emoji": "🏃",
            "value": "exercise",
            "text": "Exercise"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "Checking your phone"
          },
          {
            "emoji": "🍰",
            "value": "sugar",
            "text": "Eating sugar"
          }
        ],
        "answer": "exercise"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Choosing an activity you truly enjoy ___ far more than exercising for a long time.",
        "choices": [
          "matters",
          "mattering",
          "to matter"
        ],
        "answer": "matters",
        "audioText": "Choosing an activity you truly enjoy matters far more than exercising for a long time."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Starting",
          "with",
          "one",
          "small",
          "change",
          "is",
          "enough."
        ],
        "audioText": "Starting with one small change is enough."
      }
    ]
  },
  {
    "id": "gk-r4-s11",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 11,
    "title": "Nature: The Quiet Healer",
    "titleCn": "大自然：安静的疗愈者",
    "coverEmoji": "🌿",
    "paragraphs": [
      {
        "text": "Spending time in green places is one of the simplest ways to protect your mental health. Many students believe that feeling stressed is normal, but they rarely realize how much the environment around them matters. Trees, grass, and open sky are not just pretty scenery; they quietly change the way our brains work.",
        "translation": "在绿色环境中度过时光，是保护心理健康最简单的方式之一。许多学生认为感到压力是正常的，却很少意识到周围环境对他们有多重要。树木、草地和开阔的天空不只是好看的风景，它们还会悄悄改变我们大脑的运作方式。"
      },
      {
        "text": "Scientists have found that walking in a park for twenty minutes can lower stress and slow a racing heart. Fresh air alone does not explain this effect, because the colors and sounds of nature also help. Blood pressure drops and breathing becomes deeper. Worried thoughts, meanwhile, seem to lose their power. Doctors now suggest treating nature as a cheap and safe form of medicine.",
        "translation": "科学家发现，在公园里散步二十分钟能够减轻压力，让急促的心跳慢下来。仅仅有新鲜空气并不能解释这种效果，因为大自然的色彩与声音也在起作用。血压下降，呼吸变得更深。与此同时，那些忧虑的念头似乎也失去了力量。如今医生建议把大自然当作一种廉价又安全的良药。"
      },
      {
        "text": "Nature also helps us to concentrate. After hours of staring at a screen, our attention becomes weak and our patience runs out. Researchers advise students to take short breaks outside instead of checking their phones again. Even a view of trees from a window can restore the ability to focus.",
        "translation": "大自然还能帮助我们集中注意力。盯着屏幕数小时之后，我们的注意力会变弱，耐心也会耗尽。研究人员建议学生到户外短暂休息，而不是再一次拿起手机。即便只是从窗口看到树木，也能恢复专注的能力。"
      },
      {
        "text": "Sadly, many city residents spend almost all their time indoors, and they should have noticed the cost much earlier. Walking to school, eating lunch in a garden, or keeping a plant beside your desk are easy starting points. You do not need to climb a mountain to benefit; regular, gentle contact works best.",
        "translation": "遗憾的是，许多城市居民几乎所有时间都在室内度过，他们本该更早注意到这样做的代价。步行上学、在小花园里吃午饭，或者在桌边养一株植物，都是很容易上手的起点。你并不需要去爬山才能受益，规律而温和的接触效果最好。"
      },
      {
        "text": "To get the most from nature, try to make it a habit rather than a rare treat. Going outside at the same time each day, and leaving your earphones at home, will help your mind to rest. The goal is not to escape your life but to return to it with a calmer, clearer head.",
        "translation": "要想从大自然中收获最多好处，就要设法把它变成习惯，而不是偶尔的享受。每天在同一时间外出，把耳机留在家里，会帮助你放松大脑。目标不是逃离生活，而是带着更平静、更清醒的头脑回到生活之中。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what can lower stress and slow a racing heart?",
        "audioText": "According to the text, what can lower stress and slow a racing heart?",
        "options": [
          {
            "emoji": "🌳",
            "value": "park",
            "text": "Walking in a park for twenty minutes"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "Checking your phone for twenty minutes"
          },
          {
            "emoji": "🛏️",
            "value": "sleep",
            "text": "Staying in bed for twenty minutes"
          }
        ],
        "answer": "park"
      },
      {
        "type": "word_builder",
        "word": "patience",
        "audioText": "patience"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Nature",
          "also",
          "helps",
          "us",
          "to",
          "concentrate."
        ],
        "audioText": "Nature also helps us to concentrate."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Blood",
          "pressure",
          "drops",
          "and",
          "breathing",
          "becomes",
          "deeper."
        ],
        "audioText": "Blood pressure drops and breathing becomes deeper."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Scientists have found that ___ in a park for twenty minutes can lower stress and slow a racing heart.",
        "choices": [
          "walking",
          "walked",
          "to walk"
        ],
        "answer": "walking",
        "audioText": "Scientists have found that walking in a park for twenty minutes can lower stress and slow a racing heart."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Sadly, many city residents spend almost all their time indoors, and they ___ the cost much earlier.",
        "choices": [
          "should have noticed",
          "should notice",
          "have noticed"
        ],
        "answer": "should have noticed",
        "audioText": "Sadly, many city residents spend almost all their time indoors, and they should have noticed the cost much earlier."
      }
    ]
  },
  {
    "id": "gk-r4-s12",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 12,
    "title": "Balance Is a Skill You Build",
    "titleCn": "平衡是一项可以练成的技能",
    "coverEmoji": "🧘",
    "paragraphs": [
      {
        "text": "Many students believe that feeling calm is simply a matter of luck, as if a good mood were the weather. They sit and wait for happiness to arrive, instead of asking what their own minds really need. In fact, researchers now describe balance as a practical skill that anyone can learn and practise. Learning to notice your own needs is the first step, and it costs nothing at all.",
        "translation": "许多学生认为，感到平静纯粹是运气的事，仿佛好心情就是天气一样。他们坐在那里等着快乐自己到来，而不是问问自己的内心真正需要什么。事实上，研究者如今把“平衡”描述为一种任何人都能学会并练习的实用技能。学会留意自己的需求是第一步，而这一步不需要任何成本。"
      },
      {
        "text": "Moving your body changes how you feel. After just twenty minutes of walking, the brain releases chemicals that quiet worry and sharpen your attention. You do not need to run a race or to train for several hours in a gym every week. Choosing to climb the stairs instead of taking the lift already counts as a useful form of exercise.",
        "translation": "活动身体能改变你的感受。只要步行二十分钟，大脑就会释放出能平息忧虑、让注意力更集中的化学物质。你不需要去赛跑，也不需要每周在健身房练上好几个小时。选择爬楼梯而不是坐电梯，已经算是一种有用的锻炼了。"
      },
      {
        "text": "Sleep is not wasted time. Treating rest as an unnecessary luxury is a mistake that many hard-working students make every week. During deep sleep, the brain sorts the events of the day and stores the information that truly matters. Students who should have gone to bed earlier often wonder why their memory fails them during exams.",
        "translation": "睡眠不是被浪费掉的时间。把休息当成多余的奢侈品，是许多用功的学生每周都在犯的错误。在深度睡眠中，大脑会整理白天发生的事情，并储存真正重要的信息。那些本该早点上床睡觉的学生常常纳闷，为什么考试时记忆会失灵。"
      },
      {
        "text": "Eating well supports the mind as much as it supports the body, and the two cannot be separated. Skipping breakfast may seem harmless, yet it makes concentration much harder by the middle of the morning. To keep your energy steady, choose whole grains, fruit, vegetables, and enough water every day. Try to avoid drinking too many sweet drinks, which lift your mood quickly and then drop it again.",
        "translation": "吃得好对心智的支撑和对身体的支撑一样多，二者无法分开。不吃早餐看似无害，但它会让上午过半时的专注变得困难得多。为了保持精力稳定，每天要选择全谷物、水果、蔬菜和足够的水。尽量别喝太多甜饮料，它们会迅速让你的情绪高涨，然后又让它低落下来。"
      },
      {
        "text": "None of these habits works alone, and expecting perfect balance every single day is completely unrealistic. What matters is deciding to begin, and then returning to your routine after a bad night or a busy week. Balance is a skill you build.",
        "translation": "这些习惯没有哪一个能单独起作用，而期待每一天都完美平衡是完全不现实的。重要的是决定开始，然后在某个糟糕的夜晚或忙碌的一周之后回到自己的日常节奏中。平衡是你一点点建立起来的技能。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what helps the brain sort the day's events and store what truly matters?",
        "audioText": "According to the text, what helps the brain sort the day's events and store what truly matters?",
        "options": [
          {
            "emoji": "😴",
            "value": "sleep",
            "text": "A deep sleep"
          },
          {
            "emoji": "🏃",
            "value": "run",
            "text": "A long run"
          },
          {
            "emoji": "🥗",
            "value": "meal",
            "text": "A light meal"
          }
        ],
        "answer": "sleep"
      },
      {
        "type": "word_builder",
        "word": "balance",
        "audioText": "balance"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sleep",
          "is",
          "not",
          "wasted",
          "time"
        ],
        "audioText": "Sleep is not wasted time."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Try to avoid ___ too many sweet drinks, which lift your mood quickly and then drop it again.",
        "choices": [
          "drinking",
          "to drink",
          "drink"
        ],
        "answer": "drinking",
        "audioText": "Try to avoid drinking too many sweet drinks, which lift your mood quickly and then drop it again."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Moving",
          "your",
          "body",
          "changes",
          "how",
          "you",
          "feel"
        ],
        "audioText": "Moving your body changes how you feel."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Students who should have ___ to bed earlier often wonder why their memory fails them during exams.",
        "choices": [
          "gone",
          "went",
          "going"
        ],
        "answer": "gone",
        "audioText": "Students who should have gone to bed earlier often wonder why their memory fails them during exams."
      }
    ]
  },
  {
    "id": "gk-r4-s13",
    "track": "gaokao",
    "regionId": "gk-r4",
    "order": 13,
    "title": "Your Inner Clock Runs Your Mood",
    "titleCn": "你的生物钟掌控你的情绪",
    "coverEmoji": "🕰️",
    "paragraphs": [
      {
        "text": "Most students believe that sleeping well depends only on going to bed early enough. Your body, however, keeps an inner clock that works all day and night. This clock decides when you feel hungry, when your muscles work best, and even when sadness may appear. Light is its strongest signal. Learning to read this clock carefully can slowly change the way you manage your mood.",
        "translation": "大多数学生认为，睡得好只取决于早早上床。然而，你的身体里有一座日夜运转的生物钟。这座钟决定你何时感到饥饿、肌肉何时状态最好，甚至决定悲伤何时出现。光是它最强的信号。学会认真读懂这座钟，能慢慢改变你管理情绪的方式。"
      },
      {
        "text": "Your inner clock uses light to decide when to produce the chemicals that help you sleep. If you keep staring at a bright screen at midnight, your brain still thinks the day is continuing. That is exactly why you should have turned off your phone an hour before bed. Waking up at the same time every day trains the clock faster than going to bed early does.",
        "translation": "你体内的生物钟借助光线来决定何时分泌帮助你入睡的化学物质。如果你半夜一直盯着明亮的屏幕，你的大脑仍以为白天还在继续。这正是你本该在睡前一小时关掉手机的原因。每天在同一时间起床，比早早上床更能快速地训练这座钟。"
      },
      {
        "text": "Moving your body is one of the fastest ways to lift a low mood. Scientists have found that exercising in the morning fits our inner clock better than exercising late at night. Your muscles are usually strongest in the afternoon. Planning a match then may improve your performance a lot. Trying to run hard at midnight is simply asking your tired body for trouble.",
        "translation": "活动身体是提升低落情绪最快的方法之一。科学家发现，早上锻炼比深夜锻炼更符合我们的生物钟。你的肌肉通常在下午最为强壮。把比赛安排在那个时候，也许能大幅提升你的表现。想在半夜拼命奔跑，简直就是跟你疲惫的身体过不去。"
      },
      {
        "text": "When you eat matters almost as much as what you eat. Skipping breakfast tells your body that food is rare, which can make you anxious and unfocused. Eating a light, regular dinner two or three hours before sleep helps the clock stay steady. To keep your mood stable, try to avoid heavy meals late at night.",
        "translation": "什么时候吃，几乎和吃什么一样重要。不吃早餐会让身体以为食物稀缺，这可能让你焦虑、难以专注。睡前两三小时吃一顿清淡而规律的晚餐，有助于生物钟保持稳定。为了保持情绪平稳，尽量避免深夜吃大餐。"
      },
      {
        "text": "Your mood is not a strange mystery that sits completely apart from your body. Sleeping, moving and eating at regular times is a skill that anyone can build. Many students who feel low for weeks should have talked to someone much earlier. Asking a trusted adult for help is a sign of strength rather than weakness.",
        "translation": "情绪并不是与你身体完全隔绝的奇怪谜团。按时睡觉、运动和进食，是一项人人都能培养的技能。许多连续几周情绪低落的学生，本该更早找人聊聊。向信任的成年人求助，是坚强的表现，而不是软弱。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what does your inner clock use to decide when to produce sleep chemicals?",
        "audioText": "According to the passage, what does your inner clock use to decide when to produce sleep chemicals?",
        "options": [
          {
            "emoji": "☀️",
            "value": "light",
            "text": "Light"
          },
          {
            "emoji": "🍎",
            "value": "food",
            "text": "Food"
          },
          {
            "emoji": "🎵",
            "value": "music",
            "text": "Music"
          }
        ],
        "answer": "light"
      },
      {
        "type": "word_builder",
        "word": "muscles",
        "audioText": "muscles"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Light",
          "is",
          "its",
          "strongest",
          "signal."
        ],
        "audioText": "Light is its strongest signal."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "That is exactly why you should have ___ off your phone an hour before bed.",
        "choices": [
          "turned",
          "turning",
          "turn"
        ],
        "answer": "turned",
        "audioText": "That is exactly why you should have turned off your phone an hour before bed."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Your",
          "muscles",
          "are",
          "usually",
          "strongest",
          "in",
          "the",
          "afternoon."
        ],
        "audioText": "Your muscles are usually strongest in the afternoon."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ breakfast tells your body that food is rare, which can make you anxious and unfocused.",
        "choices": [
          "Skipping",
          "Skip",
          "Skipped"
        ],
        "answer": "Skipping",
        "audioText": "Skipping breakfast tells your body that food is rare, which can make you anxious and unfocused."
      }
    ]
  },
  {
    "id": "gk-r5-s01",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 1,
    "title": "The Year That Changed Her Mind",
    "titleCn": "改变她想法的那一年",
    "coverEmoji": "🎓",
    "paragraphs": [
      {
        "text": "When my cousin Lily announced that she would delay university for a year, my aunt, who had dreamed of seeing her in a lecture hall that autumn, could hardly hide her worry. To many parents, a gap year sounds like a dangerous pause, or even a hole in a carefully planned life. Lily, however, had made up her mind.",
        "translation": "当我的表姐莉莉宣布要推迟一年上大学时，我那一直盼着那年秋天能在大学讲堂里见到她的姨妈，几乎掩饰不住自己的担忧。在许多父母看来，间隔年听起来像是一次危险的停顿，甚至是精心规划的人生里的一个窟窿。然而莉莉已经下定了决心。"
      },
      {
        "text": "Her plan was simple. She spent the first three months in a small mountain village, where she taught English to children whose school had only two teachers, both of whom shared one broken computer. Evenings were spent preparing lessons, her notebook filled with simple drawings meant to make new words easier to remember. Later she worked in a city library, sorting books and listening to readers who came simply for company.",
        "translation": "她的计划很简单。头三个月她待在一个小山村，在那里教孩子们英语——那所学校只有两位老师，而他们俩合用一台坏了的电脑。晚上她都用来备课，笔记本上画满了简单的图画，为的是让新单词更容易记住。后来她到城里一家图书馆打工，整理图书，也听一些读者说话——他们来，只是为了有个伴。"
      },
      {
        "text": "She admitted that the year was not, as some friends had imagined, a long holiday. There were mornings when she questioned her choice, and long evenings when she missed the classroom she had never entered. What kept her going, she said, was the moment a shy boy read a whole sentence aloud for the first time. That small victory, which no exam could ever measure, taught her more about patience than any lecture.",
        "translation": "她承认，这一年并不像一些朋友想象的那样是个漫长的假期。有些早晨她会怀疑自己的选择，有些漫长的夜晚她会想念那个自己从未踏进过的教室。她说，支撑她走下去的，是一个害羞的男孩第一次大声读出一整句话的那一刻。那份小小的胜利，是任何考试都衡量不了的，它教给她的耐心，比任何一堂课都多。"
      },
      {
        "text": "Now Lily is back at home, ready to begin her degree in education. The year away, during which she learned to listen before speaking, has changed the way she thinks about learning. Education, she now believes, does not begin at a school gate or end at a graduation ceremony. It is a habit of mind which, once formed, stays with us for the rest of our life.",
        "translation": "如今莉莉回到了家，准备开始学习教育学学位。离校的这一年，她学会了先倾听再开口，也改变了她对学习的看法。她现在相信，教育并不始于校门，也不终于毕业典礼。它是一种思维习惯，一旦养成，便会伴随我们余生。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily teach the children in the small mountain village?",
        "audioText": "What did Lily teach the children in the small mountain village?",
        "options": [
          {
            "emoji": "📖",
            "value": "english",
            "text": "English"
          },
          {
            "emoji": "➗",
            "value": "maths",
            "text": "Maths"
          },
          {
            "emoji": "🎼",
            "value": "music",
            "text": "Music"
          }
        ],
        "answer": "english"
      },
      {
        "type": "word_builder",
        "word": "patience",
        "audioText": "patience"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Her",
          "plan",
          "was",
          "simple."
        ],
        "audioText": "Her plan was simple."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lily,",
          "however,",
          "had",
          "made",
          "up",
          "her",
          "mind."
        ],
        "audioText": "Lily, however, had made up her mind."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She taught English to children whose school had only two teachers, both of ___ shared one broken computer.",
        "choices": [
          "whom",
          "which",
          "who"
        ],
        "answer": "whom",
        "audioText": "She taught English to children whose school had only two teachers, both of whom shared one broken computer."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Education, she now believes, does not begin at a school gate or end at a graduation ___.",
        "choices": [
          "ceremony",
          "company",
          "computer"
        ],
        "answer": "ceremony",
        "audioText": "Education, she now believes, does not begin at a school gate or end at a graduation ceremony."
      }
    ]
  },
  {
    "id": "gk-r5-s02",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 2,
    "title": "The Gap Year That Changed My Mind",
    "titleCn": "改变我心态的间隔年",
    "coverEmoji": "🌉",
    "paragraphs": [
      {
        "text": "When I failed to get into my dream university, many people advised me to take a gap year, during which I could rethink my future. At first I felt ashamed of myself. But my parents, who had always trusted me, encouraged me to try something completely different instead of sitting at home and waiting.",
        "translation": "当我没能考上理想的大学时，很多人建议我休学一年，在这一年里我可以重新思考自己的未来。起初我为自己感到羞愧。但我的父母一直信任我，他们鼓励我去尝试一些完全不同的事情，而不是坐在家里干等。"
      },
      {
        "text": "So I volunteered at a small library in a mountain village, where I helped children with their reading every afternoon. The children, most of whom had never owned a book of their own, treated every story as a precious treasure. Working there for six months, I gradually understood what learning really meant to them and to me. It was not about marks at all.",
        "translation": "于是我到一个山村的小图书馆做志愿者，每天下午在那里帮孩子们阅读。那些孩子大多从未拥有过一本属于自己的书，他们把每个故事都当作珍贵的宝物。在那里工作了六个月后，我渐渐明白学习对他们、对我究竟意味着什么。这根本与分数无关。"
      },
      {
        "text": "Back in the city, I began to study again, but my attitude towards books had completely changed. Textbooks, which once bored me to tears, now seemed like doors opening onto unknown worlds. My teacher, an experienced woman in whom I found a true guide, often said that education was not a race but a lifelong journey.",
        "translation": "回到城市后，我重新开始学习，但我对书的态度已经完全改变了。曾经让我厌烦得想哭的课本，如今就像一扇扇通向未知世界的大门。我的老师是一位经验丰富的女性，在她身上我找到了真正的引路人，她常说教育不是一场赛跑，而是一段终身的旅程。"
      },
      {
        "text": "Now I am preparing for the college entrance examination with a much clearer mind than I had before. My confidence growing day by day, I no longer fear failure as I used to. Every mistake I make, small as it is, adds a brick to the road along which I walk.",
        "translation": "现在，我正以比以前清晰得多的心态备战高考。我的信心与日俱增，不再像过去那样害怕失败。我犯的每一个错误，无论多么微小，都为我要走的那条路添上一块砖。"
      },
      {
        "text": "Looking back, I realize that a gap year is not a gap at all in a person's life. It is a bridge, across which young people can walk slowly from confusion to purpose. Whether we study in a classroom or in a village, learning never stops as long as we stay curious.",
        "translation": "回首往事，我意识到，间隔年在人的一生中根本不是一段空白。它是一座桥，年轻人可以沿着它慢慢从迷茫走向目标。无论我们在教室里还是在山村里学习，只要我们保持好奇，学习就永远不会停止。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did the writer spend six months during the gap year?",
        "audioText": "Where did the writer spend six months during the gap year?",
        "options": [
          {
            "emoji": "📚",
            "value": "library",
            "text": "In a village library"
          },
          {
            "emoji": "🏭",
            "value": "factory",
            "text": "In a city factory"
          },
          {
            "emoji": "🏖",
            "value": "beach",
            "text": "At a seaside hotel"
          }
        ],
        "answer": "library"
      },
      {
        "type": "word_builder",
        "word": "curious",
        "audioText": "curious"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "At",
          "first",
          "I",
          "felt",
          "ashamed",
          "of",
          "myself."
        ],
        "audioText": "At first I felt ashamed of myself."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "not",
          "about",
          "marks",
          "at",
          "all."
        ],
        "audioText": "It was not about marks at all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The children, most of ___ had never owned a book of their own, treated every story as a precious treasure.",
        "choices": [
          "whom",
          "which",
          "who"
        ],
        "answer": "whom",
        "audioText": "The children, most of whom had never owned a book of their own, treated every story as a precious treasure."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Working there for six months, I gradually understood what learning really ___ to them and to me.",
        "choices": [
          "meant",
          "minded",
          "mattered"
        ],
        "answer": "meant",
        "audioText": "Working there for six months, I gradually understood what learning really meant to them and to me."
      }
    ]
  },
  {
    "id": "gk-r5-s03",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 3,
    "title": "The Classroom Without Walls",
    "titleCn": "没有围墙的教室",
    "coverEmoji": "🎒",
    "paragraphs": [
      {
        "text": "When my cousin Lin graduated from high school, she made a decision that surprised almost everyone in our family. Instead of going straight to university, she chose to take a gap year. Her parents, who had saved money for her college fees for years, were worried at first. Yet Lin argued that twelve months of real experience, during which she could test her own interests, might be worth more than a hurried choice.",
        "translation": "我的表姐林高中毕业时，做了一个让家里人几乎都感到意外的决定。她没有直接升入大学，而是选择休一个间隔年。她的父母多年来一直为她攒大学学费，起初十分担心。但林认为，十二个月的真实经历——在这段时间里她可以检验自己真正的兴趣——也许比仓促做出的选择更有价值。"
      },
      {
        "text": "She spent the first three months working in a small library in her hometown, where she sorted books and helped children find stories they loved. It was a quiet job that changed her. The librarian, a patient woman in her fifties, taught her how to organize a reading club. Watching those children argue about heroes and endings, Lin began to understand something that no textbook had ever told her: learning is not a race but a habit.",
        "translation": "她头三个月在家乡的一家小图书馆工作，在那里整理图书，帮孩子们找到他们喜欢的故事。那是一份悄悄改变了她自己的安静工作。那位图书管理员是位五十多岁、很有耐心的女士，教她怎样组织读书会。看着那些孩子为故事里的英雄和结局争个不停，林开始明白一件课本从未告诉过她的事：学习不是一场赛跑，而是一种习惯。"
      },
      {
        "text": "Later she volunteered at a nature center, where she guided visitors along mountain paths. Her shift over, she often stayed to read about the plants whose names she had just learned. Some days were hard. Sometimes she doubted whether the whole year was a waste of time. Yet each small task, however ordinary it seemed, added a piece to a picture that she was slowly drawing of herself. Learning, she discovered, never really stops.",
        "translation": "后来她到一个自然中心做志愿者，带着游客沿山间小路行走。下班以后，她常常留下来读一读那些自己刚知道名字的植物。有些日子并不好过。有时她也怀疑这一年是不是在浪费时间。但每一件小事，无论看起来多么平常，都在为一幅她慢慢描绘的自我画像添上一笔。她发现，学习其实从不会真正停止。"
      },
      {
        "text": "By the time she applied to university, Lin had changed. The girl who once chose her major by following her friends now spoke about forests, children and books with quiet confidence. 'A year off,' she told me, 'is not a year lost.' Her parents, to whom she had once been afraid to explain her plan, now told the story proudly to every visitor.",
        "translation": "等到她申请大学时，林已经变了。那个曾经跟着朋友选专业的女孩，如今会平静而自信地谈起森林、孩子和书。'休学一年，'她对我说，'不是浪费一年。'她的父母——她曾经不敢向他们解释自己的计划——如今骄傲地把这个故事讲给每一位来客听。"
      },
      {
        "text": "I used to think that learning happened only inside classrooms, with bells ringing and exams waiting. Now I believe that education is a lifelong journey, on which every experience, pleasant or painful, can leave a mark. Lin's gap year taught me that growing up is not about rushing to the next door, but about knowing why you choose to open it.",
        "translation": "我曾以为学习只发生在教室里，铃声响起，考试在等着你。现在我相信，教育是一段终身的旅程，在这段旅程上，每一次经历，无论愉快还是痛苦，都会留下痕迹。林的间隔年让我明白：成长不是急着去推开下一扇门，而是明白自己为什么选择打开它。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Her parents, ___ had saved money for her college fees for years, were worried at first.",
        "choices": [
          "who",
          "which",
          "whom"
        ],
        "answer": "who",
        "audioText": "Her parents, who had saved money for her college fees for years, were worried at first."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "a",
          "quiet",
          "job",
          "that",
          "changed",
          "her"
        ],
        "audioText": "It was a quiet job that changed her."
      },
      {
        "type": "word_builder",
        "word": "confidence",
        "audioText": "confidence"
      },
      {
        "type": "image_choice",
        "question": "Where did Lin work during her first three months after high school?",
        "audioText": "Where did Lin work during her first three months after high school?",
        "options": [
          {
            "emoji": "📚",
            "value": "library",
            "text": "A library"
          },
          {
            "emoji": "🏔️",
            "value": "mountain",
            "text": "A mountain path"
          },
          {
            "emoji": "🏫",
            "value": "classroom",
            "text": "A classroom"
          }
        ],
        "answer": "library"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Learning",
          "she",
          "discovered",
          "never",
          "really",
          "stops"
        ],
        "audioText": "Learning, she discovered, never really stops."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Lin argued that twelve months of real experience, during ___ she could test her own interests, might be worth more than a hurried choice.",
        "choices": [
          "which",
          "who",
          "what"
        ],
        "answer": "which",
        "audioText": "Lin argued that twelve months of real experience, during which she could test her own interests, might be worth more than a hurried choice."
      }
    ]
  },
  {
    "id": "gk-r5-s04",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 4,
    "title": "Things I Could Not Do Yet",
    "titleCn": "我还不会做的事",
    "coverEmoji": "📓",
    "paragraphs": [
      {
        "text": "When I finished my final exam, most of my classmates were busy choosing universities, but I decided to take a gap year — a choice about which my parents had serious doubts. For twelve months, I worked in a small bicycle shop owned by a man whom everyone in the neighbourhood simply called Uncle Chen. He had never been to college, yet he could repair almost anything on two wheels.",
        "translation": "我考完最后一场考试时，大多数同学都在忙着挑大学，而我却决定休学一年——一个我父母颇有疑虑的选择。在那十二个月里，我在一家小小的自行车店打工，店主人街坊邻里都叫他陈叔。他从没上过大学，却几乎能修好任何带两个轮子的东西。"
      },
      {
        "text": "My first task was to sort a box of screws, which took me three whole hours. Uncle Chen watched me patiently; his hands, covered in oil, never once touched the box. \"Sorting is not the job,\" he said. \"It is how you learn what a job is.\" At that moment I realised that the lessons I remembered best were rarely the ones taught from a textbook.",
        "translation": "我的第一项任务是把一盒螺丝分类，这花了我整整三个小时。陈叔耐心地看着我；他沾满油污的双手始终没有碰那个盒子。“分类不是工作，”他说，“它是你学会什么叫工作的方式。”那一刻我意识到，我记得最牢的那些课，往往不是课本上教的。"
      },
      {
        "text": "Weeks passed, and I slowly moved from sorting screws to changing tyres, then to adjusting brakes, at which I became surprisingly quick. Every mistake I made was explained rather than punished, and every question I asked received an answer longer than I had expected. Uncle Chen, who had taught himself English by reading repair manuals, kept a notebook in which he wrote down things he still could not do.",
        "translation": "几周过去了，我慢慢从分类螺丝做到换轮胎，再到调刹车——这方面我快得连自己都吃惊。我犯的每个错误都会被解释，而不是被责罚；我问的每个问题，得到的回答都比我预想的长。陈叔靠读维修手册自学了英语，他有一本笔记本，里面记着他还不会做的事。"
      },
      {
        "text": "That notebook changed my idea of learning. I had always assumed that education was a ladder we climbed for eighteen years and then left behind. Uncle Chen, however, treated it as a garden he watered every single day, and the plants in it, he insisted, never stopped growing. A person who stops learning, he told me, does not stay still; he quietly moves backwards.",
        "translation": "那本笔记本改变了我对学习的看法。我一直以为教育是一架我们爬了十八年就丢在身后的梯子。可陈叔却把它当成一座每天都要浇水的花园，而且他坚持说，园里的植物从不会停止生长。他告诉我，一个停止学习的人并不是原地不动，而是在悄悄倒退。"
      },
      {
        "text": "When my gap year ended, I went to university with a new habit: whenever I meet something I cannot do, I write it in my own notebook. Some pages are still full of things I have not mastered, and I have learned to be comfortable with them. After all, the ability to say \"not yet\" may be the most useful skill that school never formally taught me.",
        "translation": "间隔年结束时，我带着一个新习惯走进了大学：每当遇到自己不会做的事，我就把它写进自己的笔记本。有些页面至今仍写满我没掌握的东西，而我已经学会坦然面对它们。毕竟，能够说出“还不会”，也许是学校从未正式教过我的、最有用的一项技能。"
      }
    ],
    "quiz": [
      {
        "type": "word_builder",
        "word": "notebook",
        "audioText": "notebook"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He had never been to college, yet he could repair almost anything on two ___.",
        "choices": [
          "wheels",
          "wings",
          "roads"
        ],
        "answer": "wheels",
        "audioText": "He had never been to college, yet he could repair almost anything on two wheels."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sorting",
          "is",
          "not",
          "the",
          "job"
        ],
        "audioText": "Sorting is not the job."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Uncle Chen kept a notebook in which he wrote down things he still could not ___.",
        "choices": [
          "do",
          "make",
          "take"
        ],
        "answer": "do",
        "audioText": "Uncle Chen kept a notebook in which he wrote down things he still could not do."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "notebook",
          "changed",
          "my",
          "idea",
          "of",
          "learning"
        ],
        "audioText": "That notebook changed my idea of learning."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A person who stops learning does not stay still; he quietly moves ___.",
        "choices": [
          "backwards",
          "forward",
          "upwards"
        ],
        "answer": "backwards",
        "audioText": "A person who stops learning does not stay still; he quietly moves backwards."
      }
    ]
  },
  {
    "id": "gk-r5-s05",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 5,
    "title": "Lessons Beyond the Classroom",
    "titleCn": "课堂之外的功课",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "When my cousin Wei announced that he would spend a year working in a small village library, the whole family fell silent. Almost everyone had expected him to enter a famous university at once, a path that our town deeply admired. His mother, to everyone's surprise, said that she trusted his choice and would support him whatever happened. The plan, as she explained it later, was to let him meet the world he had only read about in books.",
        "translation": "当我的表兄伟宣布他要在上大学之前到一个小村庄的图书馆工作一年时，全家人都沉默了。几乎所有人都以为他会直接考进一所名牌大学，那是我们小镇上人人羡慕的一条路。然而出乎大家意料的是，他母亲说她相信他的选择，无论发生什么都支持他。她后来解释说，这个打算是想让他去见识那个他此前只在书里读到过的世界。"
      },
      {
        "text": "For the first few months, Wei lived in a room above the library, where he sorted old books and helped children with their reading. The librarian, from whom he learned how to repair broken shelves and damaged pages, soon became a close friend. Every evening, with the lamps lit and the children gone, he wrote down what he had learned during the day. Sometimes he wondered whether he had made a mistake, but the quiet joy of helping others kept him going. He learned far more than he had expected.",
        "translation": "头几个月，伟住在图书馆楼上的一个小房间里，在那里整理旧书，还帮孩子们读书。他从图书管理员那里学会了修补破损的书架和书页，她很快成了他的好朋友。每天晚上，灯亮着、孩子们都走了，他就把白天学到的东西记下来。有时他也会怀疑自己是不是犯了个错误，但帮助别人带来的那份安静的快乐让他坚持了下来。他学到的东西远远超出了自己的预期。"
      },
      {
        "text": "One rainy afternoon, a retired teacher came in to borrow a book about local history. Wei spent two hours listening to her talk about the students she had taught over forty years. The old woman said that a person's education never ends, and that every job, however small, teaches something worth keeping. That conversation, which Wei later called a turning point, changed the way he thought about learning. That lesson stayed with him.",
        "translation": "一个下雨的下午，一位退休教师走进来，想借一本关于当地历史的书。伟花了两个小时听她讲她四十多年来教过的那些学生。这位老人说，一个人的教育永远不会结束，每一份工作无论多么微小，都能教给人一些值得留下的东西。那次谈话——伟后来称之为一个转折点——改变了他对学习的看法。这一课一直留在他心里。"
      },
      {
        "text": "When the year ended, Wei came home with stronger hands, a notebook full of ideas and a clearer purpose. He did enter university in the end, but he chose a course in which he could use what he had learned. His year in the village, far from wasting time, had given him the confidence to learn on his own.",
        "translation": "那一年结束时，伟回到家中，双手更有力气了，带回来一本写满想法的笔记本和一个更明确的目标。他最终还是上了大学，但他选了一门能够用上自己所学东西的课程。他在村子里的那一年，非但没有浪费时间，反而给了他独自学习的信心。"
      },
      {
        "text": "Many people still believe that a straight road is always the best road, yet life rarely works that way. What matters is not how quickly we arrive, but whether we keep asking questions along the way. Learning is not a race that finishes on graduation day; it is a habit that lasts a lifetime.",
        "translation": "许多人仍然相信笔直的路总是最好的路，然而生活很少按照这种方式运转。重要的不是我们多快到达，而是一路上我们是否一直在提问。学习并不是一场在毕业那天就结束的比赛，而是一种会持续一生的习惯。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did Wei spend the year before he entered university?",
        "audioText": "Where did Wei spend the year before he entered university?",
        "options": [
          {
            "emoji": "📚",
            "value": "library",
            "text": "In a village library"
          },
          {
            "emoji": "🏙️",
            "value": "office",
            "text": "In a city office"
          },
          {
            "emoji": "✈️",
            "value": "abroad",
            "text": "Travelling abroad"
          }
        ],
        "answer": "library"
      },
      {
        "type": "word_builder",
        "word": "purpose",
        "audioText": "purpose"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "learned",
          "far",
          "more",
          "than",
          "he",
          "had",
          "expected."
        ],
        "audioText": "He learned far more than he had expected."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "lesson",
          "stayed",
          "with",
          "him."
        ],
        "audioText": "That lesson stayed with him."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The librarian, from ___ he learned how to repair broken shelves and damaged pages, soon became a close friend.",
        "choices": [
          "whom",
          "which",
          "who"
        ],
        "answer": "whom",
        "audioText": "The librarian, from whom he learned how to repair broken shelves and damaged pages, soon became a close friend."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "His year in the village, far from wasting time, had given him the ___ to learn on his own.",
        "choices": [
          "confidence",
          "silence",
          "permission"
        ],
        "answer": "confidence",
        "audioText": "His year in the village, far from wasting time, had given him the confidence to learn on his own."
      }
    ]
  },
  {
    "id": "gk-r5-s06",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 6,
    "title": "The Bus Driver's Exam",
    "titleCn": "公交车司机的考试",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "Whenever I tell people about my father, who spent thirty years driving a bus through our crowded city, they assume that his life was simple. They are wrong. He was forty-eight, an age at which most people begin to slow down, when he signed up for a professional exam. The subjects he had to master included basic law and accounting, neither of which he had ever studied.",
        "translation": "每当我和别人谈起父亲——他在我们拥挤的城市里开了三十年公交车——他们总觉得他的人生很简单。他们错了。四十八岁那年，也就是大多数人开始放慢脚步的年纪，他报名参加了一项职业考试。他要掌握的内容包括基础法律和会计，而这两门他以前从未学过。"
      },
      {
        "text": "During the day he drove his bus, and in the evening, after a quick dinner, he sat at the kitchen table with an old dictionary and a pile of notes. My mother, who had expected the idea to fade within a week, was quietly surprised by his patience. Sometimes he fell asleep over his books, his glasses still on his nose, which soon became a family joke. What impressed me most was not his memory but his method, for which he had worked out his own simple rules.",
        "translation": "白天他开公交车，晚上匆匆吃完晚饭，他就坐在厨房餐桌旁，身边是一本旧词典和一沓笔记。母亲原以为这个念头撑不过一周，却被他的耐心悄悄打动了。有时他会趴在书上睡着，眼镜还架在鼻梁上，这很快成了家里的一个笑话。最让我印象深刻的不是他的记忆力，而是他的方法——他为此总结出了自己的一套简单规则。"
      },
      {
        "text": "For a long time I kept my distance, judging his efforts to be a waste of energy. One rainy evening, however, I found myself sitting beside him, helping him with English words with which he struggled. To my surprise, the questions he asked were sharper than many I heard in my own classroom. We began to study together, he with his law notes and I with my history textbook, and the kitchen table slowly turned into a small library.",
        "translation": "很长一段时间里我对他敬而远之，认为他的努力不过是白费力气。然而在一个雨夜，我发现自己坐在他身边，帮他查那些他读不顺的英语单词。令我意外的是，他提出的问题比我教室里听到的许多问题都要尖锐。我们开始一起学习，他带着他的法律笔记，我带着我的历史课本，厨房餐桌慢慢变成了一座小图书馆。"
      },
      {
        "text": "Six months later my father passed his exam, a result that surprised everyone except himself. When I asked him why he had bothered, he said, almost casually, that learning was the only thing nobody could take away from him. That sentence, which I copied into my diary that night, has stayed with me ever since.",
        "translation": "六个月后，父亲通过了考试，这个结果让所有人都感到意外，只有他自己不意外。我问他何必这么折腾，他几乎是随口地说：学问是唯一谁也拿不走的东西。那天夜里我把这句话抄进了日记，从那以后它一直留在我心里。"
      },
      {
        "text": "Some people believe that education ends the day you leave school, a belief that my father's example quietly destroys. Nobody is ever too old to learn, and no certificate, however impressive, marks the end of the road. The habit of asking questions, which he has never lost, matters far more than any grade on a report card. Whenever I feel lazy, I remember the kitchen table, the old dictionary and a tired man who refused to stop growing.",
        "translation": "有些人认为，教育在你离开学校那天就结束了，而父亲的例子悄悄推翻了这种看法。没有人会老到不能学习，任何证书，无论多么耀眼，都不是路的尽头。他一生都没有丢掉爱提问的习惯，这远比成绩单上的任何分数重要。每当我犯懒的时候，我就会想起那张厨房餐桌、那本旧词典，还有一个不肯停止成长的疲惫男人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did my father sit to study every evening?",
        "audioText": "Where did my father sit to study every evening?",
        "options": [
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "On his bus"
          },
          {
            "emoji": "🍽️",
            "value": "kitchen",
            "text": "At the kitchen table"
          },
          {
            "emoji": "🏫",
            "value": "classroom",
            "text": "In a classroom"
          }
        ],
        "answer": "kitchen"
      },
      {
        "type": "word_builder",
        "word": "dictionary",
        "audioText": "dictionary"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "signed",
          "up",
          "for",
          "a",
          "professional",
          "exam"
        ],
        "audioText": "He signed up for a professional exam."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Nobody",
          "is",
          "ever",
          "too",
          "old",
          "to",
          "learn"
        ],
        "audioText": "Nobody is ever too old to learn."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My mother, who had expected the idea to fade within a week, was quietly ___ by his patience.",
        "choices": [
          "surprised",
          "surprising",
          "surprise"
        ],
        "answer": "surprised",
        "audioText": "My mother, who had expected the idea to fade within a week, was quietly surprised by his patience."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The subjects he had to master included basic law and accounting, neither of ___ he had ever studied.",
        "choices": [
          "which",
          "whom",
          "that"
        ],
        "answer": "which",
        "audioText": "The subjects he had to master included basic law and accounting, neither of which he had ever studied."
      }
    ]
  },
  {
    "id": "gk-r5-s07",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 7,
    "title": "Learning After the Last Bell",
    "titleCn": "下课铃之后的学习",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "On the last morning of senior year, our English teacher, Mrs. Lin, handed each of us a thin notebook. Inside it she had written a single question, whose answer she wanted us to find for ourselves: \"What will you learn next?\" Most of us laughed, for we had just finished the examination for which we had waited three whole years. I did not answer the question then.",
        "translation": "高中最后一年的最后一个上午，我们的英语老师林太太给我们每人发了一本薄薄的笔记本。她在里面写了一个问题，答案她希望我们自己去寻找：\"你接下来要学什么？\"我们大多数人都笑了，因为我们刚刚结束了那场等了整整三年的考试。那时我并没有回答这个问题。"
      },
      {
        "text": "I put the notebook in a drawer and forgot about it, because I had already decided to take a gap year. My plan was simple: I would work in a small bookshop, save some money and travel a little. My parents, however, were worried that a year away from books would make me lazy.",
        "translation": "我把笔记本塞进抽屉，很快就把它忘了，因为我已经决定要度过一个间隔年。我的计划很简单：去一家小书店打工，攒点钱，再小小地旅行一次。然而，我的父母担心，一年不碰书本会让我变得懒散。"
      },
      {
        "text": "The bookshop stood on a quiet corner. Its owner, a retired teacher of seventy, to whom every customer turned for advice, was the most curious man I had ever met. He read every new book that came in, and each evening he wrote one fresh idea in a notebook of his own.",
        "translation": "那家书店坐落在一个安静的街角。店主是一位七十岁的退休教师，每位顾客都来找他讨教，他是我见过的最有好奇心的人。每来一本新书他都读，而且每天晚上他都会在自己的本子里写下一点新的想法。"
      },
      {
        "text": "One rainy afternoon, the shop empty and the windows wet, I asked him why he still studied so hard. \"Learning,\" he said quietly, \"is not a race that ends the moment a certificate is handed to you.\" Then he added something that I have never forgotten: \"Curiosity has no final bell.\"",
        "translation": "一个下雨的午后，店里空无一人，窗户湿漉漉的，我问他为什么还这么用功地学习。\"学习，\"他轻声说，\"不是一场在你拿到证书时就结束的比赛。\"接着他又说了一句我永远不会忘记的话：\"好奇心没有下课铃。\""
      },
      {
        "text": "That night I took Mrs. Lin's notebook out of the drawer and wrote my first answer. A gap year, I realised, is not a hole in your education but a door through which you may walk in any direction. That question stayed with me all summer.",
        "translation": "那天晚上，我从抽屉里拿出林太太的笔记本，写下了我的第一个答案。我意识到，间隔年并不是你教育中的一个空洞，而是一扇门，你可以穿过它走向任何方向。那个问题，整个夏天都伴随着我。"
      }
    ],
    "quiz": [
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "bookshop",
          "stood",
          "on",
          "a",
          "quiet",
          "corner."
        ],
        "audioText": "The bookshop stood on a quiet corner."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Its owner, a retired teacher of seventy, to ___ every customer turned for advice, was the most curious man I had ever met.",
        "choices": [
          "who",
          "whom",
          "which"
        ],
        "answer": "whom",
        "audioText": "Its owner, a retired teacher of seventy, to whom every customer turned for advice, was the most curious man I had ever met."
      },
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "One rainy afternoon, the shop ___ and the windows wet, I asked him why he still studied so hard.",
        "choices": [
          "empty",
          "empties",
          "emptied"
        ],
        "answer": "empty",
        "audioText": "One rainy afternoon, the shop empty and the windows wet, I asked him why he still studied so hard."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "question",
          "stayed",
          "with",
          "me",
          "all",
          "summer."
        ],
        "audioText": "That question stayed with me all summer."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A gap year is not a hole in your education but a door through ___ you may walk in any direction.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "which",
        "audioText": "A gap year is not a hole in your education but a door through which you may walk in any direction."
      }
    ]
  },
  {
    "id": "gk-r5-s08",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 8,
    "title": "The Teacher Who Became a Student",
    "titleCn": "成为学生的老师",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "My father had taught mathematics for thirty years when, to everyone's surprise, he signed up for an evening course in computer programming. His colleagues at school, most of whom were at least twenty years younger, could not understand his decision at all. \"Why start again at your age?\" asked a neighbour, for whom retirement seemed the only sensible plan.",
        "translation": "我父亲教了三十年数学，后来出乎所有人意料，他报名参加了一门夜间计算机编程课。他学校里的同事大多至少比他小二十岁，完全不理解他的决定。“你都这个年纪了，为什么还要重新开始？”一位邻居问道——在他看来，退休才是唯一明智的安排。"
      },
      {
        "text": "On the first evening, my father came home late, his notebook filled with unfamiliar symbols and his glasses pushed up on his forehead. He admitted that the teacher, from whom he learned more in three hours than in a whole month, spoke far too fast.",
        "translation": "第一天晚上，父亲很晚才回家，笔记本上写满了陌生的符号，眼镜推在额头上。他承认，那位老师讲得太快了——三小时里他从对方身上学到的东西，比他自己啃一个月的书还多。"
      },
      {
        "text": "He never missed a single class. What impressed me most was not the code he eventually mastered but the patience with which he faced every error. \"Behind each mistake,\" he told me one Sunday, \"there is a rule that I simply have not met yet.\"",
        "translation": "他一节课都没有缺过。最让我印象深刻的，不是他最终掌握的代码，而是他面对每一个错误时的那份耐心。“每一个错误背后，”他在一个星期天对我说，“都有一条我还没遇到的规则。”"
      },
      {
        "text": "By spring, my father had built a small website for his students, through which they could practise at their own speed. Learning, he believed, never ends. Watching him explain a difficult idea to a teenager, I realised that a teacher never really stops being a student.",
        "translation": "到了春天，父亲为他的学生做了一个小网站，他们可以通过它按自己的节奏练习。他相信，学习永无止境。看着他向一个少年解释一道难题，我意识到，老师其实从未真正停止做学生。"
      },
      {
        "text": "Today, whenever I am tempted to say that I am too old to learn something new, I remember that evening course. I see again the tired man at the kitchen table, his pen moving slowly across a page of code. Education, as he proved, is not a stage of life; it is a habit that lasts as long as curiosity does.",
        "translation": "如今，每当我想说自己太老了、学不了新东西时，我就会想起那门夜间课程。我仿佛又看到餐桌旁那个疲惫的人，笔在满是代码的纸页上缓缓移动。正如他所证明的，教育不是人生的某个阶段，而是一种只要好奇心还在就会延续下去的习惯。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which picture best matches what the father brought home from his first evening class?",
        "audioText": "Which picture best matches what the father brought home from his first evening class?",
        "options": [
          {
            "emoji": "📝",
            "value": "notebook",
            "text": "A notebook full of unfamiliar symbols"
          },
          {
            "emoji": "🏅",
            "value": "medal",
            "text": "A medal for the best student"
          },
          {
            "emoji": "🛌",
            "value": "rest",
            "text": "Advice to stop and rest"
          }
        ],
        "answer": "notebook"
      },
      {
        "type": "word_builder",
        "word": "patience",
        "audioText": "patience"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "never",
          "missed",
          "a",
          "single",
          "class."
        ],
        "audioText": "He never missed a single class."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Learning,",
          "he",
          "believed,",
          "never",
          "ends."
        ],
        "audioText": "Learning, he believed, never ends."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He admitted that the teacher, from ___ he learned more in three hours than in a whole month, spoke far too fast.",
        "choices": [
          "whom",
          "which",
          "who"
        ],
        "answer": "whom",
        "audioText": "He admitted that the teacher, from whom he learned more in three hours than in a whole month, spoke far too fast."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Behind each mistake, he told me one Sunday, there is a ___ that I simply have not met yet.",
        "choices": [
          "rule",
          "prize",
          "trick"
        ],
        "answer": "rule",
        "audioText": "Behind each mistake, he told me one Sunday, there is a rule that I simply have not met yet."
      }
    ]
  },
  {
    "id": "gk-r5-s09",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 9,
    "title": "My Grandmother's Second Graduation",
    "titleCn": "祖母的第二次毕业典礼",
    "coverEmoji": "🎓",
    "paragraphs": [
      {
        "text": "My grandmother retired from her job as a librarian when she was sixty-two years old. Everyone in our family expected her to spend her days gardening, an assumption which she politely but firmly refused to accept. Instead, she announced that she had applied to a university course in history, the subject to which she had devoted forty years of quiet reading. None of us knew how to respond, my mother staring at the admission letter in complete disbelief.",
        "translation": "我祖母六十二岁那年从图书馆管理员的工作岗位上退休了。家里人都以为她会种花、看电视来打发日子，而这个设想被她礼貌却坚决地拒绝了。相反，她宣布自己已经申请了一门大学历史课程，那是她默默读了四十年书的领域。我们谁也不知道该如何回应，母亲盯着那封录取通知书，满脸难以置信。"
      },
      {
        "text": "The first term turned out to be harder than she had imagined, partly because her classmates were young enough to be her grandchildren. She sat in the front row of a lecture hall in which two hundred teenagers tapped at their laptops. What surprised her most, however, was not the technology but the speed at which ideas were presented. Having spent years reading slowly and deeply, she found it difficult to follow lectures that moved like fast trains. She therefore recorded every class and listened to the recordings twice before each seminar.",
        "translation": "第一个学期比她想象的艰难，部分原因是同学们的年纪小到可以当她的孙辈。她坐在阶梯教室的第一排，那里有两百名青少年敲着笔记本电脑。不过，最让她吃惊的并不是技术，而是观点被抛出的速度。由于多年来读书又慢又深，她发现很难跟上像快车一样飞驰的课堂节奏。于是她把每一堂课都录下来，每次研讨课前都要把录音听上两遍。"
      },
      {
        "text": "By the end of the first year, something had shifted in the way her younger classmates saw her. They began asking her about the wars and the writers whom she had studied for decades. One student, whose own grandmother had dreamed of going to university, thanked her for proving that curiosity has no expiry date. She had become a bridge between two generations.",
        "translation": "第一学年结束时，年轻的同学们看待她的方式已经悄悄改变了。他们开始向她请教战争和作家的问题——那些人她研究了几十年。一名学生说，自己的祖母也曾梦想上大学，感谢她证明了好奇心没有保质期。她已经成了一座连接两代人的桥。"
      },
      {
        "text": "When I visited her during the summer holiday, I found her writing an essay about lifelong learning. Her desk was covered with books, several of them borrowed from the library where she had once worked. \"Learning,\" she told me, \"is not a stage of life but a habit which you can carry into old age.\" I realized then that education had never been about certificates for her; it was about staying awake to the world.",
        "translation": "暑假我去看她时，发现她正在写一篇关于终身学习的文章。桌上堆满了书，其中好几本是从她曾经工作过的图书馆借来的。“学习，”她对我说，“不是人生的某个阶段，而是一种可以一直带到老年的习惯。”我那时才明白，对她来说，教育从来不是为了证书，而是为了对世界始终保持清醒与热忱。"
      },
      {
        "text": "She graduated three years later, at sixty-five, with a degree in history and a smile that filled the whole hall. My mother, who had once doubted the whole idea, cried louder than anyone else in the audience. Since then, whenever I feel too old to learn something new, I remember the woman to whom I owe my love of reading. Her second graduation taught me a lesson that no classroom had ever taught me: it is never too late to begin.",
        "translation": "三年后，她六十五岁毕业，拿到了历史学位，笑容照亮了整个礼堂。曾经怀疑这个想法的母亲，哭声比台下任何人都大。从那以后，每当我觉得自己太老、学不动新东西时，我就会想起那位让我爱上阅读的女性。她的第二次毕业给我上了一堂任何课堂都没能教给我的课：开始，永远不嫌晚。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She sat in the front row of a lecture hall in ___ two hundred teenagers tapped at their laptops.",
        "choices": [
          "which",
          "that",
          "where"
        ],
        "answer": "which",
        "audioText": "She sat in the front row of a lecture hall in which two hundred teenagers tapped at their laptops."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Whenever I feel too old to learn something new, I remember the woman to ___ I owe my love of reading.",
        "choices": [
          "whom",
          "who",
          "which"
        ],
        "answer": "whom",
        "audioText": "Whenever I feel too old to learn something new, I remember the woman to whom I owe my love of reading."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "What surprised her most was not the technology but the ___ at which ideas were presented.",
        "choices": [
          "speed",
          "silence",
          "size"
        ],
        "answer": "speed",
        "audioText": "What surprised her most was not the technology but the speed at which ideas were presented."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "had",
          "become",
          "a",
          "bridge",
          "between",
          "two",
          "generations."
        ],
        "audioText": "She had become a bridge between two generations."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "is",
          "never",
          "too",
          "late",
          "to",
          "begin."
        ],
        "audioText": "It is never too late to begin."
      },
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      }
    ]
  },
  {
    "id": "gk-r5-s10",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 10,
    "title": "The Night School on Our Street",
    "titleCn": "我们街上的夜校",
    "coverEmoji": "🌙",
    "paragraphs": [
      {
        "text": "Every Tuesday and Thursday evening, the community centre at the end of our street opens its doors to a group of adults, most of whom have not sat in a classroom for thirty years. They arrive on foot or by bicycle, carrying notebooks in which the first page is always the hardest to fill. The lights above the entrance stay on until ten, when the last student, tired but satisfied, walks slowly home.",
        "translation": "每周二和周四晚上，我们街道尽头的社区中心都会向一群成年人敞开大门，他们中的大多数人已经三十年没坐进过教室了。他们有的步行，有的骑车，带着笔记本——那笔记本的第一页总是最难填满的。入口上方的灯一直亮到十点，那时最后一名学生虽然疲惫却心满意足，慢慢走回家。"
      },
      {
        "text": "Among the students is Mrs Lin, a retired bus conductor whom I have known since I was a child. She spent thirty-one years selling tickets on Route 7, and for most of that time she kept a small dictionary in her pocket, in which she wrote down every English word she heard from foreign visitors. Last autumn, at the age of sixty-two, she finally signed up for a course in English and basic mathematics. “I never had the chance to finish what I started,” she explained, “and I refuse to let my age decide what I can do.”",
        "translation": "这些学生中有林女士，一位退休的公交车售票员，我从小就认识她。她在7路车上卖了三十一年车票，那段时间里她口袋里一直揣着一本小词典，把从外国游客那里听到的每个英语单词都记在里面。去年秋天，六十二岁的她终于报名参加了一门英语和基础数学课程。「我从没机会把已经开始的事做完，」她解释说，「我也不会让年龄来决定我能做什么。」"
      },
      {
        "text": "The class is small, consisting of about a dozen learners, several of whom are older than my own grandparents. Their teacher, a young man in his twenties, admits that he often learns more from them than from any textbook he studied at university. What they lack in speed, he says, they make up for in patience and in the questions, carefully prepared in advance, that keep the whole room thinking. The lesson over, several of them stay behind to argue about grammar.",
        "translation": "这个班很小，大约十来个人，其中好几位比我的祖父母年纪还大。他们的老师是个二十多岁的年轻人，他承认自己从他们身上学到的，往往比在大学读过的任何教科书都多。他说，他们在速度上有所欠缺，却以耐心弥补，还有那些事先精心准备好、让整间教室都思考起来的问题。下课之后，他们中总有几个留下来争论语法。"
      },
      {
        "text": "Watching them, I have come to understand something that my generation tends to forget. We treat education as a stage of life, a box to be ticked before we start working, rather than a habit to be kept for a lifetime. Yet the people in that room, none of whom are chasing a certificate or a promotion, study simply because learning gives them pleasure and keeps their minds alive. Age has little to do with it. Their example suggests that curiosity does not fade with age; it fades only when we stop feeding it.",
        "translation": "看着他们，我渐渐明白了一些我这一代人容易忘记的事。我们把教育看作人生的一个阶段、一个开始工作前必须勾掉的方框，而不是一种要终身保持的习惯。然而那间屋子里的人——他们没有一个人是在追求证书或升职——学习只是因为学习给他们乐趣，让他们的头脑保持鲜活。年龄与此几乎无关。他们的例子说明，好奇心不会随年龄消退；它只在我们停止喂养它时才消失。"
      },
      {
        "text": "Last month Mrs Lin passed her first exam, and the whole class celebrated with tea and biscuits in the corridor. She told me afterwards that she had already chosen her next course, in which she hopes to read simple novels. When I complained that my own homework was too heavy, she laughed and reminded me that the only real reason to stop learning is to decide that you have learned enough. I have not complained since.",
        "translation": "上个月林女士通过了她的第一次考试，全班在走廊上用茶和饼干庆祝了一番。后来她告诉我，她已经选好了下一门课，希望能读懂简单的小说。当我抱怨自己的作业太重时，她笑了，提醒我停止学习的唯一真正理由，就是认定自己已经学够了。从那以后，我再没抱怨过。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where do the evening classes take place?",
        "audioText": "Where do the evening classes take place?",
        "options": [
          {
            "emoji": "🏫",
            "value": "community_centre",
            "text": "A community centre"
          },
          {
            "emoji": "🚌",
            "value": "bus_station",
            "text": "A bus station"
          },
          {
            "emoji": "📚",
            "value": "library",
            "text": "A library"
          }
        ],
        "answer": "community_centre"
      },
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "age",
          "has",
          "little",
          "to",
          "do",
          "with",
          "it"
        ],
        "audioText": "Age has little to do with it."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "they",
          "arrive",
          "on",
          "foot",
          "or",
          "by",
          "bicycle"
        ],
        "audioText": "They arrive on foot or by bicycle."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Mrs Lin is a retired bus ___.",
        "choices": [
          "conductor",
          "driver",
          "manager"
        ],
        "answer": "conductor",
        "audioText": "Mrs Lin is a retired bus conductor."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The people in that room study simply because learning gives them ___ and keeps their minds alive.",
        "choices": [
          "pleasure",
          "pressure",
          "profit"
        ],
        "answer": "pleasure",
        "audioText": "The people in that room study simply because learning gives them pleasure and keeps their minds alive."
      }
    ]
  },
  {
    "id": "gk-r5-s11",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 11,
    "title": "The Grandfather Who Learned to Code",
    "titleCn": "学会编程的爷爷",
    "coverEmoji": "💻",
    "paragraphs": [
      {
        "text": "My grandfather turned sixty-eight last spring, and instead of buying a new fishing rod, he signed up for an online course in computer programming. The course, which cost him less than a pair of shoes, promised to teach beginners how to write simple code within three months. Nobody in our family, my father included, believed that a man of his age would ever finish it.",
        "translation": "去年春天，爷爷满六十八岁。他没有买一根新鱼竿，而是报名参加了一门在线编程课。这门课的花费还不到一双鞋的价钱，却承诺在三个月内教会初学者写出简单的代码。我们家里没有人——包括我爸在内——相信他这样年纪的人真的能学完。"
      },
      {
        "text": "The first week was a small disaster, for which he blamed nobody but his own shaky fingers. He could not find the button that saved his work, and twice he deleted everything by accident. His notebook open beside the keyboard, he copied every instruction by hand, slowly and carefully, until his fingers ached. \"Computers,\" he told me, \"do not laugh at old men; they simply wait until you are ready.\"",
        "translation": "第一周算是场小灾难，对此他不怪别人，只怪自己那双发抖的手。他找不到保存文件的按钮，还两次不小心把做好的东西全删了。笔记本摊开在键盘旁，他把每一条指令都用手抄下来，又慢又仔细，直到手指发酸。“计算机，”他对我说，“不会嘲笑老人；它们只是等着你准备好。”"
      },
      {
        "text": "His classmates, most of whom were younger than my sister, met online every Tuesday evening to share their problems. The young woman who taught the class, a student of twenty-four, soon noticed that the oldest member asked the sharpest questions. She began to answer his questions first, which surprised everyone else in the group at the beginning. By the end of the term, he was helping others with the tasks that he himself had once failed.",
        "translation": "他的同学大多比我妹妹还年轻，他们每周二晚上在网上相聚，交流各自的难题。教这门课的年轻女老师是个二十四岁的学生，她很快注意到，班里年纪最大的学员提的问题最犀利。她开始先回答他的问题，一开始这让群里其他人很惊讶。到了学期末，他已经在帮别人解决那些他自己曾经做失败过的任务了。"
      },
      {
        "text": "Last month he showed us what he had built: a tiny program that reminds his neighbors to take their medicine on time. It runs on an old laptop, on which he spent weeks fixing small mistakes that nobody else could see. My father, who had laughed loudest in spring, now asks him for help with his own computer.",
        "translation": "上个月，他给我们看了自己做出来的东西：一个小程序，提醒邻居们按时吃药。它在一台旧笔记本电脑上运行，为了修好那些别人根本看不见的小错误，他在这台电脑上花了好几周。而春天笑得最大声的爸爸，如今反过来请他帮忙弄自己的电脑。"
      },
      {
        "text": "Grandpa has never used the word \"lifelong learning\", yet he practices it every single morning before breakfast. Education, he says, is not a building you leave at eighteen but a road that keeps going. Watching him type, I understand at last that the classroom has no walls and no final exam.",
        "translation": "爷爷从没用过“终身学习”这个词，可他在每个清晨、早饭之前都在这样做。他说，教育不是一栋你十八岁就走出去的大楼，而是一条一直延伸的路。看着他打字，我终于明白：教室没有墙，也没有期末考试。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Grandpa choose to do instead of buying a new fishing rod?",
        "audioText": "What did Grandpa choose to do instead of buying a new fishing rod?",
        "options": [
          {
            "emoji": "💻",
            "value": "coding_course",
            "text": "Take an online coding course"
          },
          {
            "emoji": "🎣",
            "value": "fishing_rod",
            "text": "Buy a better fishing rod"
          },
          {
            "emoji": "📺",
            "value": "watch_tv",
            "text": "Watch more television at home"
          }
        ],
        "answer": "coding_course"
      },
      {
        "type": "word_builder",
        "word": "keyboard",
        "audioText": "keyboard"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "runs",
          "on",
          "an",
          "old",
          "laptop"
        ],
        "audioText": "It runs on an old laptop."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "began",
          "to",
          "answer",
          "his",
          "questions",
          "first"
        ],
        "audioText": "She began to answer his questions first."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "His classmates, most of ___ were younger than my sister, met online every Tuesday evening.",
        "choices": [
          "whom",
          "which",
          "who"
        ],
        "answer": "whom",
        "audioText": "His classmates, most of whom were younger than my sister, met online every Tuesday evening."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The course, ___ cost him less than a pair of shoes, promised to teach beginners how to write simple code.",
        "choices": [
          "which",
          "who",
          "whose"
        ],
        "answer": "which",
        "audioText": "The course, which cost him less than a pair of shoes, promised to teach beginners how to write simple code."
      }
    ]
  },
  {
    "id": "gk-r5-s12",
    "track": "gaokao",
    "regionId": "gk-r5",
    "order": 12,
    "title": "The Homework I Set for Myself",
    "titleCn": "我给自己布置的作业",
    "coverEmoji": "📓",
    "paragraphs": [
      {
        "text": "I was fourteen when our English teacher, a quiet woman, told us something we had never expected to hear. Instead of wishing us a happy holiday, she asked a question that stayed with me for years. She asked what we would choose to learn if no one were ever going to test us again. The room went quiet, the clock on the wall suddenly the loudest thing in it.",
        "translation": "我十四岁那年，我们那位安静的英语老师说了句我们从没想过会听到的话。她没有祝我们假期愉快，而是问了一个多年后仍留在我心里的问题。她问的是：如果以后再没有人考我们，我们会选择去学什么？教室里安静下来，墙上的钟突然成了屋里最响的东西。"
      },
      {
        "text": "That summer, to my own surprise, I wrote a list of homework for myself, none of which anyone would mark. One task was to learn to swim, another to read a book in English without stopping for every new word. For the first time, the work belonged to me, and nobody, not even my parents, could take the credit or the blame.",
        "translation": "那个夏天，连我自己都意外，我给自己写了一份作业清单，而那些作业没有一个人会批改。一项任务是学会游泳，另一项是读一本英文书时不再为每个生词停下来。那是第一次，这份功课属于我自己，而没有人——甚至我的父母——能替我领这份功劳或背这个锅。"
      },
      {
        "text": "Years passed, and the lists changed with me, though the habit of making them never did. At seventeen, the homework was an exam I had set for myself, the result of which mattered more than any school report. In my first year at university, I added a task that frightened me: speaking up in a class of two hundred. Later, working full-time, I learned to cook properly, a skill my mother, who had fed us for twenty years, found amusing.",
        "translation": "几年过去，清单随我一同改变，尽管列清单的习惯从未变过。十七岁时，那份作业成了一场我为自己设的考试，而它的结果比任何学校的成绩单都更重要。上大学第一年，我加了一项让我害怕的任务：在两百人的课上开口发言。再后来，一边全职工作，我学会了正经做饭——这项本领让我母亲觉得好笑，她可是给我们做了二十年饭的人。"
      },
      {
        "text": "Some people say learning belongs to childhood, to classrooms, to the years when someone else decides what you need. That view, I have come to believe, misses something essential about education, the thing our teacher was hinting at. School gives us a start, but the long race, in which nobody forces us forward, is run alone.",
        "translation": "有人说，学习属于童年，属于教室，属于那些由别人决定你需要什么的年月。在我看来，这种看法忽略了教育中最要紧的东西，也就是我们那位老师当年暗示的那一点。学校给了我们一个起点，但那条漫长的、没有人逼你向前的赛道，是要独自跑完的。"
      },
      {
        "text": "Now, whenever September arrives, I still write a short list of things I want to learn, and I sign it with my own name. The teacher retired long ago, and she will never know what her question started, which is perhaps the best kind of homework there is. Learning, after all, is not a task that ends; it is a habit that keeps us curious as long as we live.",
        "translation": "如今每到九月，我仍会写下一张想学什么的短清单，并签上自己的名字。那位老师早已退休，她永远不会知道她那个问题开启了多少东西——而这大概就是最好的那种作业了。毕竟，学习不是一件会结束的任务，而是一种让我们终生保持好奇的习惯。"
      }
    ],
    "quiz": [
      {
        "type": "word_builder",
        "word": "curious",
        "audioText": "curious"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Some",
          "people",
          "say",
          "learning",
          "belongs",
          "to",
          "childhood"
        ],
        "audioText": "Some people say learning belongs to childhood."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "added",
          "a",
          "task",
          "that",
          "frightened",
          "me"
        ],
        "audioText": "I added a task that frightened me."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Instead of wishing us a happy holiday, she asked a ___ that stayed with me for years.",
        "choices": [
          "question",
          "ticket",
          "promise"
        ],
        "answer": "question",
        "audioText": "Instead of wishing us a happy holiday, she asked a question that stayed with me for years."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "School gives us a start, but the long race, in ___ nobody forces us forward, is run alone.",
        "choices": [
          "that",
          "which",
          "whom"
        ],
        "answer": "which",
        "audioText": "School gives us a start, but the long race, in which nobody forces us forward, is run alone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Learning is not a task that ends; it is a habit that keeps us ___ as long as we live.",
        "choices": [
          "curious",
          "silent",
          "careful"
        ],
        "answer": "curious",
        "audioText": "Learning is not a task that ends; it is a habit that keeps us curious as long as we live."
      }
    ]
  },
  {
    "id": "gk-r6-s01",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 1,
    "title": "Small Shop, Big Lessons",
    "titleCn": "小店大学问",
    "coverEmoji": "🕯️",
    "paragraphs": [
      {
        "text": "When Maya and her brother opened a tiny candle shop on Bridge Street, they had no money for television advertising. Although their candles smelled wonderful, few people walked through the door during the first month. While larger brands spent millions on posters and online videos, the two teenagers could only afford a hand-written sign and a few free samples.",
        "translation": "玛雅和哥哥在桥街开了一家小小的蜡烛店时，他们根本没钱做电视广告。虽然他们的蜡烛香气迷人，可第一个月里几乎没什么人进店。当大品牌把数百万资金砸在海报和网络视频上时，这两个少年只买得起一块手写招牌和几份免费试用装。"
      },
      {
        "text": "Then Maya remembered a lesson from her economics class: how a product is presented often matters more than what it actually contains. She put three candles on one shelf, priced at eight, twenty and thirty-eight yuan. The middle candle, as most shoppers later explained, simply felt like the safest choice, and it soon became their best seller.",
        "translation": "后来玛雅想起经济学课上的一条道理：商品怎么摆放，往往比它本身是什么更重要。她把三支蜡烛摆在同一层货架上，分别标价八元、二十元和三十八元。正如后来大多数顾客解释的那样，中间那支蜡烛让人感觉最稳妥，很快它就成了店里的畅销款。"
      },
      {
        "text": "Encouraged by this success, the pair tried another trick that advertisers use everywhere. They wrote 'only ten left today' on a small board beside the window. Although the total number of candles never changed, customers began to buy more quickly, afraid of missing something valuable. Free samples of a new winter scent, placed near the door, worked just as well.",
        "translation": "这次成功让他们受到鼓舞，两人又试了广告商到处都在用的一个花招。他们在橱窗边的小黑板上写下“今日仅剩十支”。虽然蜡烛的总数其实一支没变，顾客却开始买得更快，生怕错过什么好东西。摆在门边的新款冬日香型试用装，也同样奏效。"
      },
      {
        "text": "Yet Maya soon began to feel uncomfortable about these tricks. While they clearly increased sales, some buyers seemed to regret their choices afterwards, which worried her a lot. She decided to keep only the honest ones: real samples, clear prices and friendly advice. Surprisingly, sales stayed high, because people returned and brought their friends along.",
        "translation": "可没过多久，玛雅对这些花招开始感到不安。虽然它们的的确确提高了销量，但有些买家事后似乎后悔了自己的选择，这让她很担心。她决定只留下那些诚实的做法：真实的试用装、清楚的价格和友善的建议。令人意外的是，销量依然很高，因为人们会回来，还会带上朋友。"
      },
      {
        "text": "Today the little shop earns enough to support both families. Despite its success, Maya still refuses to print false messages on the window. 'A clever sign can bring someone in once,' she says, 'but only trust brings them back.'",
        "translation": "如今这家小店赚的钱足以养活两家人。尽管生意做得不错，玛雅仍然拒绝在橱窗上写任何虚假的字句。她说：“一个聪明的招牌能让人进来一次，但只有信任才能让人再来。”"
      }
    ],
    "quiz": [
      {
        "type": "sentence_order",
        "correctOrder": [
          "Although",
          "the",
          "total",
          "number",
          "of",
          "candles",
          "never",
          "changed"
        ],
        "audioText": "Although the total number of candles never changed, customers began to buy more quickly."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "decided",
          "to",
          "keep",
          "only",
          "the",
          "honest",
          "ones"
        ],
        "audioText": "She decided to keep only the honest ones: real samples, clear prices and friendly advice."
      },
      {
        "type": "word_builder",
        "word": "customers",
        "audioText": "customers"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ their candles smelled wonderful, few people walked through the door during the first month.",
        "choices": [
          "Although",
          "Because",
          "Unless"
        ],
        "answer": "Although",
        "audioText": "Although their candles smelled wonderful, few people walked through the door during the first month."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The middle candle, ___ most shoppers later explained, simply felt like the safest choice.",
        "choices": [
          "as",
          "that",
          "who"
        ],
        "answer": "as",
        "audioText": "The middle candle, as most shoppers later explained, simply felt like the safest choice."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Despite its ___, Maya still refuses to print false messages on the window.",
        "choices": [
          "success",
          "succeed",
          "successful"
        ],
        "answer": "success",
        "audioText": "Despite its success, Maya still refuses to print false messages on the window."
      }
    ]
  },
  {
    "id": "gk-r6-s02",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 2,
    "title": "Why We Buy More Than We Need",
    "titleCn": "我们为何买得比需要的多",
    "coverEmoji": "🛒",
    "paragraphs": [
      {
        "text": "Most shoppers believe that every choice they make in a store is completely rational, yet the truth is far more complicated than that. Although we like to think we compare prices carefully, our decisions are often influenced by colours, music and the way products are placed on shelves. While few customers notice these details, they can quietly change what we finally put into our baskets.",
        "translation": "多数购物者相信，他们在商店里做出的每一个选择都完全理性，但事实远比这复杂。虽然我们喜欢认为自己会仔细比较价格，我们的决定却常常受到颜色、音乐以及商品摆放方式的影响。尽管很少有顾客注意到这些细节，它们却能悄悄地改变我们最终放进购物篮里的东西。"
      },
      {
        "text": "Prices rarely tell the whole story. Consider the familiar price of 9.99 yuan, which feels much cheaper than ten although the difference is only one cent. Stores also create a sense of urgency by announcing that an offer will end soon, as countless advertisements do every day. Despite knowing that such messages are designed to push us, many of us still rush to buy before the clock runs out.",
        "translation": "价格很少能说明全部问题。想一想那个熟悉的 9.99 元，虽然只差一分钱，它却让人觉得比十元便宜得多。商店还会宣布优惠即将结束，从而制造出一种紧迫感，正如每天无数广告所做的那样。尽管知道这类信息就是为了促使我们消费，我们中的许多人还是会在倒计时结束前抢着下单。"
      },
      {
        "text": "Small changes in a shop can quietly shape our shopping decisions. A young owner of a small tea shop once told me how she used a simple trick to raise her sales. Although her medium cup had always been the most popular choice, she added a larger size that cost just two yuan more. While customers rarely chose the biggest cup, the medium one suddenly looked like a reasonable bargain. Her daily income rose by almost a third.",
        "translation": "商店里的一些小改动就能悄悄左右我们的购物决定。一位开小茶店的年轻店主曾告诉我，她是如何用一个简单的花招提高销量的。虽然她的中杯一直是最受欢迎的选择，她还是增加了一个只贵两元的大杯。尽管顾客很少选最大的那杯，中杯却突然显得很划算。她的日营业额因此增长了将近三分之一。"
      },
      {
        "text": "Being a smart consumer does not mean refusing to buy anything, but it does mean asking why a product feels so attractive. As researchers have pointed out, the best protection against clever marketing is simply a little patience. Once we understand these tricks, we can enjoy shopping without letting them empty our wallets.",
        "translation": "做一个聪明的消费者并不意味着什么都不买，而是意味着要问一问：为什么一件商品看起来如此诱人。正如研究者所指出的，抵御高明营销的最好办法其实就是多一点耐心。一旦我们看懂了这些花招，我们就能享受购物的乐趣，而不让它们掏空我们的钱包。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Although we like to think we compare prices carefully, our decisions are often ___ by colours, music and the way products are placed on shelves.",
        "choices": [
          "influenced",
          "refused",
          "divided"
        ],
        "answer": "influenced",
        "audioText": "Although we like to think we compare prices carefully, our decisions are often influenced by colours, music and the way products are placed on shelves."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Prices",
          "rarely",
          "tell",
          "the",
          "whole",
          "story."
        ],
        "audioText": "Prices rarely tell the whole story."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Stores also create a sense of ___ by announcing that an offer will end soon, as countless advertisements do every day.",
        "choices": [
          "urgency",
          "safety",
          "beauty"
        ],
        "answer": "urgency",
        "audioText": "Stores also create a sense of urgency by announcing that an offer will end soon, as countless advertisements do every day."
      },
      {
        "type": "word_builder",
        "word": "patience",
        "audioText": "patience"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Her",
          "daily",
          "income",
          "rose",
          "by",
          "almost",
          "a",
          "third."
        ],
        "audioText": "Her daily income rose by almost a third."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ customers rarely chose the biggest cup, the medium one suddenly looked like a reasonable bargain.",
        "choices": [
          "While",
          "Because",
          "Unless"
        ],
        "answer": "While",
        "audioText": "While customers rarely chose the biggest cup, the medium one suddenly looked like a reasonable bargain."
      }
    ]
  },
  {
    "id": "gk-r6-s03",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 3,
    "title": "Why Milk Sits at the Back of the Store",
    "titleCn": "为什么牛奶放在超市最里面",
    "coverEmoji": "🛒",
    "paragraphs": [
      {
        "text": "Have you ever noticed that fresh milk is almost never sold near the front entrance of a supermarket? Although the dairy section seems to hide in the farthest corner, that position is no accident at all. Store designers deliberately place everyday basics at the back, as anyone who has walked past long rows of snacks knows well.",
        "translation": "你有没有注意到，新鲜牛奶几乎从不摆在超市靠近正门入口的地方？虽然奶制品区似乎藏在最远的角落里，但这个位置绝非偶然。商店设计师故意把日常必需品放在最里面，凡是走过一长排零食货架的人都很清楚这一点。"
      },
      {
        "text": "When shoppers walk to the back for a bottle of milk, they pass hundreds of other products on the way. While they are looking for just one simple item, their eyes catch bright packets, special offers and new flavours. Many of them eventually leave the store with far more than they had originally planned to buy.",
        "translation": "当顾客走到最里面去买一瓶牛奶时，一路上会经过数百种其他商品。虽然他们只是在找一件简单的东西，眼睛却会被鲜艳的包装、特价优惠和新口味吸引。最终，他们中的许多人离开商店时，买的东西远多于原本的计划。"
      },
      {
        "text": "Essentials are often spread far apart on purpose, so customers must cross the whole shop to finish a short list. Despite the extra walking, most people do not seem to mind, and few of them ever complain about it. In fact, the longer customers stay inside the building, the more likely they are to spend extra money.",
        "translation": "必需品常常被故意分散摆放，所以顾客为了完成一张短短的购物清单，必须穿越整家店。尽管多走了不少路，大多数人似乎并不在意，也很少有人抱怨。事实上，顾客在店里待得越久，就越可能多花钱。"
      },
      {
        "text": "Small corner shops, however, cannot play the same game, simply because their space is too limited. As every shop owner knows, the trick only works when the shopping trip still feels easy and pleasant. Customers who feel tired or cheated may simply decide to take their money and shop somewhere else.",
        "translation": "然而，小街角店玩不了同样的把戏，因为它们的空间实在有限。正如每位店主都知道的，只有当购物过程仍然让人感到轻松愉快时，这种窍门才奏效。感到疲惫或觉得受骗的顾客，很可能干脆带着钱去别处购物。"
      },
      {
        "text": "The next time you walk into a large supermarket, pay close attention to the path you follow. Although you may believe that you are choosing freely, every step has probably been planned in advance. Understanding this does not mean you must stop shopping; it simply helps you spend your money more wisely.",
        "translation": "下次走进大型超市时，请留意你走的路线。虽然你可能认为自己在自由选择，但每一步大概都是事先设计好的。明白这一点并不意味着你必须停止购物，它只是帮助你更明智地花钱。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, where do shoppers usually find the dairy section?",
        "audioText": "According to the passage, where do shoppers usually find the dairy section?",
        "options": [
          {
            "emoji": "🚪",
            "value": "front",
            "text": "Near the front door"
          },
          {
            "emoji": "🧀",
            "value": "corner",
            "text": "In the farthest corner"
          },
          {
            "emoji": "💳",
            "value": "checkout",
            "text": "Beside the checkout"
          }
        ],
        "answer": "corner"
      },
      {
        "type": "word_builder",
        "word": "essentials",
        "audioText": "essentials"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "every",
          "step",
          "has",
          "probably",
          "been",
          "planned",
          "in",
          "advance"
        ],
        "audioText": "Every step has probably been planned in advance."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "few",
          "of",
          "them",
          "ever",
          "complain",
          "about",
          "it"
        ],
        "audioText": "Few of them ever complain about it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ the extra walking, most people do not seem to mind.",
        "choices": [
          "Despite",
          "Although",
          "Because"
        ],
        "answer": "Despite",
        "audioText": "Despite the extra walking, most people do not seem to mind."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Store designers ___ place everyday basics at the back.",
        "choices": [
          "deliberately",
          "luckily",
          "rarely"
        ],
        "answer": "deliberately",
        "audioText": "Store designers deliberately place everyday basics at the back."
      }
    ]
  },
  {
    "id": "gk-r6-s04",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 4,
    "title": "Why Prices End in Nine",
    "titleCn": "价格为什么以 9 结尾",
    "coverEmoji": "🏷️",
    "paragraphs": [
      {
        "text": "Walk into almost any supermarket, and you will notice that many price tags end with the number nine. Although a shirt marked 199 yuan costs only one yuan less than one marked 200, shoppers treat the two prices very differently. Researchers call this the left-digit effect, as the first number we see shapes our judgment more strongly than the digits that follow.",
        "translation": "走进任何一家超市，你都会注意到很多价签都以数字 9 结尾。虽然标价 199 元的衬衫只比标价 200 元的便宜一元，购物者对这两个价格的态度却大不相同。研究者把这种现象称为“首位数字效应”，因为我们看到的第一个数字，比后面那些数字更能左右我们的判断。"
      },
      {
        "text": "When we read 199, our eyes fix on the first digit, while the rest of the number slips quietly into the background. Our brains, as a result, file the price under 'about one hundred' rather than 'nearly two hundred', which feels far more expensive. Despite the tiny real difference, the imagined saving is big enough to push a hesitant customer towards the checkout.",
        "translation": "看到 199 时，我们的目光会停在第一个数字上，而数字的其余部分则悄悄退到背景里。于是大脑把价格归入“大约一百”，而不是“将近两百”——后者让人感觉贵得多。尽管实际差价微乎其微，想象出来的省钱感却足以把犹豫的顾客推向收银台。"
      },
      {
        "text": "Not every business relies on this trick, and a bakery owner in my town once refused to follow it. Ms Lin priced her cakes at round numbers, because she believed that honest figures would build trust with regular customers. Her cakes were excellent, as everyone in the neighbourhood agreed, yet the sales figures stayed flat for months.",
        "translation": "并非所有商家都靠这一招，我镇上的一位面包店老板就曾拒绝这么做。林女士把蛋糕定成整数价，因为她相信诚实的数字能赢得老顾客的信任。她的蛋糕确实很棒，这一点街坊邻居都认同，可销售额却连续几个月毫无起色。"
      },
      {
        "text": "Ms Lin eventually tried 8.9 yuan for a slice instead of 9, and the result surprised her. Within a week, the number of customers rose by nearly a third, while her total income actually increased. She still laughs about it, saying that people are not foolish; they simply enjoy the feeling of a good deal.",
        "translation": "林女士最终把一块蛋糕的标价从 9 元改成 8.9 元，结果让她大吃一惊。不到一周，顾客人数就增加了近三分之一，而她的总收入竟然还上升了。如今她提起这事还会笑，说顾客并不傻，他们只是喜欢“捡到便宜”的那种感觉。"
      },
      {
        "text": "Understanding such tricks does not mean that we must stop buying the things we genuinely need. Instead, it helps us ask a simple question: would I still want this if the price were a whole number? As more shoppers learn to pause before they pay, companies may find that clever pricing alone cannot keep them loyal.",
        "translation": "看穿这些花招，并不意味着我们必须停止购买真正需要的东西。它只是帮我们多问一句：要是这个价格是个整数，我还想买吗？随着越来越多的购物者学会在付钱前先停一停，商家或许会发现，光是定价聪明，并不能让顾客一直忠于自己。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Researchers call this the left-digit effect, as the first number we see shapes our ___ more strongly than the digits that follow.",
        "choices": [
          "judgment",
          "income",
          "trust"
        ],
        "answer": "judgment",
        "audioText": "Researchers call this the left-digit effect, as the first number we see shapes our judgment more strongly than the digits that follow."
      },
      {
        "type": "word_builder",
        "word": "digit",
        "audioText": "digit"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "our",
          "eyes",
          "fix",
          "on",
          "the",
          "first",
          "digit"
        ],
        "audioText": "Our eyes fix on the first digit."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Despite the tiny real difference, the imagined ___ is big enough to push a hesitant customer towards the checkout.",
        "choices": [
          "saving",
          "discount",
          "profit"
        ],
        "answer": "saving",
        "audioText": "Despite the tiny real difference, the imagined saving is big enough to push a hesitant customer towards the checkout."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "sales",
          "figures",
          "stayed",
          "flat",
          "for",
          "months"
        ],
        "audioText": "The sales figures stayed flat for months."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "As more shoppers learn to pause before they pay, companies may find that clever pricing alone cannot keep them ___.",
        "choices": [
          "loyal",
          "foolish",
          "silent"
        ],
        "answer": "loyal",
        "audioText": "As more shoppers learn to pause before they pay, companies may find that clever pricing alone cannot keep them loyal."
      }
    ]
  },
  {
    "id": "gk-r6-s05",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 5,
    "title": "The Hidden Cost of Free Delivery",
    "titleCn": "免费送货的隐藏成本",
    "coverEmoji": "📦",
    "paragraphs": [
      {
        "text": "Online shoppers often treat free delivery as a basic right, although they rarely stop to ask who really pays for it. While the van, the driver and the fuel all cost money, free delivery still makes a shop feel more generous than its competitors.",
        "translation": "网购的人常常把免费送货当成一项基本权利，尽管他们很少停下来想一想究竟是谁在为它买单。虽然货车、司机和燃油都要花钱，但“免费送货”仍然会让一家店显得比同行更大方。"
      },
      {
        "text": "Free delivery is never truly free. For a small business, however, free delivery is not a gift; it is a discount the owner quietly pays out of his own pocket. Although the customer sees a simple zero on the screen, the shop must recover that cost somewhere. It usually does so by raising the price of the goods.",
        "translation": "免费送货从来都不是真的免费。不过对小本生意来说，免费送货并不是礼物，而是店主悄悄从自己口袋里掏出来的一笔折扣。尽管顾客在屏幕上只看到一个简简单单的“0”，店家却必须在别处把这笔成本找回来。它通常的做法就是抬高商品的价格。"
      },
      {
        "text": "Consider Lily, who runs a small online tea company from a rented room in Hangzhou, China. When she first offered free shipping on every order, her sales rose quickly, as is common with new online shops. Yet her profits fell, because each package of cheap tea cost more to post than the tea itself was worth.",
        "translation": "来看看莉莉，她在中国杭州一间租来的屋子里经营着一家小小的茶叶网店。她起初对每一笔订单都提供免费配送时，销量很快上升，这在新的网店里很常见。然而她的利润却下降了，因为每寄一包便宜的茶叶，邮费比茶叶本身还贵。"
      },
      {
        "text": "Despite the disappointing numbers, Lily refused to give up her young business, which she had built from nothing. She studied her records carefully and noticed that most of her customers ordered only one small box at a time. While a single small box lost her money, three or more boxes earned her a safe profit.",
        "translation": "尽管数字令人失望，莉莉还是不肯放弃这家她白手起家做起来的年轻小店。她仔细研究了自己的记录，发现大多数顾客一次只订一小盒。虽然单独一小盒让她亏钱，但三盒以上就能让她稳稳赚上一笔。"
      },
      {
        "text": "So Lily kept free delivery, but only for orders above a certain amount, and her customers accepted the new rule without complaint. That small change saved her business. As the story clearly shows, a clever price can turn a heavy cost into a reason to buy more.",
        "translation": "于是莉莉保留了免费送货，但只针对达到一定金额的订单，而顾客们毫无怨言地接受了这条新规矩。这个小小的改变救了她的生意。正如这个故事清楚地表明的那样，聪明的定价能把一笔沉重的成本变成让人多买的理由。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, how does a shop usually recover the cost of free delivery?",
        "audioText": "According to the passage, how does a shop usually recover the cost of free delivery?",
        "options": [
          {
            "emoji": "⬆️",
            "value": "raise",
            "text": "By raising prices"
          },
          {
            "emoji": "🚚",
            "value": "vans",
            "text": "By sending fewer vans"
          },
          {
            "emoji": "🎁",
            "value": "gifts",
            "text": "By giving real gifts"
          }
        ],
        "answer": "raise"
      },
      {
        "type": "word_builder",
        "word": "delivery",
        "audioText": "delivery"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Free",
          "delivery",
          "is",
          "never",
          "truly",
          "free."
        ],
        "audioText": "Free delivery is never truly free."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Although the customer sees a simple ___ on the screen, the shop must recover that cost somewhere.",
        "choices": [
          "zero",
          "gift",
          "discount"
        ],
        "answer": "zero",
        "audioText": "Although the customer sees a simple zero on the screen, the shop must recover that cost somewhere."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "small",
          "change",
          "saved",
          "her",
          "business."
        ],
        "audioText": "That small change saved her business."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ a single small box lost her money, three or more boxes earned her a safe profit.",
        "choices": [
          "While",
          "Despite",
          "Because"
        ],
        "answer": "While",
        "audioText": "While a single small box lost her money, three or more boxes earned her a safe profit."
      }
    ]
  },
  {
    "id": "gk-r6-s06",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 6,
    "title": "Why Slow Music Sells More",
    "titleCn": "为什么慢音乐能卖出更多",
    "coverEmoji": "🎶",
    "paragraphs": [
      {
        "text": "Step into almost any large supermarket and you may notice something unusual: the music playing quietly in the background is usually slower than the songs on the radio. Although most shoppers never pay attention to it, this choice is made on purpose. Store managers believe that gentle, slow music can change the way people walk, look and spend.",
        "translation": "走进几乎任何一家大型超市，你也许都会注意到一件不太寻常的事：背景里轻轻播放的音乐，通常比电台里的歌要慢。虽然大多数顾客从不留意它，但这个选择是故意做出的。商店经理相信，轻柔缓慢的音乐能改变人们走路、观看和花钱的方式。"
      },
      {
        "text": "For many years, researchers have studied how background music affects customers in shops. In one well-known experiment, a supermarket played fast music on some days and slow music on others. While the total number of shoppers stayed almost the same, those who heard slow music walked more slowly and spent far more money. The scientists concluded that slower music creates a relaxed mood, and relaxed people tend to browse for longer.",
        "translation": "多年来，研究人员一直在研究背景音乐如何影响商店里的顾客。在一项著名的实验中，一家超市在某些日子播放快节奏音乐，在另一些日子播放慢节奏音乐。虽然顾客的总数几乎保持不变，但听到慢音乐的人走得更慢，花的钱却多得多。科学家们得出结论：较慢的音乐会营造出放松的情绪，而放松的人往往逛得更久。"
      },
      {
        "text": "Lighting works in a similar way, as shop designers have long understood. Although bright lights are useful for showing products clearly, warmer and softer light often makes a space feel more comfortable. Despite the extra cost, many stores now invest in carefully designed lighting and pleasant smells. As is common in large shopping centres, every detail is planned to keep you inside for longer.",
        "translation": "灯光的作用也类似，这一点商店设计师们早就明白。虽然明亮的灯光有助于清楚地展示商品，但更温暖、更柔和的光线往往会让空间感觉更舒适。尽管成本更高，如今许多商店仍会花钱布置精心设计的灯光和宜人的气味。正如大型购物中心里常见的那样，每一个细节都是为了让顾客待得更久。"
      },
      {
        "text": "However, these methods do not work on everyone, and some customers find them annoying rather than helpful. While slow music may encourage a few extra purchases, it cannot hide high prices or poor service. With smartphones in hand, shoppers can now compare prices instantly, as many young people do before buying anything.",
        "translation": "然而，这些方法并非对每个人都有效，有些顾客觉得它们令人厌烦，而不是有帮助。虽然慢音乐或许能促成一两笔额外的购买，但它无法掩盖高昂的价格或糟糕的服务。手里拿着智能手机，顾客现在可以立刻比较价格，许多年轻人在买任何东西之前都会这么做。"
      },
      {
        "text": "Once you understand how a store is designed, you can decide for yourself what to buy and what to leave on the shelf. After all, the best shoppers are not those who spend the most, but those who know why they are spending.",
        "translation": "一旦你明白了商店是如何被设计出来的，你就能自己决定要买什么、把什么留在货架上。毕竟，最好的顾客不是花钱最多的人，而是知道自己究竟为什么花钱的人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what happens when slow music is played in a supermarket?",
        "audioText": "According to the passage, what happens when slow music is played in a supermarket?",
        "options": [
          {
            "emoji": "🐢",
            "value": "slow_walk",
            "text": "Shoppers walk more slowly and spend more."
          },
          {
            "emoji": "🏃",
            "value": "hurry_out",
            "text": "Shoppers hurry out of the store at once."
          },
          {
            "emoji": "🔇",
            "value": "hear_nothing",
            "text": "Shoppers can no longer hear any music."
          }
        ],
        "answer": "slow_walk"
      },
      {
        "type": "word_builder",
        "word": "browse",
        "audioText": "browse"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "this",
          "choice",
          "is",
          "made",
          "on",
          "purpose"
        ],
        "audioText": "This choice is made on purpose."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "these",
          "methods",
          "do",
          "not",
          "work",
          "on",
          "everyone"
        ],
        "audioText": "These methods do not work on everyone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Although bright lights are useful for showing products clearly, warmer and softer light often makes a space feel more ___.",
        "choices": [
          "comfortable",
          "expensive",
          "crowded"
        ],
        "answer": "comfortable",
        "audioText": "Although bright lights are useful for showing products clearly, warmer and softer light often makes a space feel more comfortable."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ the extra cost, many stores now invest in carefully designed lighting and pleasant smells.",
        "choices": [
          "Despite",
          "Because of",
          "Instead of"
        ],
        "answer": "Despite",
        "audioText": "Despite the extra cost, many stores now invest in carefully designed lighting and pleasant smells."
      }
    ]
  },
  {
    "id": "gk-r6-s07",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 7,
    "title": "Why Stories Sell Better Than Facts",
    "titleCn": "为什么故事比事实更好卖",
    "coverEmoji": "📖",
    "paragraphs": [
      {
        "text": "Step into a modern supermarket, and you will notice a quiet change in the way products speak to us. Although two bottles of shampoo may contain almost identical ingredients, the one with a touching story on its label often ends up in more shopping carts. While price and quality still matter, they are no longer the only forces guiding our choices.",
        "translation": "走进任何一家现代超市，你都会注意到商品与我们对话的方式发生了悄然的变化。虽然两瓶洗发水的成分可能几乎完全相同，但标签上写着动人故事的那一瓶，往往会被更多人放进购物车。价格和质量固然重要，但它们不再是左右我们选择的唯一力量。"
      },
      {
        "text": "Advertising agencies understood this shift long ago, and today they sell narratives rather than lists of facts. A story needs a hero, a struggle and a happy ending, as a novel needs a plot to keep readers turning pages. A family farm that nearly closed, a grandmother's secret recipe, a founder who failed four times — such tales give ordinary goods an emotional weight that numbers alone cannot carry. Despite the higher prices, customers gladly pay more for the feeling that they are part of something real.",
        "translation": "广告公司很早就察觉到了这种转变，如今它们卖的是故事，而不是一串串事实。一个故事需要主角、波折和圆满的结局，就像小说需要情节才能让读者一页页读下去。一家差点关门的家庭农场、祖母的秘方、一位失败了四次的创业者——这些故事赋予普通商品一种单凭数字永远无法承载的情感分量。尽管价格更高，顾客仍乐于为「自己属于某件真实之事」的感觉多掏钱。"
      },
      {
        "text": "Economists call this extra willingness to pay the 'story premium'. Researchers once asked volunteers to taste two identical pieces of chocolate, telling them that one came from a small craft workshop and the other from a large factory. Although the chocolate was exactly the same, most participants described the 'craft' one as richer and smoother, and they offered to pay twice as much for it. The brain, it seems, tastes the story as much as the sugar.",
        "translation": "经济学家把这种额外的付费意愿称为「故事溢价」。研究人员曾请志愿者品尝两块一模一样的巧克力，并告诉他们一块来自小型手工作坊，另一块来自大型工厂。尽管巧克力完全相同，大多数参与者仍觉得「手工」那块更醇厚顺滑，并表示愿意为此付双倍的价钱。看来，大脑尝到的不只是糖，还有故事。"
      },
      {
        "text": "This does not mean that facts are worthless. While a good story attracts attention, a poor product destroys trust, as disappointed customers share their anger online within hours. Trust, once broken, is hard to repair. Successful young companies treat the story as a door rather than a house: it invites people in, but the quality inside decides whether they stay.",
        "translation": "这并不意味着事实毫无价值。好故事固然能吸引注意，但糟糕的产品会毁掉信任，因为失望的顾客几小时内就会在网上发泄不满。信任一旦破碎，就很难修复。因此，成功的年轻公司把故事当成一扇门，而不是一座房子：它把人请进来，但里面的品质决定他们是否留下。"
      },
      {
        "text": "For anyone hoping to start a business, the lesson is encouraging. You may not have a huge budget for advertising, but you probably have a genuine reason for doing what you do. Although a modest budget cannot hire a famous actor, it can tell an honest story, and honest stories are the ones we remember and repeat.",
        "translation": "对任何想创业的人来说，这一课令人鼓舞。你也许没有巨额广告预算，但你大概有一个做这件事的真实理由。虽然有限的预算请不起明星，却能讲出一个真诚的故事，而真诚的故事正是我们记住并反复讲起的那些。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, how did most volunteers describe the chocolate said to come from a craft workshop?",
        "audioText": "According to the passage, how did most volunteers describe the chocolate said to come from a craft workshop?",
        "options": [
          {
            "emoji": "😋",
            "value": "richer",
            "text": "Richer and smoother"
          },
          {
            "emoji": "💰",
            "value": "cheaper",
            "text": "Cheaper than the other one"
          },
          {
            "emoji": "🚫",
            "value": "refused",
            "text": "They refused to taste it"
          }
        ],
        "answer": "richer"
      },
      {
        "type": "word_builder",
        "word": "premium",
        "audioText": "premium"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "does",
          "not",
          "mean",
          "that",
          "facts",
          "are",
          "worthless."
        ],
        "audioText": "This does not mean that facts are worthless."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Trust,",
          "once",
          "broken,",
          "is",
          "hard",
          "to",
          "repair."
        ],
        "audioText": "Trust, once broken, is hard to repair."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Although two bottles of shampoo may contain almost identical ___, the one with a touching story on its label often ends up in more shopping carts.",
        "choices": [
          "ingredients",
          "labels",
          "customers"
        ],
        "answer": "ingredients",
        "audioText": "Although two bottles of shampoo may contain almost identical ingredients, the one with a touching story on its label often ends up in more shopping carts."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ the higher prices, customers gladly pay more for the feeling that they are part of something real.",
        "choices": [
          "Despite",
          "Although",
          "While"
        ],
        "answer": "Despite",
        "audioText": "Despite the higher prices, customers gladly pay more for the feeling that they are part of something real."
      }
    ]
  },
  {
    "id": "gk-r6-s08",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 8,
    "title": "Why We Trust Strangers' Reviews",
    "titleCn": "我们为何相信陌生人的评价",
    "coverEmoji": "⭐",
    "paragraphs": [
      {
        "text": "When you decide to buy a pair of headphones online, you probably spend more time reading strangers' comments than studying the product itself. Although the photos look attractive and the price seems fair, a quiet doubt remains until you see a four-star rating with hundreds of reviews. Shoppers rarely admit it, but a single sentence from an unknown customer can decide whether a purchase happens at all.",
        "translation": "当你在网上决定买一副耳机时，你花在阅读陌生人评论上的时间，很可能比研究产品本身还多。尽管图片看起来诱人、价格也算公道，但在看到有几百条评价的四星评分之前，你心里总会留着一丝疑虑。购物者很少承认这一点，但来自一位陌生顾客的一句话，就能决定这笔交易到底发不发生。"
      },
      {
        "text": "Economists used to believe that buyers were cold calculators who compared quality and price in a logical way. While that idea still explains some choices, it fails badly when information is limited and risk feels personal. Because we cannot touch the goods or test them in advance, we borrow the experience of people who bought them before. Strangers, as a result, become our most trusted advisers, even though they have no reason to help us.",
        "translation": "经济学家过去认为，买家是冷静的计算者，会用合乎逻辑的方式比较质量和价格。虽然这个观点仍能解释一部分选择，但当信息有限、风险又显得切身时，它就彻底失灵了。因为我们无法触摸商品，也无法事先试用，只好借用那些先前买过的人的体验。于是，陌生人成了我们最信赖的顾问，尽管他们没有任何理由帮助我们。"
      },
      {
        "text": "Companies understand this habit very well, and many of them turn it into a business strategy. A new brand, as is common in crowded markets, may send free samples to early buyers and ask them to post honest reviews. Despite the fact that these reviews cost almost nothing to write, they can lift sales far more than an expensive advertisement. Trust, in other words, travels faster between customers than between a company and a customer.",
        "translation": "企业非常了解这种习惯，许多公司还把它变成了一种经营策略。一个新品牌——这在拥挤的市场中很常见——可能会向早期买家寄送免费样品，并请他们发布诚实的评价。尽管写这些评价几乎不花什么成本，它们带来的销量却可能远远超过一则昂贵的广告。换句话说，信任在顾客之间传播得比在公司与顾客之间更快。"
      },
      {
        "text": "This system is not perfect, of course, because some sellers pay for fake praise and some angry customers exaggerate small problems. A review platform, as every honest manager admits, can never remove every lie. However, the wisdom of a crowd is usually stronger than the tricks of a few, which is why ratings survive scandal after scandal.",
        "translation": "当然，这套体系并不完美，因为有些卖家会花钱买假好评，也有些愤怒的顾客会把小问题夸大。正如每一位诚实的经理都承认的，评价平台永远无法删除每一句谎言。然而，群体的智慧通常还是胜过少数人的把戏，这也是为什么评分能在一个又一个丑闻之后依然存在。"
      },
      {
        "text": "So what should a sensible shopper do with so much noisy advice from so many strangers? Read the middle, not the extremes, and notice whether complaints repeat the same detail. Although one terrible review may say more about the writer than the product, twenty similar complaints usually point to a real weakness. In the end, we trust strangers because we have no better choice, but we can still choose which strangers to trust.",
        "translation": "那么，面对这么多来自众多陌生人的嘈杂建议，明智的购物者该怎么办呢？看中间段，别只看极端评价，并且留意抱怨是否重复着同一个细节。尽管一条糟糕的评价可能更多说明的是写它的人，而不是产品，但二十条类似的抱怨通常指向一个真实的弱点。说到底，我们相信陌生人是因为别无更好的选择，但我们仍然可以选择相信哪些陌生人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which sign suggests that a product may really have a weakness?",
        "audioText": "Which sign suggests that a product may really have a weakness?",
        "options": [
          {
            "emoji": "⭐",
            "value": "stars",
            "text": "A page full of five-star ratings"
          },
          {
            "emoji": "🔁",
            "value": "repeat",
            "text": "Twenty complaints about the same problem"
          },
          {
            "emoji": "💸",
            "value": "price",
            "text": "A surprisingly low price"
          }
        ],
        "answer": "repeat"
      },
      {
        "type": "word_builder",
        "word": "strategy",
        "audioText": "strategy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Strangers",
          "become",
          "our",
          "most",
          "trusted",
          "advisers"
        ],
        "audioText": "Strangers become our most trusted advisers."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "we",
          "can",
          "still",
          "choose",
          "which",
          "strangers",
          "to",
          "trust"
        ],
        "audioText": "We can still choose which strangers to trust."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ the fact that these reviews cost almost nothing to write, they can lift sales far more than an expensive advertisement.",
        "choices": [
          "Despite",
          "Although",
          "Because"
        ],
        "answer": "Despite",
        "audioText": "Despite the fact that these reviews cost almost nothing to write, they can lift sales far more than an expensive advertisement."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A new brand, ___ is common in crowded markets, may send free samples to early buyers.",
        "choices": [
          "as",
          "like",
          "so"
        ],
        "answer": "as",
        "audioText": "A new brand, as is common in crowded markets, may send free samples to early buyers."
      }
    ]
  },
  {
    "id": "gk-r6-s09",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 9,
    "title": "Why Free Samples Make You Spend",
    "titleCn": "免费样品为何让你掏钱",
    "coverEmoji": "🧀",
    "paragraphs": [
      {
        "text": "A small stand outside a supermarket offers you a free piece of cheese, and although you planned to buy nothing, you take it with a smile. While the woman behind the stand never asks for money, she does ask whether you enjoy the taste, as a friendly neighbour might. You never meant to spend a penny. Two minutes later, you walk out with a packet that costs three times as much as the cheese you usually buy.",
        "translation": "超市门外的一个小摊位递给你一小块免费奶酪。虽然你原本打算什么也不买，你还是笑着接了过来。摊主并不向你要钱，只是像友善的邻居那样问一句：味道还不错吧？你从没想过要花一分钱。可两分钟后，你走出商店时，手里却多了一包价格是你平时所买奶酪三倍的奶酪。"
      },
      {
        "text": "Marketers call this the sample effect, and it works because of a simple human habit. When someone gives us something for free, we feel a sense of debt, as though we owe that person a favour. We want to pay it back. Although the sample costs the company only a few cents, the feeling it creates can be worth far more.",
        "translation": "营销人员把这称为“样品效应”，它之所以奏效，源于一种简单的人性习惯。当别人白送我们东西时，我们心里会产生一种亏欠感，仿佛欠了对方一个人情。我们想要还回去。虽然一份样品只让公司花掉几美分，但它带来的那种感觉可能值钱得多。"
      },
      {
        "text": "Companies have studied this effect carefully for many years. In one well-known study, shoppers who tasted a free sample were far more likely to buy than those who only saw it on a shelf. While customers who were given nothing simply walked past, the tasters stopped and talked. Despite the tiny cost of each sample, the extra sales often cover the whole campaign, as the numbers clearly show.",
        "translation": "多年来，企业一直在仔细研究这种效应。在一项著名的研究中，尝过免费样品的人购买产品的比例，远高于只在货架上看到产品的人。什么都没拿到的顾客径直走过，而试吃的人却停下脚步、和店员攀谈起来。尽管每份样品成本极低，由此带来的额外销量却往往足以覆盖整场推广活动——数字清楚地说明了这一点。"
      },
      {
        "text": "For small businesses, this lesson matters even more than for huge brands. A young baker who hands out warm bread may sell nothing that morning, yet the people she meets will remember her name. Small gifts change big decisions. The same is true of a shop that gives its first customers a free taste, as every loyal customer can explain.",
        "translation": "对小微企业来说，这一课比大品牌还要重要。一位在集市上免费分发温热面包的年轻面包师，那天早上也许一笔生意都没做成，但她遇到的人会记住她的名字。小小的赠品，会改变重大的决定。第一家让顾客免费尝鲜的小店也是如此，每位忠实顾客都能讲出其中的道理。"
      },
      {
        "text": "None of this means that every free offer is honest or useful. While a genuine sample introduces a product you might truly enjoy, a clever company can also use free gifts to hide a bad deal. Consumer reports have warned about such tricks for years, as shoppers slowly learn to tell the difference. The next time a stranger offers you something for nothing, ask yourself one question: do I want this product, or do I only want to pay back the gift?",
        "translation": "这并不意味着每一次免费赠送都诚实、都值得。真正的样品会介绍一款你可能真心喜欢的产品，而精明的公司也能用免费礼品掩盖一笔不划算的交易。多年来，消费者报告一直在提醒人们提防这类伎俩，购物者也在慢慢学会分辨。下次有人白送你东西时，不妨问自己一个问题：我是真的想要这个产品，还是只想着还那份人情？"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the woman at the stand outside the supermarket give the shopper to taste?",
        "audioText": "What does the woman at the stand outside the supermarket give the shopper to taste?",
        "options": [
          {
            "emoji": "🧀",
            "value": "cheese",
            "text": "Cheese"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "🥤",
            "value": "drink",
            "text": "A drink"
          }
        ],
        "answer": "cheese"
      },
      {
        "type": "word_builder",
        "word": "sample",
        "audioText": "sample"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "You",
          "never",
          "meant",
          "to",
          "spend",
          "a",
          "penny"
        ],
        "audioText": "You never meant to spend a penny."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Small",
          "gifts",
          "change",
          "big",
          "decisions"
        ],
        "audioText": "Small gifts change big decisions."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Although the sample costs the company only a few ___, the feeling it creates can be worth far more.",
        "choices": [
          "cents",
          "dollars",
          "euros"
        ],
        "answer": "cents",
        "audioText": "Although the sample costs the company only a few cents, the feeling it creates can be worth far more."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When someone gives us something for free, we feel a sense of ___, as though we owe that person a favour.",
        "choices": [
          "debt",
          "humour",
          "danger"
        ],
        "answer": "debt",
        "audioText": "When someone gives us something for free, we feel a sense of debt, as though we owe that person a favour."
      }
    ]
  },
  {
    "id": "gk-r6-s10",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 10,
    "title": "The Shop That Refused to Grow",
    "titleCn": "拒绝做大的小店",
    "coverEmoji": "🧵",
    "paragraphs": [
      {
        "text": "On a narrow street in the old town stands a small repair shop that has fixed shoes and bags for thirty years. Its owner, Mrs. Lin, learned the trade from her father, and she still works behind the same wooden counter. Although large chains have opened nearby, her shop stays busy, as anyone who walks past at noon can see. Customers often wait a week for a simple repair, yet few of them seem to complain about it.",
        "translation": "老城区的一条窄街上有家小小的修补店，三十年来一直为人修鞋、修包。店主林太太的手艺是从父亲那里学来的，如今她仍在那张旧木柜台后面干活。尽管附近开起了大型连锁店，她的小店依旧忙碌——任何在中午路过的人都看得出来。顾客常常为一个简单的修补等上一星期，但似乎很少有人抱怨。"
      },
      {
        "text": "Ten years ago, a businessman offered to invest, promising to turn the workshop into a chain of twenty branches. While the money would have paid for new machines and a bigger team, Mrs. Lin hesitated for a month. She added up the rent, the salaries and the advertising, and the figures looked attractive on paper. Despite the promise of higher profits, something about the plan troubled her, though she could not name it. Although the money looked attractive, she said no.",
        "translation": "十年前，一位商人提出投资，承诺把这间小作坊变成拥有二十家分店的连锁企业。这笔钱本可以买来新机器、组建更大的团队，林太太却犹豫了整整一个月。她算过租金、工资和广告费用，账面上的数字相当诱人。尽管意味着更高的利润，这个计划却让她心里不安，可她又说不出究竟为什么。虽然那笔钱很诱人，她还是说了“不”。"
      },
      {
        "text": "Growth, as she explained to her puzzled friends, would have changed what the shop actually sold. A chain needs managers and quick standard repairs, while her customers came for careful work and honest advice. She feared that speed would slowly replace skill, and that the shop would lose the trust built over decades. A large loan, moreover, would have tied her to monthly payments, even in seasons when few customers appear.",
        "translation": "她向不解的朋友解释说，扩张会改变这家店真正出售的东西。连锁店需要经理和快速的标准化修补，而她的顾客来这里，图的是细致的做工和诚实的建议。她担心速度会慢慢取代手艺，担心这家店会失掉几十年积累起来的信任。而且，一笔大额贷款会让她每月都得还钱，哪怕是在顾客稀少的淡季。"
      },
      {
        "text": "Today the shop still occupies one room, although its waiting list has grown longer than ever. Mrs. Lin now trains two young workers, teaching them to mend carefully rather than to rush their work. Her income is modest, as she freely admits, yet the business has never missed a single payment. Neighbours bring their broken umbrellas and bags, knowing that the work will last for many years.",
        "translation": "如今这家店仍然只占一间屋子，尽管排队等候的名单比以往任何时候都长。林太太现在带着两个年轻工人，教他们仔细修补，而不是赶工。她坦率地承认自己收入并不高，可这家店从未拖欠过任何一笔款项。邻居们把坏了的雨伞和包送来，因为他们知道这活儿能撑很多年。"
      },
      {
        "text": "Economists sometimes describe such decisions as wasted opportunities, since a larger firm could serve more people. Yet Mrs. Lin argues that not every business must grow, and that quality can matter more than size. Whether she was right or wrong, her story suggests that profit is not the only measure of success.",
        "translation": "经济学家有时把这类决定称为“错失的机会”，因为规模更大的公司能以更低的价格服务更多人。然而林太太认为，并非每门生意都必须做大，品质可以比规模更重要。无论她说得对不对，她的故事都提醒我们：利润并不是衡量成功的唯一标准。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ the promise of higher profits, something about the plan troubled her.",
        "choices": [
          "Despite",
          "Although",
          "However"
        ],
        "answer": "Despite",
        "audioText": "Despite the promise of higher profits, something about the plan troubled her."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Growth, ___ she explained to her puzzled friends, would have changed what the shop actually sold.",
        "choices": [
          "as",
          "that",
          "what"
        ],
        "answer": "as",
        "audioText": "Growth, as she explained to her puzzled friends, would have changed what the shop actually sold."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She feared that speed would slowly ___ skill.",
        "choices": [
          "replace",
          "repair",
          "repeat"
        ],
        "answer": "replace",
        "audioText": "She feared that speed would slowly replace skill."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Although",
          "the",
          "money",
          "looked",
          "attractive,",
          "she",
          "said",
          "no."
        ],
        "audioText": "Although the money looked attractive, she said no."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Not",
          "every",
          "business",
          "must",
          "grow."
        ],
        "audioText": "Not every business must grow."
      },
      {
        "type": "word_builder",
        "word": "profit",
        "audioText": "profit"
      }
    ]
  },
  {
    "id": "gk-r6-s11",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 11,
    "title": "Why the Middle Option Wins",
    "titleCn": "为什么中间选项总能胜出",
    "coverEmoji": "🍿",
    "paragraphs": [
      {
        "text": "Walk into almost any cinema and you will face three sizes of popcorn, arranged neatly from small to large on the counter. Although most customers say they only want a small box, a surprising number of them walk out with the medium one in their hands. This pattern is not an accident at all. Sellers carefully design their menus so that the middle choice looks like the wisest and safest decision. The trick works, although few of us would ever admit that we have been influenced by it.",
        "translation": "走进几乎任何一家电影院，你都会看到三种规格的爆米花，在柜台上从小到大地整齐排列着。尽管大多数顾客说他们只想要小份，但数量惊人的人最终手里拿着中份走了出来。这种规律绝非偶然。商家精心设计他们的菜单，让中间那个选择看起来最明智、最稳妥。这个花招很管用，尽管我们中很少有人会承认自己受了它的影响。"
      },
      {
        "text": "Economists call this the decoy effect. In one famous experiment, a magazine offered its readers two choices: a web subscription for fifty-nine dollars, or a print-and-web package for one hundred and twenty-five dollars. While few readers chose the expensive package, most of them happily picked the cheaper one. Then the researchers added a third option — print only, also priced at one hundred and twenty-five dollars — and the picture changed completely. Suddenly the combined package seemed like a bargain, as it clearly offered far more for the same money. Sales of the costly option jumped, although not a single price had moved.",
        "translation": "经济学家把这称为诱饵效应。在一个著名实验中，一家杂志给读者两个选择：59 美元的网页版订阅，或者 125 美元的印刷版加网页版套餐。虽然很少有读者选择那个昂贵的套餐，但大多数人还是乐呵呵地挑了便宜的那个。随后研究人员加上了第三个选项——只订印刷版，同样标价 125 美元——局面就完全变了。这个组合套餐突然显得很划算，因为它显然用同样的钱提供了多得多的东西。昂贵选项的销量猛增，尽管没有任何一个价格发生过变化。"
      },
      {
        "text": "The reason lies in the way our brains compare things, and it is simpler than it sounds. We rarely judge a price on its own. Instead, we judge every number against whatever happens to sit next to it on the same page or shelf. A middle option, as researchers have found, offers a comfortable sense of balance between being too careful and too bold. A slightly cheaper box can suddenly make the neighbouring one look like a sensible compromise rather than a waste. Despite our belief that we are completely rational shoppers, we often choose the option that is easiest to explain to ourselves afterwards.",
        "translation": "原因在于我们大脑比较事物的方式，而它比听起来要简单。我们很少单独去判断一个价格。相反，我们会把每个数字与碰巧跟它并排出现在同一页面或货架上的那个数字相比较。正如研究人员所发现的，中间选项提供了一种舒适的平衡感——既不会过于保守，也不会过于大胆。一个稍微便宜点的盒子，会突然让旁边那个看起来像是一种明智的折中，而不是浪费。尽管我们相信自己完全是理性的消费者，我们却常常选择那个事后最容易向自己解释的选项。"
      },
      {
        "text": "Companies use this knowledge in many quiet ways, and few of us notice what they are doing. Coffee shops list a large cup beside an enormous one, while phone makers display three models with different amounts of storage. Although such design can guide customers gently towards a better choice, it can also push them into paying for something they never needed. That is why consumer groups urge buyers to decide what they really want before they look at the menu.",
        "translation": "企业以许多不声不响的方式运用这一知识，而我们中很少有人察觉他们在做什么。咖啡店会把大杯和超大杯并列列出，手机厂商则展示三种存储容量不同的机型。尽管这样的设计能温和地引导顾客做出更好的选择，它也可能促使他们花钱买下自己根本不需要的东西。这就是为什么消费者团体呼吁买家在查看菜单之前，先想清楚自己真正想要什么。"
      },
      {
        "text": "None of this means that the middle option is always wrong, since it is often the sensible choice. The point is simply that we should reach that conclusion by ourselves instead of letting a clever menu reach it for us.",
        "translation": "这一切并不意味着中间选项总是错的，因为它往往是明智之选。关键在于，这个结论应当由我们自己得出，而不是让一份聪明的菜单替我们得出。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ most customers say they only want a small box, a surprising number of them walk out with the medium one in their hands.",
        "choices": [
          "Although",
          "Despite",
          "Because"
        ],
        "answer": "Although",
        "audioText": "Although most customers say they only want a small box, a surprising number of them walk out with the medium one in their hands."
      },
      {
        "type": "word_builder",
        "word": "option",
        "audioText": "option"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "pattern",
          "is",
          "not",
          "an",
          "accident",
          "at",
          "all."
        ],
        "audioText": "This pattern is not an accident at all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A middle option, ___ researchers have found, offers a comfortable sense of balance between being too careful and too bold.",
        "choices": [
          "as",
          "that",
          "which"
        ],
        "answer": "as",
        "audioText": "A middle option, as researchers have found, offers a comfortable sense of balance between being too careful and too bold."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "rarely",
          "judge",
          "a",
          "price",
          "on",
          "its",
          "own."
        ],
        "audioText": "We rarely judge a price on its own."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Suddenly the combined package seemed like a ___, as it clearly offered far more for the same money.",
        "choices": [
          "bargain",
          "burden",
          "budget"
        ],
        "answer": "bargain",
        "audioText": "Suddenly the combined package seemed like a bargain, as it clearly offered far more for the same money."
      }
    ]
  },
  {
    "id": "gk-r6-s12",
    "track": "gaokao",
    "regionId": "gk-r6",
    "order": 12,
    "title": "Why We Keep Paying for What We Forget",
    "titleCn": "为什么我们一直在为忘记的东西付费",
    "coverEmoji": "💳",
    "paragraphs": [
      {
        "text": "Subscription services have quietly replaced one-time purchases in many parts of daily life, from music and films to software and even coffee. Although most customers never plan to spend more each month, small payments feel harmless when compared with a single large bill. This is why a gym membership, a music app and a cloud storage plan can sit unnoticed on a bank statement for years.",
        "translation": "订阅式服务已经悄悄取代了日常生活中许多一次性购买，从音乐、影视到软件甚至咖啡。尽管大多数顾客从未打算每月多花钱，但与一张大额账单相比，小额支付让人感觉无伤大雅。这就是为什么健身卡、音乐应用和云存储套餐可以在银行账单上被忽视好几年。"
      },
      {
        "text": "Companies rely on this quiet inattention, as anyone who has ever tried to cancel a plan will understand. While a free trial sounds generous, it usually becomes a paid subscription the moment the trial period ends. The design is deliberate, since joining takes about ten seconds while leaving may require several screens and a long phone call.",
        "translation": "企业正是依赖这种悄无声息的忽视，任何试过取消套餐的人都能明白这一点。虽然免费试用听起来很慷慨，但试用期一结束，它通常就变成了付费订阅。这种设计是有意为之的，因为注册大约只要十秒钟，而退出可能要好几个页面，外加一通漫长的电话。"
      },
      {
        "text": "Economists describe this pattern as the subscription trap, and the numbers explain why. Although each individual payment seems tiny, the steady stream of them adds up to a surprising annual total. Despite the convenience that these services offer, many families continue paying for tools and channels they stopped using months ago.",
        "translation": "经济学家把这种模式称为“订阅陷阱”，数据能说明原因。虽然每一笔单独的付款看起来微不足道，但这些小额款源源不断地累积起来，会变成一笔惊人的年度总额。尽管这些服务确实带来了便利，许多家庭仍在为几个月前就不再使用的工具和频道付费。"
      },
      {
        "text": "Not every company, as recent surveys of the industry suggest, wants to keep its customers confused. Some businesses now send a friendly reminder before a yearly plan renews, and they allow people to cancel with a single click. Surprisingly, such honesty often builds loyalty, because customers stay by choice rather than because they cannot find the exit.",
        "translation": "并非每家公司都想让顾客一头雾水，最近的行业调查就显示了这一点。如今有些企业会在年度套餐续费前发来一条友好提醒，并且让人一键就能取消。出人意料的是，这种诚实往往能带来忠诚：顾客留下来是因为自己愿意留下，而不是因为找不到出口。"
      },
      {
        "text": "So before you sign up for another free month, read the terms and note the date when the payment begins. A subscription, as any careful customer knows, is simply a promise to keep paying until you decide to stop. The real question is whether the service is still worth the money that you quietly hand over each month.",
        "translation": "所以，在你再次注册一个月免费服务之前，请读一读条款，记下开始扣款的日子。订阅，正如任何细心的顾客所知，不过是一个持续付钱、直到你决定停止的承诺。真正的问题是：这项服务是否还值得你每月悄悄交出去的那些钱。"
      }
    ],
    "quiz": [
      {
        "type": "sentence_order",
        "correctOrder": [
          "Surprisingly",
          "such",
          "honesty",
          "often",
          "builds",
          "loyalty"
        ],
        "audioText": "Surprisingly, such honesty often builds loyalty, because customers stay by choice rather than because they cannot find the exit."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Although each individual payment seems ___, the steady stream of them adds up to a surprising annual total.",
        "choices": [
          "tiny",
          "tidy",
          "tough"
        ],
        "answer": "tiny",
        "audioText": "Although each individual payment seems tiny, the steady stream of them adds up to a surprising annual total."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "joining",
          "takes",
          "about",
          "ten",
          "seconds"
        ],
        "audioText": "The design is deliberate, since joining takes about ten seconds while leaving may require several screens and a long phone call."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Despite the ___ that these services offer, many families continue paying for tools and channels they stopped using months ago.",
        "choices": [
          "convenience",
          "confidence",
          "competition"
        ],
        "answer": "convenience",
        "audioText": "Despite the convenience that these services offer, many families continue paying for tools and channels they stopped using months ago."
      },
      {
        "type": "word_builder",
        "word": "loyalty",
        "audioText": "loyalty"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The real question is whether the service is still ___ the money that you quietly hand over each month.",
        "choices": [
          "worth",
          "worthy",
          "worthless"
        ],
        "answer": "worth",
        "audioText": "The real question is whether the service is still worth the money that you quietly hand over each month."
      }
    ]
  },
  {
    "id": "gk-r7-s01",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 1,
    "title": "The Future Is Still Ours",
    "titleCn": "未来仍在我们手中",
    "coverEmoji": "🌍",
    "paragraphs": [
      {
        "text": "Not until we imagine the world of 2060 can we decide what we ought to do today. If every nation treated clean energy as a shared goal rather than a private race, the air above our cities would be far easier to breathe. Such a future is not a dream that only scientists can design; it is a choice that ordinary people make each morning. Yet the choice is still ours.",
        "translation": "只有当我们想象 2060 年的世界时，我们才能决定今天该做什么。如果每个国家都把清洁能源当作共同的目标，而不是一场各自的竞赛，那么城市上空的空气会好呼吸得多。这样的未来并不是只有科学家才能设计的梦想；它是普通人每天早上做出的选择。而选择权，仍然在我们手里。"
      },
      {
        "text": "Exploration, whether it leads to the moon or to Mars, has always asked the same question: how far can human curiosity reach? Were we to abandon space research, we would lose the satellites that guide our ships and warn us of storms. What worries many critics is not the cost of rockets but the thought that we might repeat, on another planet, the mistakes we have made on this one. The fear is easy to understand.",
        "translation": "探索，无论是走向月球还是火星，始终在追问同一个问题：人类的好奇心能走多远？倘若我们放弃太空研究，我们就会失去那些为船只导航、为我们预警风暴的卫星。让许多批评者担忧的，并不是火箭的造价，而是这样一种想法：我们可能会在另一个星球上重犯在这颗星球上犯过的错误。这种担忧不难理解。"
      },
      {
        "text": "If we are to survive this century, cooperation must replace competition, and patience must replace speed. Only when the richest countries share their technology with the poorest will the phrase 'a sustainable future' mean anything at all. Nobody claims that such changes are easy, yet nobody can honestly claim that they are impossible either.",
        "translation": "如果我们要在这个世纪生存下去，合作就必须取代竞争，耐心就必须取代速度。只有当最富裕的国家把技术分享给最贫穷的国家时，“可持续的未来”这个说法才会有真正的意义。没有人说这些改变容易，但也没有人能坦然说它们不可能。"
      },
      {
        "text": "The young people who sit in classrooms today are the engineers, farmers and teachers who will run the world of tomorrow. Rather than wait for perfect leaders, they can begin with small habits: saving power, questioning waste, and reading about science instead of merely fearing it. Should each of them take one small step, the direction of the whole century might quietly change.",
        "translation": "今天坐在教室里的年轻人，就是明天将要管理这个世界的工程师、农民和教师。与其等待完美的领袖，他们可以从微小的习惯做起：节约用电、质疑浪费、去了解科学，而不只是害怕它。只要他们每人迈出一小步，整个世纪的方向也许会悄然改变。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which picture best matches the future the writer hopes for?",
        "audioText": "Which picture best matches the future the writer hopes for?",
        "options": [
          {
            "emoji": "🌱",
            "value": "green",
            "text": "A green and clean world"
          },
          {
            "emoji": "🚀",
            "value": "race",
            "text": "A race to other planets"
          },
          {
            "emoji": "🏭",
            "value": "factory",
            "text": "More factories everywhere"
          }
        ],
        "answer": "green"
      },
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Yet",
          "the",
          "choice",
          "is",
          "still",
          "ours."
        ],
        "audioText": "Yet the choice is still ours."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "fear",
          "is",
          "easy",
          "to",
          "understand."
        ],
        "audioText": "The fear is easy to understand."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ we to abandon space research, we would lose the satellites that guide our ships and warn us of storms.",
        "choices": [
          "Were",
          "Was",
          "Had"
        ],
        "answer": "Were",
        "audioText": "Were we to abandon space research, we would lose the satellites that guide our ships and warn us of storms."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Only when the richest countries share their technology with the poorest ___ the phrase 'a sustainable future' mean anything at all.",
        "choices": [
          "will",
          "would",
          "does"
        ],
        "answer": "will",
        "audioText": "Only when the richest countries share their technology with the poorest will the phrase 'a sustainable future' mean anything at all."
      }
    ]
  },
  {
    "id": "gk-r7-s02",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 2,
    "title": "The Future We Are Writing",
    "titleCn": "我们正在书写的未来",
    "coverEmoji": "🌍",
    "paragraphs": [
      {
        "text": "Ask a group of teenagers to describe the world in 2070, and you will receive two very different pictures. Some imagine clean cities floating above green fields, while others describe crowded streets where nobody dares to breathe. Which picture finally becomes real, scientists insist, depends less on technology than on the choices that ordinary people make every day.",
        "translation": "让一群青少年描述2070年的世界，你会得到两幅截然不同的画面。一些人想象着绿色田野上空漂浮的洁净城市，另一些人描述的却是拥挤得没人敢呼吸的街道。科学家们坚持认为，最终哪幅画面成真，与其说取决于技术，不如说取决于普通人每天所做的选择。"
      },
      {
        "text": "Not only does space exploration give us better satellites and weather forecasts, but it also forces us to think about how fragile our home planet really is. Looking back at the blue Earth from the Moon, astronauts often say that borders disappear and that humanity seems to be one small crew. Were we to treat our planet as carefully as astronauts treat their spacecraft, many of today's problems might have been avoided long ago.",
        "translation": "太空探索不仅带给我们更好的卫星和天气预报，还迫使我们思考：我们的家园星球究竟有多么脆弱。从月球上回望这颗蓝色地球，宇航员常说国界消失了，全人类就像一个小小的乘组。倘若我们能像宇航员爱护飞船那样细心地对待地球，今天的许多问题或许早已避免。"
      },
      {
        "text": "If we continue to burn fuel as carelessly as we do today, the oceans may rise and the forests may shrink. Should governments and companies act together, however, the damage could still be limited. Wind farms, solar panels and electric buses are no longer dreams; they are ordinary machines that thousands of engineers improve every single year.",
        "translation": "如果我们继续像今天这样粗心地燃烧燃料，海洋可能会上升，森林可能会缩小。不过，如果各国政府与企业携手行动，损失仍然有可能被控制住。风力发电场、太阳能板和电动公交已不再是梦想；它们是成千上万工程师年年在改进的普通机器。"
      },
      {
        "text": "History teaches us that no single nation, however rich or clever, can solve a global problem alone. Where people cooperate, progress happens quickly. Where they do not, the same problems simply return in a new form. A shared future therefore demands shared rules, shared research and a shared willingness to listen.",
        "translation": "历史告诉我们，任何一个国家，无论多么富有或聪明，都无法独自解决全球性问题。人们合作的地方，进步来得很快；不合作的地方，同样的问题只会以新的形式卷土重来。因此，共同的未来需要共同的规则、共同的研究，以及共同的倾听意愿。"
      },
      {
        "text": "The future is not a distant land that waits for us to arrive; it is a story we are writing now. Whether the ending is hopeful depends on what we do today, and on whether we are willing to do it together.",
        "translation": "未来并不是一片等着我们抵达的遥远大陆；它是一段我们此刻正在书写的故事。结局是否充满希望，取决于我们今天做什么，也取决于我们是否愿意一起去完成。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which picture shows the hopeful future that some teenagers imagine?",
        "audioText": "Which picture shows the hopeful future that some teenagers imagine?",
        "options": [
          {
            "emoji": "🌿",
            "value": "green",
            "text": "Clean cities above green fields"
          },
          {
            "emoji": "🌫️",
            "value": "crowded",
            "text": "Crowded streets and dirty air"
          },
          {
            "emoji": "🌕",
            "value": "moon",
            "text": "A base built on the Moon"
          }
        ],
        "answer": "green"
      },
      {
        "type": "word_builder",
        "word": "fragile",
        "audioText": "fragile"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "is",
          "a",
          "story",
          "we",
          "are",
          "writing",
          "now."
        ],
        "audioText": "It is a story we are writing now."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Where",
          "people",
          "cooperate,",
          "progress",
          "happens",
          "quickly."
        ],
        "audioText": "Where people cooperate, progress happens quickly."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Which picture finally becomes real, scientists insist, depends ___ on technology than on the choices that ordinary people make every day.",
        "choices": [
          "less",
          "more",
          "fewer"
        ],
        "answer": "less",
        "audioText": "Which picture finally becomes real, scientists insist, depends less on technology than on the choices that ordinary people make every day."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Should governments and companies act together, ___, the damage could still be limited.",
        "choices": [
          "however",
          "therefore",
          "otherwise"
        ],
        "answer": "however",
        "audioText": "Should governments and companies act together, however, the damage could still be limited."
      }
    ]
  },
  {
    "id": "gk-r7-s03",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 3,
    "title": "Seeds for a Distant Sky",
    "titleCn": "播向远空的种子",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Close your eyes for a moment and imagine the year 2075, when the cities we build may finally have learned to breathe. Not only will those cities grow their own food, but they may also tend the floating gardens that circle quietly above them. Were we to design such a world today, we would surely begin not with rockets but with a handful of ordinary soil.",
        "translation": "闭上眼睛，想象 2075 年——那时我们建造的城市也许终于学会了呼吸。这些城市不仅会自己种植粮食，还可能照料那些在它们上空静静环绕的漂浮花园。倘若今天我们就要设计这样一个世界，我们想必不会从火箭开始，而是从一把普普通通的泥土开始。"
      },
      {
        "text": "Some people argue that space exploration is a luxury we cannot afford while the Earth still struggles. That view, though understandable, misses something important: the technologies invented for distant missions often return home as tools for cleaner energy and smarter farming. Satellites already watch our forests, measure our oceans and warn us before a storm becomes a disaster.",
        "translation": "有人认为，在地球仍在苦苦挣扎的时候，太空探索是一种我们负担不起的奢侈。这种看法虽可理解，却忽略了重要的一点：为遥远任务而发明的技术，常常会回到地球，成为更清洁的能源和更聪明的农业工具。卫星已经在注视着我们的森林、测量着我们的海洋，并在风暴酿成灾难之前向我们发出警告。"
      },
      {
        "text": "Consider the closed-loop greenhouse now orbiting the Earth, in which every drop of water is recycled and every breath of air is counted. If a station can feed six people using almost nothing, then why should a city of six million not do the same? Whether we travel to Mars or stay at home, the question is identical: how do we live well without taking more than we return?",
        "translation": "想一想那个如今正环绕地球运行的闭环温室吧：在那里，每一滴水都被循环利用，每一口空气都被精打细算。如果一个空间站几乎不消耗什么就能养活六个人，那么一座六百万人的城市为什么不能做同样的事？无论我们是飞向火星还是留在家中，问题都是一样的：我们怎样才能在索取不超过回馈的前提下，好好地生活？"
      },
      {
        "text": "Some will say that such dreams cost too much, that the money would be better spent on hospitals and schools here. Yet the choice is not between the Earth and the stars, for a species that can do neither will soon be able to do nothing at all. What we need is not one heroic leap forward but thousands of small, patient steps taken together.",
        "translation": "有人会说，这样的梦想代价太高，这些钱不如花在这里的医院和学校上。然而，这并非在地球与星辰之间做选择，因为一个两者都做不到的物种，很快就会什么都做不了。我们需要的不是一次英勇的飞跃，而是成千上万个耐心迈出的小小步伐。"
      },
      {
        "text": "So when you look up tonight, do not see an empty sky or a distant, cold frontier. See instead a shared project that belongs to everyone who is willing to plant something and wait. The future will not arrive on its own; it must be built, patiently, by hands like yours.",
        "translation": "所以今晚当你抬头仰望时，不要只看到一片空荡的天空或一处遥远寒冷的边疆。而要看到一个共同的事业，它属于每一个愿意种下些什么、并静静等待的人。未来不会自己到来；它必须由像你这样的双手，耐心地建造出来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what should we begin with if we were to design a better world today?",
        "audioText": "According to the text, what should we begin with if we were to design a better world today?",
        "options": [
          {
            "emoji": "🌱",
            "value": "soil",
            "text": "A handful of soil"
          },
          {
            "emoji": "🚀",
            "value": "rocket",
            "text": "A powerful rocket"
          },
          {
            "emoji": "💰",
            "value": "money",
            "text": "A large sum of money"
          }
        ],
        "answer": "soil"
      },
      {
        "type": "word_builder",
        "word": "greenhouse",
        "audioText": "greenhouse"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "future",
          "will",
          "not",
          "arrive",
          "on",
          "its",
          "own"
        ],
        "audioText": "The future will not arrive on its own."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "space",
          "exploration",
          "is",
          "a",
          "luxury",
          "we",
          "cannot",
          "afford"
        ],
        "audioText": "Space exploration is a luxury we cannot afford."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not only ___ those cities grow their own food, but they may also tend the floating gardens that circle above them.",
        "choices": [
          "will",
          "would",
          "do"
        ],
        "answer": "will",
        "audioText": "Not only will those cities grow their own food, but they may also tend the floating gardens that circle above them."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Were we to design such a world today, we ___ surely begin with a handful of ordinary soil.",
        "choices": [
          "would",
          "will",
          "should"
        ],
        "answer": "would",
        "audioText": "Were we to design such a world today, we would surely begin with a handful of ordinary soil."
      }
    ]
  },
  {
    "id": "gk-r7-s04",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 4,
    "title": "Rockets, Rivers and Tomorrow",
    "titleCn": "火箭、河流与明天",
    "coverEmoji": "🚀",
    "paragraphs": [
      {
        "text": "Close your eyes for a moment and imagine the world of 2050, where the air in our cities is cleaner than it has been for a century. Was it fate, or was it our own choices, that shaped such a world? Not only would cleaner energy reduce the damage we have done, but it would also give millions of people work they can be proud of. Tomorrow begins with what we choose today.",
        "translation": "闭上眼睛片刻，想象一下2050年的世界——那时我们城市里的空气比过去一个世纪都要干净。塑造出这样一个世界的，究竟是命运，还是我们自己的选择？清洁能源不仅能减少我们已经造成的破坏，还能让数百万人拥有引以为豪的工作。明天，始于我们今天的选择。"
      },
      {
        "text": "If governments had invested in renewable power thirty years earlier, the skies above many industrial towns would look very different today. Progress, however slow, is real. Solar panels now cover roofs that once held nothing but dust, and electric buses glide through streets that used to be full of noise. What matters is not whether we can afford to change, but whether we can afford to wait.",
        "translation": "如果各国政府早在三十年前就投资可再生能源，如今许多工业城镇上空的景象会大不相同。进步，无论多么缓慢，都是真实的。太阳能板如今覆盖着曾经只积满灰尘的屋顶，电动公交车滑过曾经喧闹嘈杂的街道。关键不在于我们是否负担得起改变，而在于我们是否负担得起等待。"
      },
      {
        "text": "Space exploration, which some people dismiss as an expensive dream, may in fact teach us how to care for the only planet we have. When astronauts look back at Earth from orbit, they often describe a thin blue line of atmosphere that protects everything they love. Should we ever need to leave, we would carry the same lesson with us: no second home can excuse the ruin of the first.",
        "translation": "太空探索被一些人斥为昂贵的梦想，但它实际上也许能教会我们如何呵护我们唯一的星球。当宇航员从轨道上回望地球时，他们常常描述一道薄薄的蓝色大气层，守护着他们所珍爱的一切。倘若有一天我们真的需要离开，我们会带上同样的教训：没有第二个家园能为毁掉第一个开脱。"
      },
      {
        "text": "What we call human destiny is not a single road but a great many roads that meet, divide and meet again. Some will lead to laboratories where engineers design crops that survive long dry seasons; others will lead to classrooms where children ask questions no one has answered yet. Unless we share what we discover, however brilliant our technology becomes, the future will belong to a few rather than to all. No one builds the future alone.",
        "translation": "我们所说的人类命运不是一条路，而是许多条相遇、分开、又再相遇的路。有些路通向实验室，工程师在那里设计能熬过长旱季的作物；有些路通向教室，孩子们在那里提出尚无人回答的问题。除非我们分享彼此的发现，否则无论我们的技术多么高明，未来都将只属于少数人，而不是所有人。没有人能独自建造未来。"
      },
      {
        "text": "So the world of 2050 is not waiting for us somewhere in the distance; it is being built, quietly and daily, by ordinary people who choose to act. Not until we accept that responsibility will we deserve the future we dream of. Imagine it, then build it. Remember that the builders, in the end, are you.",
        "translation": "所以，2050年的世界并不是在远方某处等着我们；它正被那些选择行动的普通人，安静地、日复一日地建造出来。只有当我们承担起那份责任，我们才配得上自己梦想中的未来。去想象它，然后建造它。记住，最终的建造者，就是你们。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "When astronauts look back at Earth from orbit, what do they often describe?",
        "audioText": "When astronauts look back at Earth from orbit, what do they often describe?",
        "options": [
          {
            "emoji": "🌍",
            "value": "earth",
            "text": "A thin blue line of air that protects what they love"
          },
          {
            "emoji": "🚀",
            "value": "rocket",
            "text": "A fast rocket flying far into deep space"
          },
          {
            "emoji": "🏙️",
            "value": "city",
            "text": "A huge city covered in bright lights"
          }
        ],
        "answer": "earth"
      },
      {
        "type": "word_builder",
        "word": "destiny",
        "audioText": "destiny"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Tomorrow",
          "begins",
          "with",
          "what",
          "we",
          "choose",
          "today."
        ],
        "audioText": "Tomorrow begins with what we choose today."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "No",
          "one",
          "builds",
          "the",
          "future",
          "alone."
        ],
        "audioText": "No one builds the future alone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Solar panels now cover roofs that once held ___ but dust.",
        "choices": [
          "nothing",
          "something",
          "anything"
        ],
        "answer": "nothing",
        "audioText": "Solar panels now cover roofs that once held nothing but dust."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If governments ___ invested in renewable power thirty years earlier, the skies above many industrial towns would look very different today.",
        "choices": [
          "had",
          "have",
          "would"
        ],
        "answer": "had",
        "audioText": "If governments had invested in renewable power thirty years earlier, the skies above many industrial towns would look very different today."
      }
    ]
  },
  {
    "id": "gk-r7-s05",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 5,
    "title": "Should We Live Beyond Earth?",
    "titleCn": "我们该到地球之外生活吗？",
    "coverEmoji": "🌍",
    "paragraphs": [
      {
        "text": "For as long as humans have looked up at the night sky, we have wondered whether we are alone and whether we could ever live somewhere else. That old question has now become a practical one, because rockets, satellites and space stations have turned imagination into engineering. Yet the closer we get to leaving Earth, the more seriously we must ask a simple question: should we?",
        "translation": "自人类仰望夜空以来，我们就一直想知道自己是否孤单，也想知道能否在别的地方生活。这个古老的问题如今已经变成了现实问题，因为火箭、卫星和空间站已经把想象变成了工程。然而，我们离离开地球越近，就越应当认真地提出一个简单的问题：我们应该走吗？"
      },
      {
        "text": "Supporters of space settlement offer several powerful arguments. They point out that Earth's resources are limited, while the solar system holds metals, water and energy we have barely begun to imagine. Were we to establish a permanent base on the Moon, we could learn to live on other worlds before a disaster forces us to. Besides, the technology developed for space often returns to Earth, improving medicines, materials and the ways we grow food.",
        "translation": "支持太空定居的人提出了几个很有力的理由。他们指出，地球的资源是有限的，而太阳系里蕴藏着我们几乎还难以想象的金属、水和能源。倘若我们在月球上建立一个永久基地，我们就能在灾难迫使我们离开之前，学会在别的星球上生活。此外，为太空研发的技术常常回到地球，改进医药、材料以及我们种植食物的方式。"
      },
      {
        "text": "Critics, however, are not convinced. What worries them most is that the huge sums spent on rockets, however inspiring the pictures may be, might be better used to clean rivers and feed children who go hungry tonight. If the same money had been invested in renewable energy thirty years ago, we would already be living in a safer world. Why, they ask, should we run from problems we created here instead of solving them?",
        "translation": "然而，批评者并不认同。最令他们担忧的是：花在火箭上的巨额资金——无论那些画面多么鼓舞人心——也许用来清理河流、让今晚还在挨饿的孩子吃上饭会更好。如果同样的钱在三十年前就投入到可再生能源上，我们如今早已生活在一个更安全的世界里了。他们问道：我们为什么要逃避自己在这里造成的问题，而不是去解决它们呢？"
      },
      {
        "text": "Perhaps the choice is not as sharp as it appears. Space research and environmental protection need not compete. Satellites now watch forests, track storms and measure the ice that is melting at the poles. Only when we treat our own planet with care can we honestly say that we are ready to leave it. And if we never leave, the knowledge we gained will still have made life here richer.",
        "translation": "也许这个选择并不像看上去那样非此即彼。太空研究和环境保护不必相互竞争。卫星如今在监测森林、追踪风暴，并测量两极正在融化的冰。只有当我们善待自己的星球时，我们才能坦然地说自己已经准备好离开它。而即使我们永远不离开，我们获得的知识也仍会让这里的生活更加丰富。"
      },
      {
        "text": "So the real question is not whether humanity will reach the stars, but how we choose to get there. Whether we stay or go, the future will be shaped by decisions we make today, in classrooms, laboratories and ordinary homes. What we do now, not what we dream, will decide which future finally becomes ours.",
        "translation": "所以，真正的问题不是人类能否抵达群星，而是我们选择以何种方式抵达。无论我们留下还是离开，未来都将由我们今天在教室、实验室和普通家庭中做出的决定所塑造。最终决定哪个未来属于我们的，是我们现在所做的，而不是我们所梦想的。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what do satellites now help us do?",
        "audioText": "According to the passage, what do satellites now help us do?",
        "options": [
          {
            "emoji": "🌲",
            "value": "forests",
            "text": "Watch forests and track storms"
          },
          {
            "emoji": "🏭",
            "value": "factories",
            "text": "Build more factories"
          },
          {
            "emoji": "🛏️",
            "value": "sleep",
            "text": "Help people sleep better"
          }
        ],
        "answer": "forests"
      },
      {
        "type": "word_builder",
        "word": "settlement",
        "audioText": "settlement"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Space",
          "research",
          "and",
          "environmental",
          "protection",
          "need",
          "not",
          "compete."
        ],
        "audioText": "Space research and environmental protection need not compete."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Critics,",
          "however,",
          "are",
          "not",
          "convinced."
        ],
        "audioText": "Critics, however, are not convinced."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Only when we treat our own planet with care ___ we honestly say that we are ready to leave it.",
        "choices": [
          "can",
          "do",
          "are"
        ],
        "answer": "can",
        "audioText": "Only when we treat our own planet with care can we honestly say that we are ready to leave it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If the same money ___ been invested in renewable energy thirty years ago, we would already be living in a safer world.",
        "choices": [
          "had",
          "has",
          "was"
        ],
        "answer": "had",
        "audioText": "If the same money had been invested in renewable energy thirty years ago, we would already be living in a safer world."
      }
    ]
  },
  {
    "id": "gk-r7-s06",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 6,
    "title": "A Planet Worth Passing On",
    "titleCn": "值得传递的星球",
    "coverEmoji": "🌍",
    "paragraphs": [
      {
        "text": "Imagine standing in a city of 2050, breathing clean air and drinking water that once ran grey with waste. What would you say to the people of today, whose choices decided whether that scene came true? Had our generation ignored the warnings, the sky above us might now be a silent brown ceiling. The warning signs were never hidden. They were simply easier to postpone than to solve, and postponing is what we do best when the cost arrives later than the comfort.",
        "translation": "想象你站在2050年的一座城市里，呼吸着干净的空气，喝着曾经被废物染成灰色的水。你会对今天的人们说些什么——正是他们的选择决定了那一幕能否成真？倘若我们这一代人当年无视那些警告，此刻头顶的天空也许只是一片沉寂的褐色穹顶。警示从未被隐藏。它们只是比解决更容易被推迟，而当代价总比安逸来得更晚时，推迟正是我们最擅长的事。"
      },
      {
        "text": "If the world had invested in clean power thirty years earlier, the air in many cities would be clearer than it is today. That is not a reason to give up, but a reason to begin, and to begin faster than we have ever begun before. Solar panels now cost a fraction of what they did, and wind farms are no longer strange shapes on the horizon. What once sounded impossible has become ordinary. That, in fact, is how most progress arrives—quietly, and later than expected.",
        "translation": "如果世界在三十年前就投资清洁能源，如今许多城市的空气会比现在清澈得多。但这并不是放弃的理由，而是开始行动的理由——而且要比以往任何时候开始得更快。太阳能板如今的价格只是过去的零头，风力发电场也不再是地平线上陌生的形状。曾经听起来不可能的事，已经变得平常。事实上，大多数进步正是这样到来的——悄无声息，且比预期更晚。"
      },
      {
        "text": "Space exploration is not an escape plan, though some people read it that way. Satellites watch our forests, measure our oceans, and warn us hours before a storm strikes the coast. Were we to abandon such tools, we would lose sight of the very planet we claim to protect. Looking outward, therefore, teaches us to look back with greater care, not less.",
        "translation": "太空探索并不是一条逃生之路，尽管有些人这样解读它。卫星注视着我们的森林，测量着我们的海洋，在风暴袭击海岸的数小时前就发出警告。若我们放弃这些工具，便会看不见我们声称要保护的那颗星球。因此，向外眺望，教会我们更加用心地回望，而非更少。"
      },
      {
        "text": "No single country can repair the climate alone, and no single generation can finish the work. Only when neighbours share both the cost and the benefit will long-term plans survive the pressure of the moment. Cooperation is slower, but it lasts longer, and lasting is exactly what our planet needs most.",
        "translation": "没有任何一个国家能独自修复气候，也没有任何一代人能完成这项工作。只有当邻国共同分担成本、共享收益时，长期计划才能在当下的压力中存活下来。合作比命令更慢，却更持久，而持久恰恰是我们的星球最需要的。"
      },
      {
        "text": "The future, after all, is not a distant country that we will one day reach. It is a house we are building with every decision we make today. Small steps, taken by many hands, move further than great speeches delivered by few. So let us choose, deliberately and together, to pass on a planet worth living on.",
        "translation": "毕竟，未来并不是一个我们终将抵达的遥远国度。它是一座我们正用今天的每一个决定建造起来的房子。许多双手迈出的小步，比少数人发表的宏论走得更远。所以，让我们谨慎而携手地选择，把一颗值得生活其上的星球传递下去。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, which of these do satellites help us do?",
        "audioText": "According to the text, which of these do satellites help us do?",
        "options": [
          {
            "emoji": "🌊",
            "value": "ocean",
            "text": "Measure our oceans"
          },
          {
            "emoji": "🚀",
            "value": "escape",
            "text": "Leave Earth forever"
          },
          {
            "emoji": "🏙️",
            "value": "city",
            "text": "Build new cities"
          }
        ],
        "answer": "ocean"
      },
      {
        "type": "word_builder",
        "word": "survive",
        "audioText": "survive"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Cooperation",
          "is",
          "slower,",
          "but",
          "it",
          "lasts",
          "longer."
        ],
        "audioText": "Cooperation is slower, but it lasts longer."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "What",
          "once",
          "sounded",
          "impossible",
          "has",
          "become",
          "ordinary."
        ],
        "audioText": "What once sounded impossible has become ordinary."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Only when neighbours share both the cost and the benefit ___ long-term plans survive the pressure of the moment.",
        "choices": [
          "will",
          "would",
          "do"
        ],
        "answer": "will",
        "audioText": "Only when neighbours share both the cost and the benefit will long-term plans survive the pressure of the moment."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Had our generation ___ the warnings, the sky above us might now be a silent brown ceiling.",
        "choices": [
          "ignored",
          "ignore",
          "ignoring"
        ],
        "answer": "ignored",
        "audioText": "Had our generation ignored the warnings, the sky above us might now be a silent brown ceiling."
      }
    ]
  },
  {
    "id": "gk-r7-s07",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 7,
    "title": "What Tomorrow Will Ask of Us",
    "titleCn": "明天会向我们索求什么",
    "coverEmoji": "🌍",
    "paragraphs": [
      {
        "text": "Not until we began to measure the damage did we realise how quickly our planet had been changing. Were we to keep consuming resources as carelessly as we do today, the world our children inherit would be far poorer than the one we were born into. The story, however, is not finished.",
        "translation": "直到我们开始测量这些破坏，才意识到我们的星球变化得有多快。假如我们继续像今天这样漫不经心地消耗资源，我们的孩子所继承的世界将远比我们出生的那个世界贫瘠。然而，这个故事还没有结束。"
      },
      {
        "text": "Some argue that the money spent on reaching Mars should be used to repair the Earth, and their argument deserves a serious answer. Only when we look back at our small blue planet from a distance do we understand how fragile it is. Space is not an escape, but a mirror.",
        "translation": "有人主张，花在登陆火星上的钱应当用来修复地球，这一观点值得认真回应。只有当我们从远处回望这颗小小的蓝色星球时，才会明白它是多么脆弱。太空不是逃避，而是一面镜子。"
      },
      {
        "text": "What makes the coming decades unusual is that no single nation, however rich or powerful, can solve the climate crisis alone. Should governments continue to compete instead of cooperating, the technologies that might save us will arrive too late. The question is not whether we can afford to act, but whether we can afford to wait.",
        "translation": "未来几十年之所以不同寻常，在于没有任何一个国家——无论多么富有或强大——能够独自解决气候危机。如果各国政府继续相互竞争而不是合作，那些可能拯救我们的技术就会来得太迟。问题不是我们是否有能力行动，而是我们是否负担得起等待。"
      },
      {
        "text": "Many young people today ask what they, as individuals, can possibly do. The answer, though it may sound modest, is that habits spread faster than laws do. If a student chooses to cycle rather than to be driven, and if a family decides to waste a little less, the effect, multiplied by millions, becomes a force that no government can ignore.",
        "translation": "今天许多年轻人问，作为个人，他们究竟能做什么。答案听起来也许并不宏大：习惯的传播比法律更快。如果一个学生选择骑车而不是被车接送，如果一个家庭决定少浪费一点，那么这种效果乘以数百万倍，就会变成任何政府都无法忽视的力量。"
      },
      {
        "text": "The future, in short, will not be decided by machines or by rockets, but by the choices we make while no one is watching. Whether we live on this planet or on another, we will carry our habits with us. What tomorrow will ask of us is simply this: the courage to begin today.",
        "translation": "总之，未来不会由机器或火箭决定，而由我们在无人注视时所做的选择决定。无论我们生活在这颗星球还是另一颗星球，我们都会把自己的习惯带在身边。明天对我们的要求其实很简单：今天就开始的勇气。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Not until we began to measure the damage ___ we realise how quickly our planet had been changing.",
        "choices": [
          "did",
          "do",
          "had"
        ],
        "answer": "did",
        "audioText": "Not until we began to measure the damage did we realise how quickly our planet had been changing."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "story,",
          "however,",
          "is",
          "not",
          "finished."
        ],
        "audioText": "The story, however, is not finished."
      },
      {
        "type": "word_builder",
        "word": "fragile",
        "audioText": "fragile"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ we to keep consuming resources as carelessly as we do today, the world our children inherit would be far poorer than the one we were born into.",
        "choices": [
          "Were",
          "Should",
          "Had"
        ],
        "answer": "Were",
        "audioText": "Were we to keep consuming resources as carelessly as we do today, the world our children inherit would be far poorer than the one we were born into."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Space",
          "is",
          "not",
          "an",
          "escape,",
          "but",
          "a",
          "mirror."
        ],
        "audioText": "Space is not an escape, but a mirror."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Should governments continue to compete instead of cooperating, the technologies that might save us ___ arrive too late.",
        "choices": [
          "will",
          "would",
          "would have"
        ],
        "answer": "will",
        "audioText": "Should governments continue to compete instead of cooperating, the technologies that might save us will arrive too late."
      }
    ]
  },
  {
    "id": "gk-r7-s08",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 8,
    "title": "A Promise to the Next Century",
    "titleCn": "写给下一个百年的承诺",
    "coverEmoji": "⏳",
    "paragraphs": [
      {
        "text": "Ask most people what the world will look like in fifty years, and you will probably receive either a shining dream or a quiet sigh. Neither response is wrong, for the future has always been a mirror in which we see our own hopes and fears. What matters, however, is not the picture we imagine but the habits we allow to shape it. Were we to treat tomorrow as something already decided, we would slowly stop trying to improve today.",
        "translation": "问问大多数人，五十年后的世界会是什么样子，你很可能会得到一个灿烂的梦想，或者一声轻轻的叹息。两种反应都没错，因为未来一直是一面镜子，我们在其中照见自己的希望与恐惧。然而真正重要的，并不是我们想象出的那幅图景，而是我们任由其塑造未来的种种习惯。倘若我们把明天当作早已注定的事，我们便会慢慢不再努力改善今天。"
      },
      {
        "text": "Space exploration is a striking reminder that imagination and responsibility must always travel together, like two wheels of one cart. Not only do rockets carry cameras and experiments beyond our atmosphere, but they also carry the curiosity of everyone who watches them rise. Some argue that we should leave Earth alone and stop dreaming of other planets, since money spent among the stars seems wasted on the ground. Yet those old dreams repaid us well.",
        "translation": "太空探索是一个醒目的提醒：想象力与责任心必须始终同行，就像同一辆车的两只轮子。火箭不仅把相机和实验设备送出了大气层，也把每一个仰望它们升空的人的好奇心一同带了上去。有人主张，我们应当放过地球、不再梦想别的星球，因为花在星辰之间的钱似乎都浪费在了地面上。然而，那些旧日的梦想早已给了我们丰厚的回报。"
      },
      {
        "text": "If we ever build cities on the moon, we will need the same technology that keeps our own cities alive, clean and quiet. Only when clean energy becomes ordinary rather than remarkable can a permanent settlement beyond Earth be called honest. Should we ignore the rivers and forests at home, we would simply export our mistakes to another world, and to our children. The choice belongs to us all.",
        "translation": "如果我们真要在月球上建起城市，我们将需要那套让地球上的城市得以存活、洁净而安宁的技术。只有当清洁能源变得平常而非稀奇时，地球之外的永久定居点才称得上诚实。倘若我们无视家乡的河流与森林，我们不过是在把自己的错误输出到另一个世界，也留给自己的孩子。这个选择属于我们每一个人。"
      },
      {
        "text": "Climate change, resource shortages and unequal access to clean water will not wait politely for us to agree on a plan. Had nations cooperated earlier, some of the damage we now measure might never have happened at all. Still, regret is a poor teacher unless it changes what we do next, and it rarely does. What the next century requires is not a single hero but millions of ordinary people making ordinary choices well.",
        "translation": "气候变化、资源短缺以及清洁用水的不平等，不会礼貌地等着我们就某项计划达成一致。如果各国早些合作，我们今天所测量到的一些损失，也许根本不会发生。不过，后悔是个很差劲的老师，除非它能改变我们接下来所做的事——而它很少做到。下个世纪需要的不是一个英雄，而是千千万万普通人把平凡的选择做好。"
      },
      {
        "text": "So when I am asked about the year 2075, I no longer search for a perfect answer. I describe the small decisions I intend to make: taking the train, planting trees, and protecting what cannot speak for itself. No one can promise that these choices will be enough, and no honest writer should pretend otherwise. Time will not wait for us. But a promise made to the next century is worth keeping, even when nobody is watching us keep it.",
        "translation": "所以，当有人问起 2075 年时，我不再寻找一个完美的答案。我描述自己打算做出的那些小决定：坐火车、种树，以及保护那些无法为自己发声的事物。谁也无法保证这些选择就够了，而诚实的写作者也不该假装它们足够。时间不会等我们。但向下一世纪许下的承诺值得坚守，哪怕没有人在看着我们坚守。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the last paragraph, which small decision does the writer mention?",
        "audioText": "In the last paragraph, which small decision does the writer mention?",
        "options": [
          {
            "emoji": "🚂",
            "value": "train",
            "text": "Taking the train"
          },
          {
            "emoji": "✈️",
            "value": "plane",
            "text": "Flying by plane"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "Driving a car"
          }
        ],
        "answer": "train"
      },
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "choice",
          "belongs",
          "to",
          "us",
          "all."
        ],
        "audioText": "The choice belongs to us all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Were we to treat tomorrow as something already decided, we would slowly stop trying to ___ today.",
        "choices": [
          "improve",
          "invent",
          "ignore"
        ],
        "answer": "improve",
        "audioText": "Were we to treat tomorrow as something already decided, we would slowly stop trying to improve today."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Yet",
          "those",
          "old",
          "dreams",
          "repaid",
          "us",
          "well."
        ],
        "audioText": "Yet those old dreams repaid us well."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Had nations cooperated earlier, some of the damage we now ___ might never have happened at all.",
        "choices": [
          "measure",
          "mention",
          "manage"
        ],
        "answer": "measure",
        "audioText": "Had nations cooperated earlier, some of the damage we now measure might never have happened at all."
      }
    ]
  },
  {
    "id": "gk-r7-s09",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 9,
    "title": "Building Tomorrow, Piece by Piece",
    "titleCn": "一点一点，建造明天",
    "coverEmoji": "🌌",
    "paragraphs": [
      {
        "text": "Whenever people talk about the future, they usually describe either a shining paradise or a ruined planet, as if only two endings were possible for us. Yet the truth is that tomorrow will not arrive fully formed; it will be assembled, piece by piece, from the small decisions we make today. Rarely have we held so much power to shape what comes next, and rarely have we been so uncertain about how to use it.",
        "translation": "每当人们谈起未来，往往要么描绘一个光辉的乐园，要么描绘一颗被毁掉的星球，仿佛我们只可能有两种结局。可事实上，明天不会以完整的面貌到来；它是被我们今天所做的每一个细小决定，一点一点拼装而成的。我们很少拥有如此大的力量去塑造接下来发生的一切，也很少像现在这样不确定该如何使用它。"
      },
      {
        "text": "Think of a city: what if we designed it the way a forest grows, so that every street cooled the air instead of heating it? Were we to plant roofs with grass and cover walls with vines, buildings would breathe, and summer heat would lose much of its bite. Such cities would not require us to give up comfort; they would simply ask us to define comfort differently, as something shared rather than something bought.",
        "translation": "想一想一座城市：如果我们像森林生长那样去设计它，让每条街道都为空气降温，而不是让它变热，那会怎样？倘若我们在屋顶种上草、让墙上爬满藤蔓，建筑就会呼吸，夏日的酷热也会失去大半威力。这样的城市并不要求我们放弃舒适；它只是要求我们重新定义舒适——把它看作共享之物，而不是买来的东西。"
      },
      {
        "text": "Meanwhile, thousands of kilometres above our heads, engineers are testing whether humans can live beyond the thin blue shell that protects us. Some argue that we should first repair what we have broken at home; others, that a species which never leaves its own planet will slowly stop growing. Yet these two dreams are not enemies: the same curiosity that sends a probe past Jupiter can also teach a village how to store clean water.",
        "translation": "与此同时，在我们头顶数千公里之外，工程师们正在检验人类能否生活在那层保护我们的薄薄的蓝色外壳之外。有人认为，我们应当先修复自己在地球上造成的破坏；也有人认为，一个永远不离开自己星球的物种终将慢慢停止成长。然而这两个梦想并非敌人：那份把探测器送过木星的求知欲，同样能教会一个村庄如何储存干净的水。"
      },
      {
        "text": "If the future could speak, it would probably not ask how fast we travelled or how much we owned. It would ask instead whether we learned to share a limited planet, and whether we kept our promises to those who came after us. Only when we answer those questions honestly will the word 'progress' begin to mean something worth defending.",
        "translation": "如果未来能够开口说话，它大概不会问我们走得有多快、拥有多少。它更可能问的是：我们是否学会了共享一颗资源有限的星球，我们是否信守了对后来者的承诺。只有当我们诚实地回答这些问题，“进步”这个词才开始意味着某种值得我们捍卫的东西。"
      },
      {
        "text": "So the future is neither a gift nor a punishment; it is a project, and like every project it needs patience, imagination and a great many hands. None of us can build it alone, and none of us can escape the part we are already playing. The best thing we can do, perhaps, is to keep asking better questions — and to start answering them today.",
        "translation": "所以未来既不是礼物，也不是惩罚；它是一项工程，而像每一项工程一样，它需要耐心、想象力，以及许许多多双手。我们没有人能独自把它建成，也没有人能逃避自己已经在扮演的角色。也许我们所能做的最好的事，就是不断提出更好的问题——并且从今天起开始回答它们。"
      }
    ],
    "quiz": [
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rarely",
          "have",
          "we",
          "held",
          "so",
          "much",
          "power"
        ],
        "audioText": "Rarely have we held so much power."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "None",
          "of",
          "us",
          "can",
          "build",
          "it",
          "alone"
        ],
        "audioText": "None of us can build it alone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Think of a city: what if we designed it the way a ___ grows, so that every street cooled the air instead of heating it?",
        "choices": [
          "forest",
          "factory",
          "highway"
        ],
        "answer": "forest",
        "audioText": "Think of a city: what if we designed it the way a forest grows, so that every street cooled the air instead of heating it?"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Some argue that we should first repair what we have broken at home; others, that a species which never leaves its own ___ will slowly stop growing.",
        "choices": [
          "planet",
          "office",
          "garden"
        ],
        "answer": "planet",
        "audioText": "Some argue that we should first repair what we have broken at home; others, that a species which never leaves its own planet will slowly stop growing."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If the future could speak, it ___ probably not ask how fast we travelled or how much we owned.",
        "choices": [
          "would",
          "will",
          "should"
        ],
        "answer": "would",
        "audioText": "If the future could speak, it would probably not ask how fast we travelled or how much we owned."
      }
    ]
  },
  {
    "id": "gk-r7-s10",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 10,
    "title": "Beyond the Next Horizon",
    "titleCn": "越过下一个地平线",
    "coverEmoji": "🔭",
    "paragraphs": [
      {
        "text": "Ask anyone under twenty what the coming decades will look like, and you will hear answers ranging from cities on Mars to farms powered by sunlight. Yet the shape of that future depends far less on the machines we invent than on the choices we are willing to make together. Never before have we held so much power over our own tomorrow, and never before have we been so uncertain how to use it. This uncertainty is not a weakness; it is simply the price of living in an age of open possibilities.",
        "translation": "随便问一个二十岁以下的年轻人，未来几十年会是什么样子，你听到的答案会从火星上的城市，一直排到靠阳光运转的农场。然而，未来的模样，取决于我们发明的机器，远不如取决于我们愿意共同做出的选择。我们从未像今天这样对自己的明天握有如此大的权力，也从未像今天这样不确定该如何使用它。这种不确定并不是弱点，它只是生活在一个充满开放可能性的时代所要付出的代价。"
      },
      {
        "text": "Consider the cities we already have, where traffic, heat and waste have quietly become the weather of daily life. Were we to rebuild them around rivers, gardens and clean transport, millions of lives would improve within a single generation. Renewable energy, once a dream of engineers, now costs less than coal in many countries, and that change arrived faster than anyone predicted. Should we keep investing in such systems, the air our children breathe will be cleaner than the air we breathe today. Sustainability, then, is not about giving things up; it is about choosing better things to keep.",
        "translation": "看看我们已有的城市吧——在那里，拥堵、高温和垃圾已经悄然成了日常生活的天气。如果我们围绕河流、花园和清洁交通来重建它们，数百万人的生活会在短短一代人之内得到改善。可再生能源曾是工程师的梦想，如今在许多国家成本已低于煤炭，而这一变化比任何人预言的都来得更快。如果我们持续投资这类系统，我们的孩子呼吸的空气将比我们今天呼吸的更干净。因此，可持续并不是要放弃什么，而是要选择更值得保留的东西。"
      },
      {
        "text": "Space exploration, however, offers something that Earth alone cannot: a second perspective on ourselves. When astronauts describe the planet as a small blue marble floating in darkness, they are not being poetic; they are being accurate. Not only does space research produce better weather satellites and medical tools, but it also reminds us how rare our home is. Some argue that we should spend every penny on Earth rather than on rockets, and their concern deserves a serious answer. The honest answer is that we need both, for a horizon worth reaching and a home worth healing are not rivals.",
        "translation": "然而，太空探索提供了地球本身给不了的东西：一个重新审视我们自己的视角。当宇航员把地球描述成一颗漂浮在黑暗中的蓝色小弹珠时，他们不是在抒情，而是在陈述事实。太空研究不仅造出了更好的气象卫星和医疗工具，还提醒我们：我们的家园何其稀有。有人认为，我们应该把每一分钱都花在地球上而不是花在火箭上，这种担忧值得认真回应。诚实的答案是：我们两者都需要——值得抵达的远方和值得治愈的家园，并不是对手。"
      },
      {
        "text": "What will decide our fate, in the end, is not one brilliant invention but the ordinary habits of billions of people. If every household were to waste a little less, and every government to plan a little further ahead, the results would surprise us all. It is essential that young people, who will inherit whatever we leave behind, be included in these decisions now. Rarely in history have so many tools been available to so many hands at the same time. The future, therefore, is neither a gift nor a trap; it is a project, and it is ours to build.",
        "translation": "最终决定我们命运的，不是某一项了不起的发明，而是数十亿人平凡的日常习惯。如果每个家庭都少浪费一点，每个政府都多往前规划一步，结果会让我们所有人吃惊。年轻人将继承我们留下的一切，因此他们现在就必须被纳入这些决定之中，这一点至关重要。历史上很少有那样的时刻：如此多的工具同时握在如此多的人手中。因此，未来既不是礼物，也不是陷阱；它是一个工程，而它由我们来建造。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the writer, what do we need for the future?",
        "audioText": "According to the writer, what do we need for the future?",
        "options": [
          {
            "emoji": "🌍",
            "value": "both",
            "text": "Both a healthy home planet and a distant horizon"
          },
          {
            "emoji": "🚀",
            "value": "space",
            "text": "Only rockets and space travel"
          },
          {
            "emoji": "🏙️",
            "value": "cities",
            "text": "Only bigger and busier cities"
          }
        ],
        "answer": "both"
      },
      {
        "type": "word_builder",
        "word": "horizon",
        "audioText": "horizon"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "need",
          "both",
          "for",
          "a",
          "horizon",
          "worth",
          "reaching"
        ],
        "audioText": "We need both, for a horizon worth reaching."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "results",
          "would",
          "surprise",
          "us",
          "all"
        ],
        "audioText": "The results would surprise us all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Were we to rebuild them around rivers, gardens and clean transport, millions of lives ___ within a single generation.",
        "choices": [
          "would improve",
          "will improve",
          "have improved"
        ],
        "answer": "would improve",
        "audioText": "Were we to rebuild them around rivers, gardens and clean transport, millions of lives would improve within a single generation."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It is essential that young people, who will inherit whatever we leave behind, ___ included in these decisions now.",
        "choices": [
          "be",
          "are",
          "were"
        ],
        "answer": "be",
        "audioText": "It is essential that young people, who will inherit whatever we leave behind, be included in these decisions now."
      }
    ]
  },
  {
    "id": "gk-r7-s11",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 11,
    "title": "Two Frontiers, One Home",
    "titleCn": "两个疆界，同一个家园",
    "coverEmoji": "🚀",
    "paragraphs": [
      {
        "text": "For centuries, humans have looked in two directions: up at the silent stars, and down at the fragile ground beneath our feet. Neither direction is a luxury; each is simply a different way of asking who we are. The question facing our generation is not which frontier to choose, but how to keep both in view.",
        "translation": "几个世纪以来，人类一直同时望向两个方向：向上，是沉默的星空；向下，是脚下那片脆弱却养育我们的土地。这两个方向都不是奢侈，它们只是追问“我们是谁”的不同方式。摆在我们这一代人面前的问题，不是该选择哪一片疆界，而是如何把两者都放在心上。"
      },
      {
        "text": "Space exploration is often criticized as an expensive escape from problems we have failed to solve at home. Yet the satellites above us guide our ships, warn us of storms, and connect villages that no cable could ever reach. Had we never dared to leave the atmosphere, we would still be guessing about the weather and the climate. Only by studying other worlds can we truly understand how rare and delicate our own world is.",
        "translation": "太空探索常被批评为“花大钱逃离我们未能解决的家园难题”。然而，我们头顶的卫星为船只导航、预警风暴，还把电缆永远无法抵达的村庄连接起来。假如我们从未敢于离开大气层，今天恐怕还在猜测天气与气候。只有研究其他世界，我们才能真正明白自己的星球何其稀有、何其脆弱。"
      },
      {
        "text": "The same technology that carries us outward can also be turned back toward Earth, where it is needed just as urgently. Solar panels designed for spacecraft now light homes; water systems built for astronauts now clean rivers. Were we to treat our planet as carelessly as we sometimes do, no rocket could ever carry the smell of rain to another world.",
        "translation": "载我们飞向远方的同一项技术，也可以转回地球，而地球同样迫切需要它。为航天器设计的太阳能板如今点亮了民居；为宇航员建造的水处理系统如今在净化河流。如果我们像有时那样漫不经心地对待自己的星球，那么再先进的火箭也无法把雨的气息带到另一个世界去。"
      },
      {
        "text": "Some argue that we should spend less on rockets and more on rivers; others, that we cannot afford to choose between them. It is not a matter of either/or, but of how wisely we share our limited attention and money. Young people today will inherit both the sky and the soil, and they will be asked to protect both.",
        "translation": "有人认为我们该少花钱造火箭、多花钱治理河流；也有人认为，我们根本承担不起在两者之间做选择。这不是“二选一”的问题，而是如何明智地分配我们有限的精力与资金。今天的年轻人将同时继承天空与土地，也将被要求守护好这两样东西。"
      },
      {
        "text": "What the next century demands of us is not a single grand answer but a habit of careful, patient thinking. Whether we look up or down, the question remains the same: what kind of people do we intend to become? If we can answer that honestly, the future will belong to everyone, not just to those who reach it first.",
        "translation": "下个世纪对我们的要求，不是一个宏大的答案，而是一种审慎而耐心的思考习惯。无论我们向上看还是向下看，问题始终如一：我们想成为什么样的人？如果我们能诚实地回答这个问题，未来就属于每一个人，而不只是那些抢先抵达的人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which image best matches what the writer calls \"the fragile ground beneath our feet\"?",
        "audioText": "Which image best matches what the writer calls the fragile ground beneath our feet?",
        "options": [
          {
            "emoji": "🚀",
            "value": "rocket",
            "text": "A rocket leaving Earth"
          },
          {
            "emoji": "🌍",
            "value": "earth",
            "text": "The Earth we live on"
          },
          {
            "emoji": "🌕",
            "value": "moon",
            "text": "The moon in the night sky"
          }
        ],
        "answer": "earth"
      },
      {
        "type": "word_builder",
        "word": "atmosphere",
        "audioText": "atmosphere"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Solar",
          "panels",
          "designed",
          "for",
          "spacecraft",
          "now",
          "light",
          "homes"
        ],
        "audioText": "Solar panels designed for spacecraft now light homes."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "the",
          "future",
          "will",
          "belong",
          "to",
          "everyone"
        ],
        "audioText": "The future will belong to everyone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Were we to treat our planet as ___ as we sometimes do, no rocket could ever carry the smell of rain to another world.",
        "choices": [
          "carelessly",
          "careless",
          "carefulness"
        ],
        "answer": "carelessly",
        "audioText": "Were we to treat our planet as carelessly as we sometimes do, no rocket could ever carry the smell of rain to another world."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Young people today will ___ both the sky and the soil, and they will be asked to protect both.",
        "choices": [
          "inherit",
          "inherits",
          "inherited"
        ],
        "answer": "inherit",
        "audioText": "Young people today will inherit both the sky and the soil, and they will be asked to protect both."
      }
    ]
  },
  {
    "id": "gk-r7-s12",
    "track": "gaokao",
    "regionId": "gk-r7",
    "order": 12,
    "title": "Between the Stars and the Soil",
    "titleCn": "星辰与土壤之间",
    "coverEmoji": "🚀",
    "paragraphs": [
      {
        "text": "Whenever people ask what the next hundred years will look like, two pictures tend to appear: one of rockets lifting away from a crowded planet, and one of rivers running clear again beneath quiet skies. Rarely do we stop to ask whether these pictures must compete at all. Perhaps the more useful question is not which future to choose, but how the two might be made to depend on each other. Neither picture, on its own, is complete.",
        "translation": "每当人们问起未来一百年会是什么样子，两幅画面往往会出现：一幅是火箭从拥挤的星球上腾空而起，另一幅是河流在寂静的天空下重新变得清澈。我们很少停下来问一句，这两幅画面是否真的必须彼此竞争。也许更有用的问题并不是选择哪一种未来，而是如何让两者相互依存。单看任何一幅画面，都是不完整的。"
      },
      {
        "text": "Space programmes, so often described as escapes from reality, are in fact among the most practical things we do. The satellites that watch our weather, the materials that keep food fresh, the maps that guide ships — none of these would exist had we never looked upward. What is easy to forget is that the engineers who design such systems are also the people who learn to measure a planet's health with unusual care. Seen from orbit, the atmosphere that protects us looks thin enough to worry about. That view changes people.",
        "translation": "太空项目常常被说成是对现实的逃避，事实上却是我们所做的最实际的事情之一。观测天气的卫星、让食物保鲜的材料、为船只导航的地图——假如我们从未抬头仰望，这一切都不会存在。容易被人忘记的是，设计这些系统的工程师，也正是那些学会以格外细心的方式去测量一颗星球健康状况的人。从轨道上看，保护我们的大气层薄得令人担忧。这种景象会改变人。"
      },
      {
        "text": "On the ground, meanwhile, the work is slower and less dramatic, yet no less urgent. Soil takes centuries to build and moments to wash away, and every farmer who plants trees along a hillside knows this better than any report. Had previous generations been told that their choices would still be measured in the year 2100, they might have laughed; we, however, have no such excuse. Our decisions travel further than we imagine.",
        "translation": "与此同时，在大地上的工作更缓慢、更不引人注目，却同样紧迫。土壤需要几个世纪才能形成，却可能在瞬间被冲走，而每个在山坡上种树的农民都比任何报告更清楚这一点。假如有人告诉前几代人，他们的选择到 2100 年仍会被检验，他们或许会一笑置之；可我们却没有这样的借口。我们的决定走得比我们想象的更远。"
      },
      {
        "text": "So the choice is not between the stars and the soil. Were we to treat space as an escape, we would waste both; were we to treat Earth as a closed room, we would lose the very curiosity that keeps us careful. What the coming century demands, then, is not one grand decision but thousands of small, patient ones — made by people who understand that the future is not somewhere we arrive, but something we keep building. The building never really ends.",
        "translation": "所以，选择并不在星辰与土壤之间。倘若我们只把太空当作逃离之地，就会两者尽失；倘若我们只把地球当作一间封闭的屋子，就会丢掉那份让我们保持谨慎的好奇心。那么，未来一百年所需要的，并不是一个宏大的决定，而是成千上万个细小而耐心的决定——由那些懂得未来不是我们抵达的某个地方、而是我们不断建造的东西的人做出。建造永远不会真正结束。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the writer, how does the atmosphere look when seen from orbit?",
        "audioText": "According to the writer, how does the atmosphere look when seen from orbit?",
        "options": [
          {
            "emoji": "🌫️",
            "value": "thin",
            "text": "Thin enough to worry about"
          },
          {
            "emoji": "🧱",
            "value": "solid",
            "text": "Thick and solid"
          },
          {
            "emoji": "🌈",
            "value": "bright",
            "text": "Bright and cheerful"
          }
        ],
        "answer": "thin"
      },
      {
        "type": "word_builder",
        "word": "curiosity",
        "audioText": "curiosity"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Neither",
          "picture",
          "on",
          "its",
          "own",
          "is",
          "complete"
        ],
        "audioText": "Neither picture, on its own, is complete."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Our",
          "decisions",
          "travel",
          "further",
          "than",
          "we",
          "imagine"
        ],
        "audioText": "Our decisions travel further than we imagine."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ takes centuries to build and moments to wash away.",
        "choices": [
          "Soil",
          "Steel",
          "Paper"
        ],
        "answer": "Soil",
        "audioText": "Soil takes centuries to build and moments to wash away."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Were we to treat space as an escape, we would ___ both.",
        "choices": [
          "waste",
          "save",
          "share"
        ],
        "answer": "waste",
        "audioText": "Were we to treat space as an escape, we would waste both."
      }
    ]
  }
];
