/**
 * 悦读馆内容包（小升初）——由 scripts/reading/generate-content.mjs 按蓝图生成，
 * 内容全部自产，请勿手工编辑本文件；改蓝图后重新生成。
 */

import type { ReadingRegion, ReadingRegionSet, ReadingStory } from "./types";

export const REGION_SET: ReadingRegionSet = {
  track: "xiaoshengchu",
  theme: "magic",
  cnLabel: "悦读馆 · 小升初",
  regions: [
  {
    "id": "xsc-r1",
    "name": "Apple Orchard",
    "cnName": "苹果园",
    "icon": "🍎",
    "storyCount": 18
  },
  {
    "id": "xsc-r2",
    "name": "Animal Village",
    "cnName": "动物村",
    "icon": "🐻",
    "storyCount": 14
  },
  {
    "id": "xsc-r3",
    "name": "Candy Town",
    "cnName": "糖果镇",
    "icon": "🍭",
    "storyCount": 14
  },
  {
    "id": "xsc-r4",
    "name": "Ocean Park",
    "cnName": "海洋乐园",
    "icon": "🐬",
    "storyCount": 13
  },
  {
    "id": "xsc-r5",
    "name": "Dino Valley",
    "cnName": "恐龙谷",
    "icon": "🦕",
    "storyCount": 12
  },
  {
    "id": "xsc-r6",
    "name": "Space Station",
    "cnName": "太空站",
    "icon": "🚀",
    "storyCount": 10
  },
  {
    "id": "xsc-r7",
    "name": "Magic Castle",
    "cnName": "魔法城堡",
    "icon": "🏰",
    "storyCount": 9
  }
],
};

export const STORIES: ReadingStory[] = [
  {
    "id": "xsc-r1-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 1,
    "title": "Red Apples and Green Apples",
    "titleCn": "红苹果和绿苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "Welcome to our apple farm. It is big and green. There are many apple trees here.",
        "translation": "欢迎来到我们的苹果园。这里又大又绿，有很多苹果树。"
      },
      {
        "text": "Look at the apple trees. Some apples are red. Some apples are green.",
        "translation": "看那些苹果树呀。有的苹果是红色的，有的苹果是绿色的。"
      },
      {
        "text": "My dad has a big basket. He can pick the red apples. My mom can pick, too.",
        "translation": "我爸爸有一个大篮子。他会摘红苹果，我妈妈也会摘。"
      },
      {
        "text": "My little sister likes the green apples. She says they are sweet. Our dog Lucky runs in the grass.",
        "translation": "我妹妹喜欢绿苹果。她说绿苹果很甜。我们的小狗 Lucky 在草地上跑来跑去。"
      },
      {
        "text": "I put apples in my bag. My bag is very full now.",
        "translation": "我把苹果放进我的包里。现在我的包满满的。"
      },
      {
        "text": "I love my family. We are happy in the sun.",
        "translation": "我爱我的家人。我们在阳光下开开心心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which apples does Dad pick?",
        "audioText": "Which apples does Dad pick?",
        "options": [
          {
            "emoji": "🍎",
            "value": "red",
            "text": "Red apples"
          },
          {
            "emoji": "🍏",
            "value": "green",
            "text": "Green apples"
          },
          {
            "emoji": "🍊",
            "value": "orange",
            "text": "Orange apples"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "Who runs in the grass?",
        "audioText": "Who runs in the grass?",
        "options": [
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "The dog"
          },
          {
            "emoji": "🐱",
            "value": "cat",
            "text": "The cat"
          },
          {
            "emoji": "🐰",
            "value": "rabbit",
            "text": "The rabbit"
          }
        ],
        "answer": "dog"
      },
      {
        "type": "image_choice",
        "question": "Who likes the green apples?",
        "audioText": "Who likes the green apples?",
        "options": [
          {
            "emoji": "👧",
            "value": "sister",
            "text": "My little sister"
          },
          {
            "emoji": "👨",
            "value": "dad",
            "text": "My dad"
          },
          {
            "emoji": "👩",
            "value": "mom",
            "text": "My mom"
          }
        ],
        "answer": "sister"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "word_builder",
        "word": "family",
        "audioText": "family"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "There ___ many apple trees here.",
        "choices": [
          "is",
          "are",
          "am"
        ],
        "answer": "are",
        "audioText": "There are many apple trees here."
      }
    ]
  },
  {
    "id": "xsc-r1-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 2,
    "title": "Apples for My Family",
    "titleCn": "给家人的苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "It is a sunny day. My family is at the apple orchard. The sky is blue.",
        "translation": "今天是个大晴天。我们一家人来到苹果园。天空蓝蓝的。"
      },
      {
        "text": "There are many apple trees. The apples are red and green. They look like small balls.",
        "translation": "园子里有许多苹果树。苹果有红的，也有绿的。它们看起来像一个个小球。"
      },
      {
        "text": "My father gets the high apples. My mother has a big basket. I pick the low apples.",
        "translation": "爸爸摘高处的苹果。妈妈拿着一个大篮子。我摘低处的苹果。"
      },
      {
        "text": "My little sister has a toy dog. The dog is brown and white. It runs under the trees.",
        "translation": "我的小妹妹有一只玩具狗。小狗是棕白相间的。它在树下跑来跑去。"
      },
      {
        "text": "A bird sits on a branch. It is small and yellow. It sings a happy song.",
        "translation": "一只小鸟停在树枝上。它又小又黄。它唱着欢快的歌。"
      },
      {
        "text": "We have ten red apples. Mom makes apple juice. I love our apple day!",
        "translation": "我们摘了十个红苹果。妈妈做苹果汁。我爱我们的苹果日！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color is the sky?",
        "audioText": "What color is the sky?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "image_choice",
        "question": "What does my little sister have?",
        "audioText": "What does my little sister have?",
        "options": [
          {
            "emoji": "🐶",
            "value": "toy dog",
            "text": "A toy dog"
          },
          {
            "emoji": "🐱",
            "value": "toy cat",
            "text": "A toy cat"
          },
          {
            "emoji": "🐟",
            "value": "toy fish",
            "text": "A toy fish"
          }
        ],
        "answer": "toy dog"
      },
      {
        "type": "image_choice",
        "question": "What color is the bird?",
        "audioText": "What color is the bird?",
        "options": [
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          },
          {
            "emoji": "⚫",
            "value": "black",
            "text": "Black"
          },
          {
            "emoji": "🟤",
            "value": "brown",
            "text": "Brown"
          }
        ],
        "answer": "yellow"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "apples",
          "are",
          "red",
          "and",
          "green"
        ],
        "audioText": "The apples are red and green."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sky ___ blue.",
        "choices": [
          "is",
          "are",
          "am"
        ],
        "answer": "is",
        "audioText": "The sky is blue."
      }
    ]
  },
  {
    "id": "xsc-r1-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 3,
    "title": "Big Red Apples",
    "titleCn": "又大又红的苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "It is a sunny day. The sky is blue. My family is at the orchard.",
        "translation": "今天阳光明媚，天空很蓝。我们一家人来到了苹果园。"
      },
      {
        "text": "There are many apple trees. The trees are tall and green. Red apples are on the trees.",
        "translation": "这里有许多苹果树，树又高又绿。红红的苹果挂在树上。"
      },
      {
        "text": "My sister has a small basket. The basket is yellow and round. She can pick apples with me.",
        "translation": "妹妹有一个小篮子，篮子又黄又圆。她可以和我一起摘苹果。"
      },
      {
        "text": "A little dog runs to us. It is white and brown. It has a red ball. The dog can run fast.",
        "translation": "一只小狗朝我们跑过来。它身上有白毛和棕毛。它有一个红色的球。这只小狗跑得很快。"
      },
      {
        "text": "My mother picks ten red apples. My father picks five more apples. We put them in the basket.",
        "translation": "妈妈摘了十个红苹果，爸爸又摘了五个。我们把苹果放进篮子里。"
      },
      {
        "text": "I eat one big apple. It is sweet and juicy. I love the apple orchard. We are all happy.",
        "translation": "我吃了一个大苹果，它又甜又多汁。我喜欢这片苹果园，我们都很开心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color are the apples on the trees?",
        "audioText": "What color are the apples on the trees?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What color is the small basket?",
        "audioText": "What color is the small basket?",
        "options": [
          {
            "emoji": "💛",
            "value": "yellow",
            "text": "Yellow"
          },
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "🤎",
            "value": "brown",
            "text": "Brown"
          }
        ],
        "answer": "yellow"
      },
      {
        "type": "image_choice",
        "question": "What does the little dog have?",
        "audioText": "What does the little dog have?",
        "options": [
          {
            "emoji": "⚽",
            "value": "ball",
            "text": "A ball"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "A balloon"
          },
          {
            "emoji": "🧸",
            "value": "teddy",
            "text": "A teddy bear"
          }
        ],
        "answer": "ball"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "dog",
          "can",
          "run",
          "fast",
          "."
        ],
        "audioText": "The dog can run fast."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It is ___ and juicy.",
        "choices": [
          "sweet",
          "tall",
          "blue"
        ],
        "answer": "sweet",
        "audioText": "It is sweet and juicy."
      }
    ]
  },
  {
    "id": "xsc-r1-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 4,
    "title": "Apples in My Basket",
    "titleCn": "我篮子里的苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "My name is Lily. I am six years old. My family has an apple orchard.",
        "translation": "我叫莉莉，今年六岁。我家有一个苹果园。"
      },
      {
        "text": "The apple trees are very tall. There are many red apples. They look like small red balls.",
        "translation": "苹果树长得很高。树上结满了红苹果，就像一个个小红球。"
      },
      {
        "text": "My dog Lucky runs fast. He can jump and run. He likes the apple smell.",
        "translation": "我的小狗Lucky跑得很快。它会跳，也会跑。它很喜欢苹果的香味。"
      },
      {
        "text": "My mom picks big apples. My dad holds the basket. I put apples in it.",
        "translation": "妈妈摘大苹果。爸爸提着篮子。我把苹果放进篮子里。"
      },
      {
        "text": "Grandma makes apple pie for us. The pie is warm and sweet. We eat it with smiles.",
        "translation": "奶奶给我们做苹果派。派热乎乎的，甜甜的。我们笑着把它吃光。"
      },
      {
        "text": "I love my family. I love the apple orchard too. It is a happy day.",
        "translation": "我爱我的家人，也爱这个苹果园。今天真是快乐的一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color are the apples?",
        "audioText": "What color are the apples?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What animal is Lucky?",
        "audioText": "What animal is Lucky?",
        "options": [
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "🐱",
            "value": "cat",
            "text": "A cat"
          },
          {
            "emoji": "🦆",
            "value": "duck",
            "text": "A duck"
          }
        ],
        "answer": "dog"
      },
      {
        "type": "image_choice",
        "question": "What does Grandma make?",
        "audioText": "What does Grandma make?",
        "options": [
          {
            "emoji": "🥧",
            "value": "pie",
            "text": "A pie"
          },
          {
            "emoji": "🎂",
            "value": "cake",
            "text": "A cake"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          }
        ],
        "answer": "pie"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "mom",
          "picks",
          "big",
          "apples."
        ],
        "audioText": "My mom picks big apples."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The apple trees are very ___.",
        "choices": [
          "tall",
          "short",
          "small"
        ],
        "answer": "tall",
        "audioText": "The apple trees are very tall."
      }
    ]
  },
  {
    "id": "xsc-r1-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 5,
    "title": "The Bird in the Apple Tree",
    "titleCn": "苹果树上的小鸟",
    "coverEmoji": "🐦",
    "paragraphs": [
      {
        "text": "This is our apple orchard. It is big and green. There are many apple trees here.",
        "translation": "这是我们的苹果园。它又大又绿。这里有很多苹果树。"
      },
      {
        "text": "Look at the red apples. They are on the trees. The apples are big and sweet.",
        "translation": "看那些红苹果。它们挂在树上。苹果又大又甜。"
      },
      {
        "text": "A bird sits in the tree. It likes the red apples. It can sing a nice song.",
        "translation": "一只小鸟坐在树上。它喜欢那些红苹果。它会唱好听的歌。"
      },
      {
        "text": "My dog runs to the tree. He can see the bird. They are good friends.",
        "translation": "我的狗跑到树边。它能看见那只小鸟。它们是好朋友。"
      },
      {
        "text": "My sister comes with a basket. She puts apples in it. The basket is full now.",
        "translation": "我妹妹拿着一个篮子走过来。她把苹果放进去。篮子现在装满了。"
      },
      {
        "text": "We eat apples under the tree. My mother makes apple juice. We are all happy.",
        "translation": "我们在树下吃苹果。妈妈做苹果汁。我们都很开心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color are the apples?",
        "audioText": "What color are the apples?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What sits in the tree?",
        "audioText": "What sits in the tree?",
        "options": [
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A bird"
          },
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "🐱",
            "value": "cat",
            "text": "A cat"
          }
        ],
        "answer": "bird"
      },
      {
        "type": "image_choice",
        "question": "What does Mother make?",
        "audioText": "What does Mother make?",
        "options": [
          {
            "emoji": "🧃",
            "value": "juice",
            "text": "Apple juice"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "A cake"
          },
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          }
        ],
        "answer": "juice"
      },
      {
        "type": "word_builder",
        "word": "apple",
        "audioText": "apple"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "apples",
          "are",
          "big",
          "and",
          "sweet."
        ],
        "audioText": "The apples are big and sweet."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The basket is ___ now.",
        "choices": [
          "full",
          "red",
          "small"
        ],
        "answer": "full",
        "audioText": "The basket is full now."
      }
    ]
  },
  {
    "id": "xsc-r1-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 6,
    "title": "A Bird in My Apple Tree",
    "titleCn": "苹果树上的小鸟",
    "coverEmoji": "🐦",
    "paragraphs": [
      {
        "text": "I have a big apple tree. It is in my garden. The apples are red and sweet.",
        "translation": "我有一棵大苹果树。它在我家的花园里。树上的苹果又红又甜。"
      },
      {
        "text": "A bird lives in the tree. The bird is blue and small. It can sing a nice song. My sister likes the song.",
        "translation": "一只小鸟住在树上。这只鸟是蓝色的，个头小小的。它会唱好听的歌。我妹妹很喜欢这首歌。"
      },
      {
        "text": "My dog looks at the bird. He can run and jump. But he cannot fly.",
        "translation": "我的狗看着这只小鸟。它能跑也能跳，可它就是不会飞。"
      },
      {
        "text": "My father picks red apples. He puts them in a box. We eat apples every day.",
        "translation": "爸爸摘红苹果。他把苹果放进一个箱子里。我们每天都吃苹果。"
      },
      {
        "text": "The bird has a small nest. It is near my window. The nest has three eggs. They are white and round.",
        "translation": "小鸟有一个小小的窝。它就在我的窗户旁边。窝里有三个蛋，又白又圆。"
      },
      {
        "text": "I love my apple tree. I love the little bird too. We are good friends.",
        "translation": "我爱我的苹果树，也爱这只小鸟。我们是好朋友。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color are the apples in the tree?",
        "audioText": "What color are the apples in the tree?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What color is the bird?",
        "audioText": "What color is the bird?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "⚫",
            "value": "black",
            "text": "Black"
          },
          {
            "emoji": "⚪",
            "value": "white",
            "text": "White"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "image_choice",
        "question": "How many eggs are in the nest?",
        "audioText": "How many eggs are in the nest?",
        "options": [
          {
            "emoji": "1️⃣",
            "value": "one",
            "text": "One"
          },
          {
            "emoji": "2️⃣",
            "value": "two",
            "text": "Two"
          },
          {
            "emoji": "3️⃣",
            "value": "three",
            "text": "Three"
          }
        ],
        "answer": "three"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "bird",
          "is",
          "blue",
          "and",
          "small."
        ],
        "audioText": "The bird is blue and small."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My father picks red ___.",
        "choices": [
          "apples",
          "eggs",
          "songs"
        ],
        "answer": "apples",
        "audioText": "My father picks red apples."
      }
    ]
  },
  {
    "id": "xsc-r1-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 7,
    "title": "A Bird in the Apple Tree",
    "titleCn": "苹果树上的小鸟",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "We have a small apple farm. There are many apple trees. The trees are tall and green.",
        "translation": "我们有一个小小的苹果园。那里有很多苹果树，树又高又绿。"
      },
      {
        "text": "Look at the little bird. It sits in the apple tree. The bird is brown and small. It can sing nice songs.",
        "translation": "看那只小鸟。它待在苹果树上。这只鸟是棕色的，个子小小，还会唱好听的歌。"
      },
      {
        "text": "My dog runs to the tree. His name is Lucky. Lucky is white and black. He can run very fast.",
        "translation": "我的狗跑到树边。它叫 Lucky。Lucky 是黑白相间的，跑得特别快。"
      },
      {
        "text": "The bird likes red apples. It sits on a big apple. Lucky looks at the bird.",
        "translation": "这只鸟喜欢红苹果，它坐在一个大苹果上。Lucky 就盯着它看。"
      },
      {
        "text": "I have six red apples. My sister has two green apples. We are happy in the orchard.",
        "translation": "我摘了六个红苹果，妹妹有两个青苹果。我们在果园里可开心了。"
      },
      {
        "text": "Mom makes apple juice for us. The juice is sweet and cold. We love our apple farm.",
        "translation": "妈妈给我们做苹果汁，果汁又甜又凉。我们都很爱我们的苹果园。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color is the bird?",
        "audioText": "What color is the bird?",
        "options": [
          {
            "emoji": "🟤",
            "value": "brown",
            "text": "Brown"
          },
          {
            "emoji": "⚪",
            "value": "white",
            "text": "White"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          }
        ],
        "answer": "brown"
      },
      {
        "type": "image_choice",
        "question": "How many red apples do I have?",
        "audioText": "How many red apples do I have?",
        "options": [
          {
            "emoji": "6️⃣",
            "value": "six",
            "text": "Six"
          },
          {
            "emoji": "2️⃣",
            "value": "two",
            "text": "Two"
          },
          {
            "emoji": "3️⃣",
            "value": "three",
            "text": "Three"
          }
        ],
        "answer": "six"
      },
      {
        "type": "image_choice",
        "question": "What does Mom make for us?",
        "audioText": "What does Mom make for us?",
        "options": [
          {
            "emoji": "🧃",
            "value": "juice",
            "text": "Juice"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          },
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          }
        ],
        "answer": "juice"
      },
      {
        "type": "word_builder",
        "word": "green",
        "audioText": "green"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "bird",
          "is",
          "brown",
          "and",
          "small."
        ],
        "audioText": "The bird is brown and small."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My sister has ___ green apples.",
        "choices": [
          "two",
          "six",
          "ten"
        ],
        "answer": "two",
        "audioText": "My sister has two green apples."
      }
    ]
  },
  {
    "id": "xsc-r1-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 8,
    "title": "A Bird in Our Apple Tree",
    "titleCn": "苹果树上的小鸟",
    "coverEmoji": "🐦",
    "paragraphs": [
      {
        "text": "Look at our apple tree. It is big and green. There are many red apples.",
        "translation": "看看我们的苹果树吧。它又大又绿，上面结了许多红苹果。"
      },
      {
        "text": "A little bird comes here. It sits in the tree. It likes the red apples.",
        "translation": "一只小鸟飞来了。它停在树上。它很喜欢这些红苹果。"
      },
      {
        "text": "My sister Amy sees the bird. She has a toy bird too. It is blue and small.",
        "translation": "我的妹妹艾米看见了这只小鸟。她也有一个玩具小鸟。它是蓝色的，小小的。"
      },
      {
        "text": "The bird sings in the tree. Amy sings with the bird. They are happy.",
        "translation": "小鸟在树上唱歌。艾米跟着小鸟一起唱。她们都很开心。"
      },
      {
        "text": "My father picks three apples. He gives one to Amy. He gives one to me. The apples are sweet and red.",
        "translation": "爸爸摘了三个苹果。他给艾米一个，给我一个。苹果又甜又红。"
      },
      {
        "text": "The bird can fly home now. We say goodbye to it. Come again, little bird!",
        "translation": "小鸟现在可以飞回家啦。我们跟它说再见。再来呀，小鸟！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What colour are the apples on the tree?",
        "audioText": "What colour are the apples on the tree?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "How many apples does Father pick?",
        "audioText": "How many apples does Father pick?",
        "options": [
          {
            "emoji": "1️⃣",
            "value": "one",
            "text": "One"
          },
          {
            "emoji": "2️⃣",
            "value": "two",
            "text": "Two"
          },
          {
            "emoji": "3️⃣",
            "value": "three",
            "text": "Three"
          }
        ],
        "answer": "three"
      },
      {
        "type": "image_choice",
        "question": "What colour is Amy's toy bird?",
        "audioText": "What colour is Amy's toy bird?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "⚫",
            "value": "black",
            "text": "Black"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "word_builder",
        "word": "apples",
        "audioText": "apples"
      },
      {
        "type": "word_builder",
        "word": "green",
        "audioText": "green"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Amy",
          "sings",
          "with",
          "the",
          "bird"
        ],
        "audioText": "Amy sings with the bird."
      }
    ]
  },
  {
    "id": "xsc-r1-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 9,
    "title": "My Dog Likes Apples",
    "titleCn": "我的小狗爱吃苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "I have a small dog. His name is Lucky. Lucky is white and brown. He is very cute.",
        "translation": "我有一只小狗。它的名字叫 Lucky。Lucky 是白棕相间的。它非常可爱。"
      },
      {
        "text": "We go to the apple orchard. The orchard is near my home. There are many apple trees. The apples are red and green.",
        "translation": "我们去苹果园。果园就在我家附近。那里有很多苹果树。苹果有红的，也有绿的。"
      },
      {
        "text": "Lucky runs under the trees. He can jump and run. He looks up at the apples. He wants one apple.",
        "translation": "Lucky 在树下跑来跑去。它会跳也会跑。它抬头看着树上的苹果。它想要一个苹果。"
      },
      {
        "text": "My father gives him an apple. Lucky likes the apple. He eats it very fast. His tail moves and moves.",
        "translation": "爸爸给了它一个苹果。Lucky 很喜欢这个苹果。它吃得非常快。它的尾巴摇个不停。"
      },
      {
        "text": "I pick a big red apple. My mother picks three green apples. We put them in a bag. The bag is full now.",
        "translation": "我摘了一个又大又红的苹果。妈妈摘了三个青苹果。我们把苹果放进袋子里。袋子现在装满了。"
      },
      {
        "text": "At home, we eat the apples. Lucky eats his apple too. We are all happy. I love my little dog.",
        "translation": "回到家，我们一起吃苹果。Lucky 也吃它的苹果。我们都很开心。我爱我的小狗。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What fruit do they pick?",
        "audioText": "What fruit do they pick?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "Apple"
          },
          {
            "emoji": "🍌",
            "value": "banana",
            "text": "Banana"
          },
          {
            "emoji": "🍇",
            "value": "grape",
            "text": "Grape"
          }
        ],
        "answer": "apple"
      },
      {
        "type": "image_choice",
        "question": "What color is the big apple?",
        "audioText": "What color is the big apple?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "Where does Lucky run?",
        "audioText": "Where does Lucky run?",
        "options": [
          {
            "emoji": "🌳",
            "value": "under the trees",
            "text": "Under the trees"
          },
          {
            "emoji": "🏠",
            "value": "in the house",
            "text": "In the house"
          },
          {
            "emoji": "🚗",
            "value": "in the car",
            "text": "In the car"
          }
        ],
        "answer": "under the trees"
      },
      {
        "type": "word_builder",
        "word": "apple",
        "audioText": "apple"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "apples",
          "are",
          "red",
          "and",
          "green"
        ],
        "audioText": "The apples are red and green."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Lucky ___ the apple.",
        "choices": [
          "likes",
          "like",
          "liking"
        ],
        "answer": "likes",
        "audioText": "Lucky likes the apple."
      }
    ]
  },
  {
    "id": "xsc-r1-s10",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 10,
    "title": "Grandma's Apple Pie",
    "titleCn": "奶奶的苹果派",
    "coverEmoji": "🥧",
    "paragraphs": [
      {
        "text": "Look at my grandma. She is in the kitchen. She has a big red apple.",
        "translation": "快看我的奶奶。她在厨房里。她有一个又大又红的苹果。"
      },
      {
        "text": "Grandma cuts the apple. She puts it in a bowl. Apples are sweet, she says.",
        "translation": "奶奶把苹果切开，放进碗里。她说，苹果真甜。"
      },
      {
        "text": "I can help my grandma. I wash three green apples. My little sister brings a spoon.",
        "translation": "我能帮奶奶干活。我洗了三个青苹果。我的小妹妹拿来一把勺子。"
      },
      {
        "text": "There is flour on the table. There are apples in the pie. The kitchen smells very good.",
        "translation": "桌上放着面粉。馅饼里包着苹果。厨房里香喷喷的。"
      },
      {
        "text": "My dog sits by the door. He can smell the apple pie. He wants a small piece.",
        "translation": "我的小狗坐在门边。它能闻到苹果派的香味。它想要一小块。"
      },
      {
        "text": "We eat the apple pie. Grandma smiles at us. We are a happy family.",
        "translation": "我们一起吃苹果派。奶奶冲我们微笑。我们是快乐的一家人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where is Grandma?",
        "audioText": "Where is Grandma?",
        "options": [
          {
            "emoji": "🍳",
            "value": "kitchen",
            "text": "Kitchen"
          },
          {
            "emoji": "🛏️",
            "value": "bedroom",
            "text": "Bedroom"
          },
          {
            "emoji": "🛁",
            "value": "bathroom",
            "text": "Bathroom"
          }
        ],
        "answer": "kitchen"
      },
      {
        "type": "image_choice",
        "question": "What color is Grandma's apple?",
        "audioText": "What color is Grandma's apple?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What can the dog smell?",
        "audioText": "What can the dog smell?",
        "options": [
          {
            "emoji": "🥧",
            "value": "pie",
            "text": "Pie"
          },
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "Flower"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          }
        ],
        "answer": "pie"
      },
      {
        "type": "word_builder",
        "word": "kitchen",
        "audioText": "kitchen"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "has",
          "a",
          "big",
          "red",
          "apple."
        ],
        "audioText": "She has a big red apple."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My dog sits by the ___.",
        "choices": [
          "door",
          "table",
          "tree"
        ],
        "answer": "door",
        "audioText": "My dog sits by the door."
      }
    ]
  },
  {
    "id": "xsc-r1-s11",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 11,
    "title": "A Little Rabbit in the Orchard",
    "titleCn": "果园里的小兔子",
    "coverEmoji": "🐰",
    "paragraphs": [
      {
        "text": "Look at the apple orchard. It is big and green. There are many apple trees. The apples are red and green.",
        "translation": "看这个苹果园。它又大又绿。那里有很多苹果树。苹果有红的，也有绿的。"
      },
      {
        "text": "A little rabbit lives here. It has two long ears. It likes red apples. It can jump very high.",
        "translation": "一只小兔子住在这里。它有两只长长的耳朵。它喜欢红苹果。它能跳得很高。"
      },
      {
        "text": "My brother and I come. We have a big basket. The rabbit is not shy. It sits near our basket.",
        "translation": "我和哥哥来了。我们有一个大篮子。这只兔子不怕生。它坐在我们的篮子旁边。"
      },
      {
        "text": "My brother picks a red apple. The apple is big and sweet. He puts it in the basket. The rabbit looks at us.",
        "translation": "哥哥摘了一个红苹果。这个苹果又大又甜。他把它放进篮子里。兔子看着我们。"
      },
      {
        "text": "I give it a small apple. It eats the apple fast. Then it runs away. We say goodbye to it.",
        "translation": "我给了它一个小苹果。它很快就把苹果吃掉了。然后它跑开了。我们跟它说再见。"
      },
      {
        "text": "We go home with apples. Mom makes apple juice. We are all happy today.",
        "translation": "我们带着苹果回家了。妈妈做了苹果汁。我们今天都很开心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the little rabbit like?",
        "audioText": "What does the little rabbit like?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "Apple"
          },
          {
            "emoji": "🥕",
            "value": "carrot",
            "text": "Carrot"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          }
        ],
        "answer": "apple"
      },
      {
        "type": "image_choice",
        "question": "What does Mom make?",
        "audioText": "What does Mom make?",
        "options": [
          {
            "emoji": "🧃",
            "value": "juice",
            "text": "Apple juice"
          },
          {
            "emoji": "🥧",
            "value": "pie",
            "text": "Apple pie"
          },
          {
            "emoji": "🍚",
            "value": "rice",
            "text": "Rice"
          }
        ],
        "answer": "juice"
      },
      {
        "type": "image_choice",
        "question": "Where does the rabbit sit?",
        "audioText": "Where does the rabbit sit?",
        "options": [
          {
            "emoji": "🧺",
            "value": "basket",
            "text": "Near the basket"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "In a house"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "On a bus"
          }
        ],
        "answer": "basket"
      },
      {
        "type": "word_builder",
        "word": "rabbit",
        "audioText": "rabbit"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "likes",
          "red",
          "apples."
        ],
        "audioText": "It likes red apples."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The apples are ___ and green.",
        "choices": [
          "red",
          "blue",
          "black"
        ],
        "answer": "red",
        "audioText": "The apples are red and green."
      }
    ]
  },
  {
    "id": "xsc-r1-s12",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 12,
    "title": "The Squirrel and the Red Apple",
    "titleCn": "松鼠和大红苹果",
    "coverEmoji": "🐿️",
    "paragraphs": [
      {
        "text": "Today is a sunny day. My family is at the apple orchard. The apples are red and green. They look very nice.",
        "translation": "今天是个晴朗的日子。我们一家人在苹果园里。苹果有红的，也有绿的。它们看起来真好看。"
      },
      {
        "text": "Grandpa has a big basket. My little sister has a small bag. I have a red bucket. We can pick many apples.",
        "translation": "爷爷有一个大篮子。妹妹有一个小袋子。我有一个红色的桶。我们能摘很多苹果。"
      },
      {
        "text": "A squirrel is in the tree. It has a big tail. It likes sweet apples. Then it comes down to us.",
        "translation": "一只松鼠在树上。它有一条大尾巴。它喜欢甜甜的苹果。然后它下来找我们了。"
      },
      {
        "text": "The squirrel takes a small apple. It cannot carry the big one. My sister says hello to it. The squirrel is not afraid.",
        "translation": "松鼠叼起一个小苹果。那个大的它搬不动。妹妹向它问好。松鼠一点也不怕。"
      },
      {
        "text": "Grandpa gives it a red apple. It takes the apple happily. Then it runs up the tree. We laugh and clap our hands.",
        "translation": "爷爷给了它一个红苹果。它开心地接过苹果。然后它跑上了树。我们笑着拍起手来。"
      },
      {
        "text": "My bucket is full of apples. It is time to go home. We say goodbye to the squirrel. It waves its big tail. What a nice day!",
        "translation": "我的桶里装满了苹果。该回家了。我们跟松鼠说再见。它摇着大尾巴。真是美好的一天！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What animal is in the apple tree?",
        "audioText": "What animal is in the apple tree?",
        "options": [
          {
            "emoji": "🐿️",
            "value": "squirrel",
            "text": "Squirrel"
          },
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "Dog"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "Bird"
          }
        ],
        "answer": "squirrel"
      },
      {
        "type": "image_choice",
        "question": "What color is my bucket?",
        "audioText": "What color is my bucket?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What does Grandpa give the squirrel?",
        "audioText": "What does Grandpa give the squirrel?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "🍌",
            "value": "banana",
            "text": "A banana"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          }
        ],
        "answer": "apple"
      },
      {
        "type": "word_builder",
        "word": "squirrel",
        "audioText": "squirrel"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "squirrel",
          "is",
          "not",
          "afraid."
        ],
        "audioText": "The squirrel is not afraid."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My bucket is full of ___.",
        "choices": [
          "apples",
          "books",
          "toys"
        ],
        "answer": "apples",
        "audioText": "My bucket is full of apples."
      }
    ]
  },
  {
    "id": "xsc-r1-s13",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 13,
    "title": "My Dog and the Red Apples",
    "titleCn": "我的小狗和红苹果",
    "coverEmoji": "🐶",
    "paragraphs": [
      {
        "text": "I have a little dog. His name is Coco. He is small and white. He likes the apple orchard.",
        "translation": "我有一只小狗。他叫可可。他又小又白。他很喜欢苹果园。"
      },
      {
        "text": "My family has a big orchard. There are many apple trees. The trees are tall and green. Red apples grow on the trees.",
        "translation": "我们家有一个大果园。那里有很多苹果树。树又高又绿。红苹果就长在树上。"
      },
      {
        "text": "Coco runs in the orchard. He can run very fast. He has a red ball. He plays with the ball.",
        "translation": "可可在果园里跑来跑去。他跑得可快了。他有一个红球。他和球一起玩。"
      },
      {
        "text": "My dad picks big apples. My mom puts them in a basket. I eat a sweet red apple. It is very nice.",
        "translation": "爸爸摘大苹果。妈妈把苹果放进篮子里。我吃一个又红又甜的苹果。味道真不错。"
      },
      {
        "text": "Coco sees a green apple. It falls from the tree. He wants to play with it. The apple rolls away.",
        "translation": "可可看见一个绿苹果。它从树上掉下来。他想和它玩。可苹果滚走了。"
      },
      {
        "text": "We go home in the evening. Coco is tired and happy. He sleeps with his ball. I love my little dog.",
        "translation": "傍晚我们回家去。可可又累又开心。他抱着自己的球睡着了。我爱我的小狗。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color is Coco?",
        "audioText": "What color is Coco?",
        "options": [
          {
            "emoji": "⚪",
            "value": "white",
            "text": "White"
          },
          {
            "emoji": "⚫",
            "value": "black",
            "text": "Black"
          },
          {
            "emoji": "🟤",
            "value": "brown",
            "text": "Brown"
          }
        ],
        "answer": "white"
      },
      {
        "type": "image_choice",
        "question": "What does Coco have?",
        "audioText": "What does Coco have?",
        "options": [
          {
            "emoji": "⚽",
            "value": "ball",
            "text": "A ball"
          },
          {
            "emoji": "🧸",
            "value": "toy",
            "text": "A toy"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          }
        ],
        "answer": "ball"
      },
      {
        "type": "image_choice",
        "question": "Where does Coco run?",
        "audioText": "Where does Coco run?",
        "options": [
          {
            "emoji": "🌳",
            "value": "orchard",
            "text": "In the orchard"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "In the house"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "At school"
          }
        ],
        "answer": "orchard"
      },
      {
        "type": "word_builder",
        "word": "orchard",
        "audioText": "orchard"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "plays",
          "with",
          "the",
          "ball."
        ],
        "audioText": "He plays with the ball."
      }
    ]
  },
  {
    "id": "xsc-r1-s14",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 14,
    "title": "A Cart Full of Apples",
    "titleCn": "一车苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "This is my little cart. It is red and old. I like it a lot.",
        "translation": "这是我的小推车。它红红的，有点旧。我特别喜欢它。"
      },
      {
        "text": "The apple trees are very big. There are many apples on them. Some apples are red. Some apples are green.",
        "translation": "苹果树又高又大。树上结满了苹果。有些苹果是红的，有些苹果是绿的。"
      },
      {
        "text": "My sister has a basket. She puts apples in it. She can pick ten apples. She is very happy.",
        "translation": "妹妹有一个篮子。她把苹果放进篮子里。她能摘十个苹果。她开心极了。"
      },
      {
        "text": "My dog sits by the cart. He smells the sweet apples. He can smell them well. But he does not eat them.",
        "translation": "我的小狗坐在推车旁边。它闻着甜甜的苹果。它的鼻子可灵了。可它不吃苹果。"
      },
      {
        "text": "We put the basket in the cart. The cart is full of apples. It is very heavy now.",
        "translation": "我们把篮子放进推车里。推车装满了苹果。现在它变得很重。"
      },
      {
        "text": "Dad pulls the cart home. Mom makes apple juice. We drink it together. What a nice day!",
        "translation": "爸爸把推车拉回家。妈妈榨了苹果汁。我们一起喝果汁。今天真开心！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color is the little cart?",
        "audioText": "What color is the little cart?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "How many apples can my sister pick?",
        "audioText": "How many apples can my sister pick?",
        "options": [
          {
            "emoji": "🔟",
            "value": "ten",
            "text": "Ten"
          },
          {
            "emoji": "3️⃣",
            "value": "three",
            "text": "Three"
          },
          {
            "emoji": "5️⃣",
            "value": "five",
            "text": "Five"
          }
        ],
        "answer": "ten"
      },
      {
        "type": "image_choice",
        "question": "What does Mom make?",
        "audioText": "What does Mom make?",
        "options": [
          {
            "emoji": "🧃",
            "value": "juice",
            "text": "Apple juice"
          },
          {
            "emoji": "🥧",
            "value": "pie",
            "text": "Apple pie"
          },
          {
            "emoji": "🎂",
            "value": "cake",
            "text": "A cake"
          }
        ],
        "answer": "juice"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "cart",
          "is",
          "full",
          "of",
          "apples"
        ],
        "audioText": "The cart is full of apples."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Dad ___ the cart home.",
        "choices": [
          "pull",
          "pulls",
          "picks"
        ],
        "answer": "pulls",
        "audioText": "Dad pulls the cart home."
      }
    ]
  },
  {
    "id": "xsc-r1-s15",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 15,
    "title": "Apples for My Little Sister",
    "titleCn": "给小妹的苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "I have a little sister. Her name is Lily. She is four years old. She likes apples very much.",
        "translation": "我有一个小妹妹。她叫莉莉。她四岁了。她非常喜欢苹果。"
      },
      {
        "text": "We go to the apple orchard. The apple trees are very tall. There are many red apples. Some apples are green too.",
        "translation": "我们去苹果园。苹果树很高。那里有许多红苹果。有些苹果也是绿色的。"
      },
      {
        "text": "My father has a big basket. He can reach the high apples. I pick the low apples. Lily holds a small basket.",
        "translation": "爸爸有一个大篮子。他够得到高处的苹果。我摘低处的苹果。莉莉拿着一个小篮子。"
      },
      {
        "text": "Lily finds a yellow apple. It is like the sun! She puts it in her basket. She smiles at me.",
        "translation": "莉莉找到一个黄苹果。它就像太阳一样！她把它放进篮子里，冲我笑。"
      },
      {
        "text": "Our dog Max runs to us. He likes apples too. He eats a small red apple. He is very happy now.",
        "translation": "我们的狗马克斯跑到我们身边。它也喜欢苹果。它吃了一个小红苹果。它现在很开心。"
      },
      {
        "text": "We go home with three baskets. My mother makes apple juice. Lily drinks two big cups. We are a happy family.",
        "translation": "我们带着三篮苹果回家。妈妈做了苹果汁。莉莉喝了两大杯。我们是快乐的一家人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Who is Lily?",
        "audioText": "Who is Lily?",
        "options": [
          {
            "emoji": "👧",
            "value": "sister",
            "text": "Sister"
          },
          {
            "emoji": "👩",
            "value": "mother",
            "text": "Mother"
          },
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "Dog"
          }
        ],
        "answer": "sister"
      },
      {
        "type": "image_choice",
        "question": "What color is the apple in Lily's basket?",
        "audioText": "What color is the apple in Lily's basket?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          }
        ],
        "answer": "yellow"
      },
      {
        "type": "image_choice",
        "question": "What does the dog eat?",
        "audioText": "What does the dog eat?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          }
        ],
        "answer": "apple"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "father",
          "has",
          "a",
          "big",
          "basket."
        ],
        "audioText": "My father has a big basket."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My mother makes apple ___.",
        "choices": [
          "juice",
          "tea",
          "milk"
        ],
        "answer": "juice",
        "audioText": "My mother makes apple juice."
      }
    ]
  },
  {
    "id": "xsc-r1-s16",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 16,
    "title": "A Picnic in the Apple Orchard",
    "titleCn": "苹果园里的野餐",
    "coverEmoji": "🧺",
    "paragraphs": [
      {
        "text": "Today is a sunny day. My family has a picnic. We go to the apple orchard. The apples are red and green.",
        "translation": "今天是个大晴天。我们一家人去野餐。我们来到苹果园。苹果有红的，也有绿的。"
      },
      {
        "text": "There are many apple trees here. Big apples are on the trees. I can see red apples. I can see green apples too.",
        "translation": "这里有很多苹果树。大苹果挂在树上。我能看见红苹果，也能看见绿苹果。"
      },
      {
        "text": "Mom puts a mat down. My teddy bear sits with me. He has a small red hat. He looks at the big apples.",
        "translation": "妈妈铺好垫子。我的玩具熊和我坐在一起。他戴着一顶小红帽，看着那些大苹果。"
      },
      {
        "text": "Dad gives me a big apple. It is very sweet. I eat it with my family. We are all happy.",
        "translation": "爸爸给我一个大苹果。它特别甜。我和家人一起吃着苹果。我们都很开心。"
      },
      {
        "text": "My little sister likes green apples. She plays with my teddy bear. She can count the red apples. She counts ten red apples.",
        "translation": "我的小妹妹喜欢绿苹果。她拿着我的玩具熊玩。她会数红苹果，一口气数出了十个。"
      },
      {
        "text": "The sun goes down now. We go home with apples. I love the apple orchard.",
        "translation": "太阳现在落山了。我们带着苹果回家。我真喜欢这片苹果园。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is on the trees?",
        "audioText": "What is on the trees?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "🐦",
            "value": "a bird",
            "text": "A bird"
          },
          {
            "emoji": "🐱",
            "value": "a cat",
            "text": "A cat"
          }
        ],
        "answer": "apples"
      },
      {
        "type": "image_choice",
        "question": "Who sits with me?",
        "audioText": "Who sits with me?",
        "options": [
          {
            "emoji": "🐶",
            "value": "a dog",
            "text": "A dog"
          },
          {
            "emoji": "🧸",
            "value": "my teddy bear",
            "text": "My teddy bear"
          },
          {
            "emoji": "🐱",
            "value": "a cat",
            "text": "A cat"
          }
        ],
        "answer": "my teddy bear"
      },
      {
        "type": "image_choice",
        "question": "What does Dad give me?",
        "audioText": "What does Dad give me?",
        "options": [
          {
            "emoji": "🍌",
            "value": "a banana",
            "text": "A banana"
          },
          {
            "emoji": "🍇",
            "value": "grapes",
            "text": "Grapes"
          },
          {
            "emoji": "🍎",
            "value": "a big apple",
            "text": "A big apple"
          }
        ],
        "answer": "a big apple"
      },
      {
        "type": "word_builder",
        "word": "picnic",
        "audioText": "picnic"
      },
      {
        "type": "word_builder",
        "word": "teddy",
        "audioText": "teddy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "little",
          "sister",
          "likes",
          "green",
          "apples."
        ],
        "audioText": "My little sister likes green apples."
      }
    ]
  },
  {
    "id": "xsc-r1-s17",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 17,
    "title": "Picking Apples with Grandpa",
    "titleCn": "和爷爷一起摘苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "Grandpa has a small apple farm. There are many apple trees. The trees are tall and green.",
        "translation": "爷爷有一个小小的苹果园。园子里有很多苹果树。树又高又绿。"
      },
      {
        "text": "I visit Grandpa on Sunday. We walk to the apple trees. Grandpa carries a big basket. I carry a small basket.",
        "translation": "星期天我去看爷爷。我们一起走向苹果树。爷爷拎着一个大篮子，我提着一个小的。"
      },
      {
        "text": "The apples are red and green. Some apples are on the trees. Some apples are on the grass. A little dog runs to us. His name is Lucky.",
        "translation": "苹果有红的，也有绿的。有的苹果长在树上，有的落到了草地上。一只小狗朝我们跑过来，它叫 Lucky。"
      },
      {
        "text": "Grandpa can pick the high apples. I can pick the low apples. Lucky can catch a red apple. He likes apples very much.",
        "translation": "爷爷能摘到高处的苹果，我能摘到低处的苹果。Lucky 还能接住掉下来的红苹果呢。它特别喜欢吃苹果。"
      },
      {
        "text": "We put apples in the baskets. Mom likes red apples. Dad likes green apples. My sister likes apple juice.",
        "translation": "我们把苹果装进篮子里。妈妈喜欢红苹果，爸爸喜欢绿苹果，我妹妹喜欢苹果汁。"
      },
      {
        "text": "Grandpa makes apple pie for us. We eat pie and drink juice. I love apple day. Grandpa smiles at me.",
        "translation": "爷爷给我们做苹果派。我们一边吃派，一边喝果汁。我太喜欢这个苹果日了。爷爷笑着看着我。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does Grandpa make for us?",
        "audioText": "What does Grandpa make for us?",
        "options": [
          {
            "emoji": "🥧",
            "value": "pie",
            "text": "Pie"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🍚",
            "value": "rice",
            "text": "Rice"
          }
        ],
        "answer": "pie"
      },
      {
        "type": "image_choice",
        "question": "What does Lucky like?",
        "audioText": "What does Lucky like?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "🥕",
            "value": "carrots",
            "text": "Carrots"
          },
          {
            "emoji": "🍌",
            "value": "bananas",
            "text": "Bananas"
          }
        ],
        "answer": "apples"
      },
      {
        "type": "image_choice",
        "question": "Who carries a small basket?",
        "audioText": "Who carries a small basket?",
        "options": [
          {
            "emoji": "🧒",
            "value": "me",
            "text": "Me"
          },
          {
            "emoji": "👴",
            "value": "grandpa",
            "text": "Grandpa"
          },
          {
            "emoji": "🐕",
            "value": "lucky",
            "text": "Lucky"
          }
        ],
        "answer": "me"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Grandpa",
          "carries",
          "a",
          "big",
          "basket."
        ],
        "audioText": "Grandpa carries a big basket."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He ___ apples very much.",
        "choices": [
          "like",
          "likes",
          "liking"
        ],
        "answer": "likes",
        "audioText": "He likes apples very much."
      }
    ]
  },
  {
    "id": "xsc-r1-s18",
    "track": "xiaoshengchu",
    "regionId": "xsc-r1",
    "order": 18,
    "title": "Apples for My Teddy Bear",
    "titleCn": "给我的泰迪熊的苹果",
    "coverEmoji": "🍎",
    "paragraphs": [
      {
        "text": "This is our family apple farm. We have many apple trees. The apples are big and red. My teddy sits on the grass.",
        "translation": "这是我们家的苹果园。我们有很多苹果树。苹果又大又红。我的泰迪熊坐在草地上。"
      },
      {
        "text": "My name is Lily. I am six years old. I like apples very much. Teddy likes apples too.",
        "translation": "我叫莉莉。我六岁了。我非常喜欢苹果。泰迪也喜欢苹果。"
      },
      {
        "text": "Today is a sunny day. My dad picks big red apples. My mom puts them in a basket. My little brother eats one apple.",
        "translation": "今天是个大晴天。爸爸摘又大又红的苹果。妈妈把它们放进篮子里。我的小弟弟吃了一个苹果。"
      },
      {
        "text": "Teddy has a small red hat. He cannot pick apples. He can only look at them. He wants one sweet apple.",
        "translation": "泰迪有一顶红色的小帽子。他不会摘苹果。他只能看着苹果。他想要一个甜甜的苹果。"
      },
      {
        "text": "I give Teddy a green apple. He holds it in his arms. He is very happy now. We sit under the apple tree.",
        "translation": "我给了泰迪一个青苹果。他把苹果抱在怀里。他现在非常开心。我们坐在苹果树下。"
      },
      {
        "text": "One apple is on the ground. A little bird comes to eat. It likes the sweet apple too. We are happy in our orchard.",
        "translation": "有一个苹果掉在地上。一只小鸟飞过来吃它。它也很喜欢这个甜甜的苹果。我们在果园里很开心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What color are the big apples on the trees?",
        "audioText": "What color are the big apples on the trees?",
        "options": [
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          }
        ],
        "answer": "red"
      },
      {
        "type": "image_choice",
        "question": "What does Teddy have?",
        "audioText": "What does Teddy have?",
        "options": [
          {
            "emoji": "🎩",
            "value": "hat",
            "text": "A hat"
          },
          {
            "emoji": "🧦",
            "value": "socks",
            "text": "Socks"
          },
          {
            "emoji": "👟",
            "value": "shoes",
            "text": "Shoes"
          }
        ],
        "answer": "hat"
      },
      {
        "type": "image_choice",
        "question": "Who comes to eat the apple on the ground?",
        "audioText": "Who comes to eat the apple on the ground?",
        "options": [
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A bird"
          },
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "🐱",
            "value": "cat",
            "text": "A cat"
          }
        ],
        "answer": "bird"
      },
      {
        "type": "word_builder",
        "word": "apple",
        "audioText": "apple"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "dad",
          "picks",
          "big",
          "red",
          "apples"
        ],
        "audioText": "My dad picks big red apples."
      }
    ]
  },
  {
    "id": "xsc-r2-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 1,
    "title": "Welcome to Animal Village",
    "titleCn": "欢迎来到动物村",
    "coverEmoji": "🐻",
    "paragraphs": [
      {
        "text": "Welcome to Animal Village! Many animals live here together. The sun is shining today. The birds are singing in the trees.",
        "translation": "欢迎来到动物村！许多动物一起住在这里。今天阳光灿烂。鸟儿在树上唱歌。"
      },
      {
        "text": "Look! A little rabbit is on the grass. She is running and jumping happily. Her name is Lily. She is new in the village. She is looking for a friend.",
        "translation": "看！草地上有一只小兔子。她正开心地跑着跳着。她叫莉莉。她刚来村子里。她在找朋友。"
      },
      {
        "text": "A big bear is walking by. He is carrying a heavy box. \"Can I help you?\" says Lily. \"Yes, please!\" says the bear. His name is Ben.",
        "translation": "一只大熊走了过来。他正搬着一个很重的箱子。“我能帮你吗？”莉莉说。“好啊，谢谢你！”大熊说。他叫本。"
      },
      {
        "text": "Lily and Ben are working together. They are putting the box under a tree. \"Thank you, Lily,\" says Ben. \"You are very kind.\" Lily is smiling happily.",
        "translation": "莉莉和本一起干活。他们把箱子放到一棵树下。“谢谢你，莉莉，”本说，“你真是太好了。”莉莉开心地笑了。"
      },
      {
        "text": "Now they are good friends. They like playing together every day. Ben can climb trees. Lily can run very fast. They are helping each other.",
        "translation": "现在他们是好朋友了。他们喜欢每天一起玩。本会爬树。莉莉跑得非常快。他们互相帮助。"
      },
      {
        "text": "In Animal Village, everyone is happy. Good friends are always around you. Come and meet them!",
        "translation": "在动物村里，大家都很开心。好朋友就在你身边。快来认识他们吧！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is the little rabbit doing?",
        "audioText": "What is the little rabbit doing?",
        "options": [
          {
            "emoji": "🏃",
            "value": "running",
            "text": "Running"
          },
          {
            "emoji": "😴",
            "value": "sleeping",
            "text": "Sleeping"
          },
          {
            "emoji": "🍎",
            "value": "eating",
            "text": "Eating"
          }
        ],
        "answer": "running"
      },
      {
        "type": "image_choice",
        "question": "What is the big bear carrying?",
        "audioText": "What is the big bear carrying?",
        "options": [
          {
            "emoji": "📦",
            "value": "box",
            "text": "A box"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "A balloon"
          },
          {
            "emoji": "🍯",
            "value": "honey",
            "text": "Honey"
          }
        ],
        "answer": "box"
      },
      {
        "type": "word_builder",
        "word": "rabbit",
        "audioText": "rabbit"
      },
      {
        "type": "word_builder",
        "word": "friend",
        "audioText": "friend"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "are",
          "helping",
          "each",
          "other",
          "."
        ],
        "audioText": "They are helping each other."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Ben can ___ trees.",
        "choices": [
          "climb",
          "run",
          "sing"
        ],
        "answer": "climb",
        "audioText": "Ben can climb trees."
      }
    ]
  },
  {
    "id": "xsc-r2-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 2,
    "title": "Rabbit's New House",
    "titleCn": "兔子的新房子",
    "coverEmoji": "🏡",
    "paragraphs": [
      {
        "text": "It is a sunny morning. The animals are playing in Animal Village. Rabbit is carrying a big box. She is walking to her new house.",
        "translation": "这是一个阳光明媚的早晨。动物村里的动物们正在玩耍。兔子正搬着一个大箱子。她正走向自己的新房子。"
      },
      {
        "text": "The box is very heavy. Rabbit is tired. \"Can you help me?\" she asks Bear. Bear is reading under a tree.",
        "translation": "箱子非常重。兔子累坏了。“你能帮帮我吗？”她问熊。熊正在一棵树下看书。"
      },
      {
        "text": "\"Of course!\" says Bear. He is strong. He carries the box with Rabbit. They are talking and laughing.",
        "translation": "“当然可以！”熊说。他很强壮。他和兔子一起搬箱子。他们有说有笑。"
      },
      {
        "text": "Now they are at the new house. Duck and Cat are waiting there. They are painting the door. It is blue and yellow.",
        "translation": "现在他们到了新房子。鸭子和猫正在那里等着。他们正在刷门。门是蓝色和黄色的。"
      },
      {
        "text": "\"We like your new house!\" says Duck. Rabbit is very happy. She can make new friends here.",
        "translation": "“我们喜欢你的新房子！”鸭子说。兔子非常开心。她可以在这里交到新朋友。"
      },
      {
        "text": "In the evening, they are eating cake together. Animal Village is a warm place. Friends are always happy to help.",
        "translation": "傍晚，他们一起吃蛋糕。动物村是个温暖的地方。朋友们总是乐于帮忙。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Rabbit carrying?",
        "audioText": "What is Rabbit carrying?",
        "options": [
          {
            "emoji": "📦",
            "value": "box",
            "text": "Box"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          },
          {
            "emoji": "📖",
            "value": "book",
            "text": "Book"
          }
        ],
        "answer": "box"
      },
      {
        "type": "image_choice",
        "question": "What are Duck and Cat doing?",
        "audioText": "What are Duck and Cat doing?",
        "options": [
          {
            "emoji": "🎨",
            "value": "painting",
            "text": "Painting"
          },
          {
            "emoji": "📖",
            "value": "reading",
            "text": "Reading"
          },
          {
            "emoji": "😴",
            "value": "sleeping",
            "text": "Sleeping"
          }
        ],
        "answer": "painting"
      },
      {
        "type": "word_builder",
        "word": "rabbit",
        "audioText": "rabbit"
      },
      {
        "type": "word_builder",
        "word": "friends",
        "audioText": "friends"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rabbit",
          "is",
          "carrying",
          "a",
          "big",
          "box."
        ],
        "audioText": "Rabbit is carrying a big box."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Bear ___ reading under a tree.",
        "choices": [
          "is",
          "are",
          "am"
        ],
        "answer": "is",
        "audioText": "Bear is reading under a tree."
      }
    ]
  },
  {
    "id": "xsc-r2-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 3,
    "title": "Friends Help Friends",
    "titleCn": "朋友帮朋友",
    "coverEmoji": "🐻",
    "paragraphs": [
      {
        "text": "It is a sunny morning. Many animals are busy in Animal Village. Rabbit Lily is watering her garden. Bear Ben is carrying a big box.",
        "translation": "这是一个晴朗的早晨。动物村里许多动物都在忙碌着。兔子莉莉正在给她的花园浇水。熊本正搬着一个大箱子。"
      },
      {
        "text": "\"Can you help me, Lily?\" says Ben. \"This box is very heavy.\" Lily puts down her watering can. \"Yes, I can help you,\" she says.",
        "translation": "“莉莉，你能帮我一下吗？”本说。“这个箱子太重了。”莉莉放下浇水壶。“好的，我来帮你。”她说。"
      },
      {
        "text": "They are walking to the apple shop. A bird is singing in the tree. \"I like your song,\" says Lily. \"I like singing,\" says the bird.",
        "translation": "他们正朝苹果店走去。一只小鸟在树上唱歌。“我喜欢你的歌。”莉莉说。“我喜欢唱歌。”小鸟说。"
      },
      {
        "text": "Now they are at the shop. Doctor Duck is waiting for the apples. \"Thank you!\" she says. \"I am making apple pie. Do you like apple pie?\"",
        "translation": "现在他们到了店里。鸭子医生正在等这些苹果。“谢谢你们！”她说。“我正在做苹果派。你们喜欢苹果派吗？”"
      },
      {
        "text": "\"Yes, we do!\" say Ben and Lily. They are eating warm pie together. The sun is shining. Everyone is happy.",
        "translation": "“喜欢！”本和莉莉说。他们一起吃着热乎乎的派。太阳暖暖地照着。大家都很快乐。"
      },
      {
        "text": "\"Friends help friends,\" says Ben. \"And friends eat pie together!\" laughs Lily.",
        "translation": "“朋友帮朋友。”本说。“朋友还一起吃派呢！”莉莉笑着说。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Lily doing?",
        "audioText": "What is Lily doing?",
        "options": [
          {
            "emoji": "💧",
            "value": "watering",
            "text": "Watering the garden"
          },
          {
            "emoji": "🥧",
            "value": "making_pie",
            "text": "Making a pie"
          },
          {
            "emoji": "🎤",
            "value": "singing",
            "text": "Singing a song"
          }
        ],
        "answer": "watering"
      },
      {
        "type": "word_builder",
        "word": "carrying",
        "audioText": "carrying"
      },
      {
        "type": "image_choice",
        "question": "What is Doctor Duck making?",
        "audioText": "What is Doctor Duck making?",
        "options": [
          {
            "emoji": "🥧",
            "value": "pie",
            "text": "An apple pie"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Some bread"
          },
          {
            "emoji": "🥗",
            "value": "salad",
            "text": "A salad"
          }
        ],
        "answer": "pie"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "are",
          "eating",
          "warm",
          "pie",
          "together."
        ],
        "audioText": "They are eating warm pie together."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They are ___ to the apple shop.",
        "choices": [
          "walking",
          "walks",
          "walked"
        ],
        "answer": "walking",
        "audioText": "They are walking to the apple shop."
      }
    ]
  },
  {
    "id": "xsc-r2-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 4,
    "title": "The Kite in the Tree",
    "titleCn": "树上的风筝",
    "coverEmoji": "🪁",
    "paragraphs": [
      {
        "text": "It is a sunny morning in Animal Village. Rabbit is flying a kite. The wind is blowing hard. The kite goes up, up, up. Look! It is in a big tree.",
        "translation": "动物村里，这是一个晴朗的早晨。兔子正在放风筝。风刮得很大。风筝越飞越高，越飞越高。看！它卡在一棵大树上。"
      },
      {
        "text": "Rabbit is sad. \"I can't get my kite,\" she says. \"Don't worry,\" says Bear. \"I can help you.\"",
        "translation": "兔子很难过。“我拿不到我的风筝了。”她说。“别担心，”熊说，“我可以帮你。”"
      },
      {
        "text": "Bear is tall and strong. He is reaching for the kite. But the kite is too high. Bear can't get it.",
        "translation": "熊又高又壮。他伸手去够风筝。可是风筝太高了。熊够不到它。"
      },
      {
        "text": "Little Bird is singing in the tree. \"I can help!\" she says. She is flying to the kite. She is pulling it with her beak.",
        "translation": "小鸟正在树上唱歌。“我可以帮忙！”她说。她飞到风筝旁边，用嘴巴把它拉下来。"
      },
      {
        "text": "The kite comes down. Rabbit is very happy. \"Thank you, Little Bird!\" she says. \"You are a good friend.\"",
        "translation": "风筝落了下来。兔子非常高兴。“谢谢你，小鸟！”她说，“你真是我的好朋友。”"
      },
      {
        "text": "Now they are playing together. Bear is flying the kite. Rabbit and Little Bird are laughing. They like playing in the sun.",
        "translation": "现在他们在一起玩。熊在放风筝。兔子和小鸟哈哈大笑。他们喜欢在阳光下玩耍。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where is the kite?",
        "audioText": "Where is the kite?",
        "options": [
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "In a tree"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "In a house"
          },
          {
            "emoji": "⛰️",
            "value": "hill",
            "text": "On a hill"
          }
        ],
        "answer": "tree"
      },
      {
        "type": "image_choice",
        "question": "Who helps Rabbit get the kite?",
        "audioText": "Who helps Rabbit get the kite?",
        "options": [
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "Little Bird"
          },
          {
            "emoji": "🐻",
            "value": "bear",
            "text": "Bear"
          },
          {
            "emoji": "🐰",
            "value": "rabbit",
            "text": "Rabbit"
          }
        ],
        "answer": "bird"
      },
      {
        "type": "word_builder",
        "word": "kite",
        "audioText": "kite"
      },
      {
        "type": "word_builder",
        "word": "friend",
        "audioText": "friend"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Little",
          "Bird",
          "is",
          "singing",
          "in",
          "the",
          "tree."
        ],
        "audioText": "Little Bird is singing in the tree."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The kite is too ___ for Bear.",
        "choices": [
          "high",
          "small",
          "old"
        ],
        "answer": "high",
        "audioText": "The kite is too high for Bear."
      }
    ]
  },
  {
    "id": "xsc-r2-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 5,
    "title": "Rabbit's New Kite",
    "titleCn": "兔子的新风筝",
    "coverEmoji": "🪁",
    "paragraphs": [
      {
        "text": "It is a sunny day in Animal Village. The wind is blowing. Little Rabbit is flying a new kite.",
        "translation": "动物村里阳光明媚。风轻轻地吹着。小兔子正在放一只新风筝。"
      },
      {
        "text": "Look! The kite is going up. It is flying over the trees. Rabbit is running and laughing.",
        "translation": "看！风筝正往上升。它飞过了一棵棵树。兔子一边跑一边笑。"
      },
      {
        "text": "Oh no! The kite is stuck in a big tree. Rabbit is sad. She cannot get it down.",
        "translation": "哎呀！风筝卡在一棵大树上。兔子很难过。她自己拿不下来。"
      },
      {
        "text": "\"I can help you,\" says Monkey. He likes climbing trees. He is climbing up now.",
        "translation": "“我来帮你吧，”猴子说。他喜欢爬树。现在他正往上爬呢。"
      },
      {
        "text": "Monkey gets the kite. He gives it to Rabbit. \"Thank you, Monkey!\" says Rabbit.",
        "translation": "猴子拿到了风筝。他把风筝递给兔子。“谢谢你，猴子！”兔子说。"
      },
      {
        "text": "Now they are playing together. The kite is flying high again. Friends help friends.",
        "translation": "现在他们一起玩了起来。风筝又飞得高高的了。朋友就是要互相帮助。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Little Rabbit flying?",
        "audioText": "What is Little Rabbit flying?",
        "options": [
          {
            "emoji": "🪁",
            "value": "kite",
            "text": "A kite"
          },
          {
            "emoji": "⚽",
            "value": "ball",
            "text": "A ball"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "A balloon"
          }
        ],
        "answer": "kite"
      },
      {
        "type": "image_choice",
        "question": "Who helps Rabbit get the kite?",
        "audioText": "Who helps Rabbit get the kite?",
        "options": [
          {
            "emoji": "🐵",
            "value": "monkey",
            "text": "Monkey"
          },
          {
            "emoji": "🐻",
            "value": "bear",
            "text": "Bear"
          },
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "Dog"
          }
        ],
        "answer": "monkey"
      },
      {
        "type": "word_builder",
        "word": "climbing",
        "audioText": "climbing"
      },
      {
        "type": "word_builder",
        "word": "kite",
        "audioText": "kite"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "is",
          "flying",
          "over",
          "the",
          "trees."
        ],
        "audioText": "It is flying over the trees."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Rabbit is ___ and laughing.",
        "choices": [
          "running",
          "sleeping",
          "singing"
        ],
        "answer": "running",
        "audioText": "Rabbit is running and laughing."
      }
    ]
  },
  {
    "id": "xsc-r2-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 6,
    "title": "Duck's Lost Ball",
    "titleCn": "小鸭子找球",
    "coverEmoji": "🦆",
    "paragraphs": [
      {
        "text": "It is a sunny morning. Duck is playing with a red ball. She likes playing by the river.",
        "translation": "这是一个晴朗的早晨。小鸭子正在玩一个红皮球。她喜欢在河边玩。"
      },
      {
        "text": "Oh no! Her ball falls into the river. Duck is crying by the water. \"My ball! My ball!\" she says.",
        "translation": "哎呀！她的球掉进了河里。小鸭子在水边哭了起来。“我的球！我的球！”她说。"
      },
      {
        "text": "Bear is walking near the river. He sees Duck and stops. \"Do not worry,\" says Bear. \"I can help you.\"",
        "translation": "小熊正在河边散步。他看见小鸭子，就停了下来。“别着急，”小熊说，“我可以帮你。”"
      },
      {
        "text": "Bear gets a long stick. He is trying to reach the ball. Duck is watching him.",
        "translation": "小熊找来一根长长的棍子。他正试着把球够过来。小鸭子看着他。"
      },
      {
        "text": "Rabbit is coming with a net. \"I can help you too!\" she says. They are working together.",
        "translation": "小兔子拿着一个网兜走来了。“我也能帮上忙！”她说。他们一起努力。"
      },
      {
        "text": "Now the ball is safe. Duck is very happy. \"Thank you, my good friends!\" she says. They play together again.",
        "translation": "现在球没事了。小鸭子特别开心。“谢谢你们，我的好朋友！”她说。他们又一起玩了起来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Duck playing with?",
        "audioText": "What is Duck playing with?",
        "options": [
          {
            "emoji": "🔴",
            "value": "ball",
            "text": "A red ball"
          },
          {
            "emoji": "🪁",
            "value": "kite",
            "text": "A kite"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A toy car"
          }
        ],
        "answer": "ball"
      },
      {
        "type": "image_choice",
        "question": "How does Duck feel at the end?",
        "audioText": "How does Duck feel at the end?",
        "options": [
          {
            "emoji": "😊",
            "value": "happy",
            "text": "Happy"
          },
          {
            "emoji": "😢",
            "value": "sad",
            "text": "Sad"
          },
          {
            "emoji": "😴",
            "value": "sleepy",
            "text": "Sleepy"
          }
        ],
        "answer": "happy"
      },
      {
        "type": "word_builder",
        "word": "river",
        "audioText": "river"
      },
      {
        "type": "word_builder",
        "word": "worry",
        "audioText": "worry"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Duck",
          "is",
          "playing",
          "with",
          "a",
          "red",
          "ball"
        ],
        "audioText": "Duck is playing with a red ball."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Rabbit is coming with a ___.",
        "choices": [
          "net",
          "book",
          "cup"
        ],
        "answer": "net",
        "audioText": "Rabbit is coming with a net."
      }
    ]
  },
  {
    "id": "xsc-r2-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 7,
    "title": "Duck's Warm Bread",
    "titleCn": "小鸭的热面包",
    "coverEmoji": "🦆",
    "paragraphs": [
      {
        "text": "Duck is making bread in her little kitchen. She is mixing flour and water. The bread smells very good.",
        "translation": "鸭子正在她的小厨房里做面包。她正在搅拌面粉和水。面包闻起来香极了。"
      },
      {
        "text": "Rabbit comes to the door. \"Can I help you?\" she asks. Duck is very happy. Rabbit is cutting sweet apples.",
        "translation": "兔子来到门口。“我来帮你，好吗？”她问。鸭子特别开心。兔子正在切甜甜的苹果。"
      },
      {
        "text": "Bear is carrying a big basket. He is picking more apples from the tree. \"I like eating warm bread,\" he says.",
        "translation": "熊提着一个大篮子。他正在从树上摘更多的苹果。“我喜欢吃热乎乎的面包。”他说。"
      },
      {
        "text": "Now the three friends are working together. Duck is putting the bread in the oven. Bear is washing the plates.",
        "translation": "现在三个朋友一起忙活。鸭子把面包放进烤箱。熊在洗盘子。"
      },
      {
        "text": "Soon the bread is ready. It is warm and sweet. They are eating and singing together.",
        "translation": "很快面包就做好了。它又热又甜。他们一起吃着、唱着。"
      },
      {
        "text": "\"Good friends make good bread,\" says Duck. Everyone is smiling. The little kitchen is full of love.",
        "translation": "“好朋友才能做出好面包。”鸭子说。每个人都笑着。小小的厨房里满满都是爱。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Duck making?",
        "audioText": "What is Duck making?",
        "options": [
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🍲",
            "value": "soup",
            "text": "Soup"
          },
          {
            "emoji": "🥗",
            "value": "salad",
            "text": "Salad"
          }
        ],
        "answer": "bread"
      },
      {
        "type": "word_builder",
        "word": "kitchen",
        "audioText": "kitchen"
      },
      {
        "type": "image_choice",
        "question": "What is Bear carrying?",
        "audioText": "What is Bear carrying?",
        "options": [
          {
            "emoji": "🧺",
            "value": "basket",
            "text": "A basket"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "A balloon"
          },
          {
            "emoji": "📦",
            "value": "box",
            "text": "A box"
          }
        ],
        "answer": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rabbit",
          "is",
          "cutting",
          "sweet",
          "apples"
        ],
        "audioText": "Rabbit is cutting sweet apples."
      },
      {
        "type": "word_builder",
        "word": "bread",
        "audioText": "bread"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Duck ___ making bread in her little kitchen.",
        "choices": [
          "is",
          "are",
          "am"
        ],
        "answer": "is",
        "audioText": "Duck is making bread in her little kitchen."
      }
    ]
  },
  {
    "id": "xsc-r2-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 8,
    "title": "Bear's Big Cake",
    "titleCn": "小熊的大蛋糕",
    "coverEmoji": "🐻",
    "paragraphs": [
      {
        "text": "Bear is busy today. He is making a big cake. He is putting honey in the bowl. The kitchen smells sweet. Bear is very happy.",
        "translation": "小熊今天很忙。他在做一个大蛋糕。他把蜂蜜放进大碗里。厨房里香香的。小熊非常开心。"
      },
      {
        "text": "Rabbit comes to the window. She looks at Bear. \"What are you doing?\" she asks. \"I am making a cake,\" says Bear. \"I can smell the honey!\" \"Me too,\" says Rabbit.",
        "translation": "兔子来到窗边。她看着小熊。“你在做什么？”她问。“我在做蛋糕，”小熊说。“我能闻到蜂蜜的香味！”“我也闻到了，”兔子说。"
      },
      {
        "text": "\"Can I help you?\" asks Rabbit. \"Yes, please,\" says Bear. \"You can wash the apples.\" Rabbit is washing the apples now. She is singing a happy song.",
        "translation": "“我能帮你吗？”兔子问。“好啊，谢谢你，”小熊说。“你可以去洗苹果。”兔子现在正在洗苹果。她唱着一首快乐的歌。"
      },
      {
        "text": "Duck is walking by the river. She sees the warm light. She comes to the door. \"Can I help too?\" she asks. \"Yes,\" says Bear. \"You can bring some water.\" Duck is carrying a small pot.",
        "translation": "鸭子正沿着河边散步。她看到了暖暖的灯光。她来到门口。“我也能帮忙吗？”她问。“可以，”小熊说。“你可以带些水来。”鸭子正端着一个小罐子。"
      },
      {
        "text": "Now the cake is in the oven. The friends are waiting and singing. Bear is smiling at them. \"I like making cakes with you,\" he says. \"We like helping you,\" say Rabbit and Duck.",
        "translation": "现在蛋糕在烤箱里。朋友们一边等，一边唱歌。小熊对着他们笑。“我喜欢和你们一起做蛋糕，”他说。“我们喜欢帮你，”兔子和鸭子说。"
      },
      {
        "text": "Soon the cake is ready. It smells sweet and warm. Everyone is eating happily. \"Friends make everything better,\" says Bear. Everyone is laughing.",
        "translation": "很快蛋糕就做好了。它闻起来又甜又暖。大家都开心地吃着。“有朋友在，什么都更好，”小熊说。大家都在笑。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Bear making?",
        "audioText": "What is Bear making?",
        "options": [
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "A cake"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🍪",
            "value": "cookie",
            "text": "A cookie"
          }
        ],
        "answer": "cake"
      },
      {
        "type": "image_choice",
        "question": "What is Duck carrying?",
        "audioText": "What is Duck carrying?",
        "options": [
          {
            "emoji": "💧",
            "value": "water",
            "text": "Water"
          },
          {
            "emoji": "🧺",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "🌻",
            "value": "flowers",
            "text": "Flowers"
          }
        ],
        "answer": "water"
      },
      {
        "type": "word_builder",
        "word": "honey",
        "audioText": "honey"
      },
      {
        "type": "word_builder",
        "word": "water",
        "audioText": "water"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rabbit",
          "is",
          "washing",
          "the",
          "apples",
          "now",
          "."
        ],
        "audioText": "Rabbit is washing the apples now."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He is ___ honey in the bowl.",
        "choices": [
          "putting",
          "eating",
          "drinking"
        ],
        "answer": "putting",
        "audioText": "He is putting honey in the bowl."
      }
    ]
  },
  {
    "id": "xsc-r2-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 9,
    "title": "Our New Bridge",
    "titleCn": "我们的新桥",
    "coverEmoji": "🌉",
    "paragraphs": [
      {
        "text": "It is raining hard in Animal Village. The river is running very fast. The old bridge is falling down.",
        "translation": "动物村里正下着大雨。河水飞快地流淌着。那座老桥正在塌下来。"
      },
      {
        "text": "Rabbit is standing by the water. \"We cannot cross the river now,\" she says. Duck is swimming and laughing. \"I can swim over to you!\"",
        "translation": "兔子站在水边。“我们现在过不了河了，”她说。鸭子一边游一边笑。“我可以游过去到你那边！”"
      },
      {
        "text": "Bear is carrying big stones. Fox is bringing a long, strong board. Rabbit is looking for some ropes. They are building a new bridge together.",
        "translation": "熊在搬大石头。狐狸带来了一块又长又结实的木板。兔子在找一些绳子。他们正在一起造一座新桥。"
      },
      {
        "text": "Everyone is working and singing. Rabbit is holding the board. Duck is putting stones in the water. Bear is pushing a heavy log.",
        "translation": "大家都在一边干活一边唱歌。兔子扶着木板。鸭子把石头放进水里。熊推着一根很重的木头。"
      },
      {
        "text": "In the afternoon, the new bridge is ready. All the animals are standing on it. \"Thank you, my good friends!\" says Rabbit. \"We like helping each other.\"",
        "translation": "到了下午，新桥造好了。所有的动物都站在桥上。“谢谢你们，我的好朋友们！”兔子说。“我们喜欢互相帮助。”"
      },
      {
        "text": "Now they can cross the river again. They are dancing and eating cakes. What a happy day for everyone!",
        "translation": "现在他们又能过河了。他们一边跳舞一边吃蛋糕。对大家来说，这是多么快乐的一天啊！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is the weather like in Animal Village?",
        "audioText": "What is the weather like in Animal Village?",
        "options": [
          {
            "emoji": "🌧️",
            "value": "rainy",
            "text": "Rainy"
          },
          {
            "emoji": "☀️",
            "value": "sunny",
            "text": "Sunny"
          },
          {
            "emoji": "❄️",
            "value": "snowy",
            "text": "Snowy"
          }
        ],
        "answer": "rainy"
      },
      {
        "type": "image_choice",
        "question": "What are the animals building?",
        "audioText": "What are the animals building?",
        "options": [
          {
            "emoji": "🌉",
            "value": "bridge",
            "text": "A bridge"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "A house"
          },
          {
            "emoji": "🪁",
            "value": "kite",
            "text": "A kite"
          }
        ],
        "answer": "bridge"
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "word_builder",
        "word": "river",
        "audioText": "river"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "are",
          "building",
          "a",
          "new",
          "bridge",
          "together"
        ],
        "audioText": "They are building a new bridge together."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Bear is ___ a heavy log.",
        "choices": [
          "pushing",
          "eating",
          "reading"
        ],
        "answer": "pushing",
        "audioText": "Bear is pushing a heavy log."
      }
    ]
  },
  {
    "id": "xsc-r2-s10",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 10,
    "title": "The Picnic in the Rain",
    "titleCn": "雨中的野餐",
    "coverEmoji": "🧺",
    "paragraphs": [
      {
        "text": "It is a sunny morning in Animal Village. Rabbit, Duck and Bear are walking to the hill. They are carrying a big basket. Duck is singing a happy song. Bear is eating some bread. Rabbit is looking at the sky.",
        "translation": "动物村里，这是一个晴朗的早晨。兔子、鸭子和熊正往小山上走。它们抬着一只大篮子。鸭子唱着开心的歌。熊在吃面包。兔子在看天空。"
      },
      {
        "text": "They put a red cloth on the grass. Duck is putting apples on a plate. Bear is opening a bottle of juice. Rabbit is dancing and laughing. They are all having a good time.",
        "translation": "它们把一块红布铺在草地上。鸭子把苹果摆到盘子里。熊在开一瓶果汁。兔子又跳又笑。它们都玩得很开心。"
      },
      {
        "text": "Suddenly, big dark clouds come. Rain is falling on the grass. Duck is looking at the wet food. \"Oh no!\" says Bear. \"We can't eat here now.\" Rabbit is thinking and thinking.",
        "translation": "忽然，大朵大朵的乌云飘来了。雨落在草地上。鸭子看着被淋湿的食物。“哎呀！”熊说，“我们现在不能在这儿吃东西了。”兔子想啊想。"
      },
      {
        "text": "\"I have an idea,\" says Rabbit. \"Look at that big tree.\" The tree is tall and green. They can sit under it. Duck is carrying the basket. Bear is carrying the cloth.",
        "translation": "“我有个主意，”兔子说，“看那棵大树。”那棵树又高又绿。它们可以坐在树下。鸭子抬着篮子，熊拿着红布。"
      },
      {
        "text": "Now they are sitting under the tree. They are eating and talking. Duck is telling a funny story. Bear is laughing loudly. Rabbit is drinking warm juice.",
        "translation": "现在它们坐在树下。它们一边吃一边聊天。鸭子在讲一个好笑的故事。熊哈哈大笑。兔子喝着温温的果汁。"
      },
      {
        "text": "\"Rain is not bad,\" says Duck. \"We like picnics with friends.\" The rain is stopping slowly. A rainbow is in the sky. They are all smiling happily.",
        "translation": "“下雨也不错呀，”鸭子说，“我们喜欢和朋友一起野餐。”雨慢慢停了。天上出现了一道彩虹。它们都开心地笑着。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is the weather like in the morning?",
        "audioText": "What is the weather like in the morning?",
        "options": [
          {
            "emoji": "☀️",
            "value": "sunny",
            "text": "Sunny"
          },
          {
            "emoji": "🌧️",
            "value": "rainy",
            "text": "Rainy"
          },
          {
            "emoji": "❄️",
            "value": "snowy",
            "text": "Snowy"
          }
        ],
        "answer": "sunny"
      },
      {
        "type": "image_choice",
        "question": "What is Duck putting on the plate?",
        "audioText": "What is Duck putting on the plate?",
        "options": [
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🍌",
            "value": "bananas",
            "text": "Bananas"
          }
        ],
        "answer": "apples"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "word_builder",
        "word": "rainbow",
        "audioText": "rainbow"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Duck",
          "is",
          "singing",
          "a",
          "happy",
          "song."
        ],
        "audioText": "Duck is singing a happy song."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Now they are sitting ___ the tree.",
        "choices": [
          "under",
          "on",
          "in"
        ],
        "answer": "under",
        "audioText": "Now they are sitting under the tree."
      }
    ]
  },
  {
    "id": "xsc-r2-s11",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 11,
    "title": "Fox's Small Garden",
    "titleCn": "狐狸的小花园",
    "coverEmoji": "🦊",
    "paragraphs": [
      {
        "text": "Fox has a small garden. It is near the hill. He is planting seeds today. Rabbit is bringing water. She is carrying a big blue bucket.",
        "translation": "狐狸有一小块花园。它就在小山附近。他今天在种种子。兔子在运水。她正提着一个蓝色的大桶。"
      },
      {
        "text": "Bear is digging holes with Fox. He is strong and works fast. Duck is putting the seeds in. She likes helping her friends.",
        "translation": "熊和狐狸一起挖坑。他很强壮，干活很快。鸭子把种子放进去。她喜欢帮助朋友们。"
      },
      {
        "text": "Look! Squirrel is coming with a bag. She can carry many little seeds. Now everyone is working together. The garden is getting busy.",
        "translation": "看！松鼠背着一个袋子来了。她能搬很多小种子。现在大家一起干活。花园里热闹起来了。"
      },
      {
        "text": "Fox is very happy. He is smiling at his friends. \"Thank you,\" says Fox. \"We are making a nice garden.\"",
        "translation": "狐狸非常开心。他冲着朋友们笑。“谢谢你们，”狐狸说，“我们正在做一个小花园呢。”"
      },
      {
        "text": "Now they are singing songs. Duck is dancing in the sun. Bear is clapping his big hands. The little seeds are sleeping in the soil.",
        "translation": "现在他们唱起了歌。鸭子在阳光下跳舞。熊拍着他的大手。小小的种子在泥土里睡觉。"
      },
      {
        "text": "Soon the seeds can grow into plants. The friends are waiting for flowers. They like working in the garden. Every day is a happy day.",
        "translation": "很快种子就能长成植物。朋友们在等着花儿开放。他们喜欢在花园里干活。每一天都是快乐的一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Rabbit carrying?",
        "audioText": "What is Rabbit carrying?",
        "options": [
          {
            "emoji": "🪣",
            "value": "bucket",
            "text": "A bucket"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "📚",
            "value": "book",
            "text": "A book"
          }
        ],
        "answer": "bucket"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "image_choice",
        "question": "Who is coming with a bag?",
        "audioText": "Who is coming with a bag?",
        "options": [
          {
            "emoji": "🐿️",
            "value": "squirrel",
            "text": "Squirrel"
          },
          {
            "emoji": "🐰",
            "value": "rabbit",
            "text": "Rabbit"
          },
          {
            "emoji": "🐻",
            "value": "bear",
            "text": "Bear"
          }
        ],
        "answer": "squirrel"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Fox ___ a small garden.",
        "choices": [
          "has",
          "have",
          "having"
        ],
        "answer": "has",
        "audioText": "Fox has a small garden."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Duck",
          "is",
          "dancing",
          "in",
          "the",
          "sun."
        ],
        "audioText": "Duck is dancing in the sun."
      },
      {
        "type": "word_builder",
        "word": "squirrel",
        "audioText": "squirrel"
      }
    ]
  },
  {
    "id": "xsc-r2-s12",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 12,
    "title": "Squirrel's Lost Nuts",
    "titleCn": "松鼠的坚果不见了",
    "coverEmoji": "🐿️",
    "paragraphs": [
      {
        "text": "Squirrel is walking home. She has a big bag of nuts. She likes finding nuts in autumn.",
        "translation": "松鼠正往家走。她背着一大袋坚果。她喜欢在秋天找坚果。"
      },
      {
        "text": "Oh no! The bag has a small hole. The nuts are falling on the road.",
        "translation": "哎呀！袋子破了一个小洞。坚果正一颗颗掉在路上。"
      },
      {
        "text": "Rabbit is playing nearby. She sees the nuts on the road. \"Squirrel! Your nuts are falling!\" she says.",
        "translation": "兔子正在附近玩。她看到路上的坚果。\"松鼠！你的坚果在往下掉呢！\"她说。"
      },
      {
        "text": "Squirrel looks at the empty bag. She is very sad. \"Oh no, my nuts are gone!\" she says.",
        "translation": "松鼠看着空空的袋子。她非常难过。\"哎呀，我的坚果都不见了！\"她说。"
      },
      {
        "text": "Rabbit calls her friends. Duck and Bear are coming. They are helping Squirrel find the nuts. Bear is carrying a big basket.",
        "translation": "兔子叫来了朋友们。鸭子和熊正赶过来。他们正帮松鼠找坚果。熊还提着一个大篮子。"
      },
      {
        "text": "Now the nuts are in the big basket. Squirrel is smiling again. \"Thank you, my good friends!\" she says.",
        "translation": "现在坚果都在大篮子里了。松鼠又笑了起来。\"谢谢你们，我的好朋友！\"她说。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Squirrel carrying home?",
        "audioText": "What is Squirrel carrying home?",
        "options": [
          {
            "emoji": "👜",
            "value": "bag",
            "text": "Bag"
          },
          {
            "emoji": "🧺",
            "value": "basket",
            "text": "Basket"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "Balloon"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "image_choice",
        "question": "What is falling on the road?",
        "audioText": "What is falling on the road?",
        "options": [
          {
            "emoji": "🌰",
            "value": "nuts",
            "text": "Nuts"
          },
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          }
        ],
        "answer": "nuts"
      },
      {
        "type": "word_builder",
        "word": "nuts",
        "audioText": "nuts"
      },
      {
        "type": "word_builder",
        "word": "friends",
        "audioText": "friends"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "are",
          "helping",
          "Squirrel",
          "find",
          "the",
          "nuts"
        ],
        "audioText": "They are helping Squirrel find the nuts."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Squirrel ___ carrying a big bag of nuts.",
        "choices": [
          "is",
          "are",
          "am"
        ],
        "answer": "is",
        "audioText": "Squirrel is carrying a big bag of nuts."
      }
    ]
  },
  {
    "id": "xsc-r2-s13",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 13,
    "title": "Frog's Happy Song",
    "titleCn": "小青蛙的歌",
    "coverEmoji": "🐸",
    "paragraphs": [
      {
        "text": "It is a warm Sunday morning. All the animals are busy. They are cleaning the big tree square. A music show is coming soon.",
        "translation": "这是一个温暖的星期天早晨。动物们都很忙。他们正在打扫大树广场。一场音乐会很快就要开始了。"
      },
      {
        "text": "Little Frog is sitting on a green leaf. He is holding a small red drum. He wants to sing a song. His hands are cold and shaking.",
        "translation": "小青蛙坐在一片绿叶上。他手里拿着一个小红鼓。他想唱一首歌。他的双手又冷又抖。"
      },
      {
        "text": "Rabbit is climbing up the big tree. \"You can sing well, Frog,\" says Rabbit. \"I like your sweet, happy voice. We are all your friends.\"",
        "translation": "兔子正爬上那棵大树。“青蛙，你能唱得很好，”兔子说。“我喜欢你那甜甜的、快乐的声音。我们都是你的朋友。”"
      },
      {
        "text": "Duck is bringing a little bell. Bear is putting chairs in long rows. They are working and singing together. Everyone is happy to help.",
        "translation": "鸭子带来了一只小铃铛。熊把椅子排成长长的一排排。他们一边干活一边唱歌。大家都很乐意帮忙。"
      },
      {
        "text": "Now Frog is standing on the stage. His friends are smiling at him. He is singing a happy song. All the animals are clapping.",
        "translation": "现在青蛙站在了舞台上。他的朋友们都冲着他微笑。他正在唱一首快乐的歌。所有的动物都在鼓掌。"
      },
      {
        "text": "Frog is not afraid now. He likes singing with his friends. \"Thank you, my good friends!\" he says. \"We can sing together next time!\"",
        "translation": "青蛙现在不害怕了。他喜欢和朋友们一起唱歌。“谢谢你们，我的好朋友们！”他说。“下次我们可以一起唱！”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Frog holding?",
        "audioText": "What is Frog holding?",
        "options": [
          {
            "emoji": "🥁",
            "value": "drum",
            "text": "A drum"
          },
          {
            "emoji": "🔔",
            "value": "bell",
            "text": "A bell"
          },
          {
            "emoji": "🪑",
            "value": "chair",
            "text": "A chair"
          }
        ],
        "answer": "drum"
      },
      {
        "type": "image_choice",
        "question": "What are the animals doing in the morning?",
        "audioText": "What are the animals doing in the morning?",
        "options": [
          {
            "emoji": "🧹",
            "value": "cleaning",
            "text": "Cleaning"
          },
          {
            "emoji": "🍳",
            "value": "cooking",
            "text": "Cooking"
          },
          {
            "emoji": "😴",
            "value": "sleeping",
            "text": "Sleeping"
          }
        ],
        "answer": "cleaning"
      },
      {
        "type": "word_builder",
        "word": "singing",
        "audioText": "singing"
      },
      {
        "type": "word_builder",
        "word": "rabbit",
        "audioText": "rabbit"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "is",
          "holding",
          "a",
          "small",
          "red",
          "drum."
        ],
        "audioText": "He is holding a small red drum."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Rabbit is ___ up the big tree.",
        "choices": [
          "climbing",
          "clapping",
          "cleaning"
        ],
        "answer": "climbing",
        "audioText": "Rabbit is climbing up the big tree."
      }
    ]
  },
  {
    "id": "xsc-r2-s14",
    "track": "xiaoshengchu",
    "regionId": "xsc-r2",
    "order": 14,
    "title": "The Village Music Show",
    "titleCn": "村里的音乐会",
    "coverEmoji": "🎵",
    "paragraphs": [
      {
        "text": "Today is a big day here. The animals are having a music show. Everyone in the village is excited.",
        "translation": "今天是动物村的大日子。动物们正在举办一场音乐会。村里每个动物都很兴奋。"
      },
      {
        "text": "Rabbit is playing the drum. Duck is singing a happy song. Bear and Fox are dancing together. They like playing music together.",
        "translation": "兔子在敲鼓。鸭子唱着欢快的歌。熊和狐狸在一起跳舞。它们喜欢一起玩音乐。"
      },
      {
        "text": "Little Mouse wants to join the show. But she is very shy. Duck says, \"You can sing with us!\" Mouse is happy and says yes.",
        "translation": "小老鼠也想参加演出。可是她很害羞。鸭子说：“你可以和我们一起唱！”老鼠很开心，答应了。"
      },
      {
        "text": "Now Mouse is singing a quiet song. All the animals are listening. Her song is like a little river. Nobody moves or speaks.",
        "translation": "现在老鼠正在唱一首轻柔的歌。所有动物都在听。她的歌就像一条小溪。没有人动，也没有人出声。"
      },
      {
        "text": "The music show is over now. The sun is going down. But everyone is still smiling. It is a wonderful day for all.",
        "translation": "音乐会结束了。太阳正在落山。但大家都还在微笑。对每个人来说，这都是美好的一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is Rabbit doing?",
        "audioText": "What is Rabbit doing?",
        "options": [
          {
            "emoji": "🥁",
            "value": "drum",
            "text": "Playing the drum"
          },
          {
            "emoji": "🎤",
            "value": "sing",
            "text": "Singing a song"
          },
          {
            "emoji": "💃",
            "value": "dance",
            "text": "Dancing with Fox"
          }
        ],
        "answer": "drum"
      },
      {
        "type": "image_choice",
        "question": "What is Mouse doing in the show?",
        "audioText": "What is Mouse doing in the show?",
        "options": [
          {
            "emoji": "🎵",
            "value": "sing",
            "text": "Singing a quiet song"
          },
          {
            "emoji": "🥁",
            "value": "drum",
            "text": "Playing the drum"
          },
          {
            "emoji": "🍰",
            "value": "eat",
            "text": "Eating a big cake"
          }
        ],
        "answer": "sing"
      },
      {
        "type": "word_builder",
        "word": "singing",
        "audioText": "singing"
      },
      {
        "type": "word_builder",
        "word": "dancing",
        "audioText": "dancing"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "animals",
          "are",
          "having",
          "a",
          "music",
          "show"
        ],
        "audioText": "The animals are having a music show."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Duck ___ singing a happy song.",
        "choices": [
          "is",
          "are",
          "am"
        ],
        "answer": "is",
        "audioText": "Duck is singing a happy song."
      }
    ]
  },
  {
    "id": "xsc-r3-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 1,
    "title": "My First Day in Candy Town",
    "titleCn": "我在糖果镇的第一天",
    "coverEmoji": "🍭",
    "paragraphs": [
      {
        "text": "Last Saturday, I went to Candy Town. It was a small and sweet town. Every house was pink, yellow or white.",
        "translation": "上周六，我去了糖果镇。那是一个又小又甜的小镇。那里的房子都是粉色、黄色或者白色的。"
      },
      {
        "text": "In the morning, we walked down Candy Street. We saw a big candy tree there. It had many red and blue sweets.",
        "translation": "早上，我们沿着糖果街散步。在那里我们看到了一棵大大的糖果树。树上挂满了红色和蓝色的糖果。"
      },
      {
        "text": "At noon, we ate lunch in a shop. I ate a sweet sandwich and a cake. My brother had two big cups of tea.",
        "translation": "中午，我们在一家小店里吃午饭。我吃了一个甜甜的三明治和一块蛋糕。我弟弟喝了两大杯茶。"
      },
      {
        "text": "In the afternoon, we played games in the park. I got a red candy star. My sister got a yellow one. We were very happy.",
        "translation": "下午，我们在公园里玩游戏。我得到了一颗红色的糖果星星。我妹妹得到了一颗黄色的。我们非常开心。"
      },
      {
        "text": "In the evening, there was a candy festival. People danced and sang on the street. We watched a big sweet parade.",
        "translation": "傍晚，镇上办了一场糖果节。人们在街上又唱又跳。我们观看了一场盛大的糖果游行。"
      },
      {
        "text": "I loved Candy Town very much. I want to visit it again next year.",
        "translation": "我非常喜欢糖果镇。明年我还想再去一次。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What colour were the houses in Candy Town?",
        "audioText": "What colour were the houses in Candy Town?",
        "options": [
          {
            "emoji": "🎀",
            "value": "pink",
            "text": "Pink"
          },
          {
            "emoji": "🍀",
            "value": "green",
            "text": "Green"
          },
          {
            "emoji": "⬛",
            "value": "black",
            "text": "Black"
          }
        ],
        "answer": "pink"
      },
      {
        "type": "image_choice",
        "question": "Where did we play games in the afternoon?",
        "audioText": "Where did we play games in the afternoon?",
        "options": [
          {
            "emoji": "🏞️",
            "value": "park",
            "text": "Park"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "School"
          },
          {
            "emoji": "🏪",
            "value": "shop",
            "text": "Shop"
          }
        ],
        "answer": "park"
      },
      {
        "type": "word_builder",
        "word": "festival",
        "audioText": "festival"
      },
      {
        "type": "word_builder",
        "word": "walked",
        "audioText": "walked"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "saw",
          "a",
          "big",
          "candy",
          "tree",
          "there."
        ],
        "audioText": "We saw a big candy tree there."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In the evening, there ___ a candy festival.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "In the evening, there was a candy festival."
      }
    ]
  },
  {
    "id": "xsc-r3-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 2,
    "title": "The New Candy Shop",
    "titleCn": "糖果镇的新糖果店",
    "coverEmoji": "🍬",
    "paragraphs": [
      {
        "text": "A new shop opened last week. It was on Sugar Street. The shop was small and pink.",
        "translation": "上周，糖果镇新开了一家店。它开在糖果街上。这家小店是粉色的。"
      },
      {
        "text": "On Saturday, Lily and her mum walked there. They saw many jars on the wall. The jars were full of sweet candy.",
        "translation": "星期六，莉莉和妈妈走到了那里。她们看到墙上挂着许多罐子。罐子里装满了甜甜的糖果。"
      },
      {
        "text": "A tall man was behind the desk. His name was Mr. Sweet. He smiled and said hello to Lily.",
        "translation": "一位高个子男士站在柜台后面。他叫斯威特先生。他微笑着跟莉莉打招呼。"
      },
      {
        "text": "Lily looked at all the candy. She wanted a big red lollipop. She had a red lollipop. She ate it on the way home.",
        "translation": "莉莉把所有的糖果都看了一遍。她想要一支大大的红色棒棒糖。她买了一支红色的棒棒糖，回家的路上把它吃掉了。"
      },
      {
        "text": "Her mum had some lemon candy too. The lemon candy was sour but nice. They thanked Mr. Sweet and went home.",
        "translation": "她妈妈也买了一些柠檬糖。柠檬糖酸酸的，但很好吃。她们谢过斯威特先生就回家了。"
      },
      {
        "text": "The new shop was busy all day. Lily wanted to come back soon.",
        "translation": "这家新店一整天都很热闹。莉莉想早点再来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily have at the candy shop?",
        "audioText": "What did Lily have at the candy shop?",
        "options": [
          {
            "emoji": "🍭",
            "value": "lollipop",
            "text": "A red lollipop"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "A big cake"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Some bread"
          }
        ],
        "answer": "lollipop"
      },
      {
        "type": "image_choice",
        "question": "What was the new place in Candy Town?",
        "audioText": "What was the new place in Candy Town?",
        "options": [
          {
            "emoji": "🍬",
            "value": "shop",
            "text": "A candy shop"
          },
          {
            "emoji": "📚",
            "value": "library",
            "text": "A library"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "A school"
          }
        ],
        "answer": "shop"
      },
      {
        "type": "word_builder",
        "word": "lollipop",
        "audioText": "lollipop"
      },
      {
        "type": "word_builder",
        "word": "smiled",
        "audioText": "smiled"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "saw",
          "many",
          "jars",
          "on",
          "the",
          "wall."
        ],
        "audioText": "They saw many jars on the wall."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "His name ___ Mr. Sweet.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "His name was Mr. Sweet."
      }
    ]
  },
  {
    "id": "xsc-r3-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 3,
    "title": "The Candy Fair",
    "titleCn": "糖果集市",
    "coverEmoji": "🍭",
    "paragraphs": [
      {
        "text": "Last Saturday was a big day. The Candy Fair came to our town. All the streets were full of sweet smells.",
        "translation": "上周六是个大日子。糖果集市来到了我们镇上。所有街道都飘着甜甜的香味。"
      },
      {
        "text": "Lily and I went to the fair. We saw a big tent near the river. Many families were there with their kids.",
        "translation": "莉莉和我去了集市。我们在河边看见一个大帐篷。许多家庭带着孩子在那里。"
      },
      {
        "text": "Lily ate a pink candy apple. I had a small chocolate cake. The cake was soft and very sweet.",
        "translation": "莉莉吃了一个粉色的糖苹果。我吃了一小块巧克力蛋糕。蛋糕又软又甜。"
      },
      {
        "text": "Then we watched a funny parade. People walked and played happy music. A girl in a red dress danced.",
        "translation": "然后我们看了一场有趣的游行。人们边走边演奏欢快的音乐。一个穿红裙子的女孩跳起了舞。"
      },
      {
        "text": "After lunch we played a candy game. It was easy and lots of fun. We laughed a lot with our friends.",
        "translation": "午饭后我们玩了一个糖果游戏。游戏很简单，也非常好玩。我们和朋友们笑了好久。"
      },
      {
        "text": "At six o'clock we walked home. We were tired but very happy. I want to go again next year.",
        "translation": "六点钟我们走回了家。我们很累，但特别开心。明年我还想再去一次。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily eat at the fair?",
        "audioText": "What did Lily eat at the fair?",
        "options": [
          {
            "emoji": "🍎",
            "value": "candy apple",
            "text": "Candy apple"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          },
          {
            "emoji": "🍫",
            "value": "chocolate",
            "text": "Chocolate"
          }
        ],
        "answer": "candy apple"
      },
      {
        "type": "image_choice",
        "question": "What did Lily and I see near the river?",
        "audioText": "What did Lily and I see near the river?",
        "options": [
          {
            "emoji": "⛺",
            "value": "tent",
            "text": "A tent"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "A school"
          },
          {
            "emoji": "🌉",
            "value": "bridge",
            "text": "A bridge"
          }
        ],
        "answer": "tent"
      },
      {
        "type": "word_builder",
        "word": "parade",
        "audioText": "parade"
      },
      {
        "type": "word_builder",
        "word": "candy",
        "audioText": "candy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lily",
          "ate",
          "a",
          "pink",
          "candy",
          "apple."
        ],
        "audioText": "Lily ate a pink candy apple."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The cake ___ soft and very sweet.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "The cake was soft and very sweet."
      }
    ]
  },
  {
    "id": "xsc-r3-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 4,
    "title": "The Candy Town Sweet Festival",
    "titleCn": "糖果镇的甜蜜节",
    "coverEmoji": "🍭",
    "paragraphs": [
      {
        "text": "Last Saturday was a special day. It was the Sweet Festival in Candy Town. All the people were very happy. My family went to the town square.",
        "translation": "上周六是个特别的日子。那天是糖果镇的甜蜜节。所有人都非常开心。我们一家人去了镇上的广场。"
      },
      {
        "text": "The square was full of small shops. We saw three big candy houses. They looked like real houses. I ate a pink candy cloud.",
        "translation": "广场上到处都是小店铺。我们看见了三座大大的糖果屋。它们看起来就像真的房子。我吃了一朵粉色的糖果云。"
      },
      {
        "text": "Mom bought some chocolate cookies for us. Dad had a cup of sweet tea. My little brother played a fun game. He won a small candy star.",
        "translation": "妈妈给我们买了一些巧克力饼干。爸爸喝了一杯甜甜的茶。我的小弟弟玩了一个有趣的游戏。他赢了一颗小小的糖果星星。"
      },
      {
        "text": "At noon, we watched a candy parade. Candy cars moved slowly down the street. People sang and danced together. Everyone laughed a lot.",
        "translation": "中午，我们看了一场糖果游行。糖果汽车沿着街道慢慢开过。人们一起唱歌跳舞。每个人都笑个不停。"
      },
      {
        "text": "In the afternoon, we played outside again. We looked for candy in big boxes. I found three red sweets. My brother found only one.",
        "translation": "下午，我们又在外面玩。我们在大箱子里找糖果。我找到了三颗红色的糖。我弟弟只找到了一颗。"
      },
      {
        "text": "In the evening, we walked home together. The day was fun and sweet. I was tired but happy. I want to go again next year.",
        "translation": "傍晚，我们一起走路回家。这一天又好玩又甜蜜。我很累但很开心。明年我还想再去一次。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the boy eat at the festival?",
        "audioText": "What did the boy eat at the festival?",
        "options": [
          {
            "emoji": "🍬",
            "value": "candy",
            "text": "Candy"
          },
          {
            "emoji": "🍪",
            "value": "cookie",
            "text": "Cookie"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          }
        ],
        "answer": "candy"
      },
      {
        "type": "image_choice",
        "question": "What did Dad have at the festival?",
        "audioText": "What did Dad have at the festival?",
        "options": [
          {
            "emoji": "🍵",
            "value": "tea",
            "text": "Tea"
          },
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          },
          {
            "emoji": "🧃",
            "value": "juice",
            "text": "Juice"
          }
        ],
        "answer": "tea"
      },
      {
        "type": "word_builder",
        "word": "festival",
        "audioText": "festival"
      },
      {
        "type": "word_builder",
        "word": "parade",
        "audioText": "parade"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "looked",
          "for",
          "candy",
          "in",
          "big",
          "boxes."
        ],
        "audioText": "We looked for candy in big boxes."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Last Saturday ___ a special day.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "Last Saturday was a special day."
      }
    ]
  },
  {
    "id": "xsc-r3-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 5,
    "title": "A Picnic in Sugar Park",
    "titleCn": "糖糖公园的野餐",
    "coverEmoji": "🧺",
    "paragraphs": [
      {
        "text": "Last Saturday was a warm, sunny day. My family went to Sugar Park. We carried a big basket of food.",
        "translation": "上周六是个温暖晴朗的日子。我们一家人去了糖糖公园。我们带了一大篮子食物。"
      },
      {
        "text": "The park was full of happy people. Some children played games on the grass. A small band played sweet music nearby.",
        "translation": "公园里满是快乐的人。一些孩子在草地上玩游戏。一支小乐队在附近演奏着甜甜的音乐。"
      },
      {
        "text": "Mom put a red cloth on the grass. We had sandwiches, apples and candy cakes. I ate two candy cakes very fast. My little brother ate three of them!",
        "translation": "妈妈把一块红布铺在草地上。我们吃了三明治、苹果和糖果蛋糕。我很快就吃掉两块糖果蛋糕。我弟弟吃了三块！"
      },
      {
        "text": "After lunch, we played a fun game. Dad hid a golden candy in the flowers. Everyone looked for it with big smiles. My sister found it behind a small bush.",
        "translation": "午饭后，我们玩了一个有趣的游戏。爸爸把一颗金色糖果藏在花丛里。大家都笑呵呵地去找。我妹妹在一小丛灌木后面找到了它。"
      },
      {
        "text": "We watched a kite show near the lake. Ten colorful kites flew high in the sky. One kite looked like a big pink cat.",
        "translation": "我们在湖边看了一场风筝表演。十只彩色的风筝高高地飞在天上。有一只风筝看起来像一只粉色的大猫。"
      },
      {
        "text": "In the evening, we walked home slowly. I was tired but very happy. I want to go there again next year.",
        "translation": "傍晚，我们慢慢地走回家。我很累，但非常开心。明年我还想再去那里。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did the family go on Saturday?",
        "audioText": "Where did the family go on Saturday?",
        "options": [
          {
            "emoji": "🌳",
            "value": "park",
            "text": "A park"
          },
          {
            "emoji": "🏪",
            "value": "shop",
            "text": "A shop"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "A school"
          }
        ],
        "answer": "park"
      },
      {
        "type": "image_choice",
        "question": "What did the sister find behind the small bush?",
        "audioText": "What did the sister find behind the small bush?",
        "options": [
          {
            "emoji": "🍬",
            "value": "candy",
            "text": "Candy"
          },
          {
            "emoji": "🪁",
            "value": "kite",
            "text": "A kite"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          }
        ],
        "answer": "candy"
      },
      {
        "type": "word_builder",
        "word": "flowers",
        "audioText": "flowers"
      },
      {
        "type": "word_builder",
        "word": "basket",
        "audioText": "basket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "sister",
          "found",
          "it",
          "behind",
          "a",
          "small",
          "bush."
        ],
        "audioText": "My sister found it behind a small bush."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "We ___ sandwiches, apples and candy cakes.",
        "choices": [
          "had",
          "has",
          "have"
        ],
        "answer": "had",
        "audioText": "We had sandwiches, apples and candy cakes."
      }
    ]
  },
  {
    "id": "xsc-r3-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 6,
    "title": "The Candy Town Picnic",
    "titleCn": "糖果镇野餐日",
    "coverEmoji": "🧺",
    "paragraphs": [
      {
        "text": "Last Sunday was sunny in Candy Town. All the children were very happy. We had a big picnic on the hill. My family went there at nine.",
        "translation": "上周日糖果镇阳光很好。所有的孩子都非常开心。我们在小山上办了一次盛大的野餐。我们一家人九点钟到了那里。"
      },
      {
        "text": "My mother made sweet candy sandwiches. I took some red apple juice. My little brother carried a big cake. It looked like a candy house.",
        "translation": "妈妈做了甜甜的糖果三明治。我带了一些红苹果汁。我的小弟弟抱了一个大蛋糕。它看起来就像一座糖果屋。"
      },
      {
        "text": "We walked up the green hill together. Two friends played games with us. We ran and jumped in the grass. Everyone laughed a lot.",
        "translation": "我们一起走上绿色的小山。两个朋友和我们一起玩游戏。我们在草地上又跑又跳。每个人都笑个不停。"
      },
      {
        "text": "At noon we ate lunch on the grass. The sandwiches were sweet and very nice. I drank my apple juice slowly. My brother ate three pieces of cake.",
        "translation": "中午我们在草地上吃午饭。三明治又甜又好吃。我慢慢地喝着苹果汁。弟弟吃了三块蛋糕。"
      },
      {
        "text": "After lunch, we played a candy game. We looked for candy under the trees. I saw a yellow candy near a rock. My friend found two pink candies.",
        "translation": "午饭后，我们玩了一个糖果游戏。我们在树下找糖果。我在一块石头旁边看到了一颗黄色的糖果。我的朋友找到了两颗粉色的糖果。"
      },
      {
        "text": "The sun went down in the afternoon. We cleaned the hill and went home. I was tired but very happy. It was a wonderful picnic day.",
        "translation": "下午太阳落下去了。我们把小山打扫干净，然后就回家了。我很累，但是非常开心。那真是美妙的野餐日。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did my little brother carry to the picnic?",
        "audioText": "What did my little brother carry to the picnic?",
        "options": [
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🍦",
            "value": "ice cream",
            "text": "Ice cream"
          }
        ],
        "answer": "cake"
      },
      {
        "type": "word_builder",
        "word": "picnic",
        "audioText": "picnic"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sandwiches ___ sweet and very nice.",
        "choices": [
          "was",
          "were",
          "are"
        ],
        "answer": "were",
        "audioText": "The sandwiches were sweet and very nice."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "ran",
          "and",
          "jumped",
          "in",
          "the",
          "grass."
        ],
        "audioText": "We ran and jumped in the grass."
      },
      {
        "type": "image_choice",
        "question": "What color was the candy near the rock?",
        "audioText": "What color was the candy near the rock?",
        "options": [
          {
            "emoji": "🟡",
            "value": "yellow",
            "text": "Yellow"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red"
          },
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          }
        ],
        "answer": "yellow"
      },
      {
        "type": "word_builder",
        "word": "yellow",
        "audioText": "yellow"
      }
    ]
  },
  {
    "id": "xsc-r3-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 7,
    "title": "A Rainy Day in Candy Town",
    "titleCn": "糖果镇的雨天",
    "coverEmoji": "🌧️",
    "paragraphs": [
      {
        "text": "Last Saturday was a rainy day in Candy Town. The sky was grey and the streets were wet. Mia and Ben were at home. They were sad at first.",
        "translation": "上周六，糖果镇下了一整天的雨。天空灰蒙蒙的，街道湿漉漉的。米娅和本待在家里。一开始他们有点难过。"
      },
      {
        "text": "\"We can't play outside,\" said Mia. \"Let's bake something sweet,\" said Ben. They washed their hands and found some flour. Mum helped them in the big kitchen.",
        "translation": "“我们不能去外面玩了，”米娅说。“我们烤点甜的东西吧，”本说。他们洗了手，找来了面粉。妈妈在大厨房里帮他们。"
      },
      {
        "text": "They mixed eggs, milk and sugar. Ben dropped an egg on the floor. Mia laughed and cleaned it up. Then they made twelve star cookies.",
        "translation": "他们把鸡蛋、牛奶和糖搅拌在一起。本把一颗鸡蛋掉在了地板上。米娅笑着把它清理干净。然后他们做了十二块星星饼干。"
      },
      {
        "text": "The oven was hot and the kitchen smelled sweet. They waited and watched the little window. Soon the cookies were warm and gold. Everyone ate two cookies with tea.",
        "translation": "烤箱热热的，厨房里飘着甜甜的香味。他们等着，看着那扇小窗户。很快，饼干变得暖乎乎、金灿灿的。大家一边喝茶，一边吃了两块饼干。"
      },
      {
        "text": "After that, they played games in the living room. Dad had an old box of cards. They played cards and told funny stories. The rain stopped at five o'clock.",
        "translation": "之后，他们在客厅里玩游戏。爸爸有一盒旧卡片。他们玩了卡片，还讲了有趣的故事。五点的时候，雨停了。"
      },
      {
        "text": "Mia looked out of the window. \"The rain was fun too,\" she said. Ben smiled and nodded his head. Next Saturday they wanted the sun again.",
        "translation": "米娅向窗外望去。“下雨天也很好玩呀，”她说。本笑着点了点头。下一个星期六，他们希望太阳出来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Mia and Ben make in the kitchen?",
        "audioText": "What did Mia and Ben make in the kitchen?",
        "options": [
          {
            "emoji": "🍪",
            "value": "cookies",
            "text": "Cookies"
          },
          {
            "emoji": "🎂",
            "value": "cake",
            "text": "Cake"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          }
        ],
        "answer": "cookies"
      },
      {
        "type": "image_choice",
        "question": "How was the weather last Saturday?",
        "audioText": "How was the weather last Saturday?",
        "options": [
          {
            "emoji": "🌧️",
            "value": "rain",
            "text": "Rain"
          },
          {
            "emoji": "☀️",
            "value": "sun",
            "text": "Sun"
          },
          {
            "emoji": "❄️",
            "value": "snow",
            "text": "Snow"
          }
        ],
        "answer": "rain"
      },
      {
        "type": "word_builder",
        "word": "cookies",
        "audioText": "cookies"
      },
      {
        "type": "word_builder",
        "word": "kitchen",
        "audioText": "kitchen"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "played",
          "cards",
          "and",
          "told",
          "funny",
          "stories."
        ],
        "audioText": "They played cards and told funny stories."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sky ___ grey and the streets were wet.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "The sky was grey and the streets were wet."
      }
    ]
  },
  {
    "id": "xsc-r3-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 8,
    "title": "The Candy Town Kite Day",
    "titleCn": "糖果镇风筝日",
    "coverEmoji": "🪁",
    "paragraphs": [
      {
        "text": "Last Saturday was Kite Day in Candy Town. The sky was blue and the wind was soft. All the children were happy.",
        "translation": "上周六是糖果镇的风筝日。天空湛蓝，微风轻柔。孩子们都很开心。"
      },
      {
        "text": "Lily and Ben went to Sugar Hill. They carried two big kites and a bag. The bag had cakes and lemon candy.",
        "translation": "莉莉和本去了糖山。他们带着两只大风筝和一个袋子。袋子里装着蛋糕和柠檬糖。"
      },
      {
        "text": "Many friends were on the green hill. They saw many kites in the sky. Tom's kite looked like a pink cat.",
        "translation": "绿色的山坡上有很多朋友。他们看见天上飞着许多风筝。汤姆的风筝看起来像一只粉色的猫。"
      },
      {
        "text": "The wind helped the kites fly high. Lily's kite danced above the tall trees. Ben ran and jumped on the grass.",
        "translation": "风帮着风筝飞得高高的。莉莉的风筝在高高的树梢上跳舞。本在草地上又跑又跳。"
      },
      {
        "text": "At noon, they sat down and ate lunch. The cakes were sweet and soft. The lemon candy was very sour.",
        "translation": "中午，他们坐下来吃午饭。蛋糕又甜又软。柠檬糖非常酸。"
      },
      {
        "text": "In the afternoon, the wind stopped. The children walked home with big smiles. It was a wonderful Kite Day.",
        "translation": "到了下午，风停了。孩子们带着大大的笑容走回家。这真是美妙的风筝日。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Tom's kite look like?",
        "audioText": "What did Tom's kite look like?",
        "options": [
          {
            "emoji": "🐱",
            "value": "cat",
            "text": "A pink cat"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A blue fish"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A small bird"
          }
        ],
        "answer": "cat"
      },
      {
        "type": "image_choice",
        "question": "Where did Lily and Ben go on Kite Day?",
        "audioText": "Where did Lily and Ben go on Kite Day?",
        "options": [
          {
            "emoji": "⛰️",
            "value": "hill",
            "text": "Sugar Hill"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "School"
          },
          {
            "emoji": "🏖️",
            "value": "beach",
            "text": "The beach"
          }
        ],
        "answer": "hill"
      },
      {
        "type": "word_builder",
        "word": "kite",
        "audioText": "kite"
      },
      {
        "type": "word_builder",
        "word": "laughed",
        "audioText": "laughed"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Ben",
          "ran",
          "and",
          "jumped",
          "on",
          "the",
          "grass."
        ],
        "audioText": "Ben ran and jumped on the grass."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The wind ___ the kites fly high.",
        "choices": [
          "helped",
          "help",
          "helping"
        ],
        "answer": "helped",
        "audioText": "The wind helped the kites fly high."
      }
    ]
  },
  {
    "id": "xsc-r3-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 9,
    "title": "The Candy Town Treasure Hunt",
    "titleCn": "糖果镇的寻宝游戏",
    "coverEmoji": "🗺️",
    "paragraphs": [
      {
        "text": "Last Saturday was a sunny day. My friends and I met at Sugar Park. We had a map in my hand. The map showed a big candy box.",
        "translation": "上周六是个晴天。我和朋友们在糖果公园碰面。我手里拿着一张地图。地图上画着一个大大的糖果盒。"
      },
      {
        "text": "We looked at the map together. The map said, \"Go to the pink bridge.\" We walked along the sweet river. We saw three white ducks there. A small note was under a tree.",
        "translation": "我们一起看地图。地图上写着：“去粉色小桥。”我们沿着甜甜的小河往前走。我们在那里看见了三只白鸭子。一棵树下有一张小纸条。"
      },
      {
        "text": "The note said we were close. We ran to the Candy Shop. Mrs. Sweet smiled at us warmly. She showed me a little key. Then she pointed at a box.",
        "translation": "纸条上写着我们快到了。我们跑向糖果店。斯威特太太热情地冲我们微笑。她给我看了一把小钥匙。然后她指了指一个盒子。"
      },
      {
        "text": "The key opened the big candy box. Inside, we saw ten candy stars. We each ate two candy stars. They were sweet and a little sour. We laughed and jumped all around.",
        "translation": "钥匙打开了那个大糖果盒。里面，我们看见了十颗糖果星星。我们每人吃了两颗糖果星星。它们甜甜的，还有一点点酸。我们又笑又跳。"
      },
      {
        "text": "After that, we had sweet lemon tea. Mrs. Sweet shared a funny story. We listened and ate more candy. The sun went down very slowly. Then we cleaned the little shop.",
        "translation": "之后，我们喝了甜甜的柠檬茶。斯威特太太讲了一个好玩的故事。我们一边听一边吃了更多糖果。太阳慢慢落下去了。然后我们把小店打扫干净。"
      },
      {
        "text": "At six o'clock, we went home. We were tired but very happy. Our parents smiled and listened to us. It was a great day in Candy Town. I want to play that game again.",
        "translation": "六点钟，我们回家了。我们很累，但非常开心。爸爸妈妈笑着听我们讲。那是糖果镇里很棒的一天。我还想再玩一次那个游戏。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the children see near the river?",
        "audioText": "What did the children see near the river?",
        "options": [
          {
            "emoji": "🦆",
            "value": "ducks",
            "text": "Ducks"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🐱",
            "value": "cats",
            "text": "Cats"
          }
        ],
        "answer": "ducks"
      },
      {
        "type": "image_choice",
        "question": "What did the children drink in the Candy Shop?",
        "audioText": "What did the children drink in the Candy Shop?",
        "options": [
          {
            "emoji": "🍵",
            "value": "tea",
            "text": "Lemon tea"
          },
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          },
          {
            "emoji": "🧃",
            "value": "juice",
            "text": "Juice"
          }
        ],
        "answer": "tea"
      },
      {
        "type": "word_builder",
        "word": "opened",
        "audioText": "opened"
      },
      {
        "type": "word_builder",
        "word": "listened",
        "audioText": "listened"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "saw",
          "three",
          "white",
          "ducks",
          "there",
          "."
        ],
        "audioText": "We saw three white ducks there."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sun ___ down very slowly.",
        "choices": [
          "went",
          "goes",
          "going"
        ],
        "answer": "went",
        "audioText": "The sun went down very slowly."
      }
    ]
  },
  {
    "id": "xsc-r3-s10",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 10,
    "title": "The Candy Town Ice Cream Day",
    "titleCn": "糖果镇的冰淇淋日",
    "coverEmoji": "🍦",
    "paragraphs": [
      {
        "text": "Last Sunday was a big day in Candy Town. All the shops made ice cream for everyone. The weather was warm and sunny. The whole town smelled very sweet.",
        "translation": "上周日是糖果镇的大日子。所有店铺都为大家做了冰淇淋。天气温暖又晴朗。整个镇子都飘着甜甜的香味。"
      },
      {
        "text": "My friends and I went to Sugar Street. We saw a long line at the ice cream shop. We waited and talked about our favorite flavors.",
        "translation": "我和朋友们去了糖街。我们看到冰淇淋店门口排着长长的队。我们一边等，一边聊着各自最喜欢的口味。"
      },
      {
        "text": "Anna had a pink ice cream with candy on top. Ben ate a green one with lemon. I chose a big cup with chocolate and nuts. It was cold, sweet, and delicious.",
        "translation": "安娜吃了一个上面放糖果的粉色冰淇淋。本吃了一个柠檬味的绿色冰淇淋。我选了一大杯巧克力和坚果的。它又凉又甜，特别好吃。"
      },
      {
        "text": "Then we played a fun game in the park. We had to find small ice cream toys. Anna found three, and Ben found four. I only found one, but I was happy.",
        "translation": "接着我们在公园里玩了一个好玩的游戏。我们要找到小小的冰淇淋玩具。安娜找到了三个，本找到了四个。我只找到一个，不过我很开心。"
      },
      {
        "text": "In the afternoon, there was a parade. People wore bright hats and sang songs. A big ice cream truck went down the street.",
        "translation": "下午有一场游行。人们戴着鲜艳的帽子唱歌。一辆大大的冰淇淋车沿着街道开了过去。"
      },
      {
        "text": "At night, we sat on a bench. We watched the stars and ate the last ice cream. It was the best day of the summer.",
        "translation": "到了晚上，我们坐在长椅上。我们看着星星，吃掉了最后一点冰淇淋。那是整个夏天最棒的一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Anna have at the ice cream shop?",
        "audioText": "What did Anna have at the ice cream shop?",
        "options": [
          {
            "emoji": "🍦",
            "value": "pink_ice_cream",
            "text": "A pink ice cream"
          },
          {
            "emoji": "🍋",
            "value": "lemon",
            "text": "A lemon"
          },
          {
            "emoji": "🍫",
            "value": "chocolate_bar",
            "text": "A chocolate bar"
          }
        ],
        "answer": "pink_ice_cream"
      },
      {
        "type": "word_builder",
        "word": "chocolate",
        "audioText": "chocolate"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It ___ cold, sweet, and delicious.",
        "choices": [
          "was",
          "were",
          "are"
        ],
        "answer": "was",
        "audioText": "It was cold, sweet, and delicious."
      },
      {
        "type": "image_choice",
        "question": "What did people wear in the parade?",
        "audioText": "What did people wear in the parade?",
        "options": [
          {
            "emoji": "🎩",
            "value": "bright_hats",
            "text": "Bright hats"
          },
          {
            "emoji": "🍬",
            "value": "candy_bags",
            "text": "Candy bags"
          },
          {
            "emoji": "🧢",
            "value": "blue_caps",
            "text": "Blue caps"
          }
        ],
        "answer": "bright_hats"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "weather",
          "was",
          "warm",
          "and",
          "sunny."
        ],
        "audioText": "The weather was warm and sunny."
      },
      {
        "type": "word_builder",
        "word": "parade",
        "audioText": "parade"
      }
    ]
  },
  {
    "id": "xsc-r3-s11",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 11,
    "title": "The Candy Town Music Night",
    "titleCn": "糖果镇音乐之夜",
    "coverEmoji": "🎵",
    "paragraphs": [
      {
        "text": "Last Saturday was a special day in Candy Town. There was a music night in Sugar Park. Everyone was very happy.",
        "translation": "上周六是糖果镇一个特别的日子。糖糖公园里有一场音乐之夜。大家都很开心。"
      },
      {
        "text": "Lily and Tom went to the park with their parents. They saw many bright lights on the trees. The lights were red, yellow and pink.",
        "translation": "莉莉和汤姆跟着爸爸妈妈去了公园。他们看到树上挂着许多明亮的彩灯。那些灯有红的、黄的和粉的。"
      },
      {
        "text": "A band played happy songs on the big stage. Lily danced with her friends. Tom ate a big candy apple.",
        "translation": "一支乐队在大舞台上演奏了欢快的歌曲。莉莉和朋友们一起跳舞。汤姆吃了一个大大的糖苹果。"
      },
      {
        "text": "Then Grandpa Joe sang an old song for everyone. His voice was warm and soft. People clapped and smiled at him.",
        "translation": "接着，乔爷爷为大家唱了一首老歌。他的声音温暖又柔和。人们为他鼓掌，冲他微笑。"
      },
      {
        "text": "At eight o'clock, the music stopped. The sky was dark and quiet. People walked home slowly with big smiles.",
        "translation": "八点钟，音乐停了下来。天空又黑又静。人们带着灿烂的笑容慢慢走回家。"
      },
      {
        "text": "Lily smiled all the way home. \"I loved this music night,\" she said. \"We had a great time.\"",
        "translation": "莉莉一路笑着回家。“我好喜欢这个音乐之夜，”她说。“我们玩得很开心。”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Tom eat at the music night?",
        "audioText": "What did Tom eat at the music night?",
        "options": [
          {
            "emoji": "🍎",
            "value": "candy apple",
            "text": "Candy apple"
          },
          {
            "emoji": "🍕",
            "value": "pizza",
            "text": "Pizza"
          },
          {
            "emoji": "🍜",
            "value": "noodles",
            "text": "Noodles"
          }
        ],
        "answer": "candy apple"
      },
      {
        "type": "word_builder",
        "word": "sang",
        "audioText": "sang"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "His",
          "voice",
          "was",
          "warm",
          "and",
          "soft."
        ],
        "audioText": "His voice was warm and soft."
      },
      {
        "type": "image_choice",
        "question": "What did Lily do at the music night?",
        "audioText": "What did Lily do at the music night?",
        "options": [
          {
            "emoji": "💃",
            "value": "danced",
            "text": "Danced"
          },
          {
            "emoji": "🎤",
            "value": "sang",
            "text": "Sang"
          },
          {
            "emoji": "😴",
            "value": "slept",
            "text": "Slept"
          }
        ],
        "answer": "danced"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "People ___ and smiled at him.",
        "choices": [
          "clapped",
          "clap",
          "claps"
        ],
        "answer": "clapped",
        "audioText": "People clapped and smiled at him."
      },
      {
        "type": "word_builder",
        "word": "danced",
        "audioText": "danced"
      }
    ]
  },
  {
    "id": "xsc-r3-s12",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 12,
    "title": "Game Day in Candy Town",
    "titleCn": "糖果镇的游戏日",
    "coverEmoji": "🏆",
    "paragraphs": [
      {
        "text": "Last Sunday was a great day in town. There was a game day in the park.",
        "translation": "上个星期天，镇上度过了很棒的一天。公园里举办了一场游戏日活动。"
      },
      {
        "text": "In the morning, we went to the park. We saw bright flags and ten small tents.",
        "translation": "早上，我们去了公园。我们看到鲜艳的旗子和十顶小帐篷。"
      },
      {
        "text": "First, we played a game with a rope. Two teams pulled the rope hard.",
        "translation": "首先，我们玩了一个拉绳子的游戏。两队使劲地拉绳子。"
      },
      {
        "text": "At noon, we ate sweet food together. We had candy apples and warm milk tea.",
        "translation": "中午，我们一起吃了甜甜的食物。我们吃了糖苹果，还喝了热奶茶。"
      },
      {
        "text": "In the afternoon, we looked for candy eggs. I found five eggs under a red flag.",
        "translation": "下午，我们去找糖果蛋。我在一面红旗下面找到了五个蛋。"
      },
      {
        "text": "Then our teacher gave us a big cup. We were tired but happy.",
        "translation": "然后老师给了我们一个大奖杯。我们虽然很累，但特别开心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did we see in the park?",
        "audioText": "What did we see in the park?",
        "options": [
          {
            "emoji": "🚩",
            "value": "flags",
            "text": "Flags"
          },
          {
            "emoji": "🚗",
            "value": "cars",
            "text": "Cars"
          },
          {
            "emoji": "🐘",
            "value": "elephants",
            "text": "Elephants"
          }
        ],
        "answer": "flags"
      },
      {
        "type": "image_choice",
        "question": "What did we drink at noon?",
        "audioText": "What did we drink at noon?",
        "options": [
          {
            "emoji": "🧋",
            "value": "milk tea",
            "text": "Milk tea"
          },
          {
            "emoji": "🥤",
            "value": "cola",
            "text": "Cola"
          },
          {
            "emoji": "☕",
            "value": "coffee",
            "text": "Coffee"
          }
        ],
        "answer": "milk tea"
      },
      {
        "type": "word_builder",
        "word": "morning",
        "audioText": "morning"
      },
      {
        "type": "word_builder",
        "word": "tents",
        "audioText": "tents"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Two",
          "teams",
          "pulled",
          "the",
          "rope",
          "hard."
        ],
        "audioText": "Two teams pulled the rope hard."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "We ___ tired but happy.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "were",
        "audioText": "We were tired but happy."
      }
    ]
  },
  {
    "id": "xsc-r3-s13",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 13,
    "title": "The Candy Town Baking Day",
    "titleCn": "糖果镇烘焙日",
    "coverEmoji": "🎂",
    "paragraphs": [
      {
        "text": "Last Saturday was a special day. The people of Candy Town were very happy. They wanted to bake a giant candy cake.",
        "translation": "上周六是个特别的日子。糖果镇的人们都特别开心。他们想烤一个巨大的糖果蛋糕。"
      },
      {
        "text": "Lily and Tom went to Grandma's house early. Grandma had a big red bowl. She put sugar and eggs in it. Tom mixed them with a long spoon. Lily added some sweet candy drops.",
        "translation": "莉莉和汤姆一大早就去了奶奶家。奶奶有一个大大的红碗。她把糖和鸡蛋放了进去。汤姆用一把长勺子把它们拌匀。莉莉又加了一些甜甜的糖果粒。"
      },
      {
        "text": "Then they carried the cake to the square. All their friends were there. Mr. Bell played his small guitar. The children sang and danced happily. Everyone waited for the big cake.",
        "translation": "然后他们把蛋糕搬到了广场上。朋友们都在那儿。贝尔先生弹起了他的小吉他。孩子们开心地又唱又跳。大家都等着那个大蛋糕。"
      },
      {
        "text": "The cake was as big as a table. It had pink cream and candy stars. Grandma cut it into small pieces. Lily ate two pieces very fast. Tom said it was the best cake.",
        "translation": "那蛋糕有一张桌子那么大。上面有粉色的奶油和糖果星星。奶奶把它切成了小块。莉莉很快就吃了两块。汤姆说这是最好吃的蛋糕。"
      },
      {
        "text": "After that, they played games on the grass. They ran and jumped and laughed a lot. The sun went down slowly. Soon the bright stars came out.",
        "translation": "之后，他们在草地上玩游戏。他们跑跑跳跳，笑了好多。太阳慢慢落下去了。很快，明亮的星星出来了。"
      },
      {
        "text": "At night, they sat around a warm fire. Grandma told them a funny story. Everyone clapped their hands and laughed. It was a wonderful day for all.",
        "translation": "晚上，他们围着一堆温暖的篝火坐下。奶奶给他们讲了一个好笑的故事。大家拍着手笑了起来。对所有人来说，这都是美好的一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Grandma put in the big red bowl?",
        "audioText": "What did Grandma put in the big red bowl?",
        "options": [
          {
            "emoji": "🥚",
            "value": "eggs",
            "text": "Eggs"
          },
          {
            "emoji": "🍫",
            "value": "chocolate",
            "text": "Chocolate"
          },
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          }
        ],
        "answer": "eggs"
      },
      {
        "type": "image_choice",
        "question": "What did Mr. Bell play for the children?",
        "audioText": "What did Mr. Bell play for the children?",
        "options": [
          {
            "emoji": "🎸",
            "value": "guitar",
            "text": "A guitar"
          },
          {
            "emoji": "🥁",
            "value": "drum",
            "text": "A drum"
          },
          {
            "emoji": "🎺",
            "value": "trumpet",
            "text": "A trumpet"
          }
        ],
        "answer": "guitar"
      },
      {
        "type": "word_builder",
        "word": "danced",
        "audioText": "danced"
      },
      {
        "type": "word_builder",
        "word": "guitar",
        "audioText": "guitar"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Tom",
          "mixed",
          "them",
          "with",
          "a",
          "long",
          "spoon."
        ],
        "audioText": "Tom mixed them with a long spoon."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The cake ___ as big as a table.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "The cake was as big as a table."
      }
    ]
  },
  {
    "id": "xsc-r3-s14",
    "track": "xiaoshengchu",
    "regionId": "xsc-r3",
    "order": 14,
    "title": "The Candy Town Sports Day",
    "titleCn": "糖果镇运动会",
    "coverEmoji": "🏅",
    "paragraphs": [
      {
        "text": "Last Saturday was Sports Day in Candy Town. The sun was bright and warm. All the children were very happy. They went to Sugar Park with their parents.",
        "translation": "上周六是糖果镇的运动会。阳光又亮又暖。孩子们都特别开心。他们和爸爸妈妈一起去了糖果公园。"
      },
      {
        "text": "There were many games on the green grass. Tom was fast in the running game. Lily jumped over ten big candy boxes. She was the winner of that game.",
        "translation": "绿草地上有很多游戏。汤姆在跑步比赛里跑得飞快。莉莉跳过了十个大糖果盒。她是那个比赛的冠军。"
      },
      {
        "text": "At noon, everyone had a big lunch. They ate long candy bread and sweet cakes. The lemon juice was cold and sweet. The children loved it very much.",
        "translation": "中午，大家都吃了一顿丰盛的午饭。他们吃了长长的糖果面包和甜甜的蛋糕。柠檬汁又凉又甜。孩子们特别喜欢。"
      },
      {
        "text": "In the afternoon, the parents played a funny game. They walked with a candy on a spoon. Everyone laughed and cheered for them.",
        "translation": "下午，爸爸妈妈们玩了一个好玩的游戏。他们用勺子托着一颗糖果走路。大家一边笑一边给他们加油。"
      },
      {
        "text": "Then a kind man gave each child a gift. It was a box of candy. The children smiled and said thank you. They wanted to come again next year.",
        "translation": "后来，一位好心的叔叔给每个孩子发了礼物。那是一盒糖果。孩子们笑着说了谢谢。他们都想明年再来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What was the weather like on Sports Day?",
        "audioText": "What was the weather like on Sports Day?",
        "options": [
          {
            "emoji": "☀️",
            "value": "sunny",
            "text": "Sunny"
          },
          {
            "emoji": "🌧️",
            "value": "rainy",
            "text": "Rainy"
          },
          {
            "emoji": "❄️",
            "value": "snowy",
            "text": "Snowy"
          }
        ],
        "answer": "sunny"
      },
      {
        "type": "word_builder",
        "word": "winner",
        "audioText": "winner"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "was",
          "the",
          "winner",
          "of",
          "that",
          "game."
        ],
        "audioText": "She was the winner of that game."
      },
      {
        "type": "word_builder",
        "word": "candy",
        "audioText": "candy"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They ___ to Sugar Park with their parents.",
        "choices": [
          "went",
          "go",
          "goes"
        ],
        "answer": "went",
        "audioText": "They went to Sugar Park with their parents."
      },
      {
        "type": "image_choice",
        "question": "What was in the small gift?",
        "audioText": "What was in the small gift?",
        "options": [
          {
            "emoji": "🍬",
            "value": "candy",
            "text": "A box of candy"
          },
          {
            "emoji": "🧦",
            "value": "socks",
            "text": "A pair of socks"
          },
          {
            "emoji": "📚",
            "value": "book",
            "text": "A book"
          }
        ],
        "answer": "candy"
      }
    ]
  },
  {
    "id": "xsc-r4-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 1,
    "title": "A Day at Ocean Park",
    "titleCn": "海洋公园的一天",
    "coverEmoji": "🐬",
    "paragraphs": [
      {
        "text": "Last Saturday, we went to Ocean Park. The sky was blue and bright. I was very happy that morning.",
        "translation": "上周六，我们去了海洋公园。天空又蓝又亮。那天早上我特别开心。"
      },
      {
        "text": "First, we saw two big dolphins. They swam faster than the little fish. Then they jumped high into the air. Everyone cheered and clapped for them.",
        "translation": "一开始，我们看到了两只大个子海豚。它们游得比小鱼还快。接着它们高高地跃出水面。大家都为它们欢呼拍手。"
      },
      {
        "text": "Next, we walked into a long tunnel. The water was darker under the sea. Fish swam over our heads. A big fish was bigger than my bag.",
        "translation": "后来，我们走进了一条长长的海底隧道。海底的水颜色更深。鱼儿从我们头顶游过。有一条大鱼比我的书包还大。"
      },
      {
        "text": "Near the rocks, we saw an old turtle. It ate a plastic bag in the water. The turtle looked slow and tired. Plastic is bad for sea animals.",
        "translation": "在岩石旁边，我们看到一只老海龟。它吃下了水里的一个塑料袋。那只海龟看起来又慢又累。塑料对海洋动物有害。"
      },
      {
        "text": "We picked up some rubbish on the beach. My sister said we must keep it clean. Clean water is more important than toys.",
        "translation": "我们在沙滩上捡了一些垃圾。姐姐说，我们必须让大海保持干净。干净的水比玩具更重要。"
      },
      {
        "text": "Ocean Park was more fun than I thought. We were tired but very happy. I want to see the dolphins again.",
        "translation": "海洋公园比我想象的更有趣。我们很累，但非常开心。我还想再去看那些海豚。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the family see first?",
        "audioText": "What did the family see first?",
        "options": [
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "Dolphins"
          },
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "A turtle"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          }
        ],
        "answer": "dolphin"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "swam",
          "faster",
          "than",
          "the",
          "little",
          "fish."
        ],
        "audioText": "They swam faster than the little fish."
      },
      {
        "type": "image_choice",
        "question": "What did the old turtle eat in the water?",
        "audioText": "What did the old turtle eat in the water?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "plasticbag",
            "text": "A plastic bag"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "🥬",
            "value": "seaweed",
            "text": "Seaweed"
          }
        ],
        "answer": "plasticbag"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A big fish was ___ than my bag.",
        "choices": [
          "big",
          "bigger",
          "biggest"
        ],
        "answer": "bigger",
        "audioText": "A big fish was bigger than my bag."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Clean water is ___ important than toys.",
        "choices": [
          "more",
          "most",
          "much"
        ],
        "answer": "more",
        "audioText": "Clean water is more important than toys."
      }
    ]
  },
  {
    "id": "xsc-r4-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 2,
    "title": "A Day in the Deep Blue",
    "titleCn": "深蓝里的一天",
    "coverEmoji": "🐬",
    "paragraphs": [
      {
        "text": "Last Sunday, my class went to Ocean Park. The bus ride was longer than we thought. But we sang songs all the way. Soon, we saw the big blue gate.",
        "translation": "上周日，我们班去了海洋乐园。车程比我们想的要长。不过我们一路都在唱歌。很快，我们就看到了那扇蓝色的大门。"
      },
      {
        "text": "Our guide was a woman named Ms. Li. She was taller than our teacher. She gave us a small map. \"The sea is a big family,\" she said.",
        "translation": "我们的向导是一位叫李女士的阿姨。她比我们老师还高。她给了我们一张小地图。\"海洋是一个大家庭，\"她说。"
      },
      {
        "text": "First, we visited the dolphin pool. The dolphins were faster than the fish. One dolphin jumped and splashed us. We laughed and clapped our hands.",
        "translation": "我们先去了海豚池。海豚比鱼游得快多了。一只海豚跳起来，把水花溅到我们身上。我们笑着拍起了手。"
      },
      {
        "text": "Then we walked into a glass tunnel. Fish of many colors swam above us. A turtle moved slower than the others. It looked old and very kind.",
        "translation": "然后我们走进了一条玻璃隧道。五颜六色的鱼在我们头顶游来游去。一只海龟比别的动物游得慢。它看上去又老又和善。"
      },
      {
        "text": "After lunch, we saw lots of plastic bags. They floated in the water like jellyfish. Ms. Li said, \"This is bad for fish.\" We picked up every bag we found.",
        "translation": "午饭过后，我们看到了很多塑料袋。它们像水母一样漂在水里。李女士说：\"这对鱼可不好。\"我们把找到的每个袋子都捡了起来。"
      },
      {
        "text": "On the way home, we felt proud. The ocean was cleaner than before. I told Mom I wanted to help. She smiled and said, \"You already did.\"",
        "translation": "回家的路上，我们感到很自豪。海洋比以前干净了。我告诉妈妈我想帮忙。她笑着说：\"你已经做到了。\""
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the class visit first?",
        "audioText": "What did the class visit first?",
        "options": [
          {
            "emoji": "🐬",
            "value": "dolphins",
            "text": "The dolphin pool"
          },
          {
            "emoji": "🐠",
            "value": "tunnel",
            "text": "The glass tunnel"
          },
          {
            "emoji": "🛍️",
            "value": "plastic",
            "text": "The plastic bags"
          }
        ],
        "answer": "dolphins"
      },
      {
        "type": "image_choice",
        "question": "What floated in the water like jellyfish?",
        "audioText": "What floated in the water like jellyfish?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "plastic bags",
            "text": "Plastic bags"
          },
          {
            "emoji": "🐢",
            "value": "turtles",
            "text": "Turtles"
          },
          {
            "emoji": "🐬",
            "value": "dolphins",
            "text": "Dolphins"
          }
        ],
        "answer": "plastic bags"
      },
      {
        "type": "word_builder",
        "word": "dolphin",
        "audioText": "dolphin"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "dolphins",
          "were",
          "faster",
          "than",
          "the",
          "fish."
        ],
        "audioText": "The dolphins were faster than the fish."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The bus ride was ___ than we thought.",
        "choices": [
          "long",
          "longer",
          "longest"
        ],
        "answer": "longer",
        "audioText": "The bus ride was longer than we thought."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "One dolphin ___ and splashed us.",
        "choices": [
          "jump",
          "jumped",
          "jumps"
        ],
        "answer": "jumped",
        "audioText": "One dolphin jumped and splashed us."
      }
    ]
  },
  {
    "id": "xsc-r4-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 3,
    "title": "The Turtle and the Plastic Bag",
    "titleCn": "海龟和塑料袋",
    "coverEmoji": "🐢",
    "paragraphs": [
      {
        "text": "Last Sunday, my family went to Ocean Park. We walked into a long blue tunnel. It was longer than a school bus.",
        "translation": "上个星期天，我们全家去了海洋乐园。我们走进一条长长的蓝色隧道。它比一辆校车还要长。"
      },
      {
        "text": "A dolphin swam over our heads. She was faster than a small boat. My sister laughed and waved her hand.",
        "translation": "一只海豚从我们头顶游过。她比一艘小船还快。妹妹笑着挥了挥手。"
      },
      {
        "text": "Then a big sea turtle came near us. It was slower than the dolphin. A plastic bag was on its leg.",
        "translation": "这时，一只大海龟慢慢靠近我们。它比海豚慢多了。它的腿上挂着一个塑料袋。"
      },
      {
        "text": "A young worker helped the turtle at once. He took the plastic bag away. The turtle looked happier than before.",
        "translation": "一位年轻的工人马上过来帮助海龟。他把塑料袋取了下来。海龟看起来比以前开心多了。"
      },
      {
        "text": "We learned a good lesson that day. We must keep our ocean clean. We can do more than we think.",
        "translation": "那天我们学到了很好的一课。我们必须让大海保持干净。我们能做的，比自己想象的更多。"
      },
      {
        "text": "Now I bring my bag to the beach. I want to help the sea too.",
        "translation": "现在我去海边都会自己带袋子。我也想要帮助大海。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal was faster than a small boat?",
        "audioText": "Which animal was faster than a small boat?",
        "options": [
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "Dolphin"
          },
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "Turtle"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          }
        ],
        "answer": "dolphin"
      },
      {
        "type": "word_builder",
        "word": "dolphin",
        "audioText": "dolphin"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The turtle looked ___ than before.",
        "choices": [
          "happier",
          "happy",
          "happiest"
        ],
        "answer": "happier",
        "audioText": "The turtle looked happier than before."
      },
      {
        "type": "image_choice",
        "question": "What was on the sea turtle's leg?",
        "audioText": "What was on the sea turtle's leg?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "plastic bag",
            "text": "A plastic bag"
          },
          {
            "emoji": "🧢",
            "value": "cap",
            "text": "A cap"
          },
          {
            "emoji": "🥾",
            "value": "boot",
            "text": "A boot"
          }
        ],
        "answer": "plastic bag"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "longer",
          "than",
          "a",
          "school",
          "bus."
        ],
        "audioText": "It was longer than a school bus."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "We must keep our ocean ___.",
        "choices": [
          "clean",
          "cleaner",
          "cleanest"
        ],
        "answer": "clean",
        "audioText": "We must keep our ocean clean."
      }
    ]
  },
  {
    "id": "xsc-r4-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 4,
    "title": "A Cleaner Ocean",
    "titleCn": "更干净的大海",
    "coverEmoji": "🐢",
    "paragraphs": [
      {
        "text": "Last Sunday, Lily and Tom went to Ocean Park. They walked to the big blue tank. A green sea turtle swam near them.",
        "translation": "上周日，莉莉和汤姆去了海洋公园。他们走到那个蓝色的大水槽前。一只绿海龟游到他们身边。"
      },
      {
        "text": "The turtle was slower than the fish. But it was much bigger and older. It looked at Lily with kind eyes.",
        "translation": "这只海龟比鱼游得慢。但它大得多，也老得多。它用温和的眼神看着莉莉。"
      },
      {
        "text": "Then they saw something sad. A plastic bag floated near the turtle. The turtle thought it was food. Lily felt worried and a little angry.",
        "translation": "接着他们看到了一件让人难过的事。一个塑料袋漂到海龟旁边。海龟以为那是吃的。莉莉又担心又有点生气。"
      },
      {
        "text": "A kind worker came to help. She took the bag out quickly. The water looked cleaner than before. The turtle swam away, happy and free.",
        "translation": "一位好心的工作人员过来帮忙。她很快把袋子捞了出去。海水看起来比以前干净了。海龟游走了，又快活又自在。"
      },
      {
        "text": "Lily and Tom learned a big lesson. We must keep the sea clean. Small hands can make a big difference.",
        "translation": "莉莉和汤姆学到了重要的一课。我们一定要让大海保持干净。小小的双手也能带来大大的改变。"
      },
      {
        "text": "Now they carry cloth bags to the beach. They pick up rubbish every weekend. The ocean is happier than last year.",
        "translation": "现在他们去海边会带上布袋。每个周末他们都去捡垃圾。大海比去年更快乐了。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal swam near Lily and Tom?",
        "audioText": "Which animal swam near Lily and Tom?",
        "options": [
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "A sea turtle"
          },
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "A dolphin"
          },
          {
            "emoji": "🦈",
            "value": "shark",
            "text": "A shark"
          }
        ],
        "answer": "turtle"
      },
      {
        "type": "image_choice",
        "question": "What did the worker take out of the water?",
        "audioText": "What did the worker take out of the water?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "A plastic bag"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A fish"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "word_builder",
        "word": "turtle",
        "audioText": "turtle"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "water",
          "looked",
          "cleaner",
          "than",
          "before."
        ],
        "audioText": "The water looked cleaner than before."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The turtle was ___ than the fish.",
        "choices": [
          "slower",
          "slowest",
          "slow"
        ],
        "answer": "slower",
        "audioText": "The turtle was slower than the fish."
      }
    ]
  },
  {
    "id": "xsc-r4-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 5,
    "title": "The Turtle's Secret Cave",
    "titleCn": "海龟的秘密洞穴",
    "coverEmoji": "🐢",
    "paragraphs": [
      {
        "text": "Last Sunday, I went to Ocean Park. My dad came with me too. We saw a big blue pool. Many sea animals lived in it.",
        "translation": "上周日，我去了海洋乐园。爸爸也和我一起去了。我们看见一个很大的蓝色水池，里面住着许多海洋动物。"
      },
      {
        "text": "First, we watched two dolphins swim. Dolly was smaller than her friend Ben. But Ben could jump higher than Dolly. They were both clever and funny.",
        "translation": "我们先看了两只海豚游泳。多莉比她的朋友本个头小一些，不过本跳得比多莉更高。他们俩都又聪明又好玩。"
      },
      {
        "text": "Then we met a little green turtle. He was slower than the small fish. But he was older than all of them. \"Come with me,\" said the turtle.",
        "translation": "后来我们遇到了一只绿色的小海龟。他游得比小鱼慢，却比他们谁都年长。海龟说：“跟我来。”"
      },
      {
        "text": "We followed him into a dark cave. Inside, we saw many plastic bags. The water was not clean or bright. The fish looked sad and swam away.",
        "translation": "我们跟着他游进一个黑黑的洞穴。洞里面，我们看到很多塑料袋。那里的水既不干净也不明亮，鱼儿看起来很伤心，都游走了。"
      },
      {
        "text": "We picked up the bags together. Then the water looked cleaner and more beautiful. The little fish came back to play.",
        "translation": "我们一起把袋子捡了起来。然后那里的水看起来更干净、更漂亮了，小鱼们又回来玩耍了。"
      },
      {
        "text": "I was tired but very happy. The sea is our home too. Let's keep it clean and blue.",
        "translation": "我很累，但非常开心。大海也是我们的家。让我们把它保持得干净又湛蓝吧。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal did they watch first?",
        "audioText": "Which animal did they watch first?",
        "options": [
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "Dolphin"
          },
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "Turtle"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          }
        ],
        "answer": "dolphin"
      },
      {
        "type": "image_choice",
        "question": "Where did the green turtle take them?",
        "audioText": "Where did the green turtle take them?",
        "options": [
          {
            "emoji": "🕳️",
            "value": "cave",
            "text": "A cave"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "A school"
          },
          {
            "emoji": "🌳",
            "value": "forest",
            "text": "A forest"
          }
        ],
        "answer": "cave"
      },
      {
        "type": "word_builder",
        "word": "dolphin",
        "audioText": "dolphin"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "was",
          "slower",
          "than",
          "the",
          "small",
          "fish."
        ],
        "audioText": "He was slower than the small fish."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Dolly was ___ than her friend Ben.",
        "choices": [
          "smaller",
          "faster",
          "older"
        ],
        "answer": "smaller",
        "audioText": "Dolly was smaller than her friend Ben."
      }
    ]
  },
  {
    "id": "xsc-r4-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 6,
    "title": "The Sea Needs Our Help",
    "titleCn": "大海需要我们的帮助",
    "coverEmoji": "🐢",
    "paragraphs": [
      {
        "text": "Last Sunday, our class went to Ocean Park. A kind guide met us at the gate. She took us to a big blue pool.",
        "translation": "上周日，我们班去了海洋乐园。一位和善的导游在门口迎接我们。她把我们带到一个很大的蓝色水池边。"
      },
      {
        "text": "Two sea turtles swam in the clear water. The green one looked bigger and older. The small one was faster and more playful. They raced to the other side.",
        "translation": "两只海龟在清澈的水里游着。那只绿色的看起来更大、更年长。那只小的游得更快，也更爱玩。它们一路游到了水池的另一边。"
      },
      {
        "text": "Then we saw a dolphin show. Dolphins are smarter than most fish. One dolphin jumped higher than the others. It caught a ball in the air. We clapped and shouted happily.",
        "translation": "接着我们看了一场海豚表演。海豚比大多数鱼都聪明。有一只海豚跳得比别的都高，还在空中接住了一个球。我们开心地拍手欢呼。"
      },
      {
        "text": "After lunch, we walked along the beach. The sand was warm and soft. But we found plastic bags and old bottles. The sea looked sad and dirty there.",
        "translation": "午饭后，我们沿着海滩散步。沙子又暖又软。可我们却发现了塑料袋和旧瓶子。那一片的海看起来又脏又伤心。"
      },
      {
        "text": "We put on gloves and picked up rubbish. Our bags became heavier and heavier. A small crab waved its claw at us. Maybe it was saying thank you.",
        "translation": "我们戴上手套，捡起垃圾。袋子变得越来越重。一只小螃蟹朝我们挥着钳子，也许它是在说谢谢吧。"
      },
      {
        "text": "Now I know the sea needs our help. If we keep it clean, the fish will be happier. I want to come back next summer.",
        "translation": "现在我知道，大海需要我们的帮助。如果我们让它保持干净，鱼儿会更快乐。我想明年夏天再来看它们。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animals did the children see first?",
        "audioText": "Which animals did the children see first?",
        "options": [
          {
            "emoji": "🐢",
            "value": "turtles",
            "text": "Turtles"
          },
          {
            "emoji": "🐬",
            "value": "dolphins",
            "text": "Dolphins"
          },
          {
            "emoji": "🦀",
            "value": "crabs",
            "text": "Crabs"
          }
        ],
        "answer": "turtles"
      },
      {
        "type": "image_choice",
        "question": "Which animal jumped higher than the others?",
        "audioText": "Which animal jumped higher than the others?",
        "options": [
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "The dolphin"
          },
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "The turtle"
          },
          {
            "emoji": "🦀",
            "value": "crab",
            "text": "The crab"
          }
        ],
        "answer": "dolphin"
      },
      {
        "type": "word_builder",
        "word": "dolphin",
        "audioText": "dolphin"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Two",
          "sea",
          "turtles",
          "swam",
          "in",
          "the",
          "clear",
          "water."
        ],
        "audioText": "Two sea turtles swam in the clear water."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Last Sunday, our class ___ to Ocean Park.",
        "choices": [
          "went",
          "go",
          "goes"
        ],
        "answer": "went",
        "audioText": "Last Sunday, our class went to Ocean Park."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Dolphins are ___ than most fish.",
        "choices": [
          "smarter",
          "smart",
          "smartest"
        ],
        "answer": "smarter",
        "audioText": "Dolphins are smarter than most fish."
      }
    ]
  },
  {
    "id": "xsc-r4-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 7,
    "title": "My Dive with a Sea Turtle",
    "titleCn": "我和海龟的潜水之旅",
    "coverEmoji": "🐢",
    "paragraphs": [
      {
        "text": "Last Sunday, my dad took me to the sea. We went out in a small white boat. The water was blue and very clear. I felt excited and a little afraid.",
        "translation": "上周日，爸爸带我去看海。我们坐一条白色小船出海。海水湛蓝，非常清澈。我既兴奋，又有点害怕。"
      },
      {
        "text": "Then we put on our masks and went down. The sea was deeper than our swimming pool. I saw many fish around me. Some were small and some were big.",
        "translation": "接着我们戴上潜水面罩，潜了下去。大海比我们的游泳池深多了。我看到身边有很多鱼。有的很小，有的很大。"
      },
      {
        "text": "A green sea turtle swam slowly near me. She was much bigger than my dad! Her eyes were bright and kind. She looked at me and did not swim away.",
        "translation": "一只绿海龟慢慢地游到我身边。它比我爸爸还要大得多！它的眼睛又亮又温柔。它看着我，没有游走。"
      },
      {
        "text": "She showed me her home in the coral. It was more colourful than a garden. We saw a small orange fish and a starfish. They played in the soft green plants.",
        "translation": "它带我看了它在珊瑚里的家。那里比花园还要五彩缤纷。我们看到一条橙色小鱼和一只海星。它们在软软的绿色植物间玩耍。"
      },
      {
        "text": "But then I saw a plastic bag in the water. It looked like a big white jellyfish. A little fish almost ate it. I felt sad and picked it up.",
        "translation": "可后来我在水里看见一个塑料袋。它看起来像一只白色的大水母。一条小鱼差点把它吃掉。我很难过，就把它捡了起来。"
      },
      {
        "text": "Before we went home, I took the bag out. The sea looked cleaner and happier. I want to dive again next year. And I will keep the sea clean.",
        "translation": "回家前，我把袋子带出了水面。大海看上去更干净、更快乐了。明年我还想再来潜水。我也要让大海一直干干净净。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal did the writer meet in the sea?",
        "audioText": "Which animal did the writer meet in the sea?",
        "options": [
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "A sea turtle"
          },
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "A dolphin"
          },
          {
            "emoji": "🦈",
            "value": "shark",
            "text": "A shark"
          }
        ],
        "answer": "turtle"
      },
      {
        "type": "image_choice",
        "question": "What did the writer pick up from the water?",
        "audioText": "What did the writer pick up from the water?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "A plastic bag"
          },
          {
            "emoji": "🥤",
            "value": "cup",
            "text": "A cup"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "word_builder",
        "word": "turtle",
        "audioText": "turtle"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "sea",
          "was",
          "deeper",
          "than",
          "the",
          "pool."
        ],
        "audioText": "The sea was deeper than the pool."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sea looked ___ and happier.",
        "choices": [
          "clean",
          "cleaner",
          "cleanest"
        ],
        "answer": "cleaner",
        "audioText": "The sea looked cleaner and happier."
      }
    ]
  },
  {
    "id": "xsc-r4-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 8,
    "title": "The Dolphin and the Plastic Bag",
    "titleCn": "海豚与塑料袋",
    "coverEmoji": "🐬",
    "paragraphs": [
      {
        "text": "Last Sunday, my family went to Ocean Park. The sea was bluer than the sky. My little brother Tom was more excited than me. We wanted to see the dolphins first.",
        "translation": "上周日，我们一家人去了海洋乐园。海水比天空还要蓝。我弟弟汤姆比我还要兴奋。我们最想先去看海豚。"
      },
      {
        "text": "We walked to the big dolphin pool. A dolphin jumped higher than the wall. Her name was Lucky, a park worker said. Lucky swam closer and looked at us. Her eyes were brighter than glass.",
        "translation": "我们走到那个大大的海豚池边。一只海豚跳得比围墙还高。一位工作人员说，她的名字叫乐奇。乐奇游得更近了，看着我们。她的眼睛比玻璃还要亮。"
      },
      {
        "text": "Then I saw a bag in the water. It moved slowly near Lucky's tail. The water there looked dirtier than before. Lucky's home was not clean or safe. My heart felt heavy and cold.",
        "translation": "后来，我在水里看到一个袋子。它慢慢地漂在乐奇的尾巴旁边。那里的水看起来比以前更脏了。乐奇的家不干净，也不安全。我的心里又沉又凉。"
      },
      {
        "text": "Dad and I told a park worker. She thanked us with a big smile. Some workers came and cleaned the pool. Lucky jumped higher and looked happier. She splashed water on my shoes!",
        "translation": "我和爸爸把这件事告诉了一位工作人员。她笑着向我们道谢。几个工人过来把池子清理干净了。乐奇跳得更高了，看起来开心多了。她还把水花溅到了我的鞋子上！"
      },
      {
        "text": "On the way home, I thought about Lucky. The ocean is bigger than any pool. Every plastic bag can hurt a sea animal. So I will use fewer bags now. Small hands can make the sea cleaner.",
        "translation": "回家的路上，我一直想着乐奇。大海比任何池子都要大。每一个塑料袋都可能伤害海洋动物。所以从现在开始，我要少用袋子。小小的手也能让大海更干净。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did the family go last Sunday?",
        "audioText": "Where did the family go last Sunday?",
        "options": [
          {
            "emoji": "🐬",
            "value": "ocean_park",
            "text": "Ocean Park"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "School"
          },
          {
            "emoji": "🛒",
            "value": "shop",
            "text": "A shop"
          }
        ],
        "answer": "ocean_park"
      },
      {
        "type": "image_choice",
        "question": "What did the writer see in the water?",
        "audioText": "What did the writer see in the water?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "A bag"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A big fish"
          },
          {
            "emoji": "👟",
            "value": "shoe",
            "text": "An old shoe"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "word_builder",
        "word": "dolphin",
        "audioText": "dolphin"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lucky",
          "swam",
          "closer",
          "and",
          "looked",
          "at",
          "us."
        ],
        "audioText": "Lucky swam closer and looked at us."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sea was ___ than the sky.",
        "choices": [
          "bluer",
          "blue",
          "bluest"
        ],
        "answer": "bluer",
        "audioText": "The sea was bluer than the sky."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Every plastic bag can ___ a sea animal.",
        "choices": [
          "hurt",
          "help",
          "hold"
        ],
        "answer": "hurt",
        "audioText": "Every plastic bag can hurt a sea animal."
      }
    ]
  },
  {
    "id": "xsc-r4-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 9,
    "title": "The Whale's Long Journey",
    "titleCn": "鲸鱼的长途旅行",
    "coverEmoji": "🐋",
    "paragraphs": [
      {
        "text": "Last summer, I visited Ocean Park with my dad. We took a small boat on the sea. A young whale swam near our boat.",
        "translation": "去年夏天，我和爸爸去了海洋乐园。我们坐上一艘小船，出海了。一头小鲸鱼游到了我们船边。"
      },
      {
        "text": "The whale was much longer than our boat. Its skin looked darker and smoother than glass. It made a low sound, like a sad song.",
        "translation": "这头鲸鱼比我们的船长得多。它的皮肤看起来比玻璃还深、还光滑。它发出低低的声音，像一首悲伤的歌。"
      },
      {
        "text": "Our guide said it was on a long journey. It swam from cold water to warm places. But the sea is not as clean as before. Some plastic bags floated near us.",
        "translation": "导游说，它正在长途旅行。它从冰冷的海水游向温暖的地方。可是大海不像从前那么干净了。一些塑料袋就漂在我们旁边。"
      },
      {
        "text": "The whale opened its big mouth slowly. It took in water, but no plastic, luckily. \"Whales are smarter than we think,\" Dad said. Still, plastic is more dangerous for them.",
        "translation": "鲸鱼慢慢张开大嘴。幸运的是，它喝进了水，却没有吃到塑料。爸爸说：“鲸鱼比我们想的更聪明。”可是塑料对它们来说越来越危险。"
      },
      {
        "text": "We picked up plastic bags with our nets. It was easier than it looked. Then the whale went deeper and swam away. Its tail was the biggest I ever saw.",
        "translation": "我们用网把塑料袋捞了起来。这比看上去要容易。然后鲸鱼潜向更深处，游走了。它的尾巴是我见过最大的。"
      },
      {
        "text": "That day, I learned something important. The sea is home for many animals. They need cleaner water to live well. If we all help, the ocean will be safer.",
        "translation": "那一天，我懂得了一件重要的事。大海是许多动物的家。它们需要更干净的海水才能好好生活。如果我们一起帮忙，海洋就会更安全。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal swam near the boat?",
        "audioText": "Which animal swam near the boat?",
        "options": [
          {
            "emoji": "🐋",
            "value": "whale",
            "text": "Whale"
          },
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "Turtle"
          },
          {
            "emoji": "🐬",
            "value": "dolphin",
            "text": "Dolphin"
          }
        ],
        "answer": "whale"
      },
      {
        "type": "image_choice",
        "question": "What did they pick up from the sea?",
        "audioText": "What did they pick up from the sea?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "plastic bag",
            "text": "Plastic bag"
          },
          {
            "emoji": "🐠",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🌿",
            "value": "sea plant",
            "text": "Sea plant"
          }
        ],
        "answer": "plastic bag"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Some",
          "plastic",
          "bags",
          "floated",
          "near",
          "us"
        ],
        "audioText": "Some plastic bags floated near us."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The whale was much ___ than our boat.",
        "choices": [
          "longer",
          "long",
          "longest"
        ],
        "answer": "longer",
        "audioText": "The whale was much longer than our boat."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Our guide said the whale was on a long ___.",
        "choices": [
          "journey",
          "holiday",
          "lesson"
        ],
        "answer": "journey",
        "audioText": "Our guide said the whale was on a long journey."
      }
    ]
  },
  {
    "id": "xsc-r4-s10",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 10,
    "title": "Sam and the Plastic Bag",
    "titleCn": "萨姆和那只塑料袋",
    "coverEmoji": "🐬",
    "paragraphs": [
      {
        "text": "Last Saturday, Sam went to Ocean Park. He took his little sister, Amy, with him. The park was bigger than their school. They saw many bright fish swimming by.",
        "translation": "上周六，萨姆去了海洋乐园。他带上了小妹妹艾米。这个乐园比他们的学校还大。他们看见许多鲜艳的鱼游来游去。"
      },
      {
        "text": "First, they watched a dolphin show. The dolphins jumped higher than the birds. One dolphin swam close and smiled at Sam. Then it splashed water on his shoes.",
        "translation": "首先，他们看了一场海豚表演。海豚跳得比小鸟还高。有一只海豚游到近处，冲萨姆笑了笑。接着它把水溅到了他的鞋子上。"
      },
      {
        "text": "Next, they walked into a long glass tunnel. Small fish swam above their heads. A big turtle moved slower than the fish. Its shell was darker than the tunnel walls.",
        "translation": "接着，他们走进一条长长的玻璃隧道。小鱼在他们头顶上游动。一只大乌龟游得比鱼还慢。它的龟壳比隧道的墙壁还要深暗。"
      },
      {
        "text": "Then Sam saw a plastic bag. It floated in the blue water. A small fish swam close and got scared.",
        "translation": "就在这时，萨姆看见了一只塑料袋。它在蓝色的水里漂着。一条小鱼游近它，被吓到了。"
      },
      {
        "text": "Sam told a park worker about the bag. The worker smiled and took it out. The water looked cleaner and much safer. Sam felt happier than ever before.",
        "translation": "萨姆把塑料袋的事告诉了乐园的工作人员。工作人员笑着把它捞了出来。水看起来更干净、安全多了。萨姆觉得比以往任何时候都开心。"
      },
      {
        "text": "On the way home, Amy asked a question. \"Is the ocean clean like this?\" Sam thought about it for a moment. \"Not yet, but we can help,\" he said. They decided to use fewer plastic bags.",
        "translation": "回家的路上，艾米问了一个问题：“大海也这么干净吗？”萨姆想了一会儿。“还没有，不过我们可以出一份力。”他说。他们决定以后少用塑料袋。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the dolphins do at the show?",
        "audioText": "What did the dolphins do at the show?",
        "options": [
          {
            "emoji": "💦",
            "value": "jump",
            "text": "They jumped high."
          },
          {
            "emoji": "😴",
            "value": "sleep",
            "text": "They slept all day."
          },
          {
            "emoji": "🥕",
            "value": "eat",
            "text": "They ate carrots."
          }
        ],
        "answer": "jump"
      },
      {
        "type": "image_choice",
        "question": "What did Sam see in the blue water?",
        "audioText": "What did Sam see in the blue water?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "A plastic bag"
          },
          {
            "emoji": "🪨",
            "value": "rock",
            "text": "A big rock"
          },
          {
            "emoji": "👟",
            "value": "shoe",
            "text": "An old shoe"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "word_builder",
        "word": "dolphin",
        "audioText": "dolphin"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "park",
          "was",
          "bigger",
          "than",
          "their",
          "school."
        ],
        "audioText": "The park was bigger than their school."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The water looked ___ and much safer.",
        "choices": [
          "cleaner",
          "clean",
          "cleanest"
        ],
        "answer": "cleaner",
        "audioText": "The water looked cleaner and much safer."
      }
    ]
  },
  {
    "id": "xsc-r4-s11",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 11,
    "title": "Bigger Than a School Bus",
    "titleCn": "比校车还大",
    "coverEmoji": "🐋",
    "paragraphs": [
      {
        "text": "Last Saturday, my class went to Ocean Park. We saw a big blue pool. A whale shark lived in it. It was longer than our school bus.",
        "translation": "上周六，我们班去了海洋乐园。我们看见一个蓝色的大水池。一条鲸鲨住在里面。它比我们的校车还长。"
      },
      {
        "text": "The whale shark swam very slowly. It was slower than the small fish. But it was much bigger than the other fish. Its mouth was wider than a door.",
        "translation": "那条鲸鲨游得很慢。它比小鱼游得慢。但它比别的鱼大得多。它的嘴比一扇门还宽。"
      },
      {
        "text": "A teacher told us about the whale shark. \"Whale sharks are gentle,\" she said. \"They eat small fish and eggs.\" We were surprised and happy.",
        "translation": "一位老师给我们讲了鲸鲨的事。“鲸鲨很温顺，”她说。“它们吃小鱼和鱼卵。”我们又惊讶又开心。"
      },
      {
        "text": "Later, we walked to a corner of the park. The water there looked dirty. We picked up plastic bags and old cups. Then the water looked cleaner.",
        "translation": "后来，我们走到乐园的一个角落。那里的水看起来很脏。我们捡起了塑料袋和旧杯子。之后，水看起来干净了一些。"
      },
      {
        "text": "My friend Ana said, \"The sea is sadder with plastic. Let's use fewer plastic bags.\" We all promised to help.",
        "translation": "我的朋友安娜说：“有了塑料，大海更悲伤了。我们少用一些塑料袋吧。”我们都答应要帮忙。"
      },
      {
        "text": "On the bus home, I thought about the whale shark. It was bigger than our bus. But clean water is more important. I will bring a cloth bag next time.",
        "translation": "回家的校车上，我想着那条鲸鲨。它比我们的校车还大。但干净的水更重要。下次我要带一个布袋。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal did the class see at Ocean Park?",
        "audioText": "Which animal did the class see at Ocean Park?",
        "options": [
          {
            "emoji": "🐋",
            "value": "whale shark",
            "text": "A whale shark"
          },
          {
            "emoji": "🐘",
            "value": "elephant",
            "text": "An elephant"
          },
          {
            "emoji": "🦁",
            "value": "lion",
            "text": "A lion"
          }
        ],
        "answer": "whale shark"
      },
      {
        "type": "image_choice",
        "question": "What did the children pick up from the water?",
        "audioText": "What did the children pick up from the water?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "plastic bags",
            "text": "Plastic bags"
          },
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "👟",
            "value": "shoes",
            "text": "Shoes"
          }
        ],
        "answer": "plastic bags"
      },
      {
        "type": "word_builder",
        "word": "cleaner",
        "audioText": "cleaner"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "longer",
          "than",
          "our",
          "school",
          "bus."
        ],
        "audioText": "It was longer than our school bus."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The whale shark was ___ than the small fish.",
        "choices": [
          "slower",
          "slow",
          "slowest"
        ],
        "answer": "slower",
        "audioText": "The whale shark was slower than the small fish."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "But clean water is ___ important.",
        "choices": [
          "more",
          "most",
          "much"
        ],
        "answer": "more",
        "audioText": "But clean water is more important."
      }
    ]
  },
  {
    "id": "xsc-r4-s12",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 12,
    "title": "The Octopus and the Old Net",
    "titleCn": "章鱼和旧渔网",
    "coverEmoji": "🐙",
    "paragraphs": [
      {
        "text": "Last Sunday, Mia and Ben visited Ocean Park. They put on their blue diving suits. The sea was colder than the park pool. Mia took a big breath and jumped in.",
        "translation": "上周日，米娅和本去了海洋乐园。他们穿上蓝色的潜水服。海水比乐园里的泳池冷。米娅深吸一口气，跳进了水里。"
      },
      {
        "text": "They swam down to the grey rocks. The rocks were darker than the sand. Small fish moved quickly around them. Then Ben saw a little octopus under a stone.",
        "translation": "他们向下游到灰色的礁石旁。礁石比沙子更暗。小鱼在他们身边飞快地游来游去。这时，本看到石头底下有一只小章鱼。"
      },
      {
        "text": "The octopus had big, round eyes. It was smaller than Mia's hand. A long old net lay near it. The net was bigger than a small boat.",
        "translation": "那只章鱼有一双又大又圆的眼睛。它比米娅的手还小。旁边躺着一张长长的旧渔网。那张网比一条小船还大。"
      },
      {
        "text": "One little fish was caught inside. Its tail was in the net. Ben took out his small knife. He cut the net more carefully than before. Soon the fish was free again.",
        "translation": "一条小鱼被困在里面。它的尾巴卡在网里。本拿出他的小刀。他比之前更小心地割着渔网。很快，小鱼又自由了。"
      },
      {
        "text": "The octopus came out slowly. It waved one arm at them. Then it swam away into the deep. Mia and Ben smiled at each other.",
        "translation": "章鱼慢慢地爬了出来。它朝他们挥动了一只触手。然后它游向了深水里。米娅和本互相笑了笑。"
      },
      {
        "text": "On the boat, they were quiet and tired. A clean sea is better than a pretty sea. They picked up the old net. Small hands can make the sea cleaner.",
        "translation": "坐在船上，他们又安静又累。干净的大海比漂亮的大海更好。他们把那张旧渔网捡了起来。小小的双手也能让大海变得更干净。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Ben see under the stone?",
        "audioText": "What did Ben see under the stone?",
        "options": [
          {
            "emoji": "🐙",
            "value": "octopus",
            "text": "An octopus"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A fish"
          },
          {
            "emoji": "🦀",
            "value": "crab",
            "text": "A crab"
          }
        ],
        "answer": "octopus"
      },
      {
        "type": "word_builder",
        "word": "octopus",
        "audioText": "octopus"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sea was ___ than the park pool.",
        "choices": [
          "colder",
          "coldest",
          "cold"
        ],
        "answer": "colder",
        "audioText": "The sea was colder than the park pool."
      },
      {
        "type": "image_choice",
        "question": "What did Ben take out?",
        "audioText": "What did Ben take out?",
        "options": [
          {
            "emoji": "🔪",
            "value": "knife",
            "text": "A knife"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "A phone"
          },
          {
            "emoji": "🥛",
            "value": "cup",
            "text": "A cup"
          }
        ],
        "answer": "knife"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "smaller",
          "than",
          "Mia's",
          "hand."
        ],
        "audioText": "It was smaller than Mia's hand."
      },
      {
        "type": "word_builder",
        "word": "colder",
        "audioText": "colder"
      }
    ]
  },
  {
    "id": "xsc-r4-s13",
    "track": "xiaoshengchu",
    "regionId": "xsc-r4",
    "order": 13,
    "title": "The Starfish and the Old Net",
    "titleCn": "海星与旧渔网",
    "coverEmoji": "⭐",
    "paragraphs": [
      {
        "text": "Last Sunday, Mia went to the beach. The sea was blue and quiet. Suddenly, she saw something under the water. It looked like a big orange star.",
        "translation": "上周日，米娅去了海边。大海又蓝又平静。突然，她看见水下有个东西。它看起来像一颗大大的橙色星星。"
      },
      {
        "text": "“Grandpa, look! A starfish!” she said. The starfish was smaller than Mia's hand. Its arm was caught in an old net. The net was heavier than a big stone.",
        "translation": "“爷爷，快看！一只海星！”她说。这只海星比米娅的手还小。它的一条腕被一张旧渔网缠住了。那张网比一块大石头还重。"
      },
      {
        "text": "Mia put on her mask and dived. She swam down to the little starfish. The water was colder than the beach. Slowly, she pulled the net away.",
        "translation": "米娅戴上潜水镜，潜了下去。她游到小海星身边。水里比沙滩上冷多了。她慢慢地把渔网拉开。"
      },
      {
        "text": "The starfish moved its arms. It looked happier than before. Then Mia saw some plastic near the rocks. There were bottles, bags and old ropes.",
        "translation": "海星动了动它的腕。它看起来比刚才开心了。接着，米娅在岩石附近看到了一些塑料。那里有瓶子、袋子和旧绳子。"
      },
      {
        "text": "Mia and Grandpa worked together. They put the plastic in a big bag. Their bag was fuller than they thought. The beach looked cleaner and brighter.",
        "translation": "米娅和爷爷一起干了起来。他们把塑料装进一个大袋子里。他们的袋子比想象中装得还满。沙滩看起来更干净、更亮堂了。"
      },
      {
        "text": "Before she left, Mia waved to the sea. “I will come back soon,” she said. A clean ocean is better for everyone. Even a small hand can help a lot.",
        "translation": "离开前，米娅朝大海挥了挥手。“我很快就会回来的。”她说。干净的海洋对大家都更好。哪怕是一只小手，也能帮上大忙。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Mia see under the water?",
        "audioText": "What did Mia see under the water?",
        "options": [
          {
            "emoji": "⭐",
            "value": "starfish",
            "text": "A starfish"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A fish"
          },
          {
            "emoji": "🦀",
            "value": "crab",
            "text": "A crab"
          }
        ],
        "answer": "starfish"
      },
      {
        "type": "image_choice",
        "question": "What did Mia find near the rocks?",
        "audioText": "What did Mia find near the rocks?",
        "options": [
          {
            "emoji": "🍾",
            "value": "bottles",
            "text": "Bottles"
          },
          {
            "emoji": "🧦",
            "value": "socks",
            "text": "Socks"
          },
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          }
        ],
        "answer": "bottles"
      },
      {
        "type": "word_builder",
        "word": "starfish",
        "audioText": "starfish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "water",
          "was",
          "colder",
          "than",
          "the",
          "beach."
        ],
        "audioText": "The water was colder than the beach."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The starfish was ___ than Mia's hand.",
        "choices": [
          "smaller",
          "small",
          "smallest"
        ],
        "answer": "smaller",
        "audioText": "The starfish was smaller than Mia's hand."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Last Sunday, Mia ___ to the beach.",
        "choices": [
          "went",
          "goes",
          "going"
        ],
        "answer": "went",
        "audioText": "Last Sunday, Mia went to the beach."
      }
    ]
  },
  {
    "id": "xsc-r5-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 1,
    "title": "The Tallest Dinosaur in Dino Valley",
    "titleCn": "恐龙谷里最高的恐龙",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Last summer, Grandpa took me to Dino Valley. It is a green place with tall trees. Big dinosaurs lived here long ago. Now we see their big footprints in the stone.",
        "translation": "去年夏天，爷爷带我去了恐龙谷。那里是个绿树成荫的地方。很久以前，大恐龙就生活在这里。现在我们还能在石头上看到它们的大脚印。"
      },
      {
        "text": "Grandpa walked slowly and looked at everything. I ran first because I was so happy. Then we found a small river near the hills.",
        "translation": "爷爷慢慢地走着，看着周围的一切。我因为太开心，所以跑在了最前面。后来，我们在小山附近发现了一条小河。"
      },
      {
        "text": "Then we saw the tallest dinosaur in the valley. Its head was high above the big trees. It walked slowly and looked at us. I was happy because I saw it first.",
        "translation": "接着，我们看见了山谷里最高的那只恐龙。它的头高高地伸在大树之上。它慢慢地走着，看着我们。我很开心，因为是我先看到它的。"
      },
      {
        "text": "Later, a little dinosaur ran to the river. It was the smallest one in the valley. Its feet were as small as my hands. It did not run because we were quiet.",
        "translation": "后来，一只小恐龙跑到河边。它是山谷里最小的一只。它的脚和我的手一样小。它没有跑，因为我们很安静。"
      },
      {
        "text": "Grandpa took a photo of the big dinosaur. We sat down and ate our lunch. The sun was warm and the wind was soft. It was the best day of my summer.",
        "translation": "爷爷给那只大恐龙拍了张照片。我们坐下来吃了午饭。阳光暖暖的，风轻轻的。那是我这个夏天最棒的一天。"
      },
      {
        "text": "I want to go back to Dino Valley. Next year, I will look for new footprints. Big or small, every dinosaur is a surprise.",
        "translation": "我想再去一次恐龙谷。明年，我要去寻找新的脚印。不管是大恐龙还是小恐龙，每一只都让人惊喜。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What lived in Dino Valley long ago?",
        "audioText": "What lived in Dino Valley long ago?",
        "options": [
          {
            "emoji": "🦕",
            "value": "dinosaurs",
            "text": "Dinosaurs"
          },
          {
            "emoji": "🐘",
            "value": "elephants",
            "text": "Elephants"
          },
          {
            "emoji": "🐯",
            "value": "tigers",
            "text": "Tigers"
          }
        ],
        "answer": "dinosaurs"
      },
      {
        "type": "image_choice",
        "question": "What can we see in the stone now?",
        "audioText": "What can we see in the stone now?",
        "options": [
          {
            "emoji": "👣",
            "value": "footprints",
            "text": "Big footprints"
          },
          {
            "emoji": "🌊",
            "value": "river",
            "text": "A river"
          },
          {
            "emoji": "🌳",
            "value": "trees",
            "text": "Tall trees"
          }
        ],
        "answer": "footprints"
      },
      {
        "type": "word_builder",
        "word": "dinosaur",
        "audioText": "dinosaur"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "was",
          "happy",
          "because",
          "I",
          "saw",
          "it",
          "first."
        ],
        "audioText": "I was happy because I saw it first."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was the ___ day of my summer.",
        "choices": [
          "best",
          "better",
          "good"
        ],
        "answer": "best",
        "audioText": "It was the best day of my summer."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Grandpa ___ a photo of the big dinosaur.",
        "choices": [
          "took",
          "takes",
          "take"
        ],
        "answer": "took",
        "audioText": "Grandpa took a photo of the big dinosaur."
      }
    ]
  },
  {
    "id": "xsc-r5-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 2,
    "title": "Rex and the Loudest Roar",
    "titleCn": "雷克斯和最响亮的吼声",
    "coverEmoji": "🦖",
    "paragraphs": [
      {
        "text": "Rex was a small dinosaur in Dino Valley. He lived near a quiet blue river. Many big dinosaurs lived in the valley too.",
        "translation": "雷克斯是恐龙谷里的一只小恐龙。他住在一条安静的蓝色小河旁。山谷里还住着许多大恐龙。"
      },
      {
        "text": "One sunny morning, Rex heard a big sound. It came from the tallest hill. His father said, \"That is the loudest roar here.\" Rex wanted a roar like that.",
        "translation": "一个晴朗的早晨，雷克斯听到了一声巨响。声音是从最高的那座山丘上传来的。爸爸说：“那是这里最响亮的吼声。”雷克斯也想拥有那样的吼声。"
      },
      {
        "text": "Rex opened his mouth and tried to roar. Only a small sound came out. \"Why is my roar so quiet?\" he asked. \"Because you are still little,\" said his mother.",
        "translation": "雷克斯张开嘴，试着吼叫。可是只发出了一点点小小的声音。“为什么我的吼声这么轻呢？”他问。“因为你还是个小不点呀。”妈妈说。"
      },
      {
        "text": "Rex walked down to the river. He met an old dinosaur there. \"I am the oldest dinosaur here,\" she said. \"My roar was small too, long ago.\"",
        "translation": "雷克斯走到河边。他在那儿遇到了一只年老的恐龙。“我是这里最老的恐龙，”她说，“很久很久以前，我的吼声也很小。”"
      },
      {
        "text": "Rex took a deep breath and roared. His little roar was the bravest roar. All the small birds flew up. Everyone smiled because Rex tried his best.",
        "translation": "雷克斯深深吸了一口气，吼了出来。他小小的吼声是最勇敢的吼声。所有的小鸟都飞了起来。大家都笑了，因为雷克斯尽了全力。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did Rex live?",
        "audioText": "Where did Rex live?",
        "options": [
          {
            "emoji": "🏞️",
            "value": "valley",
            "text": "In a green valley"
          },
          {
            "emoji": "🌊",
            "value": "sea",
            "text": "In the blue sea"
          },
          {
            "emoji": "🏔️",
            "value": "mountain",
            "text": "On a high mountain"
          }
        ],
        "answer": "valley"
      },
      {
        "type": "word_builder",
        "word": "oldest",
        "audioText": "oldest"
      },
      {
        "type": "image_choice",
        "question": "Where did the big sound come from?",
        "audioText": "Where did the big sound come from?",
        "options": [
          {
            "emoji": "⛰️",
            "value": "hill",
            "text": "The tallest hill"
          },
          {
            "emoji": "🌊",
            "value": "river",
            "text": "The blue river"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "The tall tree"
          }
        ],
        "answer": "hill"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "His little roar was the ___ roar.",
        "choices": [
          "bravest",
          "brave",
          "braver"
        ],
        "answer": "bravest",
        "audioText": "His little roar was the bravest roar."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rex",
          "opened",
          "his",
          "mouth",
          "and",
          "tried",
          "to",
          "roar."
        ],
        "audioText": "Rex opened his mouth and tried to roar."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Everyone smiled ___ Rex tried his best.",
        "choices": [
          "because",
          "but",
          "or"
        ],
        "answer": "because",
        "audioText": "Everyone smiled because Rex tried his best."
      }
    ]
  },
  {
    "id": "xsc-r5-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 3,
    "title": "The Biggest Footprint",
    "titleCn": "最大的脚印",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Last Saturday, Mia and Tom visited Dino Valley. They walked along a small river together. The sun was warm and the sky was blue. Suddenly, Tom stopped and looked down.",
        "translation": "上周六，米娅和汤姆来到了恐龙谷。他们一起沿着一条小河散步。阳光暖暖的，天空蓝蓝的。突然，汤姆停下脚步，低头看了看。"
      },
      {
        "text": "\"Look! A big footprint!\" Tom said. It was the biggest footprint in the valley. Mia put her small shoe inside the footprint. Her shoe looked very small next to it.",
        "translation": "\"看！一个大脚印！\"汤姆说。这是山谷里最大的脚印。米娅把她的小鞋子放进脚印里。和脚印一比，她的鞋子显得特别小。"
      },
      {
        "text": "They followed the footprints because they felt brave. The footprints went over a small hill. Then they went into a green forest. The two friends walked quietly and slowly.",
        "translation": "他们觉得自己很勇敢，就跟着脚印走了起来。脚印翻过一座小山坡，接着伸进了一片绿色的森林。两个小伙伴悄悄地、慢慢地走着。"
      },
      {
        "text": "In the forest, they saw a tall dinosaur. It had the longest neck in Dino Valley. It ate leaves from the tallest tree. Mia and Tom hid behind a big rock.",
        "translation": "在森林里，他们看见一只高大的恐龙。它有着恐龙谷里最长的脖子。它吃着最高那棵树上的叶子。米娅和汤姆躲在一块大石头后面。"
      },
      {
        "text": "The dinosaur was the most gentle animal there. It looked at them and blinked slowly. Then it walked away because it was tired. Mia and Tom smiled at each other.",
        "translation": "这只恐龙是那里最温和的动物。它看了看他们，慢慢地眨了眨眼。后来它累了，就走开了。米娅和汤姆互相笑了笑。"
      },
      {
        "text": "Mia and Tom walked home before dinner. \"That was the best day!\" Tom said. \"Let's come back next week!\" said Mia. They ran home and told everyone about it.",
        "translation": "晚饭前，米娅和汤姆走回了家。\"这是最棒的一天！\"汤姆说。\"我们下周再来吧！\"米娅说。他们跑回家，把这件事讲给了每个人听。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Mia and Tom find in Dino Valley?",
        "audioText": "What did Mia and Tom find in Dino Valley?",
        "options": [
          {
            "emoji": "👣",
            "value": "footprint",
            "text": "A footprint"
          },
          {
            "emoji": "🪨",
            "value": "rock",
            "text": "A rock"
          },
          {
            "emoji": "🍃",
            "value": "leaf",
            "text": "A leaf"
          }
        ],
        "answer": "footprint"
      },
      {
        "type": "image_choice",
        "question": "What did the tall dinosaur eat?",
        "audioText": "What did the tall dinosaur eat?",
        "options": [
          {
            "emoji": "🍃",
            "value": "leaves",
            "text": "Leaves"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🥚",
            "value": "eggs",
            "text": "Eggs"
          }
        ],
        "answer": "leaves"
      },
      {
        "type": "word_builder",
        "word": "dinosaur",
        "audioText": "dinosaur"
      },
      {
        "type": "word_builder",
        "word": "footprint",
        "audioText": "footprint"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "had",
          "the",
          "longest",
          "neck",
          "in",
          "Dino",
          "Valley."
        ],
        "audioText": "It had the longest neck in Dino Valley."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They followed the footprints ___ they felt brave.",
        "choices": [
          "because",
          "but",
          "so"
        ],
        "answer": "because",
        "audioText": "They followed the footprints because they felt brave."
      }
    ]
  },
  {
    "id": "xsc-r5-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 4,
    "title": "A Big Egg in Dino Valley",
    "titleCn": "恐龙谷里的大蛋",
    "coverEmoji": "🥚",
    "paragraphs": [
      {
        "text": "Last week, Tim and Amy visited Dino Valley. They walked along the river and looked around. The sun was hot. The sky was blue. Then they saw footprints in the wet mud.",
        "translation": "上周，蒂姆和艾米去了恐龙谷。他们沿着河边走，四处张望。太阳很热，天空很蓝。后来，他们在湿泥里看到了脚印。"
      },
      {
        "text": "\"These are the biggest footprints here,\" said Tim. Amy looked down and found a big egg. The egg was as big as a ball. It was warm because the sun was hot.",
        "translation": "“这是这儿最大的脚印，”蒂姆说。艾米低头一看，发现了一个大蛋。这个蛋有一个球那么大。它很暖和，因为太阳很热。"
      },
      {
        "text": "Amy said, \"We must be very quiet.\" They sat down and waited for the mother. The egg moved a little. Then it moved more.",
        "translation": "艾米说：“我们必须非常安静。”他们坐下来，等着恐龙妈妈。蛋动了一下，接着又动得更厉害了。"
      },
      {
        "text": "Boom! Boom! A big dinosaur walked out. She was the biggest animal in the valley. The mother looked at the egg. Then she looked at Tim and Amy.",
        "translation": "砰！砰！一只大恐龙走了出来。她是山谷里最大的动物。恐龙妈妈看了看那个蛋，然后又看了看蒂姆和艾米。"
      },
      {
        "text": "\"We did not touch your egg,\" said Tim. The big dinosaur made a soft, happy sound. She pushed the egg with her long nose. \"She is the best mother here,\" said Amy.",
        "translation": "“我们没有碰你的蛋，”蒂姆说。大恐龙发出了温柔又开心的声音。她用长长的鼻子推了推那个蛋。“她是这儿最好的妈妈，”艾米说。"
      },
      {
        "text": "Then Tim and Amy walked back home. They were tired but very happy. \"This was the most wonderful day!\" said Amy. \"Dino Valley is a wonderful place,\" said Tim.",
        "translation": "然后蒂姆和艾米走回了家。他们很累，但非常开心。“这是最美好的一天！”艾米说。“恐龙谷是个美妙的地方，”蒂姆说。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Tim and Amy see in the wet mud?",
        "audioText": "What did Tim and Amy see in the wet mud?",
        "options": [
          {
            "emoji": "🦶",
            "value": "footprints",
            "text": "Footprints"
          },
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "A flower"
          },
          {
            "emoji": "🪨",
            "value": "rock",
            "text": "A rock"
          }
        ],
        "answer": "footprints"
      },
      {
        "type": "image_choice",
        "question": "What did the mother dinosaur push with her nose?",
        "audioText": "What did the mother dinosaur push with her nose?",
        "options": [
          {
            "emoji": "🥚",
            "value": "egg",
            "text": "The egg"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tree"
          },
          {
            "emoji": "🥤",
            "value": "cup",
            "text": "A cup"
          }
        ],
        "answer": "egg"
      },
      {
        "type": "word_builder",
        "word": "biggest",
        "audioText": "biggest"
      },
      {
        "type": "word_builder",
        "word": "dinosaur",
        "audioText": "dinosaur"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "egg",
          "was",
          "as",
          "big",
          "as",
          "a",
          "ball."
        ],
        "audioText": "The egg was as big as a ball."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was warm ___ the sun was hot.",
        "choices": [
          "because",
          "but",
          "so"
        ],
        "answer": "because",
        "audioText": "It was warm because the sun was hot."
      }
    ]
  },
  {
    "id": "xsc-r5-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 5,
    "title": "Little Pip's Big Day",
    "titleCn": "小皮普的大日子",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Last week, a small dinosaur came to Dino Valley. His name was Pip. He was the smallest dinosaur there. Pip had no friends because he was new.",
        "translation": "上周，一只小恐龙来到了恐龙谷。他叫皮普。他是那里最小的恐龙。皮普没有朋友，因为他是新来的。"
      },
      {
        "text": "The big dinosaurs played near the tallest tree. They were too busy to see little Pip. Pip felt sad because nobody played with him.",
        "translation": "大恐龙们在最高的那棵树旁玩耍。他们太忙了，没有看见小皮普。皮普很难过，因为没有人跟他玩。"
      },
      {
        "text": "Then a baby dinosaur got lost in the valley. He cried and looked for his mother. Pip ran to help him at once.",
        "translation": "这时，一只恐龙宝宝在谷里迷了路。他哭着找妈妈。皮普立刻跑去帮忙。"
      },
      {
        "text": "Pip took the baby to the biggest hill. From there, they saw the baby's home. His mother ran to him and said thank you.",
        "translation": "皮普把宝宝带到了最大的那座小山上。从那里，他们看见了宝宝的家。他的妈妈跑过来，说了声谢谢。"
      },
      {
        "text": "\"You are the kindest dinosaur in Dino Valley,\" she said. All the big dinosaurs came to Pip. They smiled and said, \"Welcome, little friend!\"",
        "translation": "“你是恐龙谷里最善良的恐龙。”她说。所有的大恐龙都来到皮普身边。他们笑着说：“欢迎你，小朋友！”"
      },
      {
        "text": "Pip was happy because he had many friends now. He was the smallest, but also the kindest. Dino Valley was the best home for him.",
        "translation": "皮普很开心，因为现在他有很多朋友了。他是最小的，但也是最善良的。恐龙谷是他最好的家。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Who was the smallest dinosaur in Dino Valley?",
        "audioText": "Who was the smallest dinosaur in Dino Valley?",
        "options": [
          {
            "emoji": "🦕",
            "value": "pip",
            "text": "Pip"
          },
          {
            "emoji": "🦖",
            "value": "big",
            "text": "The big dinosaurs"
          },
          {
            "emoji": "🐣",
            "value": "baby",
            "text": "The baby dinosaur"
          }
        ],
        "answer": "pip"
      },
      {
        "type": "image_choice",
        "question": "Where did Pip take the baby dinosaur?",
        "audioText": "Where did Pip take the baby dinosaur?",
        "options": [
          {
            "emoji": "⛰️",
            "value": "hill",
            "text": "The biggest hill"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "The tallest tree"
          },
          {
            "emoji": "🏠",
            "value": "home",
            "text": "The baby's home"
          }
        ],
        "answer": "hill"
      },
      {
        "type": "word_builder",
        "word": "smallest",
        "audioText": "smallest"
      },
      {
        "type": "word_builder",
        "word": "friend",
        "audioText": "friend"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Pip",
          "felt",
          "sad",
          "because",
          "nobody",
          "played",
          "with",
          "him."
        ],
        "audioText": "Pip felt sad because nobody played with him."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You are the ___ dinosaur in Dino Valley.",
        "choices": [
          "kindest",
          "tallest",
          "biggest"
        ],
        "answer": "kindest",
        "audioText": "You are the kindest dinosaur in Dino Valley."
      }
    ]
  },
  {
    "id": "xsc-r5-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 6,
    "title": "The Fastest Runner in Dino Valley",
    "titleCn": "恐龙谷里跑得最快的恐龙",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Last summer, Mia and Ben visited Dino Valley. It was the largest park in their country. Many dinosaurs lived there long, long ago.",
        "translation": "去年夏天，米娅和本去了恐龙谷。那是他们国家里最大的公园。很久很久以前，许多恐龙就住在这里。"
      },
      {
        "text": "A small dinosaur ran out of the trees. It was the fastest dinosaur in the valley. Its name was Zip. Zip loved to run every morning.",
        "translation": "一只小恐龙从树林里跑了出来。它是山谷里跑得最快的恐龙。它的名字叫 Zip。Zip 每天早晨都喜欢奔跑。"
      },
      {
        "text": "Mia and Ben followed Zip to the lake. The lake was the most beautiful place there. Three big dinosaurs drank water near them. They walked slowly because they were very heavy.",
        "translation": "米娅和本跟着 Zip 来到湖边。这个湖是那儿最美的地方。三只大恐龙在附近喝水。它们走得很慢，因为它们非常重。"
      },
      {
        "text": "Zip wanted to race the big dinosaurs. Mia said, \"You are fast, but they are strong.\" Zip ran around the lake three times. The big dinosaurs did not move at all.",
        "translation": "Zip 想和那几只大恐龙赛跑。米娅说：“你跑得快，但它们很强壮。” Zip 绕着湖跑了三圈。大恐龙们却一动也不动。"
      },
      {
        "text": "Then Zip climbed a small green hill. From the top, the whole valley looked wonderful. \"This is the best day ever!\" Ben said. Mia laughed because it was true.",
        "translation": "然后 Zip 爬上了一座绿色的小山。从山顶望去，整个山谷美极了。“这是最棒的一天！”本说。米娅笑了，因为他说得没错。"
      },
      {
        "text": "The sun went down and the sky turned orange. The children said goodbye to their small friend. \"You are the fastest runner in Dino Valley,\" Mia said. Zip smiled and ran home happily. It was the happiest day of their trip.",
        "translation": "太阳落下去了，天空变成了橘红色。孩子们向他们的小朋友道别。“你是恐龙谷里跑得最快的小家伙。”米娅说。Zip 笑了，开心地跑回了家。那是他们这次旅行中最快乐的一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Zip love to do every morning?",
        "audioText": "What did Zip love to do every morning?",
        "options": [
          {
            "emoji": "🏃",
            "value": "run",
            "text": "Run"
          },
          {
            "emoji": "😴",
            "value": "sleep",
            "text": "Sleep"
          },
          {
            "emoji": "🍽️",
            "value": "eat",
            "text": "Eat"
          }
        ],
        "answer": "run"
      },
      {
        "type": "image_choice",
        "question": "What did the three big dinosaurs do at the lake?",
        "audioText": "What did the three big dinosaurs do at the lake?",
        "options": [
          {
            "emoji": "💧",
            "value": "drink",
            "text": "Drink water"
          },
          {
            "emoji": "🎤",
            "value": "sing",
            "text": "Sing songs"
          },
          {
            "emoji": "🏊",
            "value": "swim",
            "text": "Swim in the lake"
          }
        ],
        "answer": "drink"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "the",
          "fastest",
          "dinosaur",
          "in",
          "the",
          "valley."
        ],
        "audioText": "It was the fastest dinosaur in the valley."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They walked slowly ___ they were very heavy.",
        "choices": [
          "because",
          "but",
          "so"
        ],
        "answer": "because",
        "audioText": "They walked slowly because they were very heavy."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The lake was the most ___ place there.",
        "choices": [
          "beautiful",
          "fast",
          "heavy"
        ],
        "answer": "beautiful",
        "audioText": "The lake was the most beautiful place there."
      },
      {
        "type": "word_builder",
        "word": "fastest",
        "audioText": "fastest"
      }
    ]
  },
  {
    "id": "xsc-r5-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 7,
    "title": "The Longest Walk in Dino Valley",
    "titleCn": "恐龙谷最漫长的一次远行",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Pip was the smallest dinosaur in Dino Valley. He had short legs and a long tail. Every morning he ran to the river with his big friends. He was always the last one there. His legs were short, so he was slow.",
        "translation": "皮普是恐龙谷里最小的恐龙。他的腿很短，尾巴很长。每天早晨，他都跟着大块头的朋友们跑到河边。他总是最后一个到那儿。他的腿短，所以跑得慢。"
      },
      {
        "text": "One hot morning, the river dried up. The big dinosaurs looked at the sky. They were worried because there was no water. \"We must find some,\" said Pip quietly.",
        "translation": "一个炎热的早晨，河水干涸了。大恐龙们抬头望着天空。它们很担心，因为没有水了。“我们得去找水。”皮普轻轻地说。"
      },
      {
        "text": "Pip started the longest walk of his life. He went past the tallest trees and biggest rocks. His short legs hurt, but he did not stop. He sang a little song to feel brave.",
        "translation": "皮普开始了这辈子最长的一次远行。他走过最高的树，绕过最大的石头。他的小腿很疼，但他没有停下。他唱起一首小歌，让自己变得勇敢。"
      },
      {
        "text": "On the way, he met an old turtle. She was the slowest animal in the valley. \"You are small,\" she said, \"but your heart is the strongest.\" Pip smiled and walked on.",
        "translation": "路上，他遇到了一只年老的乌龟。她是谷里最慢的动物。“你个头很小，”她说，“可你的心最坚强。”皮普笑了笑，继续往前走。"
      },
      {
        "text": "At last, Pip found a small lake behind the hills. The water was the sweetest he ever tasted. He ran home as fast as he could. All the dinosaurs drank and thanked him.",
        "translation": "终于，皮普在山丘后面发现了一个小湖。那是他喝过的最甜的水。他用最快的速度跑回家。所有的恐龙都喝到了水，向他道谢。"
      },
      {
        "text": "That night, everyone said Pip was the bravest in the valley. He was still the smallest, but also the happiest. \"Size is not important,\" he said, \"because a small friend can do big things.\"",
        "translation": "那天晚上，大家都说皮普是谷里最勇敢的恐龙。他依然是最小的，也是最快乐的。“个头大小并不重要，”他说，“因为小小的朋友也能做成大事。”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Who did Pip meet on the way?",
        "audioText": "Who did Pip meet on the way?",
        "options": [
          {
            "emoji": "🐢",
            "value": "turtle",
            "text": "An old turtle"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A little bird"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A big fish"
          }
        ],
        "answer": "turtle"
      },
      {
        "type": "word_builder",
        "word": "smallest",
        "audioText": "smallest"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "water",
          "was",
          "the",
          "sweetest",
          "he",
          "ever",
          "tasted."
        ],
        "audioText": "The water was the sweetest he ever tasted."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They were worried ___ there was no water.",
        "choices": [
          "because",
          "but",
          "so"
        ],
        "answer": "because",
        "audioText": "They were worried because there was no water."
      },
      {
        "type": "image_choice",
        "question": "What did Pip find behind the hills?",
        "audioText": "What did Pip find behind the hills?",
        "options": [
          {
            "emoji": "💧",
            "value": "lake",
            "text": "A small lake"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tall tree"
          },
          {
            "emoji": "🪨",
            "value": "rock",
            "text": "A big rock"
          }
        ],
        "answer": "lake"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Pip ___ the longest walk of his life.",
        "choices": [
          "started",
          "starts",
          "starting"
        ],
        "answer": "started",
        "audioText": "Pip started the longest walk of his life."
      }
    ]
  },
  {
    "id": "xsc-r5-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 8,
    "title": "Momo and the Blue Stone",
    "titleCn": "莫莫和蓝石头",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Last Saturday, Momo walked to the hills with his friend Lily. The hills were far away. Momo was the smallest dinosaur in his family. But he was brave and happy.",
        "translation": "上周六，莫莫和好朋友莉莉一起走到了山丘那边。山丘离家很远。莫莫是家里最小的恐龙，可他既勇敢又快乐。"
      },
      {
        "text": "Behind some tall trees, they found a big cave. It was dark and cold inside. Lily said, \"This is the oldest cave here.\"",
        "translation": "在高高的树后面，他们发现了一个大山洞。洞里又黑又冷。莉莉说：“这是这儿最古老的山洞。”"
      },
      {
        "text": "They walked in slowly because they were a little afraid. Then they saw old pictures on the wall. The pictures were the most amazing thing in the valley. They showed big dinosaurs and blue rivers.",
        "translation": "他们因为有点儿害怕，所以慢慢地走了进去。接着，他们看到了墙上的古老图画。那些图画是山谷里最神奇的东西。画上有大恐龙和蓝色的河流。"
      },
      {
        "text": "Near the wall, Momo found a small blue stone. It was the most beautiful stone in Dino Valley. Momo put it in his bag.",
        "translation": "在墙边，莫莫发现了一块小小的蓝石头。那是恐龙谷里最漂亮的石头。莫莫把它放进了自己的包里。"
      },
      {
        "text": "Suddenly, a loud sound came from outside. It was the loudest roar of the day. They ran out quickly because they felt afraid.",
        "translation": "突然，外面传来一声巨响。那是那一天最响亮的吼叫声。他们因为害怕，飞快地跑了出来。"
      },
      {
        "text": "Outside, Grandpa Dino was waiting for them. \"That was my loudest roar!\" he said with a smile. Momo laughed and showed him the blue stone. \"This cave is the oldest place in the valley,\" said Grandpa. \"Please keep it a secret.\"",
        "translation": "洞外，恐龙爷爷正在等他们。“那是我最响亮的吼声！”他笑着说。莫莫也笑了，把蓝石头拿给他看。“这个山洞是山谷里最古老的地方，”爷爷说，“请你们保守这个秘密。”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did Momo and Lily find the cave?",
        "audioText": "Where did Momo and Lily find the cave?",
        "options": [
          {
            "emoji": "🌳",
            "value": "trees",
            "text": "Behind tall trees"
          },
          {
            "emoji": "🏠",
            "value": "home",
            "text": "Near their home"
          },
          {
            "emoji": "🌊",
            "value": "river",
            "text": "Under a river"
          }
        ],
        "answer": "trees"
      },
      {
        "type": "image_choice",
        "question": "How was the cave inside?",
        "audioText": "How was the cave inside?",
        "options": [
          {
            "emoji": "❄️",
            "value": "cold",
            "text": "Dark and cold"
          },
          {
            "emoji": "☀️",
            "value": "warm",
            "text": "Warm and bright"
          },
          {
            "emoji": "🎵",
            "value": "noisy",
            "text": "Loud and noisy"
          }
        ],
        "answer": "cold"
      },
      {
        "type": "word_builder",
        "word": "brave",
        "audioText": "brave"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "ran",
          "out",
          "quickly",
          "because",
          "they",
          "felt",
          "afraid."
        ],
        "audioText": "They ran out quickly because they felt afraid."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "This cave is the ___ place in the valley.",
        "choices": [
          "oldest",
          "old",
          "older"
        ],
        "answer": "oldest",
        "audioText": "This cave is the oldest place in the valley."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Momo put the blue stone in his ___.",
        "choices": [
          "bag",
          "cave",
          "hill"
        ],
        "answer": "bag",
        "audioText": "Momo put the blue stone in his bag."
      }
    ]
  },
  {
    "id": "xsc-r5-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 9,
    "title": "The Smallest Dinosaur in Dino Valley",
    "titleCn": "恐龙谷里最小的恐龙",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "Lily and Ben walked into Dino Valley last Saturday. The sun was warm and bright. They heard a small sound near a rock. It was the smallest voice in the valley.",
        "translation": "上周六，莉莉和本走进了恐龙谷。阳光温暖又明亮。他们在一块岩石旁听到一个很轻的声音。那是山谷里最小的声音。"
      },
      {
        "text": "Behind the rock, they found a little dinosaur. It was smaller than a chicken and very cute. Its name was Pip, and it looked sad. \"Why are you crying?\" Ben asked the little dinosaur.",
        "translation": "在岩石后面，他们发现了一只小恐龙。它比小鸡还小，非常可爱。它叫皮普，看上去很伤心。\"你为什么哭呀？\"本问这只小恐龙。"
      },
      {
        "text": "\"I am the smallest dinosaur here,\" said Pip. \"I lost my family because I ran too far.\" Lily smiled and said, \"We can help you.\"",
        "translation": "\"我是这里最小的恐龙，\"皮普说。\"我跑得太远了，所以找不到家人了。\"莉莉笑着说：\"我们可以帮你。\""
      },
      {
        "text": "They walked past the longest river. Pip was the slowest walker, so they walked slowly. Then they heard a loud call from the hills. It was the loudest sound of the day.",
        "translation": "他们走过了最长的那条河。皮普是走得最慢的，所以他们走得很慢。接着，他们听到山那边传来响亮的叫声。那是那天最响亮的声音。"
      },
      {
        "text": "Pip's mother stood near a warm nest. She was the happiest dinosaur in the valley. Pip ran to her because he missed her. \"Thank you!\" said Pip's mother with a big smile.",
        "translation": "皮普的妈妈站在一个温暖的巢旁边。她是山谷里最快乐的恐龙。皮普朝她跑过去，因为他很想她。\"谢谢你们！\"皮普的妈妈笑得很开心。"
      },
      {
        "text": "Lily and Ben walked home in the evening. It was the most exciting day of their trip. Small friends can have the biggest hearts.",
        "translation": "傍晚，莉莉和本走回家。这是他们这次旅行中最精彩的一天。小小的朋友也能有最大的心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily and Ben find behind the rock?",
        "audioText": "What did Lily and Ben find behind the rock?",
        "options": [
          {
            "emoji": "🦕",
            "value": "dinosaur",
            "text": "A small dinosaur"
          },
          {
            "emoji": "🥚",
            "value": "egg",
            "text": "A big egg"
          },
          {
            "emoji": "🦶",
            "value": "footprint",
            "text": "A big footprint"
          }
        ],
        "answer": "dinosaur"
      },
      {
        "type": "image_choice",
        "question": "What can small friends have?",
        "audioText": "What can small friends have?",
        "options": [
          {
            "emoji": "💗",
            "value": "hearts",
            "text": "Big hearts"
          },
          {
            "emoji": "🦶",
            "value": "feet",
            "text": "Big feet"
          },
          {
            "emoji": "🔊",
            "value": "voices",
            "text": "Loud voices"
          }
        ],
        "answer": "hearts"
      },
      {
        "type": "word_builder",
        "word": "smallest",
        "audioText": "smallest"
      },
      {
        "type": "word_builder",
        "word": "slowest",
        "audioText": "slowest"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Pip",
          "ran",
          "to",
          "her",
          "because",
          "he",
          "missed",
          "her."
        ],
        "audioText": "Pip ran to her because he missed her."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Pip was the ___ walker, so they walked slowly.",
        "choices": [
          "slow",
          "slowest",
          "slower"
        ],
        "answer": "slowest",
        "audioText": "Pip was the slowest walker, so they walked slowly."
      }
    ]
  },
  {
    "id": "xsc-r5-s10",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 10,
    "title": "The Darkest Cave in Dino Valley",
    "titleCn": "恐龙谷里最黑的洞穴",
    "coverEmoji": "🕳️",
    "paragraphs": [
      {
        "text": "Last week, Dino Valley had a big surprise. A loud wind opened a hole in the hill. Little Pip looked inside the hole. \"This is the darkest cave in the valley!\" he said.",
        "translation": "上周，恐龙谷发生了一件大事。一阵大风在山丘上吹开了一个洞。小皮普朝洞里看了看。“这是山谷里最黑的洞穴！”他说。"
      },
      {
        "text": "Pip called his friends Rex and Mia. They came with a long rope and a lamp. \"We can go in because we are brave,\" said Rex. Then they walked slowly into the dark cave.",
        "translation": "皮普叫来了他的朋友雷克斯和米娅。他们带来了一根长绳和一盏灯。“我们能进去，因为我们很勇敢。”雷克斯说。然后他们慢慢走进了黑黑的洞穴。"
      },
      {
        "text": "Inside, the cave was cool and quiet. They saw old pictures on the stone wall. The pictures showed the biggest dinosaurs of long ago. \"This is the oldest story in Dino Valley,\" said Mia.",
        "translation": "洞里又凉又安静。他们看见石壁上有古老的图画。那些图画画的是很久以前最大的恐龙。“这是恐龙谷里最古老的故事。”米娅说。"
      },
      {
        "text": "Suddenly, the lamp went out. Everything was black and Pip felt afraid. He was afraid because he could not see. Then Rex found a little light in the corner. It was the most beautiful blue stone!",
        "translation": "突然，灯灭了。四周一片漆黑，皮普感到害怕。他害怕是因为他什么也看不见。接着，雷克斯在角落里发现了一点亮光。那是一块最美丽的蓝色石头！"
      },
      {
        "text": "The blue stone made the cave bright. The friends walked to the end of the cave. There they found a huge fossil egg. It was the heaviest egg in the world!",
        "translation": "那块蓝色石头把洞穴照得亮亮的。朋友们一直走到了洞穴的尽头。在那里，他们发现了一枚巨大的化石蛋。这是世界上最重的蛋！"
      },
      {
        "text": "They ran home and told Grandpa Dino. He smiled and said, \"You are the bravest kids in the valley.\" That night, Pip slept well because he was happy.",
        "translation": "他们跑回家，把这件事告诉了恐龙爷爷。他笑着说：“你们是山谷里最勇敢的孩子。”那天晚上，皮普睡得很香，因为他很开心。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What opened a hole in the hill?",
        "audioText": "What opened a hole in the hill?",
        "options": [
          {
            "emoji": "💨",
            "value": "wind",
            "text": "A wind"
          },
          {
            "emoji": "🦖",
            "value": "dino",
            "text": "A dinosaur"
          },
          {
            "emoji": "🌧️",
            "value": "rain",
            "text": "Rain"
          }
        ],
        "answer": "wind"
      },
      {
        "type": "image_choice",
        "question": "What did the friends see on the stone wall?",
        "audioText": "What did the friends see on the stone wall?",
        "options": [
          {
            "emoji": "🖼️",
            "value": "pictures",
            "text": "Old pictures"
          },
          {
            "emoji": "🔢",
            "value": "numbers",
            "text": "Big numbers"
          },
          {
            "emoji": "📝",
            "value": "words",
            "text": "New words"
          }
        ],
        "answer": "pictures"
      },
      {
        "type": "word_builder",
        "word": "brave",
        "audioText": "brave"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "saw",
          "old",
          "pictures",
          "on",
          "the",
          "stone",
          "wall."
        ],
        "audioText": "They saw old pictures on the stone wall."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The blue stone ___ the cave bright.",
        "choices": [
          "made",
          "make",
          "makes"
        ],
        "answer": "made",
        "audioText": "The blue stone made the cave bright."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Pip felt afraid ___ he could not see.",
        "choices": [
          "because",
          "but",
          "or"
        ],
        "answer": "because",
        "audioText": "Pip felt afraid because he could not see."
      }
    ]
  },
  {
    "id": "xsc-r5-s11",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 11,
    "title": "The Best View in Dino Valley",
    "titleCn": "恐龙谷里最美的风景",
    "coverEmoji": "🦕",
    "paragraphs": [
      {
        "text": "One morning, little Rex found an old map. The map showed a hill near the lake.",
        "translation": "一天早上，小雷克斯找到了一张旧地图。地图上画着湖附近的一座小山。"
      },
      {
        "text": "Rex wanted the best view of the valley. He asked Grandpa, because Grandpa knew every place. \"The highest hill is behind the lake,\" he said.",
        "translation": "雷克斯想看看恐龙谷最美的风景。他去问爷爷，因为爷爷认得每一处地方。“最高的山就在湖后面，”爷爷说。"
      },
      {
        "text": "Rex walked with his friend Pip for hours. They crossed a river and climbed big rocks. Pip was tired because the rocks were hot.",
        "translation": "雷克斯和他的朋友皮普走了好几个小时。他们蹚过一条小河，还爬上了一些大石头。皮普累了，因为那些石头又烫又热。"
      },
      {
        "text": "At last, they stood on the highest hill. It was the most beautiful view of all. Below them were the lake, trees, and hills.",
        "translation": "终于，他们站在了最高的那座山上。那是所有风景中最美的一幅。在他们脚下，是湖泊、树木和小山。"
      },
      {
        "text": "\"This is the best day,\" Rex said to Pip. Good things are better when you share them. Then they went home and told Grandpa everything.",
        "translation": "“这是最好的一天，”雷克斯对皮普说。好东西和别人一起分享会更好。然后他们回到家，把一切都讲给爷爷听。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Rex find one morning?",
        "audioText": "What did Rex find one morning?",
        "options": [
          {
            "emoji": "🗺️",
            "value": "map",
            "text": "A map"
          },
          {
            "emoji": "🥚",
            "value": "egg",
            "text": "An egg"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "A balloon"
          }
        ],
        "answer": "map"
      },
      {
        "type": "image_choice",
        "question": "What did Rex and Pip see below the hill?",
        "audioText": "What did Rex and Pip see below the hill?",
        "options": [
          {
            "emoji": "🏞️",
            "value": "lake",
            "text": "A lake"
          },
          {
            "emoji": "🕳️",
            "value": "cave",
            "text": "A cave"
          },
          {
            "emoji": "⛵",
            "value": "boat",
            "text": "A boat"
          }
        ],
        "answer": "lake"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The ___ hill is behind the lake.",
        "choices": [
          "highest",
          "high",
          "higher"
        ],
        "answer": "highest",
        "audioText": "The highest hill is behind the lake."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Pip was tired ___ the rocks were hot.",
        "choices": [
          "because",
          "but",
          "so"
        ],
        "answer": "because",
        "audioText": "Pip was tired because the rocks were hot."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "the",
          "most",
          "beautiful",
          "view",
          "of",
          "all."
        ],
        "audioText": "It was the most beautiful view of all."
      },
      {
        "type": "word_builder",
        "word": "valley",
        "audioText": "valley"
      }
    ]
  },
  {
    "id": "xsc-r5-s12",
    "track": "xiaoshengchu",
    "regionId": "xsc-r5",
    "order": 12,
    "title": "The Deepest Cave in Dino Valley",
    "titleCn": "恐龙谷最深的洞穴",
    "coverEmoji": "🕳️",
    "paragraphs": [
      {
        "text": "Last week, Tio found an old map. The map showed the deepest cave in Dino Valley. \"Let's go there!\" Tio said to his two friends. His friends, Momo and Rex, said yes.",
        "translation": "上周，蒂奥发现了一张旧地图。地图上标着恐龙谷最深的洞穴。“我们去那儿吧！”蒂奥对他的两个朋友说。他的朋友莫莫和雷克斯答应了。"
      },
      {
        "text": "They passed the tallest trees and the biggest rocks. The cave was dark and very cold inside. Tio felt a little afraid because it was so dark. But his friends said, \"We are with you.\"",
        "translation": "他们走过最高的树和最大的石头。洞里又黑又冷。蒂奥有点害怕，因为里面太黑了。但朋友们说：“我们陪着你呢。”"
      },
      {
        "text": "They went into the cave very slowly. Rex found a long rope near the door. Momo held the rope because she was the strongest. They climbed down and down for a long time.",
        "translation": "他们慢慢地走进洞里。雷克斯在洞口附近找到一根长绳子。莫莫抓着绳子，因为她最强壮。他们往下爬了很久很久。"
      },
      {
        "text": "At the bottom, they found a beautiful blue lake. It was the most quiet place in the valley. Small lights shone on the water like stars. The friends sat down and ate sweet apples.",
        "translation": "在洞底，他们发现了一个美丽的蓝色湖泊。这是山谷里最安静的地方。小小的光点在水面上闪烁，像星星一样。朋友们坐下来，吃着甜甜的苹果。"
      },
      {
        "text": "Then Tio heard a soft sound behind a rock. A baby dinosaur was sleeping there. It was the smallest dinosaur in the valley. They gave it apples and it smiled at them.",
        "translation": "这时，蒂奥听到一块石头后面传来轻轻的声音。一只恐龙宝宝正睡在那儿。它是山谷里最小的恐龙。他们给了它苹果，它朝他们笑了。"
      },
      {
        "text": "They walked home and told everyone about the cave. It was the best day of their lives. Tio said, \"I am not afraid because I have good friends.\"",
        "translation": "他们走回家，把洞穴的事讲给每个人听。这是他们一生中最棒的一天。蒂奥说：“我不害怕，因为我有好朋友。”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Tio find last week?",
        "audioText": "What did Tio find last week?",
        "options": [
          {
            "emoji": "🗺️",
            "value": "map",
            "text": "A map"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "🪢",
            "value": "rope",
            "text": "A rope"
          }
        ],
        "answer": "map"
      },
      {
        "type": "image_choice",
        "question": "What was sleeping behind the rock?",
        "audioText": "What was sleeping behind the rock?",
        "options": [
          {
            "emoji": "🦕",
            "value": "dino",
            "text": "A baby dinosaur"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A fish"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A bird"
          }
        ],
        "answer": "dino"
      },
      {
        "type": "word_builder",
        "word": "deepest",
        "audioText": "deepest"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "cave",
          "was",
          "dark",
          "and",
          "very",
          "cold",
          "inside."
        ],
        "audioText": "The cave was dark and very cold inside."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They passed the ___ trees and the biggest rocks.",
        "choices": [
          "tallest",
          "taller",
          "tall"
        ],
        "answer": "tallest",
        "audioText": "They passed the tallest trees and the biggest rocks."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Tio felt a little afraid ___ it was so dark.",
        "choices": [
          "because",
          "but",
          "so"
        ],
        "answer": "because",
        "audioText": "Tio felt a little afraid because it was so dark."
      }
    ]
  },
  {
    "id": "xsc-r6-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 1,
    "title": "My Home in Space",
    "titleCn": "我在太空的家",
    "coverEmoji": "🚀",
    "paragraphs": [
      {
        "text": "My name is Lily. I am ten years old. I want to be a young scientist. One day, I will live on a space station.",
        "translation": "我叫莉莉。我十岁了。我想成为一名小科学家。总有一天，我会住进太空站。"
      },
      {
        "text": "The space station is a big home in space. It goes around the Earth very fast. Astronauts live and work inside it. They must keep it clean and safe.",
        "translation": "太空站是太空里的一个大大的家。它绕着地球飞快地转。宇航员在里面生活和工作。他们必须让它保持干净、安全。"
      },
      {
        "text": "Everything floats up here. Water floats like a small ball. You should drink it with a straw. Your food could fly away too!",
        "translation": "在这里，什么东西都会飘起来。水会飘成一个小球。你应该用吸管把它喝掉。你的食物也可能会飞走哦！"
      },
      {
        "text": "We will grow plants in a small lab. We will watch the stars from the window. A robot will help us every day. It will clean the floor and cook.",
        "translation": "我们要在一个小实验室里种植物。我们要从窗户看星星。一个机器人每天都会帮我们。它会擦地板，还会做饭。"
      },
      {
        "text": "At night, we sleep in a small bag. We must tie it to the wall. Then we will not float away. Outside, the stars look big and near.",
        "translation": "晚上，我们睡在一个小睡袋里。我们必须把它固定在墙上。这样我们就不会飘走了。外面，星星看上去又大又近。"
      },
      {
        "text": "In the future, more people will visit space. Maybe you will come with me. We should take care of the Earth. It is our first and best home.",
        "translation": "未来，会有更多人来太空做客。也许你会和我一起来。我们应该爱护地球。它是我们最初也是最好的家园。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which one goes around the Earth very fast?",
        "audioText": "Which one goes around the Earth very fast?",
        "options": [
          {
            "emoji": "🛰️",
            "value": "station",
            "text": "The space station"
          },
          {
            "emoji": "🌙",
            "value": "moon",
            "text": "The moon"
          },
          {
            "emoji": "☀️",
            "value": "sun",
            "text": "The sun"
          }
        ],
        "answer": "station"
      },
      {
        "type": "image_choice",
        "question": "Where do they sleep at night?",
        "audioText": "Where do they sleep at night?",
        "options": [
          {
            "emoji": "🎒",
            "value": "bag",
            "text": "In a small bag"
          },
          {
            "emoji": "🛏️",
            "value": "bed",
            "text": "In a big bed"
          },
          {
            "emoji": "🪑",
            "value": "chair",
            "text": "On a chair"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "word_builder",
        "word": "station",
        "audioText": "station"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "must",
          "keep",
          "it",
          "clean",
          "and",
          "safe."
        ],
        "audioText": "They must keep it clean and safe."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "One day, I will ___ on a space station.",
        "choices": [
          "live",
          "lives",
          "living"
        ],
        "answer": "live",
        "audioText": "One day, I will live on a space station."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A robot ___ help us every day.",
        "choices": [
          "will",
          "is",
          "are"
        ],
        "answer": "will",
        "audioText": "A robot will help us every day."
      }
    ]
  },
  {
    "id": "xsc-r6-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 2,
    "title": "A Garden in Space",
    "titleCn": "太空里的小菜园",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Look up at the sky tonight. You will see a bright light moving. That is our new space station! It goes around the Earth very fast.",
        "translation": "今晚抬头看看天空。你会看见一道明亮的光在移动。那就是我们新的太空站！它绕着地球飞快地转。"
      },
      {
        "text": "Life here is very different from home. We must keep everything clean and safe. We should drink water from special bags. We could not open a window here!",
        "translation": "这里的生活和家里很不一样。我们必须让一切都干净又安全。我们要用特制的水袋喝水。在这儿可不能打开窗户！"
      },
      {
        "text": "This week we will start a small garden. Little green plants will grow in space. We must give them light and water. My friend Ben will check them every morning.",
        "translation": "这周我们要种一个小菜园。绿色的小植物会在太空里长大。我们必须给它们光和水分。我的朋友本每天早上都会照看它们。"
      },
      {
        "text": "Ben is a young scientist from our school. He should write down how tall they are. He will send the numbers to Earth. Our teacher will read them and smile.",
        "translation": "本是我们学校的小科学家。他应该记下它们长多高了。他会把这些数字发回地球。老师读到这些数字时会笑起来。"
      },
      {
        "text": "In the future we will eat fresh salad. Maybe we could grow more food up here. Space food will be better and better. One day you will visit us too!",
        "translation": "将来我们会在太空里吃到新鲜的沙拉。也许我们还能在这里种出更多食物。太空食品会越来越好。有一天你也会来看我们！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What will you see moving in the sky tonight?",
        "audioText": "What will you see moving in the sky tonight?",
        "options": [
          {
            "emoji": "💡",
            "value": "light",
            "text": "A bright light"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A big fish"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tall tree"
          }
        ],
        "answer": "light"
      },
      {
        "type": "image_choice",
        "question": "Where will the little green plants grow?",
        "audioText": "Where will the little green plants grow?",
        "options": [
          {
            "emoji": "🚀",
            "value": "space",
            "text": "In space"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "In a school"
          },
          {
            "emoji": "🛒",
            "value": "shop",
            "text": "In a shop"
          }
        ],
        "answer": "space"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "You",
          "will",
          "see",
          "a",
          "bright",
          "light",
          "moving."
        ],
        "audioText": "You will see a bright light moving."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Little",
          "green",
          "plants",
          "will",
          "grow",
          "in",
          "space."
        ],
        "audioText": "Little green plants will grow in space."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In the future we will eat fresh ___ up here.",
        "choices": [
          "salad",
          "bags",
          "light"
        ],
        "answer": "salad",
        "audioText": "In the future we will eat fresh salad up here."
      }
    ]
  },
  {
    "id": "xsc-r6-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 3,
    "title": "The Space Train",
    "titleCn": "太空列车",
    "coverEmoji": "🚄",
    "paragraphs": [
      {
        "text": "Sam is a young scientist. He lives on a big space station. The station goes around the Earth.",
        "translation": "萨姆是一位小科学家。他住在一个很大的太空站上。太空站绕着地球飞行。"
      },
      {
        "text": "Every morning Sam looks out of the window. He can see the blue Earth and many stars. Next week he will visit the Moon.",
        "translation": "每天早上，萨姆都会望向窗外。他能看见蓝色的地球和许多星星。下周他要去月球。"
      },
      {
        "text": "How will he go there? A space train will take him. It is very fast and very clean.",
        "translation": "他怎么去那儿呢？一列太空列车会送他去。它非常快，也非常干净。"
      },
      {
        "text": "The space train is fun. But you must follow some rules. You must wear a seat belt. You should keep your bag under the seat. You should not run in the train.",
        "translation": "太空列车很好玩。但你必须遵守一些规则。你必须系好安全带。你应该把包放在座位下面。你不该在列车里跑来跑去。"
      },
      {
        "text": "Sam will do a science test on the Moon. He must take his small robot with him. The robot will help him find rocks. Maybe they could find water there. That could be a big surprise!",
        "translation": "萨姆要在月球上做一次科学测试。他必须带上他的小机器人。机器人会帮他找石头。也许他们能在那里找到水。那可真是个大大的惊喜！"
      },
      {
        "text": "Sam is excited about his trip. He will be a great scientist one day. What will you do in space?",
        "translation": "萨姆对这次旅行特别兴奋。总有一天他会成为一位了不起的科学家。那你会在太空里做什么呢？"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where does Sam live?",
        "audioText": "Where does Sam live?",
        "options": [
          {
            "emoji": "🛰️",
            "value": "station",
            "text": "On a space station"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "In a house"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "In a school"
          }
        ],
        "answer": "station"
      },
      {
        "type": "image_choice",
        "question": "What will Sam visit next week?",
        "audioText": "What will Sam visit next week?",
        "options": [
          {
            "emoji": "🌕",
            "value": "moon",
            "text": "The Moon"
          },
          {
            "emoji": "☀️",
            "value": "sun",
            "text": "The Sun"
          },
          {
            "emoji": "🪐",
            "value": "planet",
            "text": "A far planet"
          }
        ],
        "answer": "moon"
      },
      {
        "type": "word_builder",
        "word": "scientist",
        "audioText": "scientist"
      },
      {
        "type": "word_builder",
        "word": "train",
        "audioText": "train"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "must",
          "take",
          "his",
          "small",
          "robot",
          "with",
          "him."
        ],
        "audioText": "He must take his small robot with him."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You ___ wear a seat belt.",
        "choices": [
          "must",
          "will",
          "are"
        ],
        "answer": "must",
        "audioText": "You must wear a seat belt."
      }
    ]
  },
  {
    "id": "xsc-r6-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 4,
    "title": "Our Robot Friend in Space",
    "titleCn": "我们在太空的机器人朋友",
    "coverEmoji": "🛰️",
    "paragraphs": [
      {
        "text": "Mei is a young scientist in space. She will stay there for six months. Every morning she looks out of the window. The Earth looks like a blue and white ball.",
        "translation": "梅是太空里的一名小科学家。她将在那里待六个月。每天早上，她都从窗户向外望。地球看起来像一个蓝白相间的球。"
      },
      {
        "text": "Today a small robot will arrive at the station. Its name is Lulu. Lulu will help people with their work. It can carry food and clean the rooms.",
        "translation": "今天，一个小机器人将抵达太空站。它的名字叫露露。露露会帮助人们干活。它能搬运食物，还能打扫房间。"
      },
      {
        "text": "Mei wants to teach Lulu something new. \"You must be careful in space,\" she says. \"You should move slowly near the windows.\" Lulu blinks its lights and says, \"I will remember that.\"",
        "translation": "梅想教露露一些新东西。“在太空里你必须小心，”她说。“在窗户附近你应该慢慢移动。”露露眨眨灯光，说：“我会记住的。”"
      },
      {
        "text": "At first Lulu could not walk at all. The floor is strange without gravity. So Mei shows it how to pull and float. Now Lulu moves like a soft balloon.",
        "translation": "一开始，露露根本不会走路。没有重力，地板很奇怪。于是梅教它怎么拉、怎么飘。现在露露动起来像一个软软的气球。"
      },
      {
        "text": "Next week Lulu will help Mei with a test. They will grow small plants in a box. Mei thinks the plants will grow tall. Then everyone will eat fresh salad!",
        "translation": "下周，露露会帮梅做一个实验。她们会在一个盒子里种小植物。梅觉得这些植物会长得很高。到时候大家就能吃上新鲜沙拉了！"
      },
      {
        "text": "One day people will live on many stations. Robots like Lulu will be their good friends. \"Space is big,\" Mei says. \"We must all work together.\"",
        "translation": "将来有一天，人们会生活在很多太空站上。像露露这样的机器人会成为他们的好朋友。“太空很大，”梅说。“我们必须一起努力。”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the Earth look like from the window?",
        "audioText": "What does the Earth look like from the window?",
        "options": [
          {
            "emoji": "🌍",
            "value": "blue",
            "text": "A blue and white ball"
          },
          {
            "emoji": "🔥",
            "value": "red",
            "text": "A red and hot star"
          },
          {
            "emoji": "🟩",
            "value": "green",
            "text": "A green and flat map"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "image_choice",
        "question": "What will Lulu do at the station?",
        "audioText": "What will Lulu do at the station?",
        "options": [
          {
            "emoji": "🍲",
            "value": "carry",
            "text": "Carry food and clean rooms"
          },
          {
            "emoji": "🚀",
            "value": "fly",
            "text": "Fly people to the Moon"
          },
          {
            "emoji": "🎨",
            "value": "paint",
            "text": "Paint pictures of the Earth"
          }
        ],
        "answer": "carry"
      },
      {
        "type": "word_builder",
        "word": "balloon",
        "audioText": "balloon"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "You",
          "must",
          "be",
          "careful",
          "in",
          "space."
        ],
        "audioText": "You must be careful in space."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "will",
          "stay",
          "there",
          "for",
          "six",
          "months."
        ],
        "audioText": "She will stay there for six months."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "One day people will ___ on many stations.",
        "choices": [
          "live",
          "lives",
          "living"
        ],
        "answer": "live",
        "audioText": "One day people will live on many stations."
      }
    ]
  },
  {
    "id": "xsc-r6-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 5,
    "title": "Pip, Our Space Robot",
    "titleCn": "我们的太空机器人皮普",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Hello! I am Leo. I am a young scientist in space. I live on Space Station Blue with my family.",
        "translation": "你好！我是利奥。我是太空里的一名小科学家。我和家人住在蓝色太空站上。"
      },
      {
        "text": "Tomorrow will be a big day for us. A new space bus will arrive at ten. It will bring food, water, and some new books.",
        "translation": "明天对我们来说会是重要的一天。一辆新的太空巴士将在十点到达。它会带来食物、水和一些新书。"
      },
      {
        "text": "My robot Pip and I must check the garden. The plants must have water and light every day. My little sister should help me. But she is sleeping now.",
        "translation": "我和我的机器人皮普必须去检查花园。这些植物每天都必须有水和光。我的小妹妹本该来帮我。可她现在正在睡觉。"
      },
      {
        "text": "Pip could do the work alone. But I want to learn. I will write down every plant in my notebook. A good scientist must ask many questions.",
        "translation": "皮普可以独自完成这些活儿。但我想学着自己做。我会把每一株植物都记在我的笔记本上。好的科学家必须问很多问题。"
      },
      {
        "text": "After lunch, we will wait by the big window. We could see the bus from far away. It will look like a bright, small star.",
        "translation": "午饭后，我们会在那扇大窗户边等着。我们能从很远的地方看见那辆巴士。它看上去会像一颗明亮的小星星。"
      },
      {
        "text": "The bus will stop at our station. I will say hello to the pilot. One day, I will fly a space bus too. What will you do in space?",
        "translation": "巴士会在我们的太空站停下来。我会向飞行员问好。总有一天，我也会驾驶太空巴士。你在太空里会做些什么呢？"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What will the space bus bring to the station?",
        "audioText": "What will the space bus bring to the station?",
        "options": [
          {
            "emoji": "📚",
            "value": "books",
            "text": "Books"
          },
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "🎸",
            "value": "guitar",
            "text": "A guitar"
          }
        ],
        "answer": "books"
      },
      {
        "type": "image_choice",
        "question": "What will the bus look like from far away?",
        "audioText": "What will the bus look like from far away?",
        "options": [
          {
            "emoji": "⭐",
            "value": "star",
            "text": "A bright star"
          },
          {
            "emoji": "🌙",
            "value": "moon",
            "text": "The moon"
          },
          {
            "emoji": "☁️",
            "value": "cloud",
            "text": "A cloud"
          }
        ],
        "answer": "star"
      },
      {
        "type": "word_builder",
        "word": "robot",
        "audioText": "robot"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "A",
          "good",
          "scientist",
          "must",
          "ask",
          "many",
          "questions."
        ],
        "audioText": "A good scientist must ask many questions."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The plants must have water and ___ every day.",
        "choices": [
          "light",
          "milk",
          "music"
        ],
        "answer": "light",
        "audioText": "The plants must have water and light every day."
      }
    ]
  },
  {
    "id": "xsc-r6-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 6,
    "title": "The Space Post Office",
    "titleCn": "太空邮局",
    "coverEmoji": "📮",
    "paragraphs": [
      {
        "text": "Welcome to our little post office in space. Every Monday a small rocket will bring new letters. These letters come from children on Earth. They write to their friends on the station.",
        "translation": "欢迎来到我们设在太空里的小小邮局。每个星期一，一枚小火箭都会送来新的信件。这些信来自地球上的孩子们，他们写信给太空站里的朋友。"
      },
      {
        "text": "Tom is nine years old and he works here. He must wear a big blue suit every day. He should check each letter before it goes out. \"Could you help me, Robot Zip?\" he asks.",
        "translation": "汤姆九岁，在这里工作。他每天必须穿着一件大大的蓝色航天服。每一封信寄出前，他都应该检查一遍。“机器人齐普，你能帮帮我吗？”他问。"
      },
      {
        "text": "Zip is a clever robot with silver arms. It will fly letters to the Moon tonight. The trip is short, so letters will arrive tomorrow. \"You must not lose any letter,\" says Tom.",
        "translation": "齐普是一个聪明的机器人，有一双银色的手臂。今晚它会把信件飞送到月球去。路程很短，所以信件明天就能送到。“你千万不能弄丢任何一封信。”汤姆说。"
      },
      {
        "text": "Today a red letter is for a girl on Mars. She will get it in three days. Tom draws a small star on the letter. \"Every letter should make someone happy,\" he says.",
        "translation": "今天有一封红色的信，是寄给火星上一位女孩的。她三天后就会收到。汤姆在信上画了一颗小星星。“每一封信都应该让某个人开心。”他说。"
      },
      {
        "text": "Next year the post office will be much bigger. More rockets will carry mail to other planets. Tom wants to be a space postman one day. He will write his own letter to Earth soon.",
        "translation": "明年，这家邮局会大得多。会有更多火箭把邮件送到别的星球上。汤姆希望有一天能成为太空邮递员。他很快就要写一封自己的信寄回地球。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the small rocket bring to the post office every Monday?",
        "audioText": "What does the small rocket bring to the post office every Monday?",
        "options": [
          {
            "emoji": "✉️",
            "value": "letters",
            "text": "Letters"
          },
          {
            "emoji": "🍎",
            "value": "food",
            "text": "Food"
          },
          {
            "emoji": "💧",
            "value": "water",
            "text": "Water"
          }
        ],
        "answer": "letters"
      },
      {
        "type": "image_choice",
        "question": "What does Tom draw on the letter for the girl on Mars?",
        "audioText": "What does Tom draw on the letter for the girl on Mars?",
        "options": [
          {
            "emoji": "⭐",
            "value": "star",
            "text": "A star"
          },
          {
            "emoji": "🌙",
            "value": "moon",
            "text": "A moon"
          },
          {
            "emoji": "🤖",
            "value": "robot",
            "text": "A robot"
          }
        ],
        "answer": "star"
      },
      {
        "type": "word_builder",
        "word": "rocket",
        "audioText": "rocket"
      },
      {
        "type": "word_builder",
        "word": "postman",
        "audioText": "postman"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "will",
          "fly",
          "letters",
          "to",
          "the",
          "Moon",
          "tonight."
        ],
        "audioText": "It will fly letters to the Moon tonight."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He ___ wear a big blue suit every day.",
        "choices": [
          "must",
          "could",
          "will"
        ],
        "answer": "must",
        "audioText": "He must wear a big blue suit every day."
      }
    ]
  },
  {
    "id": "xsc-r6-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 7,
    "title": "The Space Mail Rocket",
    "titleCn": "太空邮件火箭",
    "coverEmoji": "🚀",
    "paragraphs": [
      {
        "text": "Lily is a young scientist in space. She works at Space Station Six. People send letters from here to far planets. Every morning she puts on her blue space suit. Her small office looks out at the stars.",
        "translation": "莉莉是一名太空中的小科学家。她在六号太空站工作。人们从这里把信寄往遥远的星球。每天早上，她都会穿上蓝色的宇航服。她的小办公室能看到外面的星星。"
      },
      {
        "text": "Today a big mail rocket will arrive at nine. It will carry letters to Mars. Some letters will go to the Moon too. \"We must be quick,\" says Lily. \"The rocket will not wait for us.\" She puts the letters into a strong box.",
        "translation": "今天九点会有一艘大型邮件火箭到达。它会把信送到火星，有些信也会寄往月球。“我们必须快一点，”莉莉说，“火箭不会等我们。”她把信放进一个结实的箱子里。"
      },
      {
        "text": "Then a red light starts to blink. \"Oh no,\" says Lily. \"The box is too heavy!\" She thinks about the problem carefully. \"We could send the big books later,\" she says. \"Then the box should be light enough.\"",
        "translation": "这时，一盏红灯开始闪烁。“哦不，”莉莉说，“箱子太重了！”她认真地想了想这个问题。“我们可以晚一点再寄那些大书，”她说，“这样箱子应该就够轻了。”"
      },
      {
        "text": "Lily and her robot Tom work very fast. They take out the books and close the box. Now the box is light and ready. \"You must hold it with both hands,\" says Tom. They run to the door of the rocket.",
        "translation": "莉莉和她的机器人汤姆干得飞快。他们把书拿出来，再把箱子合上。现在箱子又轻又准备好了。“你必须用两只手抱住它，”汤姆说。他们朝火箭的门跑去。"
      },
      {
        "text": "At nine the rocket flies into the sky. It will reach Mars in three days. Lily waves from her small window. \"Next time we will send more letters!\"",
        "translation": "九点钟，火箭飞向天空。它将在三天后到达火星。莉莉在小窗边挥手告别。“下一次，我们要寄更多的信！”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What will the mail rocket carry to Mars?",
        "audioText": "What will the mail rocket carry to Mars?",
        "options": [
          {
            "emoji": "✉️",
            "value": "letters",
            "text": "Letters"
          },
          {
            "emoji": "📚",
            "value": "books",
            "text": "Books"
          },
          {
            "emoji": "💧",
            "value": "water",
            "text": "Water"
          }
        ],
        "answer": "letters"
      },
      {
        "type": "image_choice",
        "question": "What does Lily put on every morning?",
        "audioText": "What does Lily put on every morning?",
        "options": [
          {
            "emoji": "🧑‍🚀",
            "value": "suit",
            "text": "Blue space suit"
          },
          {
            "emoji": "🧢",
            "value": "hat",
            "text": "Red hat"
          },
          {
            "emoji": "👟",
            "value": "shoes",
            "text": "New shoes"
          }
        ],
        "answer": "suit"
      },
      {
        "type": "word_builder",
        "word": "rocket",
        "audioText": "rocket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "will",
          "reach",
          "Mars",
          "in",
          "three",
          "days."
        ],
        "audioText": "It will reach Mars in three days."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "puts",
          "the",
          "letters",
          "into",
          "a",
          "strong",
          "box."
        ],
        "audioText": "She puts the letters into a strong box."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The box is too ___!",
        "choices": [
          "heavy",
          "light",
          "fast"
        ],
        "answer": "heavy",
        "audioText": "The box is too heavy!"
      }
    ]
  },
  {
    "id": "xsc-r6-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 8,
    "title": "The Space Bus to the Moon",
    "titleCn": "开往月球的太空巴士",
    "coverEmoji": "🚌",
    "paragraphs": [
      {
        "text": "Lily is a young scientist at our station. Every day she draws new space buses. Her little desk is full of paper models.",
        "translation": "莉莉是我们太空站里的一位小科学家。她每天都画新的太空巴士。她的小桌子上摆满了纸做的模型。"
      },
      {
        "text": "She shows us a picture of a bus. It will fly to the Moon next year. It will carry twelve students and one teacher.",
        "translation": "她给我们看了一张巴士的图。明年这辆巴士将飞往月球。它将载着十二名学生和一位老师。"
      },
      {
        "text": "We must wear warm suits on the bus. We should sit down and wear our belts. We could look out at stars and planets.",
        "translation": "在巴士上我们必须穿保暖服。我们应该坐下来系好安全带。我们可以向外看星星和行星。"
      },
      {
        "text": "The bus will stop at a space garden. We will pick some tomatoes for lunch. Then we will take photos of Earth.",
        "translation": "巴士会停在一个太空花园。我们会摘些西红柿当午餐。然后我们会给地球拍照。"
      },
      {
        "text": "Lily says we must keep space clean. We should not throw things into space. Everyone could help to clean the windows.",
        "translation": "莉莉说我们必须保持太空干净。我们不应该把东西扔进太空里。每个人都可以帮忙擦窗户。"
      },
      {
        "text": "Next week we will build a bus model. It will be green and very light. In my dream, I will be the driver.",
        "translation": "下周我们会做一个巴士模型。它会又绿又轻。在我的梦里，我就是那个司机。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where will the bus fly next year?",
        "audioText": "Where will the bus fly next year?",
        "options": [
          {
            "emoji": "🌕",
            "value": "moon",
            "text": "The Moon"
          },
          {
            "emoji": "☀️",
            "value": "sun",
            "text": "The Sun"
          },
          {
            "emoji": "🌍",
            "value": "earth",
            "text": "Earth"
          }
        ],
        "answer": "moon"
      },
      {
        "type": "word_builder",
        "word": "station",
        "audioText": "station"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "should",
          "not",
          "throw",
          "things",
          "into",
          "space."
        ],
        "audioText": "We should not throw things into space."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It will carry twelve students and one ___.",
        "choices": [
          "teacher",
          "driver",
          "farmer"
        ],
        "answer": "teacher",
        "audioText": "It will carry twelve students and one teacher."
      },
      {
        "type": "image_choice",
        "question": "What will we pick for lunch in the space garden?",
        "audioText": "What will we pick for lunch in the space garden?",
        "options": [
          {
            "emoji": "🍅",
            "value": "tomatoes",
            "text": "Tomatoes"
          },
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          },
          {
            "emoji": "🥕",
            "value": "carrots",
            "text": "Carrots"
          }
        ],
        "answer": "tomatoes"
      },
      {
        "type": "word_builder",
        "word": "tomatoes",
        "audioText": "tomatoes"
      }
    ]
  },
  {
    "id": "xsc-r6-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 9,
    "title": "The Little Space Scientist",
    "titleCn": "小小太空科学家",
    "coverEmoji": "🔭",
    "paragraphs": [
      {
        "text": "Amy is a young scientist in space. She lives on a big space station. Every morning she checks the plants in her lab. The plants will grow tall and green soon. She must water them before she eats breakfast.",
        "translation": "艾米是一位在太空中工作的年轻科学家。她住在一座巨大的太空站里。每天早上，她都会检查实验室里的植物。这些植物很快就能长得又高又绿。她必须在吃早饭前给它们浇水。"
      },
      {
        "text": "The station goes around the Earth very fast. Amy can see blue oceans from the window. Next year, a space bus will fly to the Moon. Amy will ride it with her family. They will visit the Moon base for two weeks.",
        "translation": "太空站绕着地球飞快地飞行。从窗口望出去，艾米能看到蓝色的海洋。明年，一辆太空巴士将飞往月球。艾米会和家人一起乘坐它。他们要在月球基地待上两个星期。"
      },
      {
        "text": "Life on the station is fun but busy. You must keep your things in the right place. You should sleep inside a sleeping bag. You could even float to the kitchen. But you must never open the big door alone.",
        "translation": "太空站上的生活既有趣又忙碌。你必须把东西放在固定的位置。你应该睡在睡袋里。你甚至可以一路飘到厨房去。但你绝不能一个人打开那扇大门。"
      },
      {
        "text": "Today Amy will try a new water experiment. She will put a drop in a box. The water will become a big floating ball. Everyone should watch it and write down the size.",
        "translation": "今天，艾米要尝试一个新的水实验。她会把一滴水放进一个盒子里。水会变成一个漂浮的大水球。每个人都应该仔细观察，并记下它有多大。"
      },
      {
        "text": "Amy wants to be a space scientist. She will study planets like Mars and Venus. She must learn maths, science and much more. She should run and swim to stay strong. Maybe she could work on Mars one day.",
        "translation": "艾米想成为一名太空科学家。她将研究火星、金星这样的行星。她必须学好数学、科学以及更多知识。她应该跑步、游泳，让自己保持强壮。也许有一天，她能在火星上工作。"
      },
      {
        "text": "After work, Amy calls her family on Earth. 'I will come home next month,' she says. 'Then we will look at the stars together.' Space is big, but home is warm.",
        "translation": "工作结束后，艾米给地球上的家人打电话。'下个月我就回家，'她说，'到时候我们一起看星星。'太空很大，但家很温暖。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What will grow tall and green in Amy's lab?",
        "audioText": "What will grow tall and green in Amy's lab?",
        "options": [
          {
            "emoji": "🌱",
            "value": "plant",
            "text": "Plant"
          },
          {
            "emoji": "🚀",
            "value": "rocket",
            "text": "Rocket"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          }
        ],
        "answer": "plant"
      },
      {
        "type": "word_builder",
        "word": "station",
        "audioText": "station"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "must",
          "water",
          "them",
          "before",
          "she",
          "eats",
          "breakfast."
        ],
        "audioText": "She must water them before she eats breakfast."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She ___ learn maths, science and much more.",
        "choices": [
          "must",
          "shouldn't",
          "couldn't"
        ],
        "answer": "must",
        "audioText": "She must learn maths, science and much more."
      },
      {
        "type": "image_choice",
        "question": "What can Amy see from the window?",
        "audioText": "What can Amy see from the window?",
        "options": [
          {
            "emoji": "🌊",
            "value": "oceans",
            "text": "Oceans"
          },
          {
            "emoji": "🏠",
            "value": "houses",
            "text": "Houses"
          },
          {
            "emoji": "🌳",
            "value": "trees",
            "text": "Trees"
          }
        ],
        "answer": "oceans"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "water",
          "will",
          "become",
          "a",
          "big",
          "floating",
          "ball."
        ],
        "audioText": "The water will become a big floating ball."
      }
    ]
  },
  {
    "id": "xsc-r6-s10",
    "track": "xiaoshengchu",
    "regionId": "xsc-r6",
    "order": 10,
    "title": "A Trip to the Red Planet",
    "titleCn": "红色星球之旅",
    "coverEmoji": "🪐",
    "paragraphs": [
      {
        "text": "Our class will visit the space station soon. We must get ready for the trip. We should read books about space first.",
        "translation": "我们班很快就要去参观太空站了。我们必须为这次旅行做好准备。我们应该先读一些关于太空的书。"
      },
      {
        "text": "The station is a big home in space. Six people live and work inside it. Everything will fly when they let it go. We must hold the wall to move around.",
        "translation": "太空站是太空里的一个大房子。有六个人在里面生活和工作。东西一松手就会飘起来。我们得抓着墙才能移动。"
      },
      {
        "text": "We will do a small science test there. We could put a seed in wet paper. The little plant will grow in one week. We must write down what we see.",
        "translation": "我们会在那里做一个小科学实验。我们可以把一粒种子放进湿纸里。小植物一周后就会长出来。我们必须把看到的东西记下来。"
      },
      {
        "text": "Future rockets will be much faster than now. We could travel to Mars in two weeks. Astronauts must be strong, healthy and careful. They should eat good food and do exercise.",
        "translation": "未来的火箭会比现在快得多。我们两周就能飞到火星。宇航员必须强壮、健康，还要非常小心。他们应该吃有营养的食物，还要坚持锻炼。"
      },
      {
        "text": "One day, I will build a small rocket. My friends and I could fly to Mars. We will send a message back to Earth. Earth will look like a blue ball.",
        "translation": "将来有一天，我要造一枚小火箭。我和朋友们可以一起飞向火星。我们会给地球发一条消息。从那里看，地球就像一个蓝色的球。"
      },
      {
        "text": "The station will help us learn a lot. One day you could be a space scientist. So, what will you build in the future?",
        "translation": "太空站会帮助我们学到很多东西。有一天，你也可能成为一名太空科学家。那么，将来你会造出什么呢？"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where will our class go soon?",
        "audioText": "Where will our class go soon?",
        "options": [
          {
            "emoji": "🛰️",
            "value": "space_station",
            "text": "A space station"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "A school"
          },
          {
            "emoji": "🌊",
            "value": "sea",
            "text": "The sea"
          }
        ],
        "answer": "space_station"
      },
      {
        "type": "word_builder",
        "word": "rocket",
        "audioText": "rocket"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "must",
          "get",
          "ready",
          "for",
          "the",
          "trip."
        ],
        "audioText": "We must get ready for the trip."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "We will send a ___ back to Earth.",
        "choices": [
          "message",
          "rocket",
          "plant"
        ],
        "answer": "message",
        "audioText": "We will send a message back to Earth."
      },
      {
        "type": "image_choice",
        "question": "What will Earth look like from space?",
        "audioText": "What will Earth look like from space?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue_ball",
            "text": "A blue ball"
          },
          {
            "emoji": "🔴",
            "value": "red_ball",
            "text": "A red ball"
          },
          {
            "emoji": "⚫",
            "value": "black_ball",
            "text": "A black ball"
          }
        ],
        "answer": "blue_ball"
      },
      {
        "type": "word_builder",
        "word": "station",
        "audioText": "station"
      }
    ]
  },
  {
    "id": "xsc-r7-s01",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 1,
    "title": "The Castle Behind the Trees",
    "titleCn": "树后的魔法城堡",
    "coverEmoji": "🏰",
    "paragraphs": [
      {
        "text": "Lily lived in a small village near the woods. One sunny morning, she walked into the trees alone. She wanted to find the oldest tree.",
        "translation": "莉莉住在一个靠近树林的小村庄里。一个晴朗的早晨，她独自走进了树林。她想找到那棵最古老的树。"
      },
      {
        "text": "She saw a big grey castle behind the trees. It was taller than any house in her village. The door was small and blue.",
        "translation": "她看见树后有一座灰色的大城堡。它比她村子里的任何一座房子都要高。城堡的门很小，是蓝色的。"
      },
      {
        "text": "She knocked three times, but nobody came. Suddenly the door opened very slowly. A little old man smiled at her kindly.",
        "translation": "她敲了三下门，可是没有人来。突然，门慢慢地打开了。一位个子矮矮的老爷爷对她和蔼地笑了。"
      },
      {
        "text": "\"Welcome, brave girl,\" the old man said kindly. \"You are the first child to find this castle.\" \"You can take one thing from here,\" he said. \"But you must be brave and kind.\"",
        "translation": "“欢迎你，勇敢的小姑娘。”老爷爷亲切地说。“你是第一个找到这座城堡的孩子。”“你可以从这里带走一样东西。”他说。“但你一定要勇敢、善良。”"
      },
      {
        "text": "When Lily walked inside, the lights turned warm. She saw a golden key on a small table. While she held the key, the walls began to shine.",
        "translation": "当莉莉走进去时，里面的灯光变得温暖起来。她看见一张小桌子上放着一把金色的钥匙。当她握着钥匙的时候，墙壁开始闪闪发光。"
      },
      {
        "text": "A little dragon flew down to her feet. It looked cold, so Lily gave it her red scarf. The dragon smiled, and the castle sang a happy song. Lily felt prouder than ever before. She knew she could come back again. She came back every summer after that.",
        "translation": "一条小龙飞到她的脚边。它看起来很冷，于是莉莉把自己的红围巾给了它。小龙笑了，整座城堡唱起了一首快乐的歌。莉莉感到比以往任何时候都更自豪。她知道自己还能再回来。从那以后，她每年夏天都会回到这里。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily see behind the trees?",
        "audioText": "What did Lily see behind the trees?",
        "options": [
          {
            "emoji": "🏰",
            "value": "castle",
            "text": "A castle"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "A house"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tree"
          }
        ],
        "answer": "castle"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was ___ than any house in her village.",
        "choices": [
          "taller",
          "tallest",
          "tall"
        ],
        "answer": "taller",
        "audioText": "It was taller than any house in her village."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "wanted",
          "to",
          "find",
          "the",
          "oldest",
          "tree."
        ],
        "audioText": "She wanted to find the oldest tree."
      },
      {
        "type": "word_builder",
        "word": "brave",
        "audioText": "brave"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She knew she ___ come back again.",
        "choices": [
          "could",
          "can",
          "must"
        ],
        "answer": "could",
        "audioText": "She knew she could come back again."
      }
    ]
  },
  {
    "id": "xsc-r7-s02",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 2,
    "title": "The Silver Key",
    "titleCn": "银色钥匙",
    "coverEmoji": "🗝️",
    "paragraphs": [
      {
        "text": "One morning, Lily found a small key. It was under a red flower. The key was silver and very cold. It was colder than ice. \"Where can this key open a door?\" she said. Then she saw a little door in the wall.",
        "translation": "一天早上，莉莉发现了一把小钥匙。它就在一朵红花下面。钥匙是银色的，冰凉冰凉，比冰还冷。“这把钥匙能打开哪扇门呢？”她说。这时，她看见墙上有一扇小门。"
      },
      {
        "text": "Lily put the key into the little door. The door opened slowly, and she went in. Behind it, she saw a long dark road. At the end of the road stood a castle. The castle was taller than any tree.",
        "translation": "莉莉把钥匙插进了那扇小门。门慢慢打开了，她走了进去。门后是一条又长又黑的路。路的尽头矗立着一座城堡。那城堡比任何一棵树都高。"
      },
      {
        "text": "Lily walked into the castle. A small cat with green eyes came to her. \"Hello,\" said the cat. \"I am Tom, and I need your help. The magic flower is sleeping, so the castle is sad.\"",
        "translation": "莉莉走进城堡。一只绿眼睛的小猫朝她走了过来。“你好，”小猫说，“我叫汤姆，我需要你的帮助。魔法花睡着了，所以城堡很伤心。”"
      },
      {
        "text": "\"How can I help you?\" asked Lily. \"You must climb the highest tower,\" said Tom. \"But you should be brave. The stairs are old and dark.\" Lily took a deep breath and smiled. \"I can do it,\" she said.",
        "translation": "“我怎么帮你呢？”莉莉问。“你必须爬上最高的塔楼，”汤姆说，“但你要勇敢。那些楼梯又旧又黑。”莉莉深吸一口气，笑了。“我能做到，”她说。"
      },
      {
        "text": "While Lily climbed, the wind blew hard. Her legs were tired, but she did not stop. At the top, she saw a little blue flower. She touched it softly. The flower opened, and light filled the room.",
        "translation": "莉莉往上爬的时候，风刮得很猛。她的腿累了，但她没有停下。在塔顶，她看见一朵蓝色的小花。她轻轻地碰了碰它。花开了，光充满了整个房间。"
      },
      {
        "text": "Then everything in the castle woke up. The castle was brighter and warmer than before. \"Thank you, brave girl,\" said Tom. Lily went home with the key. She was small, but she was very brave.",
        "translation": "接着，城堡里的一切都醒了过来。城堡比以前更明亮、更温暖了。“谢谢你，勇敢的女孩，”汤姆说。莉莉带着钥匙回了家。她的个子很小，但她非常勇敢。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily find in the garden?",
        "audioText": "What did Lily find in the garden?",
        "options": [
          {
            "emoji": "🔑",
            "value": "key",
            "text": "A key"
          },
          {
            "emoji": "🌷",
            "value": "flower",
            "text": "A flower"
          },
          {
            "emoji": "🐈",
            "value": "cat",
            "text": "A cat"
          }
        ],
        "answer": "key"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The castle was brighter and ___ than before.",
        "choices": [
          "warmer",
          "colder",
          "smaller"
        ],
        "answer": "warmer",
        "audioText": "The castle was brighter and warmer than before."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lily",
          "put",
          "the",
          "key",
          "into",
          "the",
          "little",
          "door."
        ],
        "audioText": "Lily put the key into the little door."
      },
      {
        "type": "word_builder",
        "word": "silver",
        "audioText": "silver"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "But you ___ be brave, said Tom.",
        "choices": [
          "should",
          "can",
          "must"
        ],
        "answer": "should",
        "audioText": "But you should be brave, said Tom."
      }
    ]
  },
  {
    "id": "xsc-r7-s03",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 3,
    "title": "Lily and the Little Dragon",
    "titleCn": "莉莉和小龙",
    "coverEmoji": "🐉",
    "paragraphs": [
      {
        "text": "Lily was a quiet girl. She was smaller than her friends. One day, she found a small door in the garden. The door was open. She could see a soft light inside.",
        "translation": "莉莉是个安静的女孩。她比朋友们都瘦小。一天，她在花园里发现了一扇小门。门开着，里面透出柔和的光。"
      },
      {
        "text": "Lily walked in. She saw a magic castle. It was taller than any castle in her books. A little dragon sat by the gate. It was crying. 'I can't fly,' it said. 'My wings are too small.'",
        "translation": "莉莉走了进去。她看见一座魔法城堡，比书里任何一座城堡都高。一条小龙坐在大门旁，正在哭泣。“我飞不起来，”它说，“我的翅膀太小了。”"
      },
      {
        "text": "Lily said, 'Don't be sad. I can help you.' The dragon smiled. They went to the tallest tower. The wind was strong there. 'Jump when I count to three,' Lily said.",
        "translation": "莉莉说：“别难过，我可以帮你。”小龙笑了。他们来到最高的塔楼上，那里的风很大。“我数到三，你就跳。”莉莉说。"
      },
      {
        "text": "The dragon was afraid. Lily held its hand. 'You are braver than you think,' she said. While the wind blew, the dragon opened its wings. Then it jumped. For a moment, it went down. Then it went up!",
        "translation": "小龙很害怕。莉莉握住它的手。“你比自己想的更勇敢。”她说。风呼呼地吹着，小龙张开了翅膀，然后跳了下去。有一瞬间它往下坠，接着就飞了起来！"
      },
      {
        "text": "The dragon flew higher and higher. It was the happiest dragon in the world. 'Thank you, Lily,' it said. 'You are my best friend.' Lily laughed. She was not afraid now.",
        "translation": "小龙越飞越高。它是世界上最快乐的小龙。“谢谢你，莉莉，”它说，“你是我最好的朋友。”莉莉笑了，现在她一点也不害怕了。"
      },
      {
        "text": "When Lily went home, the door was still there. She was still small, but she felt big inside. She knew she could do hard things too.",
        "translation": "当莉莉回到家时，那扇门还在那里。她依然瘦小，但心里觉得自己长大了。她知道，自己也能做成难事。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Who was crying by the gate?",
        "audioText": "Who was crying by the gate?",
        "options": [
          {
            "emoji": "🐉",
            "value": "dragon",
            "text": "A dragon"
          },
          {
            "emoji": "🐕",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A bird"
          }
        ],
        "answer": "dragon"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "word_builder",
        "word": "braver",
        "audioText": "braver"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "was",
          "smaller",
          "than",
          "her",
          "friends."
        ],
        "audioText": "She was smaller than her friends."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was the ___ dragon in the world.",
        "choices": [
          "happiest",
          "happy",
          "happier"
        ],
        "answer": "happiest",
        "audioText": "It was the happiest dragon in the world."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "While the wind ___, the dragon opened its wings.",
        "choices": [
          "blew",
          "blows",
          "blowing"
        ],
        "answer": "blew",
        "audioText": "While the wind blew, the dragon opened its wings."
      }
    ]
  },
  {
    "id": "xsc-r7-s04",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 4,
    "title": "The Smallest Door",
    "titleCn": "最小的那扇门",
    "coverEmoji": "🏰",
    "paragraphs": [
      {
        "text": "Lily lived near an old castle. Every day, she walked past its high stone walls. She always wanted to go inside. One morning, the big gate was open. \"I can look inside for a minute,\" she said.",
        "translation": "莉莉住在一座古老城堡的附近。每天，她都会走过城堡高高的石墙。她一直想进去看看。一天早上，城堡的大门开着。“我可以进去看一分钟。”她说。"
      },
      {
        "text": "The castle was bigger and darker than she thought. Its rooms were bigger than her school. The tower was the tallest place in the town. Lily climbed the stairs very slowly. When she listened, she could hear a soft sound.",
        "translation": "城堡比她想象的更大、更暗。里面的房间比她的学校还大。那座塔楼是镇上最高的地方。莉莉慢慢地爬上楼梯。当她侧耳倾听时，她能听见一个轻轻的声音。"
      },
      {
        "text": "On the top floor, she found a small door. It was the smallest door in the castle. A little blue bird sat on the door. \"You must be brave,\" the bird said. \"Please open the door and help me.\"",
        "translation": "在顶层，她发现了一扇小门。那是城堡里最小的门。一只蓝色的小鸟停在门上。“你必须勇敢。”小鸟说，“请打开门，帮帮我。”"
      },
      {
        "text": "While Lily pushed the door, the wind blew hard. When the door opened, she saw a magic garden. Golden flowers grew there, and the air was warm. The bird could not fly. \"My wing is broken,\" it said sadly.",
        "translation": "莉莉推门的时候，风呼呼地刮着。门一打开，她看见了一个魔法花园。那里长着金色的花，空气暖暖的。小鸟飞不起来。“我的翅膀断了。”它难过地说。"
      },
      {
        "text": "Lily took the bird in her hands. She carried it down the stairs carefully. While she walked, the bird sang a soft song. When they got outside, the bird's wing was better. The magic of the castle helped it.",
        "translation": "莉莉把小鸟捧在手里。她小心地抱着它走下楼梯。她走着的时候，小鸟唱起了一首轻柔的歌。当他们走到外面时，小鸟的翅膀好了。是城堡的魔法帮了它。"
      },
      {
        "text": "The bird flew up into the blue sky. \"Thank you, brave girl,\" it said. \"You can visit the castle again.\" Lily smiled and waved goodbye. She was the bravest girl in the town.",
        "translation": "小鸟飞上了蓝天。“谢谢你，勇敢的女孩。”它说，“你可以再来城堡玩。”莉莉笑着挥手告别。她是镇上最勇敢的女孩。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily find on the small door?",
        "audioText": "What did Lily find on the small door?",
        "options": [
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A bird"
          },
          {
            "emoji": "🔑",
            "value": "key",
            "text": "A key"
          },
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "A flower"
          }
        ],
        "answer": "bird"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The tower was the ___ place in the town.",
        "choices": [
          "tallest",
          "taller",
          "tall"
        ],
        "answer": "tallest",
        "audioText": "The tower was the tallest place in the town."
      },
      {
        "type": "word_builder",
        "word": "brave",
        "audioText": "brave"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lily",
          "climbed",
          "the",
          "stairs",
          "very",
          "slowly."
        ],
        "audioText": "Lily climbed the stairs very slowly."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When the door opened, she ___ a magic garden.",
        "choices": [
          "saw",
          "sees",
          "see"
        ],
        "answer": "saw",
        "audioText": "When the door opened, she saw a magic garden."
      }
    ]
  },
  {
    "id": "xsc-r7-s05",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 5,
    "title": "The Golden Feather",
    "titleCn": "金色的羽毛",
    "coverEmoji": "🪶",
    "paragraphs": [
      {
        "text": "One day, Lily found a golden feather. It was near the old castle. The feather was small but very bright. When she touched it, it felt warm. \"It must be magic,\" she said to herself.",
        "translation": "一天，莉莉发现了一根金色的羽毛，就在那座老城堡旁边。羽毛很小，却非常明亮。当她碰到它的时候，感觉暖暖的。“这一定是魔法，”她自言自语道。"
      },
      {
        "text": "That night, a dragon came to her window. \"Please help me,\" the dragon said. \"I lost my golden feather,\" he said. \"It is the most important thing for my family.\" Lily was afraid, but she wanted to help.",
        "translation": "那天晚上，一条龙来到她的窗前。“请帮帮我，”龙说。“我丢了我的金色羽毛，”他说，“它对我家来说是最重要的东西。”莉莉很害怕，但她想要帮忙。"
      },
      {
        "text": "They walked into the dark forest together. The trees were taller than the castle. While they were walking, Lily heard a sound. A big river was in front of them. It was deeper than it looked.",
        "translation": "他们一起走进了黑黑的森林。那里的树比城堡还高。他们走着走着，莉莉听到了一个声音。一条大河出现在他们面前，河水比看上去还要深。"
      },
      {
        "text": "\"We can't swim across,\" the dragon said. \"But I can fly over it. You must sit on my back.\" Lily was scared, but she climbed on. The dragon flew higher and higher.",
        "translation": "“我们游不过去，”龙说，“但我可以飞过去。你必须坐在我的背上。”莉莉很害怕，但她还是爬了上去。龙飞得越来越高。"
      },
      {
        "text": "On the other side, they found a small cave. The feather was inside, near a sleeping owl. Lily walked very quietly and got the feather. The owl woke up, but it did not move. She gave the feather back to the dragon.",
        "translation": "到了对岸，他们发现了一个小山洞。羽毛就在里面，在一只睡着的猫头鹰旁边。莉莉轻轻地走过去，拿到了羽毛。猫头鹰醒了，但它没有动。莉莉把羽毛还给了那条龙。"
      },
      {
        "text": "\"You are the bravest girl I know,\" he said. He smiled and flew home. Lily watched him go and felt happy. She was not afraid now. She knows that she can be brave.",
        "translation": "“你是我认识的最勇敢的女孩，”他说。他笑了笑，飞回了家。莉莉看着他离开，心里很开心。她现在不再害怕了。她知道自己可以很勇敢。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lily find near the old castle?",
        "audioText": "What did Lily find near the old castle?",
        "options": [
          {
            "emoji": "🪶",
            "value": "feather",
            "text": "A feather"
          },
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "A flower"
          },
          {
            "emoji": "🪨",
            "value": "stone",
            "text": "A stone"
          }
        ],
        "answer": "feather"
      },
      {
        "type": "word_builder",
        "word": "dragon",
        "audioText": "dragon"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "gave",
          "the",
          "feather",
          "back",
          "to",
          "the",
          "dragon."
        ],
        "audioText": "She gave the feather back to the dragon."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "While",
          "they",
          "were",
          "walking,",
          "Lily",
          "heard",
          "a",
          "sound."
        ],
        "audioText": "While they were walking, Lily heard a sound."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The trees were ___ than the castle.",
        "choices": [
          "taller",
          "tallest",
          "tall"
        ],
        "answer": "taller",
        "audioText": "The trees were taller than the castle."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You are the ___ girl I know.",
        "choices": [
          "bravest",
          "braver",
          "brave"
        ],
        "answer": "bravest",
        "audioText": "You are the bravest girl I know."
      }
    ]
  },
  {
    "id": "xsc-r7-s06",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 6,
    "title": "The Bridge of Stars",
    "titleCn": "星光之桥",
    "coverEmoji": "🌉",
    "paragraphs": [
      {
        "text": "Mia and Tom found an old castle last week. It was taller than any house in town. While they played, a big door opened. Tom ran in, and the door closed.",
        "translation": "上周，米娅和汤姆发现了一座古老的城堡。它比镇上任何一座房子都高。他们正在玩耍的时候，一扇大门打开了。汤姆跑了进去，门随即关上了。"
      },
      {
        "text": "Mia was afraid, but she did not leave. She pushed the door and walked inside. She called for Tom, but no one answered. A silver lamp stood on a small table.",
        "translation": "米娅很害怕，但她没有离开。她推开那扇门，走了进去。她大声喊汤姆，可是没有人回答。一盏银色的小灯放在一张小桌子上。"
      },
      {
        "text": "She took the lamp and walked on. Soon she found a river with no bridge. \"How can I cross?\" she thought. Then the little lamp spoke softly to her. \"Only a brave heart can make a bridge.\"",
        "translation": "她拿起那盏灯，继续往前走。不久，她来到一条河边，河上没有桥。“我该怎么过去呢？”她想。这时，那盏小灯轻轻地对她说：“只有勇敢的心才能造出桥来。”"
      },
      {
        "text": "Mia was the shyest girl in her class. When she moved, stars jumped out of the water. They made a shiny bridge over the river. Mia walked across it slowly and carefully. On the other side, she heard Tom crying. He was behind a tall wooden door.",
        "translation": "米娅是班上最害羞的女孩。当她向前迈步时，星星从水里跳了出来。它们在河面上搭起了一座闪亮的桥。米娅慢慢地、小心地走了过去。在河对岸，她听见汤姆在哭。他就在一扇高高的木门后面。"
      },
      {
        "text": "She opened the door and saw her brother. Tom was safe on the floor. He ran to Mia and hugged her. \"You are the bravest sister,\" he said. Mia smiled because she knew it was true.",
        "translation": "她打开门，看见了弟弟。汤姆安全地待在地上。他跑到米娅身边，抱住了她。“你是最勇敢的姐姐。”他说。米娅笑了，因为她知道这是真的。"
      },
      {
        "text": "They walked back over the star bridge together. The lamp went out, but the stars stayed. She was still shy, but she could be brave. Her heart was brighter than any lamp.",
        "translation": "他们一起从星光桥上走了回去。灯熄灭了，但星星还在。她依旧害羞，但她可以变得勇敢。她的心比任何一盏灯都要明亮。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What made the bridge over the river?",
        "audioText": "What made the bridge over the river?",
        "options": [
          {
            "emoji": "⭐",
            "value": "stars",
            "text": "Stars"
          },
          {
            "emoji": "🪵",
            "value": "wood",
            "text": "Wood"
          },
          {
            "emoji": "🧊",
            "value": "ice",
            "text": "Ice"
          }
        ],
        "answer": "stars"
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "While",
          "they",
          "played,",
          "a",
          "big",
          "door",
          "opened."
        ],
        "audioText": "While they played, a big door opened."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was ___ than any house in town.",
        "choices": [
          "taller",
          "tallest",
          "tall"
        ],
        "answer": "taller",
        "audioText": "It was taller than any house in town."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "\"Only a brave ___ can make a bridge.\"",
        "choices": [
          "heart",
          "hand",
          "head"
        ],
        "answer": "heart",
        "audioText": "Only a brave heart can make a bridge."
      }
    ]
  },
  {
    "id": "xsc-r7-s07",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 7,
    "title": "The Bell in the Blue Tower",
    "titleCn": "蓝塔上的钟声",
    "coverEmoji": "🔔",
    "paragraphs": [
      {
        "text": "Nora lived in a small village near a tall hill. Every night, she heard a bell. The sound came from an old castle on the hill. Nobody else in the village could hear it.",
        "translation": "诺拉住在一座高山附近的小村庄里。每天夜里，她都能听到一阵钟声。那声音来自山上一座古老的城堡。村里其他人都听不见。"
      },
      {
        "text": "One evening, Nora climbed the hill alone. The castle door was open. Inside, the rooms were darker and colder than her own house. She walked up and up. At the top, she found a blue tower. There was no bell in it.",
        "translation": "一天傍晚，诺拉独自爬上了那座山。城堡的门开着。里面比她自己家更暗、更冷。她走啊走，一直往上走。在最高处，她发现了一座蓝色的塔。可塔里没有钟。"
      },
      {
        "text": "Then she saw a small glass bell under a chair. It was the smallest bell in the world. When she touched it, the castle spoke to her. \"Only a brave heart can ring this bell,\" it said. \"While the bell is quiet, the castle sleeps.\"",
        "translation": "这时，她看见椅子下面有一个小小的玻璃钟。它是世界上最小的钟。当她碰它的时候，城堡开口对她说话了。“只有勇敢的心才能敲响这只钟，”它说，“钟声沉默的时候，城堡就在沉睡。”"
      },
      {
        "text": "Nora felt afraid. She could run home, or she could ring the bell. She thought about her grandmother's warm and kind smile. She took a deep breath and rang it.",
        "translation": "诺拉感到害怕。她可以跑回家，也可以敲响那只钟。她想起了奶奶温暖而善良的笑容。她深吸一口气，敲响了它。"
      },
      {
        "text": "The sound was brighter and happier than any song. Windows lit up and doors opened. The whole castle woke up. The stars above the tower began to dance. A soft voice said, \"Thank you, Nora. You are braver than you know.\"",
        "translation": "那声音比任何歌声都更明亮、更欢快。窗户亮了，门开了。整座城堡都醒了过来。塔上方的星星开始跳舞。一个温柔的声音说：“谢谢你，诺拉。你比自己以为的更勇敢。”"
      },
      {
        "text": "Nora ran home before the sun came up. Her grandmother smiled at her. \"You can hear the bell because you are brave,\" she said. Nora looked back at the hill. The castle was dark again, but she knew it was happy. Every night, the bell sang her to sleep.",
        "translation": "太阳升起前，诺拉跑回了家。奶奶朝她微笑着。“你能听见钟声，因为你很勇敢，”她说。诺拉回头望向那座山。城堡又暗了下来，但她知道它很开心。每天夜里，钟声都会伴她入睡。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Nora hear every night?",
        "audioText": "What did Nora hear every night?",
        "options": [
          {
            "emoji": "🔔",
            "value": "bell",
            "text": "Bell"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "Bird"
          },
          {
            "emoji": "🌊",
            "value": "river",
            "text": "River"
          }
        ],
        "answer": "bell"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "word_builder",
        "word": "tower",
        "audioText": "tower"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "took",
          "a",
          "deep",
          "breath",
          "and",
          "rang",
          "it."
        ],
        "audioText": "She took a deep breath and rang it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sound was ___ and happier than any song.",
        "choices": [
          "bright",
          "brighter",
          "brightest"
        ],
        "answer": "brighter",
        "audioText": "The sound was brighter and happier than any song."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Only a ___ heart can ring this bell.",
        "choices": [
          "brave",
          "braver",
          "bravest"
        ],
        "answer": "brave",
        "audioText": "Only a brave heart can ring this bell."
      }
    ]
  },
  {
    "id": "xsc-r7-s08",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 8,
    "title": "The Tower of Stars",
    "titleCn": "星之塔",
    "coverEmoji": "🌟",
    "paragraphs": [
      {
        "text": "Last night, a cold wind blew in. It opened the windows and shook the doors. When Mia woke up, the great hall was dark. The little stars on the ceiling did not shine. \"The castle is sad,\" said her owl, Bo.",
        "translation": "昨天夜里，一阵冷风吹进了城堡。它吹开了窗户，摇动着门。米娅醒来时，大厅里一片漆黑。天花板上的小星星不再发光。“城堡难过了。”她的猫头鹰波波说。"
      },
      {
        "text": "\"The stars are in the tallest tower,\" said Bo. \"Someone must climb up and light them.\" Mia looked at the long, long stairs. They were higher than the tallest tree. \"I am the smallest one here,\" she said quietly. \"But I can try.\"",
        "translation": "“星星在最高的那座塔上，”波波说，“必须有人爬上去把它们点亮。”米娅看着长长长长的楼梯。它比最高的树还要高。“我是这里最小的一个。”她轻声说，“但我可以试一试。”"
      },
      {
        "text": "So Mia began to climb. It was darker than the deepest night. While she climbed, the wind pulled her coat. At the top, she saw a golden lamp. It was the oldest lamp in the castle. The lamp was cold and quiet.",
        "translation": "于是米娅开始往上爬。那里比最深的夜晚还要黑。她向上爬的时候，风吹扯着她的外套。到了塔顶，她看到一盏金色的灯。那是城堡里最古老的一盏灯。灯又冷又安静。"
      },
      {
        "text": "Mia put her hand on the lamp. \"Please shine again,\" she said softly. She thought about her friends below. \"I must be brave,\" she said. Then the lamp gave a warm little light. One star, then two, then a hundred stars shone.",
        "translation": "米娅把手放在灯上。“请再亮起来吧。”她轻轻地说。她想起了下面的朋友们。“我必须勇敢。”她说。接着，那盏灯发出了一小团温暖的光。一颗星星，两颗星星，然后一百颗星星亮了起来。"
      },
      {
        "text": "The castle grew bright and warm again. Everyone ran into the great hall to see. \"You are braver than all of us,\" said Bo. Mia smiled at her little friend. \"I was afraid,\" she said. \"But I did not stop.\"",
        "translation": "城堡重新变得明亮又温暖。大家都跑进大厅来看。“你比我们所有人都勇敢。”波波说。米娅冲小伙伴笑了笑。“我也害怕过。”她说，“但我没有停下。”"
      },
      {
        "text": "That night, the castle sang a soft song. Its stars shone like little candles above the hall. Mia slept under the bright stars and smiled.",
        "translation": "那天夜里，城堡唱起了一首轻柔的歌。城堡的星星像小蜡烛一样，在大厅上方闪闪发亮。米娅在明亮的星光下睡着了，脸上还带着笑。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Mia find at the top of the tower?",
        "audioText": "What did Mia find at the top of the tower?",
        "options": [
          {
            "emoji": "🪔",
            "value": "lamp",
            "text": "A golden lamp"
          },
          {
            "emoji": "🔔",
            "value": "bell",
            "text": "A silver bell"
          },
          {
            "emoji": "🪞",
            "value": "mirror",
            "text": "A magic mirror"
          }
        ],
        "answer": "lamp"
      },
      {
        "type": "word_builder",
        "word": "tower",
        "audioText": "tower"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The stars are in the ___ tower.",
        "choices": [
          "tallest",
          "taller",
          "tall"
        ],
        "answer": "tallest",
        "audioText": "The stars are in the tallest tower."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "While",
          "she",
          "climbed,",
          "the",
          "wind",
          "pulled",
          "her",
          "coat."
        ],
        "audioText": "While she climbed, the wind pulled her coat."
      },
      {
        "type": "word_builder",
        "word": "brave",
        "audioText": "brave"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The castle ___ bright and warm again.",
        "choices": [
          "grew",
          "grow",
          "grows"
        ],
        "answer": "grew",
        "audioText": "The castle grew bright and warm again."
      }
    ]
  },
  {
    "id": "xsc-r7-s09",
    "track": "xiaoshengchu",
    "regionId": "xsc-r7",
    "order": 9,
    "title": "The Day the Castle Slept",
    "titleCn": "城堡沉睡的那一天",
    "coverEmoji": "🏰",
    "paragraphs": [
      {
        "text": "Tom found a big castle behind the green hills. It was the oldest castle in the land. The gate was open, but no one was there. \"Hello?\" he called. Only the wind answered him.",
        "translation": "汤姆在青山后面发现了一座大城堡。它是这片土地上最古老的城堡。大门敞开着，可是一个人也没有。“有人吗？”他喊道。只有风回应了他。"
      },
      {
        "text": "Inside, he saw a very strange thing. All the people in the castle were sleeping. A cook slept near a cold pot. A tall knight slept on the stone stairs. They did not move when Tom walked by.",
        "translation": "走进去，他看到一件非常奇怪的事。城堡里所有的人都睡着了。一个厨师睡在一口冷锅旁边。一位高个子骑士睡在石阶上。汤姆走过时，他们一动不动。"
      },
      {
        "text": "Tom felt afraid and wanted to run home. Then he saw a little bird in a gold cage. \"Please help us,\" said the bird. \"You must wake the star on the tower.\" \"Only you can do it,\" the bird said.",
        "translation": "汤姆害怕了，想跑回家。这时，他看到金笼子里有一只小鸟。“请帮帮我们，”小鸟说。“你必须唤醒塔上的那颗星星。”“只有你能做到，”小鸟说。"
      },
      {
        "text": "The tower was higher than the trees. It was the tallest tower in the castle. Tom climbed and climbed, but he did not stop. While he climbed, the wind grew cold.",
        "translation": "那座塔比树还高。它是城堡里最高的塔。汤姆爬呀爬，但他没有停下。他往上爬的时候，风越来越冷。"
      },
      {
        "text": "At the top, he found a small, sleeping star. Tom was afraid of the dark. But he held the star in his hands. \"Please wake up,\" he said softly. Then the star opened one bright eye.",
        "translation": "在塔顶，他发现了一颗小小的、沉睡的星星。汤姆怕黑。但他把星星捧在手里。“请醒醒吧，”他轻声说。接着，星星睁开了一只明亮的眼睛。"
      },
      {
        "text": "The star flew up into the sky. Warm light filled the whole castle. The cook woke up, and the knight smiled. When the sun came, the castle was awake again. Tom was the bravest boy in the land.",
        "translation": "星星飞上了天空。温暖的光充满了整座城堡。厨师醒了，骑士笑了。太阳出来时，城堡又醒过来了。汤姆成了这片土地上最勇敢的男孩。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Who was sleeping near the cold pot?",
        "audioText": "Who was sleeping near the cold pot?",
        "options": [
          {
            "emoji": "👨‍🍳",
            "value": "cook",
            "text": "A cook"
          },
          {
            "emoji": "🛡️",
            "value": "knight",
            "text": "A knight"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A bird"
          }
        ],
        "answer": "cook"
      },
      {
        "type": "word_builder",
        "word": "castle",
        "audioText": "castle"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Tom was the ___ boy in the land.",
        "choices": [
          "brave",
          "braver",
          "bravest"
        ],
        "answer": "bravest",
        "audioText": "Tom was the bravest boy in the land."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "tower",
          "was",
          "higher",
          "than",
          "the",
          "trees."
        ],
        "audioText": "The tower was higher than the trees."
      },
      {
        "type": "word_builder",
        "word": "sleeping",
        "audioText": "sleeping"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "While he ___, the wind grew cold.",
        "choices": [
          "climbed",
          "climbs",
          "climbing"
        ],
        "answer": "climbed",
        "audioText": "While he climbed, the wind grew cold."
      }
    ]
  }
];
