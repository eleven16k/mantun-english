/**
 * 悦读馆内容包（初中中考）——由 scripts/reading/generate-content.mjs 按蓝图生成，
 * 内容全部自产，请勿手工编辑本文件；改蓝图后重新生成。
 */

import type { ReadingRegion, ReadingRegionSet, ReadingStory } from "./types";

export const REGION_SET: ReadingRegionSet = {
  track: "zhongkao",
  theme: "space",
  cnLabel: "悦读馆 · 中考",
  regions: [
  {
    "id": "zk-r1",
    "name": "Campus Days",
    "cnName": "校园生活",
    "icon": "🎒",
    "storyCount": 16
  },
  {
    "id": "zk-r2",
    "name": "Travel Notes",
    "cnName": "旅行见闻",
    "icon": "🧳",
    "storyCount": 14
  },
  {
    "id": "zk-r3",
    "name": "Tech Trends",
    "cnName": "科技前沿",
    "icon": "🤖",
    "storyCount": 14
  },
  {
    "id": "zk-r4",
    "name": "Green Action",
    "cnName": "环保行动",
    "icon": "♻️",
    "storyCount": 13
  },
  {
    "id": "zk-r5",
    "name": "People Stories",
    "cnName": "人物故事",
    "icon": "🧑‍🚀",
    "storyCount": 12
  },
  {
    "id": "zk-r6",
    "name": "Culture Tour",
    "cnName": "文化之旅",
    "icon": "🏮",
    "storyCount": 11
  },
  {
    "id": "zk-r7",
    "name": "Social Lens",
    "cnName": "社会观察",
    "icon": "🔭",
    "storyCount": 10
  }
],
};

export const STORIES: ReadingStory[] = [
  {
    "id": "zk-r1-s01",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 1,
    "title": "The New Reading Club",
    "titleCn": "新的阅读俱乐部",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "My name is Li Hua. I am a Grade Nine student in Nanjing. Every morning I get to school at half past seven. I usually have four classes before lunch.",
        "translation": "我叫李华，是南京的一名初三学生。每天早上我七点半到校。午饭前我通常上四节课。"
      },
      {
        "text": "Last Monday, our English teacher Miss Chen gave us some news. She said that our school had a new reading club. She told us that we could join it for free. I thought that it was a wonderful idea. My best friend Wang Ming said that he wanted to go with me.",
        "translation": "上周一，我们的英语老师陈老师带来一个消息。她说学校新成立了一个阅读俱乐部，还告诉我们大家可以免费加入。我觉得这主意太棒了。我最好的朋友王明说他想和我一起去。"
      },
      {
        "text": "On Wednesday afternoon, we went to the school library. About twenty students were there. Miss Chen showed us a big box of English storybooks. We each chose one book and started to read. The library was quiet, and the sun came in through the window.",
        "translation": "周三下午，我们去了学校图书馆。大约有二十名同学在场。陈老师给我们看了一大箱英文故事书。我们每人挑了一本，开始读起来。图书馆里很安静，阳光从窗户照了进来。"
      },
      {
        "text": "I chose a book about a boy and his dog. The English was easy for me, so I read ten pages quickly. Wang Ming chose a book about football. He sometimes laughed, and I knew that he enjoyed it.",
        "translation": "我选了一本讲男孩和他的狗的书。书里的英文对我来说不难，所以我很快读了十页。王明选了一本关于足球的书。他时不时笑出声来，我知道他读得很开心。"
      },
      {
        "text": "Two weeks later, we had an English test. I was a little worried before the test. But I remembered the new words from my reading book. I got a good score, and Miss Chen smiled at me.",
        "translation": "两周后，我们进行了一次英语测验。考试前我有点担心，但我想起了阅读书里学的新单词。我考了个好成绩，陈老师对我笑了。"
      },
      {
        "text": "Now I go to the reading club every Friday. I think that reading is a good way to learn English. I also know that a good habit takes time. I will keep reading, and I will keep growing.",
        "translation": "现在，我每周五都去阅读俱乐部。我认为阅读是学英语的好方法。我也明白，好习惯需要时间养成。我会坚持读书，也会不断成长。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did the students go on Wednesday afternoon?",
        "audioText": "Where did the students go on Wednesday afternoon?",
        "options": [
          {
            "emoji": "📚",
            "value": "library",
            "text": "The library"
          },
          {
            "emoji": "⚽",
            "value": "playground",
            "text": "The playground"
          },
          {
            "emoji": "🍜",
            "value": "dining hall",
            "text": "The dining hall"
          }
        ],
        "answer": "library"
      },
      {
        "type": "image_choice",
        "question": "What was Wang Ming's book about?",
        "audioText": "What was Wang Ming's book about?",
        "options": [
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "⚽",
            "value": "football",
            "text": "Football"
          },
          {
            "emoji": "🎵",
            "value": "music",
            "text": "Music"
          }
        ],
        "answer": "football"
      },
      {
        "type": "word_builder",
        "word": "library",
        "audioText": "library"
      },
      {
        "type": "word_builder",
        "word": "quiet",
        "audioText": "quiet"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "usually",
          "have",
          "four",
          "classes",
          "before",
          "lunch."
        ],
        "audioText": "I usually have four classes before lunch."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Now I go to the reading club every ___.",
        "choices": [
          "Friday",
          "Monday",
          "Sunday"
        ],
        "answer": "Friday",
        "audioText": "Now I go to the reading club every Friday."
      }
    ]
  },
  {
    "id": "zk-r1-s02",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 2,
    "title": "Our New Reading Club",
    "titleCn": "我们的新读书俱乐部",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "Last month our school started a new reading club. I joined it on the first day. Our English teacher, Miss Li, is the club leader. She says that reading opens a new world for us.",
        "translation": "上个月，我们学校成立了一个新的读书俱乐部。我在第一天就加入了。我们的英语老师李老师是俱乐部的负责人。她说，阅读为我们打开了一个新世界。"
      },
      {
        "text": "We meet in the school library every Tuesday afternoon. I usually arrive ten minutes early. My friend Wang Ming is always the first to come. He often reads two books in one week.",
        "translation": "我们每周二下午在学校图书馆活动。我通常会早到十分钟。我的朋友王明总是第一个来。他常常一周读两本书。"
      },
      {
        "text": "Last Tuesday Miss Li gave us a small task. She asked us to choose one book and share it. I thought that the story was really interesting. So I told my classmates about it.",
        "translation": "上周二，李老师给我们布置了一个小任务。她让我们选一本书并分享它。我觉得这个故事真的很有趣。于是我把这本书讲给了同学们听。"
      },
      {
        "text": "I stood in front of the class and felt nervous. My hands were cold and my voice was low. But Miss Li smiled and said that I did well. After that, I felt much better.",
        "translation": "我站在全班同学面前，感到很紧张。我的手冰凉，声音也很小。但李老师微笑着说我做得不错。那之后，我感觉好多了。"
      },
      {
        "text": "Now I know that reading is not boring at all. I always carry a book in my school bag. Sometimes I read for twenty minutes before dinner. Books help me think and learn new things.",
        "translation": "现在我知道，阅读一点也不无聊。我总是把一本书放在书包里。有时我会在晚饭前读二十分钟。书帮助我思考，也让我学到新东西。"
      },
      {
        "text": "Our club has twenty members now. We never feel lonely when we read together. I think that everyone can find a good book. Would you like to join us next Tuesday?",
        "translation": "我们俱乐部现在有二十名成员。一起读书时，我们从不会感到孤单。我认为每个人都能找到一本好书。下周二你愿意加入我们吗？"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where does the reading club meet every Tuesday?",
        "audioText": "Where does the reading club meet every Tuesday?",
        "options": [
          {
            "emoji": "📚",
            "value": "library",
            "text": "In the school library"
          },
          {
            "emoji": "🏀",
            "value": "playground",
            "text": "On the playground"
          },
          {
            "emoji": "🍜",
            "value": "dining",
            "text": "In the dining hall"
          }
        ],
        "answer": "library"
      },
      {
        "type": "image_choice",
        "question": "How did the writer feel when he stood in front of the class?",
        "audioText": "How did the writer feel when he stood in front of the class?",
        "options": [
          {
            "emoji": "😰",
            "value": "nervous",
            "text": "Nervous"
          },
          {
            "emoji": "😄",
            "value": "happy",
            "text": "Happy"
          },
          {
            "emoji": "😴",
            "value": "sleepy",
            "text": "Sleepy"
          }
        ],
        "answer": "nervous"
      },
      {
        "type": "word_builder",
        "word": "library",
        "audioText": "library"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "thought",
          "that",
          "the",
          "story",
          "was",
          "really",
          "interesting"
        ],
        "audioText": "I thought that the story was really interesting."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Miss Li ___ us a small task last Tuesday.",
        "choices": [
          "gave",
          "gives",
          "give"
        ],
        "answer": "gave",
        "audioText": "Miss Li gave us a small task last Tuesday."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Now I know ___ reading is not boring at all.",
        "choices": [
          "that",
          "what",
          "who"
        ],
        "answer": "that",
        "audioText": "Now I know that reading is not boring at all."
      }
    ]
  },
  {
    "id": "zk-r1-s03",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 3,
    "title": "Our Class Reading Club",
    "titleCn": "我们班的阅读社",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "My name is Li Hua, and I am a Grade Nine student. Our school is not big, but it is always full of life. Every morning, I usually get to class before seven thirty. I think that a good start makes the whole day easy.",
        "translation": "我叫李华，是一名九年级学生。我们学校不大，但总是充满活力。每天早上，我通常七点半前就到教室。我觉得，一个好的开始能让一整天都轻松起来。"
      },
      {
        "text": "Last Monday, our English teacher, Ms. Wang, gave us a surprise. She said that we would have a class reading club. We often read short stories in class, but this was different. Everyone in our class was excited about the news.",
        "translation": "上周一，我们的英语老师王老师给了我们一个惊喜。她说我们要办一个班级阅读社。我们经常在课上读短篇故事，但这次不一样。班上每个人听到这个消息都很兴奋。"
      },
      {
        "text": "The club meets every Wednesday after school. We sit in a circle and share our favorite books. Sometimes we act out a story in front of the class. I know that reading aloud helps me speak better English.",
        "translation": "阅读社每周三放学后活动。我们围坐成一圈，分享自己最喜欢的书。有时我们会在全班面前把故事演出来。我知道，大声朗读能帮我把英语说得更好。"
      },
      {
        "text": "Two weeks ago, we had a math test. I did badly and felt sad after school. My friend Zhang Ming told me that everyone fails sometimes. He said that we could study together in the library. I was happy to hear that.",
        "translation": "两周前，我们进行了一次数学测验。我考得很差，放学后心里很难过。我的朋友张明告诉我，每个人都会有失败的时候。他说我们可以一起去图书馆学习。听到这话我很高兴。"
      },
      {
        "text": "Now I usually stay after class to read with my friends. On Fridays, we sometimes play word games in the club. Ms. Wang always says that small steps lead to big changes. I think she is right.",
        "translation": "现在，我通常放学后留下来和朋友们一起读书。每周五，我们有时会在社团里玩单词游戏。王老师总说，一小步一小步的积累会带来大的改变。我觉得她说得对。"
      },
      {
        "text": "Last Friday, I read a story to the whole class. My hands were shaking, but I finished it. My classmates clapped for me, and I smiled for a long time. I know now that I am not afraid of speaking.",
        "translation": "上周五，我给全班读了一个故事。我的手一直在抖，但我还是读完了。同学们为我鼓掌，我笑了很久。现在我知道，我不再害怕开口说话了。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "When does the class reading club meet?",
        "audioText": "When does the class reading club meet?",
        "options": [
          {
            "emoji": "📅",
            "value": "wednesday",
            "text": "Wednesday"
          },
          {
            "emoji": "📆",
            "value": "monday",
            "text": "Monday"
          },
          {
            "emoji": "🗓️",
            "value": "friday",
            "text": "Friday"
          }
        ],
        "answer": "wednesday"
      },
      {
        "type": "image_choice",
        "question": "How did Li Hua feel after the math test?",
        "audioText": "How did Li Hua feel after the math test?",
        "options": [
          {
            "emoji": "😢",
            "value": "sad",
            "text": "Sad"
          },
          {
            "emoji": "😄",
            "value": "happy",
            "text": "Happy"
          },
          {
            "emoji": "😴",
            "value": "tired",
            "text": "Tired"
          }
        ],
        "answer": "sad"
      },
      {
        "type": "word_builder",
        "word": "library",
        "audioText": "library"
      },
      {
        "type": "word_builder",
        "word": "excited",
        "audioText": "excited"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "often",
          "read",
          "short",
          "stories",
          "in",
          "class."
        ],
        "audioText": "We often read short stories in class."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She said that we would have a class reading ___.",
        "choices": [
          "club",
          "test",
          "game"
        ],
        "answer": "club",
        "audioText": "She said that we would have a class reading club."
      }
    ]
  },
  {
    "id": "zk-r1-s04",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 4,
    "title": "One Page a Day",
    "titleCn": "每天一页",
    "coverEmoji": "📖",
    "paragraphs": [
      {
        "text": "My name is Li Ming, and I am in Grade Nine. Every morning I ride my bike to school at seven. I often arrive ten minutes before the first class. I think that a good morning makes a good day.",
        "translation": "我叫李明，是一名九年级学生。每天早上七点，我骑自行车去学校。我常常在第一节课前十分钟到校。我觉得，好的早晨能带来美好的一天。"
      },
      {
        "text": "Last September our English teacher, Miss Wang, started a reading club. She said that reading could open a new world for us. At first I didn't join it because my English was poor. I felt afraid of reading long stories in front of others.",
        "translation": "去年九月，我们的英语老师王老师创办了一个阅读社。她说，阅读能为我们打开一个新世界。起初我没有参加，因为我的英语很差。我害怕在别人面前读长故事。"
      },
      {
        "text": "One Tuesday afternoon, Miss Wang asked me to stay after class. She gave me a thin book with many short stories. She said that I could read one page a day. \"Nobody becomes a good reader in one night,\" she told me. I took the book home. I read the first page slowly.",
        "translation": "一个周二的下午，王老师让我下课后留下来。她给了我一本书，薄薄的，里面有很多短故事。她说我可以每天读一页。“没有人能在一夜之间成为好读者，”她对我说。我把书带回了家，慢慢地读了第一页。"
      },
      {
        "text": "For two months I read a page every evening before bed. Sometimes I met new words, so I wrote them in a small notebook. On Fridays the club members always shared their favourite stories. I listened carefully and never said anything at first.",
        "translation": "有两个月的时间，我每天晚上睡前都读一页。有时我会碰到生词，就把它们记在一个小本子上。每到周五，社团的成员们总会分享他们最喜欢的故事。我认真地听着，一开始什么也没说。"
      },
      {
        "text": "Then one Friday I stood up and read a short story aloud. I was very nervous at first. My voice was low, but my classmates clapped for me. Miss Wang smiled and said that my reading was getting better. I knew that I had made real progress that day.",
        "translation": "后来有一个周五，我站起来大声读了一个短故事。一开始我非常紧张。我的声音很小，但同学们为我鼓了掌。王老师笑了，说我的朗读在进步。我知道，那天我真的进步了。"
      },
      {
        "text": "Now I am a member of the reading club, and I never miss a Friday meeting. I still read one page a day, but I am not afraid any more. I think that small steps can take us a long way.",
        "translation": "现在我是阅读社的一员，从不错过周五的聚会。我仍然每天读一页，但我不再害怕了。我认为，小小的步伐也能带我们走很远。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "How does Li Ming go to school every morning?",
        "audioText": "How does Li Ming go to school every morning?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "By bike"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "By bus"
          },
          {
            "emoji": "🚶",
            "value": "walk",
            "text": "On foot"
          }
        ],
        "answer": "bike"
      },
      {
        "type": "image_choice",
        "question": "What did Miss Wang give Li Ming one Tuesday afternoon?",
        "audioText": "What did Miss Wang give Li Ming one Tuesday afternoon?",
        "options": [
          {
            "emoji": "📖",
            "value": "book",
            "text": "A thin book"
          },
          {
            "emoji": "✏️",
            "value": "pencil",
            "text": "A pencil"
          },
          {
            "emoji": "🎒",
            "value": "bag",
            "text": "A school bag"
          }
        ],
        "answer": "book"
      },
      {
        "type": "word_builder",
        "word": "reader",
        "audioText": "reader"
      },
      {
        "type": "word_builder",
        "word": "notebook",
        "audioText": "notebook"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Nobody",
          "becomes",
          "a",
          "good",
          "reader",
          "in",
          "one",
          "night."
        ],
        "audioText": "Nobody becomes a good reader in one night."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She said ___ I could read one page a day.",
        "choices": [
          "that",
          "what",
          "which"
        ],
        "answer": "that",
        "audioText": "She said that I could read one page a day."
      }
    ]
  },
  {
    "id": "zk-r1-s05",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 5,
    "title": "Our Paper Bridge",
    "titleCn": "我们的纸桥",
    "coverEmoji": "🌉",
    "paragraphs": [
      {
        "text": "Our science teacher told us that we would have a fair. Everyone in our class was very excited about it. We usually meet after school on Friday afternoons. My group had four students and we were good friends.",
        "translation": "科学老师告诉我们，我们班要办一场展览。班上每个人都很兴奋。我们通常在周五放学后碰面。我们小组有四个人，大家都是好朋友。"
      },
      {
        "text": "I said that we should build a paper bridge together. My friend Li Ming thought that a model car was better. We talked about it for two days after class. In the end, we chose the paper bridge. Our teacher knew that we could do it well.",
        "translation": "我说我们应该一起做一座纸桥。我的朋友李明觉得做一辆模型车更好。我们课后讨论了两天。最后，我们选了纸桥。老师知道我们一定能做好。"
      },
      {
        "text": "Every afternoon we worked on our bridge in the lab. We often stayed there until five o'clock. Sometimes the paper broke and we had to start again. But we never gave up or felt unhappy.",
        "translation": "每天下午我们都在实验室里做桥。我们常常待到五点。有时纸会断，我们只好重新开始。但我们从不放弃，也不觉得难过。"
      },
      {
        "text": "On the fair day, many students came to see our bridge. They said that our bridge looked strong and beautiful. I felt proud because we made it with our own hands. Our teacher smiled and took a photo for us.",
        "translation": "展览那天，很多同学来看我们的桥。他们说我们的桥看起来又结实又漂亮。我很自豪，因为这是我们亲手做的。老师笑着给我们拍了张照片。"
      },
      {
        "text": "After the fair, I know that teamwork is very important. I think that a good team never stops trying. Now I always listen to my friends before I speak. Our small bridge taught me a big lesson.",
        "translation": "展览之后，我明白了团队合作非常重要。我觉得好的团队从不停下尝试的脚步。现在说话前，我总是先听听朋友们的想法。这座小小的桥给我上了重要的一课。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the group build for the fair?",
        "audioText": "What did the group build for the fair?",
        "options": [
          {
            "emoji": "🌉",
            "value": "bridge",
            "text": "A bridge"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A car"
          },
          {
            "emoji": "🚀",
            "value": "rocket",
            "text": "A rocket"
          }
        ],
        "answer": "bridge"
      },
      {
        "type": "image_choice",
        "question": "What did the teacher do at the end of the fair day?",
        "audioText": "What did the teacher do at the end of the fair day?",
        "options": [
          {
            "emoji": "📷",
            "value": "photo",
            "text": "Took a photo"
          },
          {
            "emoji": "🎵",
            "value": "song",
            "text": "Sang a song"
          },
          {
            "emoji": "🏀",
            "value": "ball",
            "text": "Played basketball"
          }
        ],
        "answer": "photo"
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "word_builder",
        "word": "teacher",
        "audioText": "teacher"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "In",
          "the",
          "end,",
          "we",
          "chose",
          "the",
          "paper",
          "bridge."
        ],
        "audioText": "In the end, we chose the paper bridge."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Our science teacher told us that we ___ have a fair.",
        "choices": [
          "would",
          "will",
          "are"
        ],
        "answer": "would",
        "audioText": "Our science teacher told us that we would have a fair."
      }
    ]
  },
  {
    "id": "zk-r1-s06",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 6,
    "title": "Our Class Wall Newspaper",
    "titleCn": "我们的班级墙报",
    "coverEmoji": "📰",
    "paragraphs": [
      {
        "text": "Last month, Ms. Lin told us some exciting news. Our class would make a wall newspaper for Open Day. We felt happy but a little worried. I thought that it was a hard job for us.",
        "translation": "上个月，林老师告诉了我们一个令人兴奋的消息。我们班要为开放日制作一份墙报。我们很开心，但也有点担心。我觉得这对我们来说是个很难的任务。"
      },
      {
        "text": "On Monday, we had a class meeting about the plan. Ms. Lin said that everyone should join one group. I usually write short stories, so I chose the writing group. Li Hua often draws animals and plants. So she joined the art group.",
        "translation": "周一，我们开了一次班会来讨论这个计划。林老师说，每个人都应该加入一个小组。我平时喜欢写小故事，所以选了写作组。李华经常画动物和植物，于是她加入了美术组。"
      },
      {
        "text": "After school, we always met in the classroom for an hour. Some students looked for good photos on the Internet. Others cut colorful paper into small pieces. We talked and laughed while we worked.",
        "translation": "放学后，我们总是留在教室里一个小时。一些同学上网找好看的图片，另一些同学把彩纸剪成小片。我们一边干活，一边聊天、大笑。"
      },
      {
        "text": "On Thursday, I finished my story about our school garden. I read it again and knew that something was wrong. The story was too long and boring. I felt sad and wanted to give up.",
        "translation": "周四，我写完了那篇关于学校花园的故事。我又读了一遍，发现有些地方不对劲。这个故事太长、太无聊了。我很难过，想要放弃。"
      },
      {
        "text": "Ms. Lin smiled and said that I could make it shorter. Then she helped me choose the best parts. My classmates said that the new story was much better. I learned that a good story needs clear ideas.",
        "translation": "林老师笑着说，我可以把它改短一些。然后她帮我挑出最好的部分。同学们都说新故事好多了。我明白了，好故事需要有清晰的想法。"
      },
      {
        "text": "On Open Day, many parents came to our classroom. They stood in front of our wall newspaper and read it. Our teacher said that we did a great job. Now I know that teamwork makes hard things easy.",
        "translation": "开放日那天，很多家长来到我们教室。他们站在我们的墙报前，认真地读了起来。老师说我们做得非常棒。现在我知道了，团队合作能让难事变简单。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does Li Hua often draw?",
        "audioText": "What does Li Hua often draw?",
        "options": [
          {
            "emoji": "🌿",
            "value": "plants",
            "text": "Animals and plants"
          },
          {
            "emoji": "🚗",
            "value": "cars",
            "text": "Cars and buses"
          },
          {
            "emoji": "⚽",
            "value": "balls",
            "text": "Balls and games"
          }
        ],
        "answer": "plants"
      },
      {
        "type": "image_choice",
        "question": "Where did the students always meet after school?",
        "audioText": "Where did the students always meet after school?",
        "options": [
          {
            "emoji": "🏫",
            "value": "classroom",
            "text": "In the classroom"
          },
          {
            "emoji": "🌳",
            "value": "park",
            "text": "In the park"
          },
          {
            "emoji": "📚",
            "value": "library",
            "text": "In the library"
          }
        ],
        "answer": "classroom"
      },
      {
        "type": "word_builder",
        "word": "newspaper",
        "audioText": "newspaper"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "felt",
          "sad",
          "and",
          "wanted",
          "to",
          "give",
          "up."
        ],
        "audioText": "I felt sad and wanted to give up."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "talked",
          "and",
          "laughed",
          "while",
          "we",
          "worked."
        ],
        "audioText": "We talked and laughed while we worked."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Ms. Lin ___ that everyone should join one group.",
        "choices": [
          "said",
          "says",
          "saying"
        ],
        "answer": "said",
        "audioText": "Ms. Lin said that everyone should join one group."
      }
    ]
  },
  {
    "id": "zk-r1-s07",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 7,
    "title": "The Class Relay Race",
    "titleCn": "班级接力赛",
    "coverEmoji": "🏃",
    "paragraphs": [
      {
        "text": "Our school sports day comes every October. Everyone in my class feels excited about it. Our teacher says that we should try our best.",
        "translation": "我们学校的运动会每年十月举行。班上每个人都很期待。老师说我们应该尽自己最大的努力。"
      },
      {
        "text": "I usually run fast, so my class chose me. I felt happy but also a little nervous. I thought that I could not run well.",
        "translation": "我平时跑得挺快，所以班里选了我。我既高兴又有点紧张。我觉得自己肯定跑不好。"
      },
      {
        "text": "Every afternoon we practiced on the playground. My friend Li Ming always cheered for me. He said that I ran the fastest.",
        "translation": "每天下午我们都在操场上练习。我的朋友李明总是为我加油。他说我跑得最快。"
      },
      {
        "text": "On sports day, the playground was full of students. My heart beat fast before the race. Our team stood in a line and waited.",
        "translation": "运动会那天，操场上站满了同学。比赛前我的心跳得很快。我们队排成一排，静静地等着。"
      },
      {
        "text": "The race started, and I ran as fast as I could. Then I passed the stick to the next runner. Our class got the second place at last.",
        "translation": "比赛开始了，我拼命地往前跑。然后我把接力棒传给了下一位同学。我们班最后得了第二名。"
      },
      {
        "text": "I know that winning is not everything. Trying my best with my friends is the best prize. Now I never feel afraid of a big race.",
        "translation": "我知道赢并不是一切。和朋友们一起努力，才是最好的奖励。现在我再也不怕大赛了。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which race did the writer join on sports day?",
        "audioText": "Which race did the writer join on sports day?",
        "options": [
          {
            "emoji": "🏃",
            "value": "relay",
            "text": "A relay race"
          },
          {
            "emoji": "⚽",
            "value": "football",
            "text": "A football match"
          },
          {
            "emoji": "🏊",
            "value": "swimming",
            "text": "A swimming race"
          }
        ],
        "answer": "relay"
      },
      {
        "type": "word_builder",
        "word": "nervous",
        "audioText": "nervous"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Everyone in my class feels ___ about it.",
        "choices": [
          "excited",
          "exciting",
          "excite"
        ],
        "answer": "excited",
        "audioText": "Everyone in my class feels excited about it."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "thought",
          "that",
          "I",
          "could",
          "not",
          "run",
          "well."
        ],
        "audioText": "I thought that I could not run well."
      },
      {
        "type": "image_choice",
        "question": "What place did the writer's class get at last?",
        "audioText": "What place did the writer's class get at last?",
        "options": [
          {
            "emoji": "🥈",
            "value": "second",
            "text": "Second place"
          },
          {
            "emoji": "🥇",
            "value": "first",
            "text": "First place"
          },
          {
            "emoji": "🥉",
            "value": "third",
            "text": "Third place"
          }
        ],
        "answer": "second"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Our",
          "class",
          "got",
          "the",
          "second",
          "place",
          "at",
          "last."
        ],
        "audioText": "Our class got the second place at last."
      }
    ]
  },
  {
    "id": "zk-r1-s08",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 8,
    "title": "My First Class Speech",
    "titleCn": "我的第一次班级演讲",
    "coverEmoji": "🎤",
    "paragraphs": [
      {
        "text": "Every autumn our school holds a big speech day. Each class sends one student to speak in the hall. I am usually quiet, and I never raise my hand.",
        "translation": "每年秋天，我们学校都会举办一场大型演讲日。每个班派一名学生到礼堂演讲。我平时很安静，从不举手。"
      },
      {
        "text": "Last Monday our teacher, Miss Lin, looked at the whole class. She said that we needed a speaker for this year. Everyone looked down at their desks quietly. I thought that the job was too hard for me.",
        "translation": "上周一，我们的老师林老师看着全班同学。她说今年我们需要一名演讲者。大家都默默地低头看着课桌。我觉得这件事对我来说太难了。"
      },
      {
        "text": "After class, Miss Lin asked me to stay for a minute. She told me that my voice was clear and warm. \"You can do it,\" she said with a smile. I still felt afraid, but I said yes.",
        "translation": "下课后，林老师让我留下来待一会儿。她说我的声音清亮又温暖。“你能做到的，”她笑着说。我心里还是害怕，但我答应了。"
      },
      {
        "text": "For a week I practiced in front of the mirror every night. My little sister often listened and clapped for me. I knew that she was my best fan at home.",
        "translation": "有一个星期，我每天晚上都在镜子前练习。我的小妹妹常常听我讲，还为我鼓掌。我知道在家里她是我的头号支持者。"
      },
      {
        "text": "On Friday morning I stood on the big stage in the hall. My hands were cold, and my heart beat fast. Then I saw Miss Lin near the door. She smiled at me, and I began to speak.",
        "translation": "周五早上，我站在礼堂的大舞台上。我的手冰凉，心跳得飞快。这时我看见门口附近的林老师。她朝我微笑，我便开始演讲。"
      },
      {
        "text": "My speech was about helping others at school. When I finished, the whole hall clapped loudly. I know that I am still shy sometimes. But now I always put up my hand in class.",
        "translation": "我的演讲是关于在学校帮助他人的。当我讲完时，整个礼堂都热烈鼓掌。我知道自己有时还是很害羞。但现在我总在课堂上举手。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where do the students speak on speech day?",
        "audioText": "Where do the students speak on speech day?",
        "options": [
          {
            "emoji": "🏫",
            "value": "hall",
            "text": "In the school hall"
          },
          {
            "emoji": "🌳",
            "value": "park",
            "text": "In the park"
          },
          {
            "emoji": "🏠",
            "value": "home",
            "text": "At home"
          }
        ],
        "answer": "hall"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She said that we ___ a speaker for this year.",
        "choices": [
          "needed",
          "needs",
          "need"
        ],
        "answer": "needed",
        "audioText": "She said that we needed a speaker for this year."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Then",
          "I",
          "saw",
          "Miss",
          "Lin",
          "near",
          "the",
          "door."
        ],
        "audioText": "Then I saw Miss Lin near the door."
      },
      {
        "type": "word_builder",
        "word": "mirror",
        "audioText": "mirror"
      },
      {
        "type": "image_choice",
        "question": "Who often listened and clapped for him at home?",
        "audioText": "Who often listened and clapped for him at home?",
        "options": [
          {
            "emoji": "👧",
            "value": "sister",
            "text": "His little sister"
          },
          {
            "emoji": "👦",
            "value": "brother",
            "text": "His brother"
          },
          {
            "emoji": "👩‍🏫",
            "value": "teacher",
            "text": "His teacher"
          }
        ],
        "answer": "sister"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "When",
          "I",
          "finished,",
          "the",
          "whole",
          "hall",
          "clapped",
          "loudly."
        ],
        "audioText": "When I finished, the whole hall clapped loudly."
      }
    ]
  },
  {
    "id": "zk-r1-s09",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 9,
    "title": "My Turn to Speak",
    "titleCn": "轮到我发言",
    "coverEmoji": "🎤",
    "paragraphs": [
      {
        "text": "I used to be the quietest student in my class. I always sat in the back row. I never put up my hand. When the teacher asked a question, I usually looked down. I thought that speaking in front of people was hard.",
        "translation": "我曾经是班里最安静的学生。我总是坐在最后一排，从来不举手。老师提问的时候，我通常低头看着桌子。我觉得在人前讲话太难了。"
      },
      {
        "text": "Last month Miss Lin told us about a class speech day. She is our English teacher. She said that every student should give a short talk. My heart went cold when I heard the news. I told her that I could not do it.",
        "translation": "上个月，林老师跟我们说起了班级演讲日。她是我们的英语老师。她说每个同学都要做一个简短的发言。听到这个消息，我的心一下子凉了。我告诉她我做不到。"
      },
      {
        "text": "Miss Lin did not push me. She only said that I could choose any topic. I thought about it for two days. Then I decided to talk about my little dog, Lucky. I knew that topic well, so I felt safer.",
        "translation": "林老师没有逼我。她只是说我可以选任何自己喜欢的话题。我想了两天。然后我决定讲讲我的小狗 Lucky。这个话题我很熟，所以觉得安心了一些。"
      },
      {
        "text": "I practised at home every evening. I spoke to the mirror, to my sister, and even to Lucky. My sister often said that my voice was too low. So I tried to speak more slowly and more loudly. Slowly, I began to feel better.",
        "translation": "每天傍晚我都在家练习。我对着镜子说，对着妹妹说，甚至对着 Lucky 说。妹妹常常说我的声音太小。于是我试着说得更慢、更响亮。慢慢地，我感觉好多了。"
      },
      {
        "text": "On Friday afternoon, it was my turn. My legs felt like jelly. But I walked to the front of the class. I told them how Lucky waits for me at the door. The classroom was very quiet. Then Tom laughed, and I laughed too.",
        "translation": "星期五下午，轮到我了。我的腿软得像果冻。但我还是走到了全班同学前面。我给大家讲了 Lucky 怎样在门口等我。教室里非常安静。然后 Tom 笑了，我也笑了。"
      },
      {
        "text": "When I finished, everyone clapped. Miss Lin smiled and said that I had done a good job. Now I sometimes still sit in the back row. But I always put up my hand when I know the answer. I know that I can speak when I am ready.",
        "translation": "我讲完后，大家都鼓起掌来。林老师笑着说，我做得很好。现在，我有时还是坐在后排。但当我知道答案时，我总是举手。我知道，准备好的时候我就能开口了。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did the writer always sit in class?",
        "audioText": "Where did the writer always sit in class?",
        "options": [
          {
            "emoji": "🪑",
            "value": "back",
            "text": "In the back row"
          },
          {
            "emoji": "🪟",
            "value": "window",
            "text": "By the window"
          },
          {
            "emoji": "🚪",
            "value": "door",
            "text": "Near the door"
          }
        ],
        "answer": "back"
      },
      {
        "type": "image_choice",
        "question": "What did the writer talk about in the speech?",
        "audioText": "What did the writer talk about in the speech?",
        "options": [
          {
            "emoji": "🐶",
            "value": "dog",
            "text": "My little dog"
          },
          {
            "emoji": "⚽",
            "value": "football",
            "text": "A football match"
          },
          {
            "emoji": "🎹",
            "value": "music",
            "text": "A music lesson"
          }
        ],
        "answer": "dog"
      },
      {
        "type": "word_builder",
        "word": "mirror",
        "audioText": "mirror"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "practised",
          "at",
          "home",
          "every",
          "evening"
        ],
        "audioText": "I practised at home every evening."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Then",
          "Tom",
          "laughed",
          "and",
          "I",
          "laughed",
          "too"
        ],
        "audioText": "Then Tom laughed, and I laughed too."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Miss Lin smiled and said ___ I had done a good job.",
        "choices": [
          "that",
          "what",
          "which"
        ],
        "answer": "that",
        "audioText": "Miss Lin smiled and said that I had done a good job."
      }
    ]
  },
  {
    "id": "zk-r1-s10",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 10,
    "title": "Our Class Lost and Found",
    "titleCn": "我们班的失物招领箱",
    "coverEmoji": "📦",
    "paragraphs": [
      {
        "text": "Last month, small things often went missing in our classroom. We sometimes left pens and rulers on our desks. Nobody knew that a blue notebook was under the window.",
        "translation": "上个月，我们教室里的小东西常常不见了。我们有时把钢笔和尺子落在课桌上。没有人知道，窗台下还躺着一本蓝色的笔记本。"
      },
      {
        "text": "Our teacher, Ms. Lin, said that we needed a good plan. She always has clever ideas. We decided that a lost and found box would help.",
        "translation": "我们的林老师说，我们需要一个好办法。她总是有聪明的点子。我们决定做一个失物招领箱，一定会有用。"
      },
      {
        "text": "On Monday morning, we brought an old box to school. Li Ming found a red scarf and some pencils. Our monitor wrote Lost and Found on the box.",
        "translation": "星期一早上，我们把一个旧箱子带到了学校。李明找到了一条红围巾和几支铅笔。我们的班长在箱子上写了“失物招领”。"
      },
      {
        "text": "Soon, many students came to the box after class. They usually found their own lost things there. Everyone said that the box was great.",
        "translation": "很快，很多同学下课后都来到箱子前。他们通常都能在那里找到自己丢的东西。大家都说这个箱子太棒了。"
      },
      {
        "text": "One afternoon, I found a small notebook near the door. The name on it was Wang Fang's. I gave it back to her after class. She smiled and said thanks to me.",
        "translation": "一天下午，我在门边发现了一本小笔记本。上面的名字是王芳的。下课后我还给了她。她笑了，还向我道谢。"
      },
      {
        "text": "Now the box sits quietly in the corner of our classroom. We often put small things in it. I think that everyone should help each other.",
        "translation": "现在，这个箱子静静地待在我们教室的角落里。我们常常把小东西放进去。我觉得每个人都应该互相帮助。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Li Ming find on Monday morning?",
        "audioText": "What did Li Ming find on Monday morning?",
        "options": [
          {
            "emoji": "🧣",
            "value": "scarf",
            "text": "A red scarf"
          },
          {
            "emoji": "📦",
            "value": "box",
            "text": "An old box"
          },
          {
            "emoji": "📓",
            "value": "notebook",
            "text": "A small notebook"
          }
        ],
        "answer": "scarf"
      },
      {
        "type": "image_choice",
        "question": "Who found the small notebook near the door?",
        "audioText": "Who found the small notebook near the door?",
        "options": [
          {
            "emoji": "🙋",
            "value": "me",
            "text": "Me"
          },
          {
            "emoji": "👧",
            "value": "wangfang",
            "text": "Wang Fang"
          },
          {
            "emoji": "👩🏫",
            "value": "mslin",
            "text": "Ms. Lin"
          }
        ],
        "answer": "me"
      },
      {
        "type": "word_builder",
        "word": "notebook",
        "audioText": "notebook"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Everyone",
          "said",
          "that",
          "the",
          "box",
          "was",
          "great."
        ],
        "audioText": "Everyone said that the box was great."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "always",
          "has",
          "clever",
          "ideas."
        ],
        "audioText": "She always has clever ideas."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "We ___ put small things in it.",
        "choices": [
          "often",
          "never",
          "hardly"
        ],
        "answer": "often",
        "audioText": "We often put small things in it."
      }
    ]
  },
  {
    "id": "zk-r1-s11",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 11,
    "title": "The Bridge We Built",
    "titleCn": "我们亲手搭起的那座桥",
    "coverEmoji": "🌉",
    "paragraphs": [
      {
        "text": "Our school holds a science fair every spring. This year our class decided to join it. We wanted to make something new and useful. Our teacher, Mr. Lin, said that we could work in groups.",
        "translation": "我们学校每年春天都会举办科学展。今年，我们班决定参加。我们想做一件又新又有用的东西。我们的老师林老师说，我们可以分组来做。"
      },
      {
        "text": "I joined a group with Li Mei and Wang Tao. We often stayed after class to talk about ideas. Li Mei thought that a small robot would be cool. Wang Tao knew that robots cost too much money. I said that we should build a model bridge. In the end, everyone agreed with my idea.",
        "translation": "我和李梅、王涛分在了一组。我们常常在课后留下来聊想法。李梅觉得做个小机器人会很酷。王涛知道机器人要花太多钱。我说我们该搭一座桥梁模型。最后，大家都同意了我的想法。"
      },
      {
        "text": "We spent two weeks on our bridge. Every day after school, we met in the classroom. Li Mei drew the picture and Wang Tao cut the wood. I usually glued the small pieces together. Sometimes the bridge fell down, and we had to start again.",
        "translation": "我们在这座桥上花了两个星期。每天放学后，我们都在教室里碰头。李梅画图，王涛切木条。我通常负责把小木片粘在一起。有时候桥会塌下来，我们只好重新开始。"
      },
      {
        "text": "On the fair day, our bridge stood on the table. Many students came to look at it. A boy asked how strong it was. I told him that it could hold ten books. He looked surprised and said that we were clever. Our teacher smiled and took a photo.",
        "translation": "展览那天，我们的桥立在桌子上。很多同学过来看。一个男孩问它有多结实。我告诉他，它能托住十本书。他看起来很惊讶，说我们真聪明。老师笑了，还拍了张照片。"
      },
      {
        "text": "We did not win the first prize that day. But I learned something more important. I know that a good team needs many ideas. I also know that we should never give up. Now I always listen to my friends before I decide.",
        "translation": "那天我们没有拿到一等奖。但我学到了更重要的东西。我知道，一个好的团队需要很多想法。我也知道，我们永远不该放弃。现在，我做决定之前总会先听听朋友们的意见。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer's group finally decide to build?",
        "audioText": "What did the writer's group finally decide to build?",
        "options": [
          {
            "emoji": "🌉",
            "value": "bridge",
            "text": "A bridge"
          },
          {
            "emoji": "🤖",
            "value": "robot",
            "text": "A robot"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A toy car"
          }
        ],
        "answer": "bridge"
      },
      {
        "type": "image_choice",
        "question": "What did the teacher take at the science fair?",
        "audioText": "What did the teacher take at the science fair?",
        "options": [
          {
            "emoji": "📷",
            "value": "photo",
            "text": "A photo"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "An apple"
          },
          {
            "emoji": "✏️",
            "value": "pencil",
            "text": "A pencil"
          }
        ],
        "answer": "photo"
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Our",
          "teacher",
          "smiled",
          "and",
          "took",
          "a",
          "photo."
        ],
        "audioText": "Our teacher smiled and took a photo."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "usually",
          "glued",
          "the",
          "small",
          "pieces",
          "together."
        ],
        "audioText": "I usually glued the small pieces together."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Li Mei thought ___ a small robot would be cool.",
        "choices": [
          "that",
          "what",
          "if"
        ],
        "answer": "that",
        "audioText": "Li Mei thought that a small robot would be cool."
      }
    ]
  },
  {
    "id": "zk-r1-s12",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 12,
    "title": "Our Class Garden",
    "titleCn": "我们班的小菜园",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Last spring, our class started a small garden behind the school building. Our science teacher, Ms. Lin, said that we could grow vegetables there. Everyone was excited about the new project.",
        "translation": "去年春天，我们班在教学楼后面开了一小块菜园。我们的科学老师林老师说，我们可以在那里种蔬菜。大家都为这个新项目感到兴奋。"
      },
      {
        "text": "At first, nobody knew how to plant anything. I thought that we would fail on the first day. But Ms. Lin showed us how to dig and water. We often stayed after class to take care of the seeds.",
        "translation": "一开始，谁也不知道该怎么种东西。我以为我们第一天就会失败。但林老师教我们怎么松土、怎么浇水。我们常常放学后留下来照看种子。"
      },
      {
        "text": "Two weeks later, small green leaves came out of the soil. Li Ming ran to the classroom and told everyone the good news. We usually checked the garden twice a day. Even the quietest students began to talk and laugh there.",
        "translation": "两周后，土里冒出了小小的绿叶。李明跑回教室，把这个好消息告诉大家。我们通常一天去看两次菜园。就连最安静的同学也开始在那儿说笑了。"
      },
      {
        "text": "Sometimes the weather was not kind to us. One heavy rain almost washed the young plants away. We knew that we had to work together to save them. So we built a small wall with stones and old boards.",
        "translation": "有时候天气对我们并不友好。一场大雨差点把幼苗冲走。我们知道必须齐心协力才能救下它们，于是用石头和旧木板垒了一道小墙。"
      },
      {
        "text": "In June, we picked our first tomatoes and cucumbers. Ms. Lin said that she was proud of our class. We shared the vegetables with other classes at lunch. I think that the garden taught us more than books.",
        "translation": "六月里，我们摘下了第一批西红柿和黄瓜。林老师说，她为我们班感到骄傲。午饭时我们把蔬菜分给了其他班。我觉得这个小菜园教给我们的，比书本还多。"
      },
      {
        "text": "Now I always look at that small corner when I pass by. I know that good things need time and care. Next term, our class will plant something new there.",
        "translation": "现在每次路过，我总会看一眼那个小角落。我明白，美好的东西需要时间和用心。下学期，我们班要在那里种点新东西。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the students grow in their garden?",
        "audioText": "What did the students grow in their garden?",
        "options": [
          {
            "emoji": "🍅",
            "value": "tomato",
            "text": "Tomatoes"
          },
          {
            "emoji": "🍎",
            "value": "apple",
            "text": "Apples"
          },
          {
            "emoji": "🌻",
            "value": "flower",
            "text": "Flowers"
          }
        ],
        "answer": "tomato"
      },
      {
        "type": "image_choice",
        "question": "What did the students build to save the young plants?",
        "audioText": "What did the students build to save the young plants?",
        "options": [
          {
            "emoji": "🧱",
            "value": "wall",
            "text": "A small wall"
          },
          {
            "emoji": "🚪",
            "value": "door",
            "text": "A new door"
          },
          {
            "emoji": "🪑",
            "value": "chair",
            "text": "A wooden chair"
          }
        ],
        "answer": "wall"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Everyone",
          "was",
          "excited",
          "about",
          "the",
          "new",
          "project."
        ],
        "audioText": "Everyone was excited about the new project."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Two weeks later, small green ___ came out of the soil.",
        "choices": [
          "leaves",
          "books",
          "stones"
        ],
        "answer": "leaves",
        "audioText": "Two weeks later, small green leaves came out of the soil."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Ms. Lin said that she was ___ of our class.",
        "choices": [
          "proud",
          "afraid",
          "tired"
        ],
        "answer": "proud",
        "audioText": "Ms. Lin said that she was proud of our class."
      }
    ]
  },
  {
    "id": "zk-r1-s13",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 13,
    "title": "Our Class Dream Box",
    "titleCn": "我们的班级梦想盒",
    "coverEmoji": "📦",
    "paragraphs": [
      {
        "text": "Last week, our class had a wonderful new idea. Ms. Lin said that we would make a class dream box. We often talk about our dreams and our future.",
        "translation": "上周，我们班有了一个新奇的好主意。林老师说，我们要做一个班级梦想盒。我们常常谈论自己的梦想和未来。"
      },
      {
        "text": "Every student wrote a short letter to the future. I thought that my letter was too short at first. I usually write short letters, so I added more words.",
        "translation": "每个同学都写了一封给未来的短信。起初我觉得自己的信太短了。我平时写的信都很短，所以我又多写了一些话。"
      },
      {
        "text": "Li Ming brought a small toy car and a team photo. He said that his father gave him the car years ago. We put all the things into a big box.",
        "translation": "李明带来了一辆小玩具车和一张球队合影。他说这辆车是爸爸几年前送给他的。我们把所有东西都放进了一个大盒子里。"
      },
      {
        "text": "Ms. Lin said that we should open the box in ten years. We knew that some of us would leave this school. But we all promised to come back that day.",
        "translation": "林老师说，我们应该在十年后打开这个盒子。我们知道，我们当中有些人会离开这所学校。但我们都答应那天会回来。"
      },
      {
        "text": "On Friday, we put the box under the big tree outside. Everyone clapped happily and took a photo together. I never felt so happy in a class.",
        "translation": "星期五，我们把盒子放在外面那棵大树下。大家开心地鼓掌，还一起拍了张照片。在一节课上，我从来没有这么开心过。"
      },
      {
        "text": "Now I always remember that wonderful afternoon near the tree. I think that a small box can hold a big dream. Our class will meet again in ten years.",
        "translation": "现在，我总会想起大树旁那个美好的下午。我认为，一个小盒子也能装下一个大大的梦想。十年后，我们班会再次相聚。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Li Ming bring to school?",
        "audioText": "What did Li Ming bring to school?",
        "options": [
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A toy car"
          },
          {
            "emoji": "⚽",
            "value": "ball",
            "text": "A ball"
          },
          {
            "emoji": "📚",
            "value": "book",
            "text": "A book"
          }
        ],
        "answer": "car"
      },
      {
        "type": "image_choice",
        "question": "Where did the class put the dream box?",
        "audioText": "Where did the class put the dream box?",
        "options": [
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "Under a big tree"
          },
          {
            "emoji": "🏫",
            "value": "classroom",
            "text": "In the classroom"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "On the school bus"
          }
        ],
        "answer": "tree"
      },
      {
        "type": "word_builder",
        "word": "dream",
        "audioText": "dream"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "never",
          "felt",
          "so",
          "happy",
          "in",
          "a",
          "class."
        ],
        "audioText": "I never felt so happy in a class."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Our",
          "class",
          "will",
          "meet",
          "again",
          "in",
          "ten",
          "years."
        ],
        "audioText": "Our class will meet again in ten years."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He said that his father ___ him the car years ago.",
        "choices": [
          "gave",
          "gives",
          "give"
        ],
        "answer": "gave",
        "audioText": "He said that his father gave him the car years ago."
      }
    ]
  },
  {
    "id": "zk-r1-s14",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 14,
    "title": "Our Class Science Show",
    "titleCn": "我们班的科学展",
    "coverEmoji": "🎈",
    "paragraphs": [
      {
        "text": "Our class had a science show last Friday. Each group had to make something. Then we explained it to the class. I always feel a little nervous before a show.",
        "translation": "上周五，我们班办了一场科学展。每个小组都要做一个作品，然后向全班讲解。每逢展示之前，我总是有点紧张。"
      },
      {
        "text": "My group had four students in it. We made a small car with a red balloon. Li Ming thought that the car would never move. But we tested it again and again after school. Sometimes it moved a little, and sometimes it stopped.",
        "translation": "我们组有四名同学。我们用一只红气球做了一辆小车。李明觉得这辆车根本动不起来。可放学后我们一遍又一遍地测试它。有时它动一点点，有时又干脆停住。"
      },
      {
        "text": "On Friday morning, twenty small cars stood on the long table. Our teacher said that we had five minutes for each group. When our turn came, my hands felt cold. I took a deep breath and let the balloon go.",
        "translation": "周五早上，二十辆小车摆在那张长桌上。老师说每个小组有五分钟。轮到我们时，我的手都凉了。我深吸一口气，松开了气球。"
      },
      {
        "text": "At first, our car did not move. Then the air came out of the balloon and pushed it forward. The little car went slowly, and then it went fast. Our classmates clapped and laughed happily.",
        "translation": "一开始，我们的小车一动不动。接着，空气从气球里跑出来，把它向前推。小车先慢慢走，然后就快了起来。同学们拍着手，开心地笑了起来。"
      },
      {
        "text": "Another group made a big paper plane. Their plane flew across the room and landed near the door. Everyone wanted to see it again.",
        "translation": "另一个小组做了一架大纸飞机。他们的飞机飞过教室，落在门边。大家都想再看一次。"
      },
      {
        "text": "After the show, our teacher said that every group did well. I learned that a small idea can still be great. I know that working with friends is the best part. Now I always feel excited before a show.",
        "translation": "展示结束后，老师说每个小组都做得很好。我明白了一个小小的点子也可以很了不起。我知道，和朋友一起动手才是最棒的部分。现在，每逢展示之前我总是很兴奋。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer's group make for the science show?",
        "audioText": "What did the writer's group make for the science show?",
        "options": [
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A small car"
          },
          {
            "emoji": "✈️",
            "value": "plane",
            "text": "A paper plane"
          },
          {
            "emoji": "⛵",
            "value": "boat",
            "text": "A paper boat"
          }
        ],
        "answer": "car"
      },
      {
        "type": "image_choice",
        "question": "What did the air from the balloon do to the little car?",
        "audioText": "What did the air from the balloon do to the little car?",
        "options": [
          {
            "emoji": "➡️",
            "value": "forward",
            "text": "It pushed it forward"
          },
          {
            "emoji": "⬆️",
            "value": "up",
            "text": "It lifted it up"
          },
          {
            "emoji": "🛑",
            "value": "stop",
            "text": "It stopped it"
          }
        ],
        "answer": "forward"
      },
      {
        "type": "word_builder",
        "word": "balloon",
        "audioText": "balloon"
      },
      {
        "type": "word_builder",
        "word": "nervous",
        "audioText": "nervous"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Our",
          "classmates",
          "clapped",
          "and",
          "laughed",
          "happily."
        ],
        "audioText": "Our classmates clapped and laughed happily."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Our teacher said that we ___ five minutes for each group.",
        "choices": [
          "had",
          "have",
          "has"
        ],
        "answer": "had",
        "audioText": "Our teacher said that we had five minutes for each group."
      }
    ]
  },
  {
    "id": "zk-r1-s15",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 15,
    "title": "Our Class Time Capsule",
    "titleCn": "我们的班级时光胶囊",
    "coverEmoji": "⏳",
    "paragraphs": [
      {
        "text": "Last Friday, our class started a new project. Ms. Lin told us that we would make a time capsule. Everyone in Class Three thought that it was a great idea. We often talk about our dreams in the classroom.",
        "translation": "上周五，我们班开始了一个新项目。林老师告诉我们，我们要做一个时光胶囊。三班的每个人都觉得这是个好主意。我们常常在教室里聊起各自的梦想。"
      },
      {
        "text": "On Monday, we brought small boxes to school. I put my favourite photo and a new coin inside. Wang Lei wrote a letter to his future self. He said that he wanted to be a doctor. Lily always draws pictures of our beautiful school.",
        "translation": "周一，我们把小盒子带到了学校。我把自己最喜欢的照片和一枚新硬币放了进去。王磊给他未来的自己写了一封信。他说他想当一名医生。莉莉总是把我们美丽的校园画成画。"
      },
      {
        "text": "Our teacher smiled and gave us some advice. She said that we should keep our letters short. \"Write down one thing you do every day,\" she told us. \"Then you will remember this year clearly.\"",
        "translation": "老师微笑着给了我们一些建议。她说我们的信应该写得短一点。“写下你每天都做的一件事，”她对我们说，“这样你就能清楚地记住这一年。”"
      },
      {
        "text": "I thought about my answer for a long time. Every morning, I run around the playground with my friends. I also help my mother cook dinner on weekends. Those small things make me happy and strong.",
        "translation": "我想了很久，不知道该怎么写。每天早上，我都和朋友们在操场上跑步。周末我还会帮妈妈做晚饭。这些小事让我快乐又坚强。"
      },
      {
        "text": "On Friday afternoon, we put our boxes into one big box. The whole class carried it to the garden behind our building. Ms. Lin said that we would open it in three years. Suddenly, everyone became quiet and thoughtful.",
        "translation": "周五下午，我们把各自的盒子放进一个大箱子里。全班同学一起把它抬到教学楼后面的花园里。林老师说，我们三年后再打开它。忽然，大家都安静下来，陷入了沉思。"
      },
      {
        "text": "Now the box sits quietly under a young tree. When I walk past it, I always think about my letter. I know that my small habits will build my future. Class Three will meet again, and we will remember this day.",
        "translation": "现在，那个箱子静静地放在一棵小树下。每当我从它旁边走过，我总会想起我的那封信。我知道，我的这些小习惯会造就我的未来。三班会再相聚，而我们都会记住这一天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Wang Lei put in his box?",
        "audioText": "What did Wang Lei put in his box?",
        "options": [
          {
            "emoji": "✉️",
            "value": "letter",
            "text": "A letter"
          },
          {
            "emoji": "📷",
            "value": "photo",
            "text": "A photo"
          },
          {
            "emoji": "🪙",
            "value": "coin",
            "text": "A coin"
          }
        ],
        "answer": "letter"
      },
      {
        "type": "image_choice",
        "question": "Where did the whole class carry the big box?",
        "audioText": "Where did the whole class carry the big box?",
        "options": [
          {
            "emoji": "🌳",
            "value": "garden",
            "text": "The garden"
          },
          {
            "emoji": "🏫",
            "value": "classroom",
            "text": "The classroom"
          },
          {
            "emoji": "🏃",
            "value": "playground",
            "text": "The playground"
          }
        ],
        "answer": "garden"
      },
      {
        "type": "word_builder",
        "word": "capsule",
        "audioText": "capsule"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lily",
          "always",
          "draws",
          "pictures",
          "of",
          "our",
          "beautiful",
          "school"
        ],
        "audioText": "Lily always draws pictures of our beautiful school."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Then",
          "you",
          "will",
          "remember",
          "this",
          "year",
          "clearly"
        ],
        "audioText": "Then you will remember this year clearly."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Ms. Lin told us that we ___ make a time capsule.",
        "choices": [
          "would",
          "will",
          "are"
        ],
        "answer": "would",
        "audioText": "Ms. Lin told us that we would make a time capsule."
      }
    ]
  },
  {
    "id": "zk-r1-s16",
    "track": "zhongkao",
    "regionId": "zk-r1",
    "order": 16,
    "title": "The Box for Our Future",
    "titleCn": "写给未来的盒子",
    "coverEmoji": "📦",
    "paragraphs": [
      {
        "text": "Last Friday Ms. Lin came into our classroom with a big smile. She put a wooden box on the teacher's desk. She told us that it was a special box for our class. We all looked at the box and felt very curious.",
        "translation": "上周五，林老师带着满脸笑容走进我们的教室。她把一个木盒子放在讲桌上。她告诉我们，那是给我们班的一个特别的盒子。我们都看着那个盒子，心里非常好奇。"
      },
      {
        "text": "Ms. Lin said that we would write a letter to the future. Every student would put one letter into the box. She said that we would keep it for three years. Then we could remember what we hoped for that day.",
        "translation": "林老师说，我们要给未来写一封信。每个同学都要把一封信放进盒子里。她说，这个盒子我们要保存三年。到那时，我们就能想起那一天自己期盼着什么。"
      },
      {
        "text": "At first, I did not know what to write. I sat and looked at the white paper for a while. I thought about my English and my math. I was often worried before a big exam. When I did badly in a test, I felt sad for days.",
        "translation": "起初，我不知道该写些什么。我坐着，盯着那张白纸看了一会儿。我想到了我的英语和数学。大考前我常常感到担心。有一次考试考砸了，我难过了好几天。"
      },
      {
        "text": "But my teacher always said that we should never give up. I wrote that I wanted to be braver next year. I also wrote about my best friend, Wang Lei. I said that I hoped he would be happy every day.",
        "translation": "但老师总是说，我们绝不应该放弃。我写道，明年我想变得更勇敢。我还写了我的好朋友王磊。我说，我希望他每天都开开心心。"
      },
      {
        "text": "After we finished, everyone put the letters into the box. Ms. Lin closed the box and smiled at us. She said that hard work always brings good results. We all believed that she was right.",
        "translation": "我们写完后，每个人都把信放进了盒子里。林老师把盒子盖上，冲我们笑了笑。她说，努力总会带来好结果。我们都相信她说得对。"
      },
      {
        "text": "Now the box sits quietly on a shelf in our classroom. Sometimes I look at it and remember that day. I know that I am growing up a little every day. Three years later, we will open the box together.",
        "translation": "现在，那个盒子安安静静地待在我们教室的书架上。有时我会看着它，想起那一天。我知道自己每天都在一点点长大。三年后，我们会一起打开这个盒子。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Ms. Lin put on the teacher's desk?",
        "audioText": "What did Ms. Lin put on the teacher's desk?",
        "options": [
          {
            "emoji": "📦",
            "value": "box",
            "text": "A box"
          },
          {
            "emoji": "📕",
            "value": "book",
            "text": "A book"
          },
          {
            "emoji": "✏️",
            "value": "pencil",
            "text": "A pencil"
          }
        ],
        "answer": "box"
      },
      {
        "type": "word_builder",
        "word": "letter",
        "audioText": "letter"
      },
      {
        "type": "image_choice",
        "question": "Where does the box sit now?",
        "audioText": "Where does the box sit now?",
        "options": [
          {
            "emoji": "📚",
            "value": "shelf",
            "text": "On a shelf"
          },
          {
            "emoji": "🚪",
            "value": "door",
            "text": "Near the door"
          },
          {
            "emoji": "🪟",
            "value": "window",
            "text": "By the window"
          }
        ],
        "answer": "shelf"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "all",
          "believed",
          "that",
          "she",
          "was",
          "right."
        ],
        "audioText": "We all believed that she was right."
      },
      {
        "type": "word_builder",
        "word": "future",
        "audioText": "future"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "I was ___ worried before a big exam.",
        "choices": [
          "often",
          "never",
          "yet"
        ],
        "answer": "often",
        "audioText": "I was often worried before a big exam."
      }
    ]
  },
  {
    "id": "zk-r2-s01",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 1,
    "title": "Two Days in Suzhou",
    "titleCn": "苏州两日",
    "coverEmoji": "🏞️",
    "paragraphs": [
      {
        "text": "Last spring, my parents took me to Suzhou for a short holiday. We left home early on Saturday morning and arrived before noon. The weather was warmer than in our city, and the air felt soft. I could not wait to see the famous gardens.",
        "translation": "去年春天，爸爸妈妈带我去苏州度了个短假。我们周六一大早就出发了，中午之前就到了。那里比我们城市暖和，空气也软软的。我迫不及待地想去看那些有名的园林。"
      },
      {
        "text": "After lunch, we walked to the oldest garden in the city. It was built more than five hundred years ago. While we were walking along the small paths, my mother took many photos. The trees there were taller and greener than the ones in our school.",
        "translation": "午饭后，我们步行去了城里最古老的园林。它建于五百多年前。当我们沿着小径散步时，妈妈拍了很多照片。那里的树比我们学校的更高、更绿。"
      },
      {
        "text": "In the afternoon, we took a small boat on the river. The boat moved slowly under an old stone bridge. I saw small houses on both sides of the river. While we were on the boat, an old man told us funny stories. He spoke faster than my teacher, but I understood most of his words.",
        "translation": "下午，我们在河上坐了一条小船。小船慢慢地从一座古老的石桥下驶过。我看见河两岸的小房子。我们在船上时，一位老人给我们讲了有趣的故事。他说得比我们老师还快，但他讲的绝大部分我都听懂了。"
      },
      {
        "text": "Before the sun went down, we stopped at a small food street. Suzhou food is sweeter than the food in my hometown. After we finished dinner, we walked along the river again. The lights on the water were the most beautiful thing that day.",
        "translation": "太阳落山前，我们在一条小吃街停了下来。苏州菜比我们家乡菜更甜。吃完饭以后，我们又沿着河边散步。水上的灯光是那天最美的东西。"
      },
      {
        "text": "On Sunday morning, we visited a quiet museum near the lake. When I looked at the old paintings, I felt warm and calm. After lunch, we bought some silk. It was a gift for my grandmother. Then we took the train home in the evening.",
        "translation": "星期天上午，我们参观了湖边一座安静的博物馆。当我看着那些古画时，心里又温暖又平静。午饭后，我们买了些丝绸，那是给奶奶的礼物。傍晚我们就坐火车回家了。"
      },
      {
        "text": "Now, when I look at the photos, I still remember the green gardens. For me, Suzhou is the most interesting place in China. I hope I can go there again before I finish middle school.",
        "translation": "现在，每当我翻看这些照片，我仍然记得那些碧绿的园林。对我来说，苏州是中国最有趣的地方。我希望初中毕业前还能再去一次。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did they take on the river in the afternoon?",
        "audioText": "What did they take on the river in the afternoon?",
        "options": [
          {
            "emoji": "🚤",
            "value": "boat",
            "text": "Boat"
          },
          {
            "emoji": "🚆",
            "value": "train",
            "text": "Train"
          },
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "Bike"
          }
        ],
        "answer": "boat"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "After",
          "lunch",
          "we",
          "bought",
          "some",
          "silk"
        ],
        "audioText": "After lunch, we bought some silk."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The weather was ___ than in our city, and the air felt soft.",
        "choices": [
          "warmer",
          "warmest",
          "warm"
        ],
        "answer": "warmer",
        "audioText": "The weather was warmer than in our city, and the air felt soft."
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "For me, Suzhou is the most ___ place in China.",
        "choices": [
          "interesting",
          "interested",
          "interest"
        ],
        "answer": "interesting",
        "audioText": "For me, Suzhou is the most interesting place in China."
      }
    ]
  },
  {
    "id": "zk-r2-s02",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 2,
    "title": "A Day in Suzhou",
    "titleCn": "苏州一日",
    "coverEmoji": "🏯",
    "paragraphs": [
      {
        "text": "Last spring, my family took a trip to Suzhou. Suzhou is an old and beautiful city in the south of China. It is famous for its gardens and canals. We arrived on a warm Friday morning.",
        "translation": "去年春天，我们一家人去苏州旅行。苏州是中国南方一座古老而美丽的城市，以园林和运河而闻名。我们在一个温暖的周五上午到达了那里。"
      },
      {
        "text": "Our first stop was a classical garden in the old town. When we walked through the gate, I felt like I was inside a quiet painting. The garden was smaller than a park, but it was more interesting. While my mother took photos, I watched the fish in the clear pool. Before we left, we took a family photo by the water.",
        "translation": "我们的第一站是老城里的一座古典园林。当我们穿过大门时，我觉得自己走进了一幅安静的画里。这座园林比公园小，却更有趣。妈妈拍照的时候，我看着清澈池塘里的鱼。离开之前，我们在水边拍了一张全家福。"
      },
      {
        "text": "After we finished lunch, we took a boat trip on the old canal. Our boat moved slowly under the stone bridges. Our guide told us this canal was the longest one in the city. I liked it better than the busy streets.",
        "translation": "吃完午饭后，我们坐船游览了古老的运河。我们的小船在石桥下缓缓前行。导游告诉我们，这条运河是城里最长的。比起繁忙的街道，我更喜欢它。"
      },
      {
        "text": "In the afternoon, we visited a silk museum near the town centre. A woman showed us how people made silk many years ago. While she worked, we watched her hands carefully. The silk felt softer than my own clothes.",
        "translation": "下午，我们参观了市中心附近的一座丝绸博物馆。一位女士向我们展示了很久以前人们是怎样制作丝绸的。她工作时，我们仔细地看着她的双手。那丝绸摸起来比我自己的衣服还要柔软。"
      },
      {
        "text": "In the evening, we tried some local snacks beside the river. They were the best food in the whole city. My father said they were more delicious than the ones at home. We laughed and talked for a long time.",
        "translation": "傍晚，我们在河边尝了一些当地小吃。那是全城最好吃的东西。爸爸说它们比家里的更好吃。我们笑了很久，也聊了很久。"
      },
      {
        "text": "When night came, we walked back to our hotel slowly. The city looked even more beautiful with all the lights on. I hope I can visit Suzhou again some day. It was a trip that I will never forget.",
        "translation": "当夜晚来临时，我们慢慢地走回旅馆。华灯初上，这座城市看起来更加美丽了。我希望有一天能再去苏州。这是一次我永远不会忘记的旅行。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer watch in the clear pool?",
        "audioText": "What did the writer watch in the clear pool?",
        "options": [
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "Bird"
          },
          {
            "emoji": "🚤",
            "value": "boat",
            "text": "Boat"
          }
        ],
        "answer": "fish"
      },
      {
        "type": "word_builder",
        "word": "canal",
        "audioText": "canal"
      },
      {
        "type": "word_builder",
        "word": "museum",
        "audioText": "museum"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Our",
          "boat",
          "moved",
          "slowly",
          "under",
          "the",
          "stone",
          "bridges."
        ],
        "audioText": "Our boat moved slowly under the stone bridges."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "While my mother took photos, I ___ the fish in the clear pool.",
        "choices": [
          "watch",
          "watched",
          "watching"
        ],
        "answer": "watched",
        "audioText": "While my mother took photos, I watched the fish in the clear pool."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It is famous ___ its gardens and canals.",
        "choices": [
          "for",
          "to",
          "with"
        ],
        "answer": "for",
        "audioText": "It is famous for its gardens and canals."
      }
    ]
  },
  {
    "id": "zk-r2-s03",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 3,
    "title": "A Trip to Hangzhou",
    "titleCn": "杭州之旅",
    "coverEmoji": "🛶",
    "paragraphs": [
      {
        "text": "Last spring, my family took a trip to Hangzhou. We left home before the sun came up. The train was faster than the bus, so we took it. When we arrived, the air felt soft and warm.",
        "translation": "去年春天，我们一家人去杭州旅行。天还没亮，我们就从家里出发了。火车比汽车快，所以我们选择了坐火车。到达杭州时，空气又柔和又温暖。"
      },
      {
        "text": "Our hotel stood near West Lake, only ten minutes away. After we put down our bags, we walked to the lake. The water was quieter than I imagined it would be. Small boats were moving slowly across the lake.",
        "translation": "我们的旅馆就在西湖附近，走过去只要十分钟。放下行李后，我们步行来到湖边。湖水比我原先想象的还要安静。小船在湖面上缓缓地划过。"
      },
      {
        "text": "On the first morning, we took a boat to the island. While we were rowing, a light wind touched our faces. The old bridge there is the most famous one in the city. Before we left, we took a lot of photos.",
        "translation": "第一天早上，我们坐船去了湖心岛。我们划船的时候，一阵微风拂过我们的脸。岛上的那座古桥是全市最有名的。离开之前，我们拍了很多照片。"
      },
      {
        "text": "In the afternoon, we climbed a hill behind the lake. When we reached the top, we could see the whole city. The view was better than any picture in my book. After we came down, we ate hot noodles by the road.",
        "translation": "下午，我们爬上了湖边的一座小山。到达山顶时，我们能看到整座城市。那景色比我书里的任何一幅图片都好看。下山之后，我们在路边吃了热腾腾的面条。"
      },
      {
        "text": "On the last day, we visited a small tea village. People there say their tea is the best in the country. While we were drinking tea, an old man told us stories. The trip was short, but it was my happiest weekend. Now, when I look at those photos, I still smile.",
        "translation": "最后一天，我们去了一个小茶村。那里的人说，他们的茶是全国最好的。我们喝茶的时候，一位老人给我们讲了故事。这次旅行很短，却是我最快乐的一个周末。现在，每当我看那些照片，我仍然会微笑。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What was moving slowly across the lake?",
        "audioText": "What was moving slowly across the lake?",
        "options": [
          {
            "emoji": "🛶",
            "value": "boats",
            "text": "Boats"
          },
          {
            "emoji": "🐦",
            "value": "birds",
            "text": "Birds"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          }
        ],
        "answer": "boats"
      },
      {
        "type": "word_builder",
        "word": "island",
        "audioText": "island"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The train was ___ than the bus, so we took it.",
        "choices": [
          "faster",
          "fastest",
          "fast"
        ],
        "answer": "faster",
        "audioText": "The train was faster than the bus, so we took it."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Small",
          "boats",
          "were",
          "moving",
          "slowly",
          "across",
          "the",
          "lake."
        ],
        "audioText": "Small boats were moving slowly across the lake."
      },
      {
        "type": "word_builder",
        "word": "village",
        "audioText": "village"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "People there say their tea is the ___ in the country.",
        "choices": [
          "best",
          "better",
          "good"
        ],
        "answer": "best",
        "audioText": "People there say their tea is the best in the country."
      }
    ]
  },
  {
    "id": "zk-r2-s04",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 4,
    "title": "A Weekend in Suzhou",
    "titleCn": "苏州周末之旅",
    "coverEmoji": "🏯",
    "paragraphs": [
      {
        "text": "Last October, my family took a fast train to Suzhou in the east of China. The trip from our city took only about thirty minutes. When we walked out of the station, the sun was shining brightly. The streets looked quieter and greener than the streets back home.",
        "translation": "去年十月，我们一家人坐高铁去了中国东部的苏州。从我们城市出发，这段旅程只花了大约三十分钟。当我们走出车站时，阳光正明亮地照着。这里的街道看起来比家乡的街道更安静、更绿意盎然。"
      },
      {
        "text": "Our first stop was the old town near the river. While we walked along the water, we saw many small stone bridges. Some of them are more than five hundred years old. Before the sun went down, we took a lot of photos there.",
        "translation": "我们的第一站是河边的那座老城。我们沿着水边散步时，看见了许许多多小小的石桥。其中一些已经有五百多年的历史了。太阳落山前，我们在那里拍了很多照片。"
      },
      {
        "text": "On the second day, we visited the biggest garden in the city. It was larger than a football field. The garden was also full of tall old trees. After we walked through the front gate, we found a quiet lake. The trees around the lake were the oldest ones in the garden.",
        "translation": "第二天，我们参观了城里最大的园林。它比一个足球场还大。园子里还满是高大的古树。穿过前门之后，我们发现了一个安静的湖。湖边的那些树是园子里最古老的树。"
      },
      {
        "text": "In the afternoon, we tried some local food near the garden. The noodles there were cheaper and tastier than the ones at home. While we were eating, an old man told us stories about his city. He said Suzhou has the most beautiful gardens.",
        "translation": "下午，我们在园林附近尝了些当地美食。那里的面条比家里的更便宜，也更好吃。我们吃饭的时候，一位老人给我们讲了他这座城市的故事。他说苏州有着最美丽的园林。"
      },
      {
        "text": "On our last morning, we visited a small museum about silk. Before we left, I bought a paper fan for my best friend. When the train started to move, I looked out of the window. I hoped that I could come back to Suzhou one day.",
        "translation": "最后一天早上，我们参观了一个关于丝绸的小博物馆。离开之前，我给最好的朋友买了一把纸扇。火车开动时，我望向窗外。我希望有一天能再回到苏州。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer see along the water in the old town?",
        "audioText": "What did the writer see along the water in the old town?",
        "options": [
          {
            "emoji": "🌉",
            "value": "bridges",
            "text": "Stone bridges"
          },
          {
            "emoji": "🏫",
            "value": "schools",
            "text": "Schools"
          },
          {
            "emoji": "🏭",
            "value": "factories",
            "text": "Factories"
          }
        ],
        "answer": "bridges"
      },
      {
        "type": "word_builder",
        "word": "garden",
        "audioText": "garden"
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "larger",
          "than",
          "a",
          "football",
          "field."
        ],
        "audioText": "It was larger than a football field."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When we ___ out of the station, the sun was shining brightly.",
        "choices": [
          "walked",
          "walk",
          "walking"
        ],
        "answer": "walked",
        "audioText": "When we walked out of the station, the sun was shining brightly."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The noodles there were cheaper and ___ than the ones at home.",
        "choices": [
          "tasty",
          "tastier",
          "tastiest"
        ],
        "answer": "tastier",
        "audioText": "The noodles there were cheaper and tastier than the ones at home."
      }
    ]
  },
  {
    "id": "zk-r2-s05",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 5,
    "title": "Riding on the Old City Wall",
    "titleCn": "骑行古城墙",
    "coverEmoji": "🏯",
    "paragraphs": [
      {
        "text": "Last summer, my family took a short trip to Xi'an. Xi'an is one of the oldest cities in China. We arrived on a warm Friday morning in July. The sun was brighter there than in our small town.",
        "translation": "去年夏天，我们一家人去西安做了一次短途旅行。西安是中国最古老的城市之一。我们在七月一个温暖的周五早晨到达。那里的阳光比我们小镇的更明亮。"
      },
      {
        "text": "After we left the station, we walked to the old City Wall. It is the largest and oldest city wall in China. The wall is about fourteen kilometers long and twelve meters high. When we climbed up the stone steps, we saw many bikes.",
        "translation": "离开车站后，我们步行前往古老的城墙。它是中国规模最大、历史最久的城墙。城墙大约十四公里长、十二米高。当我们爬上石阶时，看见了许多自行车。"
      },
      {
        "text": "My father rented three bikes for the four of us. My little sister rode a small bike while I took photos. Before we started, the shop owner gave us a small map. Riding on the wall was more fun than walking.",
        "translation": "爸爸给我们四个人租了三辆自行车。妹妹骑着一辆小自行车，我则负责拍照。出发前，店主给了我们一张小地图。在城墙上骑车比走路更有趣。"
      },
      {
        "text": "The old city looked like a big picture. We could see small houses, tall towers and green trees everywhere. After we rode for an hour, we stopped near the south gate. A kind guide told us stories about the wall.",
        "translation": "老城看起来像一幅巨大的图画。我们到处都能看到小房子、高塔和绿树。骑了一个小时后，我们在南门附近停了下来。一位和善的导游给我们讲了关于城墙的故事。"
      },
      {
        "text": "In the evening, we visited a busy food street nearby. The noodles there were the most delicious food of our trip. While we were eating, a light rain began to fall. We ran back to the hotel and laughed all the way.",
        "translation": "傍晚，我们去了附近一条热闹的美食街。那里的面条是我们旅途中最美味的食物。我们吃饭时，下起了小雨。我们跑回酒店，一路上都在笑。"
      },
      {
        "text": "Before we left Xi'an, I bought a small model of the wall. It sits on my desk and makes me smile every day. Travelling is the best way to learn about history. I hope I can visit more old cities soon.",
        "translation": "离开西安前，我买了一个城墙的小模型。它摆在我的书桌上，每天都让我微笑。旅行是了解历史的最好方式。我希望不久还能去更多古老的城市。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the family ride on the old city wall?",
        "audioText": "What did the family ride on the old city wall?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "Bikes"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "A bus"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A car"
          }
        ],
        "answer": "bike"
      },
      {
        "type": "word_builder",
        "word": "wall",
        "audioText": "wall"
      },
      {
        "type": "word_builder",
        "word": "history",
        "audioText": "history"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "old",
          "city",
          "looked",
          "like",
          "a",
          "big",
          "picture."
        ],
        "audioText": "The old city looked like a big picture."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ we left the station, we walked to the old City Wall.",
        "choices": [
          "After",
          "Before",
          "While"
        ],
        "answer": "After",
        "audioText": "After we left the station, we walked to the old City Wall."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The noodles there were the most ___ food of our trip.",
        "choices": [
          "delicious",
          "deliciously",
          "more delicious"
        ],
        "answer": "delicious",
        "audioText": "The noodles there were the most delicious food of our trip."
      }
    ]
  },
  {
    "id": "zk-r2-s06",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 6,
    "title": "A Weekend in Xi'an",
    "titleCn": "西安周末游记",
    "coverEmoji": "🏯",
    "paragraphs": [
      {
        "text": "Last month, my family and I travelled to Xi'an by train. The trip from our city took about four hours. When we arrived, the old city wall was the first thing we saw. It is one of the longest walls in China.",
        "translation": "上个月，我和家人坐火车去了西安。从我们这座城市出发，路上大约用了四个小时。到达的时候，我们第一眼看到的就是那座古老的城墙。它是中国最长的城墙之一。"
      },
      {
        "text": "On the first morning, we climbed up the wall and rented bikes. Riding on the top of the wall was more exciting than I expected. While we were riding, we stopped to take photos of the old streets below. After two hours, my legs felt tired but happy.",
        "translation": "第一天早上，我们爬上城墙，还租了自行车。在城墙顶上骑车比我想象的还要刺激。骑车的时候，我们停下来拍下面老街的照片。两个小时后，我的腿有点累，但心里很开心。"
      },
      {
        "text": "In the afternoon, we visited the Big Wild Goose Pagoda. It was quieter than the busy city centre. Before we went inside, a friendly guide told us some stories. When he spoke, I could almost see those old days.",
        "translation": "下午，我们去了大雁塔。那里比热闹的市中心安静多了。进去之前，一位友好的导游给我们讲了一些故事。他讲的时候，我几乎能看到从前的样子。"
      },
      {
        "text": "For dinner, we tried the local noodles. They were the most delicious food of our trip. My father said they were better than any dish at home. We also learned that local people eat noodles with many sauces.",
        "translation": "晚饭时，我们尝了当地的面条。那是我们这趟旅行中最好吃的东西。爸爸说它们比家里做的任何一道菜都好吃。我们还了解到，当地人吃面时会配很多种酱料。"
      },
      {
        "text": "On the last day, we walked along the old market street. It was full of small shops and sweet smells. While we were walking, a shopkeeper smiled and gave me a free cake. That was the kindest thing of the whole trip.",
        "translation": "最后一天，我们沿着老市场街散步。街上到处都是小店铺，还有甜甜的香味。我们走着的时候，一位店主笑着送给我一块免费的糕点。那是整趟旅行中最暖心的一件事。"
      },
      {
        "text": "Xi'an is a big city with a long history. However, it felt warm and friendly to us. Now I often look at our photos and smile. I hope I can go back and ride on the wall again.",
        "translation": "西安是一座历史悠久的大城市。但它给我们感觉很温暖、很亲切。现在我常常看着照片微笑。我希望还能再去一次，再在城墙上骑一回车。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer ride on the old city wall?",
        "audioText": "What did the writer ride on the old city wall?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A bike"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "A bus"
          },
          {
            "emoji": "🚂",
            "value": "train",
            "text": "A train"
          }
        ],
        "answer": "bike"
      },
      {
        "type": "word_builder",
        "word": "climbed",
        "audioText": "climbed"
      },
      {
        "type": "word_builder",
        "word": "kindest",
        "audioText": "kindest"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "quieter",
          "than",
          "the",
          "busy",
          "city",
          "centre."
        ],
        "audioText": "It was quieter than the busy city centre."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When we ___, the old city wall was the first thing we saw.",
        "choices": [
          "arrived",
          "arrive",
          "arriving"
        ],
        "answer": "arrived",
        "audioText": "When we arrived, the old city wall was the first thing we saw."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Riding on the top of the wall was ___ exciting than I expected.",
        "choices": [
          "more",
          "most",
          "much"
        ],
        "answer": "more",
        "audioText": "Riding on the top of the wall was more exciting than I expected."
      }
    ]
  },
  {
    "id": "zk-r2-s07",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 7,
    "title": "Biking on the Old City Wall",
    "titleCn": "骑行古城墙",
    "coverEmoji": "🚲",
    "paragraphs": [
      {
        "text": "Last spring, my father and I took a train to Xi'an. The trip took about four hours, but I did not feel bored. When we arrived, the sun was already high in the sky. Xi'an is one of the oldest cities in China.",
        "translation": "去年春天，我和爸爸坐火车去了西安。路上大约花了四个小时，但我一点也不觉得无聊。我们到达的时候，太阳已经高高挂在天上。西安是中国最古老的城市之一。"
      },
      {
        "text": "Our first stop was the old city wall near the south gate. It is one of the longest city walls in China. We got two bikes and started to ride slowly. The wall was much wider than I expected. While we were riding, a soft wind touched our faces.",
        "translation": "我们的第一站是南门附近的古城墙。它是中国最长的城墙之一。我们弄到两辆自行车，慢慢骑了起来。城墙比我想象的宽得多。我们骑行的时候，一阵柔和的微风拂过脸颊。"
      },
      {
        "text": "After we rode for an hour, we stopped to look down. Below us, the old streets were full of people and shops. We saw small gardens, tall trees and old houses. Everything below us looked smaller than it really was.",
        "translation": "骑了一个小时后，我们停下来往下看。在我们脚下，老街上满是行人和店铺。我们看到了小花园、高大的树木和老房子。下面的一切看起来都比实际的样子要小。"
      },
      {
        "text": "Before we left the wall, we took a lot of photos. My father said the wall was older than any building in our town. Then we walked to a busy old street to find some food. We tried cold noodles and sweet cakes with tea. They tasted better than the food at home.",
        "translation": "离开城墙之前，我们拍了很多照片。爸爸说这堵城墙比我们镇上的任何建筑都古老。随后我们走到一条热闹的老街去找吃的。我们尝了凉面和甜饼，还喝了茶。它们的味道比家里的饭好多了。"
      },
      {
        "text": "In the afternoon, we visited a famous history museum. The old coins and pots there were hundreds of years old. I read every small sign slowly because I wanted to understand. Time went by faster than I thought.",
        "translation": "下午，我们参观了一座著名的历史博物馆。那里的古钱币和陶罐都有几百年的历史。我把每块小说明牌都慢慢地读了一遍，因为我想看懂它们。时间过得比我想象的要快。"
      },
      {
        "text": "When evening came, we watched the lights on the wall. They were brighter than the stars above us. I told my father that this was my best trip ever. Before I went to bed, I wrote about the trip in my diary. I hope I can come back to Xi'an one day.",
        "translation": "傍晚来临时，我们看着城墙上的灯光。它们比头顶的星星还要亮。我告诉爸爸，这是我最好的一次旅行。睡觉前，我把这次旅行写进了日记。我希望有一天能再回到西安。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer and his father ride on the old city wall?",
        "audioText": "What did the writer and his father ride on the old city wall?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bikes",
            "text": "Bikes"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "Bus"
          },
          {
            "emoji": "🚂",
            "value": "train",
            "text": "Train"
          }
        ],
        "answer": "bikes"
      },
      {
        "type": "word_builder",
        "word": "arrived",
        "audioText": "arrived"
      },
      {
        "type": "word_builder",
        "word": "museum",
        "audioText": "museum"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "were",
          "brighter",
          "than",
          "the",
          "stars",
          "above",
          "us."
        ],
        "audioText": "They were brighter than the stars above us."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When we ___, the sun was already high in the sky.",
        "choices": [
          "arrived",
          "arrive",
          "arriving"
        ],
        "answer": "arrived",
        "audioText": "When we arrived, the sun was already high in the sky."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The wall was much ___ than I expected.",
        "choices": [
          "wide",
          "wider",
          "widest"
        ],
        "answer": "wider",
        "audioText": "The wall was much wider than I expected."
      }
    ]
  },
  {
    "id": "zk-r2-s08",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 8,
    "title": "Boating on the Li River",
    "titleCn": "漓江泛舟",
    "coverEmoji": "🛶",
    "paragraphs": [
      {
        "text": "Last summer, my family took a trip to Guilin. We arrived by train late in the evening. When we walked out of the station, warm air met us. Before we went to our hotel, we stood by the river. The lights on the water looked like small stars.",
        "translation": "去年夏天，我们一家人去桂林旅行。我们傍晚时分坐火车到达。走出车站时，温暖的空气迎面而来。去旅馆之前，我们站在江边。水面上的灯光看起来像一颗颗小星星。"
      },
      {
        "text": "The next morning, we took a boat down the Li River. The water was much clearer than I expected. While the boat moved slowly, the mountains changed shape again and again. Some of them looked like horses, and others looked like old men.",
        "translation": "第二天早上，我们坐船顺漓江而下。江水比我预想的清澈得多。船慢慢前行，群山一次又一次地变换着形状。有的山看起来像马，有的则像老人。"
      },
      {
        "text": "The boat trip was the best part of our holiday. After two hours, we reached a small village beside the water. A local woman sold us fresh rice noodles with hot soup. They were cheaper and tastier than the ones at home.",
        "translation": "坐船游览是我们假期中最棒的部分。两个小时后，我们到达江边的一个小村庄。一位当地妇女卖给我们配着热汤的新鲜米粉。这些米粉比家里的更便宜，也更好吃。"
      },
      {
        "text": "In the afternoon, we rented bikes and rode through the rice fields. The road was narrower than the main street, so we rode slowly. After we passed a green forest, we found a quiet lake. It was the most peaceful place in the whole area.",
        "translation": "下午，我们租了自行车骑过稻田。那条路比大街窄，所以我们骑得很慢。经过一片绿色的树林后，我们发现了一个安静的湖。那是整片地区最宁静的地方。"
      },
      {
        "text": "When the sun went down, we returned to the town. The night market was busier than the day market. We tried some sweet cakes before we went back to the hotel. My little brother said Guilin was more beautiful than any city he knew.",
        "translation": "太阳落下时，我们回到了镇上。夜市比白天的市场更热闹。回旅馆之前，我们尝了一些甜糕。我弟弟说桂林比他知道的任何城市都更美。"
      },
      {
        "text": "On our last day, we climbed a hill to see the whole town. From the top, the river looked like a green line between the hills. I took many photos, but the real view was better. After we got home, I showed them to my friends. Now I still remember the quiet water and the soft green hills.",
        "translation": "最后一天，我们爬上一座小山，去看整个小镇。从山顶看，江水像一条绿色的线穿行在群山之间。我拍了很多照片，但真实的景色更好。回到家以后，我把照片拿给朋友们看。现在我仍然记得那安静的水和柔和的青山。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the woman in the village sell to the family?",
        "audioText": "What did the woman in the village sell to the family?",
        "options": [
          {
            "emoji": "🍜",
            "value": "noodles",
            "text": "Noodles"
          },
          {
            "emoji": "🍰",
            "value": "cakes",
            "text": "Cakes"
          },
          {
            "emoji": "🍎",
            "value": "apples",
            "text": "Apples"
          }
        ],
        "answer": "noodles"
      },
      {
        "type": "word_builder",
        "word": "peaceful",
        "audioText": "peaceful"
      },
      {
        "type": "word_builder",
        "word": "village",
        "audioText": "village"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "water",
          "was",
          "much",
          "clearer",
          "than",
          "I",
          "expected."
        ],
        "audioText": "The water was much clearer than I expected."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "They were ___ and tastier than the ones at home.",
        "choices": [
          "cheaper",
          "cheap",
          "cheapest"
        ],
        "answer": "cheaper",
        "audioText": "They were cheaper and tastier than the ones at home."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When the sun went ___, we returned to the town.",
        "choices": [
          "down",
          "up",
          "off"
        ],
        "answer": "down",
        "audioText": "When the sun went down, we returned to the town."
      }
    ]
  },
  {
    "id": "zk-r2-s09",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 9,
    "title": "A Boat Trip on the Li River",
    "titleCn": "漓江泛舟记",
    "coverEmoji": "🛶",
    "paragraphs": [
      {
        "text": "Last summer, my family took a train to Guilin in the south. The journey was long, but we were very excited. When we arrived, warm air and green hills welcomed us. Our guide met us at the station with a big smile.",
        "translation": "去年夏天，我们一家人坐火车去了南方的桂林。旅途很长，但我们非常兴奋。到达的时候，温暖的空气和青翠的山峦迎接着我们。导游带着大大的笑容在车站接我们。"
      },
      {
        "text": "On the first morning, we took a boat down the Li River. The water was clearer than any river I had seen before. While we were sailing, tall hills rose on both sides. Some of them looked like animals and old men. My brother said the ride was better than a cartoon.",
        "translation": "第一天早上，我们乘船顺漓江而下。江水比我以前见过的任何河流都要清澈。我们航行的时候，高高的山从两岸耸起。其中一些看起来像动物，也像老人。弟弟说这次坐船比看动画片还好。"
      },
      {
        "text": "After the boat trip, we walked around the West Street in Yangshuo. It was busier than any street in my hometown. We tasted rice noodles and bought small gifts for friends. Before the sun went down, we climbed a small hill nearby. From the top, the whole town looked like a colorful picture.",
        "translation": "游船之后，我们在阳朔的西街逛了逛。那里比我家乡镇上的任何街道都热闹。我们尝了米粉，还给朋友们买了小礼物。太阳落山前，我们爬上了附近的一座小山。从山顶看，整个小镇就像一幅彩色的画。"
      },
      {
        "text": "The next day was the most exciting day of our trip. We rode bikes along a quiet country road for two hours. While we were riding, farmers were working in the green fields. A friendly old man gave us some sweet oranges. After we thanked him, we took a photo.",
        "translation": "第二天是我们旅行中最激动人心的一天。我们沿着一条安静的乡间小路骑了两个小时的自行车。我们骑车的时候，农民们正在绿色的田野里干活。一位友善的老人给了我们一些甜甜的橙子。我们谢过他之后，一起拍了一张照片。"
      },
      {
        "text": "On the last evening, we sat by the river and watched the lights. The hills turned dark, but the water still looked bright. My father said Guilin was the most beautiful place he knew. I thought he was right, though I missed home too.",
        "translation": "最后一个晚上，我们坐在江边看灯火。山变暗了，但水面看起来依然明亮。爸爸说桂林是他知道的最美的地方。我觉得他说得对，虽然我也很想家。"
      },
      {
        "text": "Now, when I look at our photos, I always smile. Travelling teaches me more than books can do. The world is bigger and kinder than I once thought. I hope I can visit more places in the future.",
        "translation": "现在，每当我看着我们的照片，总会微笑。旅行教给我的东西比书本更多。这个世界比我曾经以为的更大、更友善。我希望将来能去更多的地方。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "How did the family get to Guilin?",
        "audioText": "How did the family get to Guilin?",
        "options": [
          {
            "emoji": "🚂",
            "value": "train",
            "text": "Train"
          },
          {
            "emoji": "✈️",
            "value": "plane",
            "text": "Plane"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "Bus"
          }
        ],
        "answer": "train"
      },
      {
        "type": "word_builder",
        "word": "journey",
        "audioText": "journey"
      },
      {
        "type": "word_builder",
        "word": "beautiful",
        "audioText": "beautiful"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "After",
          "we",
          "thanked",
          "him",
          "we",
          "took",
          "a",
          "photo"
        ],
        "audioText": "After we thanked him, we took a photo."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The water was ___ than any river I had seen before.",
        "choices": [
          "clear",
          "clearer",
          "clearest"
        ],
        "answer": "clearer",
        "audioText": "The water was clearer than any river I had seen before."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My father said Guilin was the most ___ place he knew.",
        "choices": [
          "beautiful",
          "more beautiful",
          "beautifully"
        ],
        "answer": "beautiful",
        "audioText": "My father said Guilin was the most beautiful place he knew."
      }
    ]
  },
  {
    "id": "zk-r2-s10",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 10,
    "title": "Three Days in Chengdu",
    "titleCn": "成都三日",
    "coverEmoji": "🐼",
    "paragraphs": [
      {
        "text": "Last summer, my family took a trip to Chengdu. We arrived in the city on a warm Friday afternoon. Before we left the airport, I bought a map of the city. The streets were busier than the streets in my home town.",
        "translation": "去年夏天，我们一家人去成都旅行。我们在一个温暖的周五下午到达这座城市。离开机场前，我买了一张城市地图。这里的街道比我家乡的街道更热闹。"
      },
      {
        "text": "On Saturday morning, we visited the famous Panda Base. It is one of the most popular places in Chengdu. When we got there, two young pandas were climbing a tree. They looked lazier than the older pandas nearby. After we watched them for an hour, we took many photos.",
        "translation": "周六上午，我们参观了有名的大熊猫基地。它是成都最受欢迎的地方之一。我们到那里时，两只小熊猫正在爬树。它们看起来比旁边年长的熊猫更懒散。我们看了一个小时后，拍了很多照片。"
      },
      {
        "text": "In the afternoon, we walked along an old street called Jinli. It was the oldest street we saw in the city. While we were walking, a light rain began to fall. We sat down in a small restaurant and tried hot pot. It was hotter than anything I had tried at home. My sister drank three cups of cold water.",
        "translation": "下午，我们沿着一条叫锦里的老街散步。那是我们在城里见到的最古老的街道。我们正走着，下起了小雨。我们在一家小餐馆坐下，尝了火锅。它比我以前在家吃过的任何东西都辣。我妹妹喝了三杯凉水。"
      },
      {
        "text": "On Sunday morning, we went to a tea house in the park. Old men were playing cards while we drank jasmine tea. A friendly woman showed us how to pour the tea. After we finished our tea, we thanked her and left.",
        "translation": "周日早上，我们去了公园里的一家茶馆。我们喝着茉莉花茶时，几位老人在打牌。一位和气的女士教我们怎么倒茶。喝完茶后，我们谢过她就离开了。"
      },
      {
        "text": "Our last stop was a green mountain. It was quieter than the busy streets below. When we reached the top, we could see soft clouds. It was the best trip of my whole year. I hope I can go back to Chengdu one day.",
        "translation": "我们最后一站是一座青山。它比山下热闹的街道安静。当我们到达山顶时，能看见轻柔的云。这是我这一年里最棒的一次旅行。我希望有一天能再回成都。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the family try in the small restaurant?",
        "audioText": "What did the family try in the small restaurant?",
        "options": [
          {
            "emoji": "🍲",
            "value": "hotpot",
            "text": "Hot pot"
          },
          {
            "emoji": "🍜",
            "value": "noodles",
            "text": "Noodles"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          }
        ],
        "answer": "hotpot"
      },
      {
        "type": "word_builder",
        "word": "pandas",
        "audioText": "pandas"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The streets were ___ than the streets in my home town.",
        "choices": [
          "busier",
          "busy",
          "busiest"
        ],
        "answer": "busier",
        "audioText": "The streets were busier than the streets in my home town."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "sister",
          "drank",
          "three",
          "cups",
          "of",
          "cold",
          "water."
        ],
        "audioText": "My sister drank three cups of cold water."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When we got there, two young pandas ___ climbing a tree.",
        "choices": [
          "were",
          "was",
          "are"
        ],
        "answer": "were",
        "audioText": "When we got there, two young pandas were climbing a tree."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "It",
          "was",
          "quieter",
          "than",
          "the",
          "busy",
          "streets",
          "below."
        ],
        "audioText": "It was quieter than the busy streets below."
      }
    ]
  },
  {
    "id": "zk-r2-s11",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 11,
    "title": "Three Days by the Li River",
    "titleCn": "漓江三日",
    "coverEmoji": "🛶",
    "paragraphs": [
      {
        "text": "Last summer, my family took a train to Guilin for a holiday. When we arrived in the evening, a light rain was falling. The air felt cooler and fresher than the air in our city. After we found our small hotel, we walked down to the river.",
        "translation": "去年夏天，我们一家人坐火车去桂林度了个假。我们傍晚到达时，正下着小雨。空气比我们城市里的空气更凉爽、更清新。找到那家小旅馆后，我们走到了江边。"
      },
      {
        "text": "The next morning, we took a boat trip on the Li River. While we were moving slowly, we passed many strange green hills. Some hills looked like tall horses, and others looked like sleeping elephants. I took more photos than my parents did.",
        "translation": "第二天早上，我们在漓江上坐船游览。船缓缓前行时，我们经过了许多奇形怪状的绿色山丘。有些山看起来像高大的马，有些则像睡着的大象。那天我拍的照比父母拍的还多。"
      },
      {
        "text": "After two hours, the boat stopped at a small town called Yangshuo. It was quieter and smaller than Guilin, but also more interesting. While my mother was shopping, my father and I rented two bikes. We rode along a country road between green fields.",
        "translation": "两个小时后，船停在一个叫阳朔的小镇。这里比桂林更安静、更小，但也更有意思。妈妈买东西的时候，我和爸爸租了两辆自行车。我们沿着一条乡间小路骑行，两边都是绿色的田野。"
      },
      {
        "text": "For lunch, we tried the famous rice noodles of the town. They were the cheapest and the most delicious food of our trip. Before we left the restaurant, the owner showed us how to make them. I ate two big bowls, more than anyone else in my family.",
        "translation": "午饭时，我们尝了当地有名的米粉。那是我们整趟旅行中最便宜也最好吃的食物。离开餐馆前，老板还教我们怎么做米粉。我吃了两大碗，比家里任何人都吃得多。"
      },
      {
        "text": "Before the sun came up, we climbed Xianggong Hill. When we reached the top, the river turned gold in front of us. It was the most beautiful view I have ever seen. We sat there quietly for a long time, and nobody spoke.",
        "translation": "太阳升起前，我们爬上了相公山。到达山顶时，整条江在我们眼前变成了金色。那是我见过的最美的景色。我们静静地坐了很久，谁也不想说话。"
      },
      {
        "text": "On the train home, I looked at all my photos again and again. My mother said Guilin was the best place we had visited. I hope I can go back there when I am older.",
        "translation": "在回家的火车上，我一遍又一遍地翻看那些照片。妈妈说桂林是我们去过的最好的地方。我希望自己长大后还能再去那里。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did some of the green hills look like?",
        "audioText": "What did some of the green hills look like?",
        "options": [
          {
            "emoji": "🐘",
            "value": "elephant",
            "text": "An elephant"
          },
          {
            "emoji": "🚂",
            "value": "train",
            "text": "A train"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tree"
          }
        ],
        "answer": "elephant"
      },
      {
        "type": "word_builder",
        "word": "noodles",
        "audioText": "noodles"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was quieter and ___ than Guilin.",
        "choices": [
          "smaller",
          "small",
          "smallest"
        ],
        "answer": "smaller",
        "audioText": "It was quieter and smaller than Guilin."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "took",
          "more",
          "photos",
          "than",
          "my",
          "parents",
          "did"
        ],
        "audioText": "I took more photos than my parents did."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was the ___ beautiful view I have ever seen.",
        "choices": [
          "most",
          "more",
          "much"
        ],
        "answer": "most",
        "audioText": "It was the most beautiful view I have ever seen."
      },
      {
        "type": "word_builder",
        "word": "photos",
        "audioText": "photos"
      }
    ]
  },
  {
    "id": "zk-r2-s12",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 12,
    "title": "Sunrise on Mount Tai",
    "titleCn": "泰山看日出",
    "coverEmoji": "🌄",
    "paragraphs": [
      {
        "text": "Last summer, my parents and I took a train to Tai'an. Mount Tai is one of the most famous mountains in China. Many people go there to see the sunrise. We wanted to be there before the sun came up.",
        "translation": "去年夏天，我和爸爸妈妈坐火车去了泰安。泰山是中国最著名的山之一。很多人去那里看日出。我们想赶在太阳升起之前到达山顶。"
      },
      {
        "text": "We started to climb at two in the morning. It was dark, and the stars were brighter than in our city. While we were walking, my father told me stories about the mountain. I walked faster than him at first.",
        "translation": "我们凌晨两点开始爬山。天很黑，星星比我们城里的亮得多。我们一边走，爸爸一边给我讲这座山的故事。一开始我走得比他还快。"
      },
      {
        "text": "After two more hours, my legs felt heavy and I was very tired. The top was still far away. When I wanted to stop, my mother gave me some water. She said the best view always comes after the hardest climb.",
        "translation": "又过了两个小时，我的腿开始发沉，人累得不行。山顶还远着呢。每当我想停下来，妈妈就递给我一些水。她说，最美的风景总在最艰难的攀登之后。"
      },
      {
        "text": "Before five o'clock, we reached the top. It was colder and the wind was much stronger up there. We stood together and waited quietly. The sky was grey, then red, then bright orange.",
        "translation": "不到五点，我们就登上了山顶。上面更冷，风也大得多。我们站在一起，静静地等着。天空先是灰的，接着变红，然后亮成了橙色。"
      },
      {
        "text": "When the sun came up, everyone shouted happily. The light turned the clouds gold. I saw the most beautiful view in my life. After the sun was high, we began to walk down. My legs hurt, but I felt great.",
        "translation": "太阳升起时，大家高兴地欢呼起来。阳光把云染成了金色。那是我这辈子见过的最美的景色。太阳升高之后，我们开始下山。腿虽然疼，我心里却特别痛快。"
      },
      {
        "text": "Before we left, we ate hot noodles in a small shop. Then we bought some small gifts for my grandparents. That trip taught me something important. The best things in life are not easy to get. I hope I can climb Mount Tai again one day.",
        "translation": "离开之前，我们在一家小店里吃了热腾腾的面条，又给爷爷奶奶买了些小礼物。那次旅行让我懂得了一个重要的道理：人生中最好的东西都不容易得到。我希望有一天能再爬一次泰山。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the family go to Mount Tai to see?",
        "audioText": "What did the family go to Mount Tai to see?",
        "options": [
          {
            "emoji": "🌄",
            "value": "sunrise",
            "text": "The sunrise"
          },
          {
            "emoji": "🐼",
            "value": "panda",
            "text": "Pandas"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "A bus"
          }
        ],
        "answer": "sunrise"
      },
      {
        "type": "word_builder",
        "word": "mountain",
        "audioText": "mountain"
      },
      {
        "type": "word_builder",
        "word": "sunrise",
        "audioText": "sunrise"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "walked",
          "faster",
          "than",
          "him",
          "at",
          "first."
        ],
        "audioText": "I walked faster than him at first."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Mount Tai is one of the most ___ mountains in China.",
        "choices": [
          "famous",
          "faster",
          "highest"
        ],
        "answer": "famous",
        "audioText": "Mount Tai is one of the most famous mountains in China."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ I wanted to stop, my mother gave me some water.",
        "choices": [
          "When",
          "While",
          "Before"
        ],
        "answer": "When",
        "audioText": "When I wanted to stop, my mother gave me some water."
      }
    ]
  },
  {
    "id": "zk-r2-s13",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 13,
    "title": "Blue Sea and Red Roofs in Qingdao",
    "titleCn": "青岛：碧海与红瓦",
    "coverEmoji": "🌊",
    "paragraphs": [
      {
        "text": "Last summer, my family took a slow train to Qingdao. We left home before the sun came up. When we arrived, the sea wind felt cooler than the air at home. I knew this trip would be different from any other.",
        "translation": "去年夏天，我们一家人坐慢车去了青岛。太阳还没升起来，我们就出发了。到了那儿，海风比家乡的空气凉爽。我知道这趟旅行会和以往任何一次都不一样。"
      },
      {
        "text": "On the first morning, we walked to an old tower by the sea. After we climbed to the top, we looked at the sea. The water was bluer than the sky. While we stood there, a big ship sailed past.",
        "translation": "第一天早上，我们走到海边一座古老的塔前。爬到塔顶后，我们眺望大海。海水比天空还要蓝。我们站在那儿的时候，一艘大船驶了过去。"
      },
      {
        "text": "Then we visited the old town on a small hill. Many houses there have red roofs and yellow walls. While we walked up the hill, my mother took photos. From the top, we saw the most beautiful view of our trip.",
        "translation": "接着我们去了小山上的一片老城区。那里很多房子都有红色的屋顶和黄色的墙。我们往山上走的时候，妈妈一直在拍照。从高处看过去，我们见到了这趟旅行中最美的景色。"
      },
      {
        "text": "At noon, we ate lunch in a small restaurant near the beach. The fish was fresher than anything we eat at home. My little brother ate more than anyone else at the table. After lunch, we rested for a while under a tree.",
        "translation": "中午，我们在海滩附近的一家小餐馆吃午饭。那鱼比我们在家吃的任何鱼都要新鲜。我弟弟比桌上任何人都吃得多。午饭后，我们在一棵树下歇了一会儿。"
      },
      {
        "text": "In the afternoon, we played on the beach for two hours. Before we left, I picked up some white shells. The sand felt softer than the sand in my city park. When the sun went down, the whole sea turned golden.",
        "translation": "下午，我们在海滩上玩了两个小时。离开之前，我捡了一些白色的贝壳。那沙子摸起来比我城市公园里的沙子还软。太阳落下去的时候，整片大海都变成了金色。"
      },
      {
        "text": "On the last day, we took the train home again. I was tired, but my heart was full of happy pictures. Qingdao is not the biggest city in China. But for me, it was the best place of the summer.",
        "translation": "最后一天，我们又坐火车回家了。我很累，但心里装满了快乐的画面。青岛不是中国最大的城市。但对我来说，它是这个夏天最好的地方。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "When the sun went down, what colour did the whole sea turn?",
        "audioText": "When the sun went down, what colour did the whole sea turn?",
        "options": [
          {
            "emoji": "🟡",
            "value": "golden",
            "text": "Golden"
          },
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue"
          },
          {
            "emoji": "⚫",
            "value": "black",
            "text": "Black"
          }
        ],
        "answer": "golden"
      },
      {
        "type": "word_builder",
        "word": "shells",
        "audioText": "shells"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "left",
          "home",
          "before",
          "the",
          "sun",
          "came",
          "up."
        ],
        "audioText": "We left home before the sun came up."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "water",
          "was",
          "bluer",
          "than",
          "the",
          "sky."
        ],
        "audioText": "The water was bluer than the sky."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When we arrived, the sea wind felt ___ than the air at home.",
        "choices": [
          "cooler",
          "cool",
          "coolest"
        ],
        "answer": "cooler",
        "audioText": "When we arrived, the sea wind felt cooler than the air at home."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Qingdao is not the ___ city in China.",
        "choices": [
          "biggest",
          "bigger",
          "big"
        ],
        "answer": "biggest",
        "audioText": "Qingdao is not the biggest city in China."
      }
    ]
  },
  {
    "id": "zk-r2-s14",
    "track": "zhongkao",
    "regionId": "zk-r2",
    "order": 14,
    "title": "Two Days on Gulangyu Island",
    "titleCn": "鼓浪屿的两天",
    "coverEmoji": "🏝️",
    "paragraphs": [
      {
        "text": "Last summer, my family took a short trip to Xiamen. Before we left home, my father told me about a small island called Gulangyu. He said it was quieter and prettier than the busy city centre. I could not wait to see it.",
        "translation": "去年夏天，我们全家去厦门做了一次短途旅行。出发前，爸爸跟我讲了一个叫鼓浪屿的小岛。他说那里比热闹的市中心更安静、更漂亮。我迫不及待地想去看看。"
      },
      {
        "text": "We took a ferry from the main island early in the morning. While the boat moved, I watched the tall buildings become smaller and smaller. After about ten minutes, we arrived at the island. There were no cars or buses, only small electric carts and people walking.",
        "translation": "一大早，我们从本岛坐渡轮出发。船开动的时候，我看着那些高楼一点点变小。大约十分钟后，我们到了岛上。岛上没有汽车，也没有公交车，只有小小的电瓶车和步行的游人。"
      },
      {
        "text": "Our hotel was an old white house near the sea. When we opened the window, we could hear the waves. The streets were narrow and clean, and the air smelled of flowers. My mother said it was the loveliest place in the city.",
        "translation": "我们住的旅馆是海边一栋白色的老房子。打开窗，就能听见海浪的声音。街道又窄又干净，空气里还飘着花香。妈妈说，这是全城最美的地方。"
      },
      {
        "text": "After lunch, we climbed a small hill in the middle of the island. From the top, the sea looked bluer than the sky. We also visited an old piano museum near the beach. Gulangyu is famous for music, and many musicians were born there. While we walked through the quiet rooms, soft piano music played.",
        "translation": "午饭后，我们爬上岛中央的一座小山。从山顶望去，大海比天空还要蓝。我们还去了海滩边一座古老的钢琴博物馆。鼓浪屿以音乐闻名，许多音乐家都出生在这里。我们走过安静的房间时，轻柔的钢琴声一直在响。"
      },
      {
        "text": "In the evening, we sat by the sea and ate fresh seafood. The sun went down slowly, and the city lights began to shine. Before we went back, I bought a small shell for my best friend.",
        "translation": "傍晚，我们坐在海边吃新鲜的海鲜。太阳慢慢落下，城市的灯火渐渐亮起来。回去之前，我给最好的朋友买了一个小贝壳。"
      },
      {
        "text": "The next morning, we left the island on the first ferry. When I looked back, Gulangyu seemed even smaller and greener. It was only two days, but it was the best weekend of my summer.",
        "translation": "第二天早上，我们坐第一班渡轮离开了小岛。回头望去，鼓浪屿显得更小、更绿了。虽然只有两天，但这是我这个夏天最棒的周末。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the story, what could the writer hear when the window was open?",
        "audioText": "In the story, what could the writer hear when the window was open?",
        "options": [
          {
            "emoji": "🌊",
            "value": "waves",
            "text": "The waves"
          },
          {
            "emoji": "🚗",
            "value": "cars",
            "text": "Cars"
          },
          {
            "emoji": "🔔",
            "value": "bells",
            "text": "Bells"
          }
        ],
        "answer": "waves"
      },
      {
        "type": "word_builder",
        "word": "ferry",
        "audioText": "ferry"
      },
      {
        "type": "word_builder",
        "word": "island",
        "audioText": "island"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "sea",
          "looked",
          "bluer",
          "than",
          "the",
          "sky."
        ],
        "audioText": "The sea looked bluer than the sky."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "There were no ___ or buses, only small electric carts and people walking.",
        "choices": [
          "cars",
          "boats",
          "trains"
        ],
        "answer": "cars",
        "audioText": "There were no cars or buses, only small electric carts and people walking."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "While the boat moved, I watched the tall buildings become smaller and ___.",
        "choices": [
          "smaller",
          "bigger",
          "taller"
        ],
        "answer": "smaller",
        "audioText": "While the boat moved, I watched the tall buildings become smaller and smaller."
      }
    ]
  },
  {
    "id": "zk-r3-s01",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 1,
    "title": "AI Around Us",
    "titleCn": "身边的AI",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Have you ever talked to a smart machine? Today, AI is used in many places around us. It can help people do many different things every day.",
        "translation": "你和智能机器说过话吗？如今，AI 被用在我们的许多地方。它每天都能帮人们做很多不同的事。"
      },
      {
        "text": "In many homes, smart speakers are used every day. You can ask them about the weather or your favourite music. They may answer you in a friendly voice.",
        "translation": "在很多家庭里，智能音箱每天都会被使用。你可以问它们天气，或者问它们你最喜欢的音乐。它们可能会用友好的声音回答你。"
      },
      {
        "text": "In hospitals, AI is used to read photos of the body. Doctors can find problems faster with its help. Some robots are also used to help doctors at work every day.",
        "translation": "在医院里，AI 被用来读取身体照片。有了它的帮助，医生能更快地发现问题。有些机器人每天也被用来在工作中帮助医生。"
      },
      {
        "text": "On the road, self-driving cars can be seen in some cities. The cars must be watched by a person at all times. One day, they may take us to school safely and quickly.",
        "translation": "在马路上，有些城市已经能看到无人驾驶汽车。这些车必须随时有人看管。总有一天，它们可能会又快又安全地送我们去上学。"
      },
      {
        "text": "AI can also be found inside your phone. Apps can be used to learn English or take photos. They can even guess what you want to do next.",
        "translation": "你的手机里也能找到 AI。各种 App 能被用来学英语或拍照。它们甚至能猜出你接下来想做什么。"
      },
      {
        "text": "Will AI take our jobs one day in the future? Nobody knows the answer for sure. But it should be used to help people, not to hurt them.",
        "translation": "将来有一天，AI 会抢走我们的工作吗？没有人确切知道答案。但它应该被用来帮助人们，而不是伤害人们。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which one is used in many homes to answer your questions?",
        "audioText": "Which one is used in many homes to answer your questions?",
        "options": [
          {
            "emoji": "🔊",
            "value": "speaker",
            "text": "Smart speaker"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "Self-driving car"
          },
          {
            "emoji": "📷",
            "value": "camera",
            "text": "Camera"
          }
        ],
        "answer": "speaker"
      },
      {
        "type": "word_builder",
        "word": "robot",
        "audioText": "robot"
      },
      {
        "type": "word_builder",
        "word": "voice",
        "audioText": "voice"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "may",
          "answer",
          "you",
          "in",
          "a",
          "friendly",
          "voice."
        ],
        "audioText": "They may answer you in a friendly voice."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In hospitals, AI ___ used to read photos of the body.",
        "choices": [
          "is",
          "are",
          "be"
        ],
        "answer": "is",
        "audioText": "In hospitals, AI is used to read photos of the body."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The cars must be ___ by a person at all times.",
        "choices": [
          "watch",
          "watched",
          "watching"
        ],
        "answer": "watched",
        "audioText": "The cars must be watched by a person at all times."
      }
    ]
  },
  {
    "id": "zk-r3-s02",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 2,
    "title": "Smart Machines in Our Life",
    "titleCn": "我们生活中的智能机器",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Today, AI is used in many places around the world. It may be in your phone, your car, or even your schoolbag. This smart technology helps people in quiet and useful ways.",
        "translation": "如今，人工智能被用在世界上许多地方。它也许就在你的手机里、汽车里，甚至书包里。这项聪明的技术正以安静而实用的方式帮助着人们。"
      },
      {
        "text": "In factories, heavy boxes are moved by robots every day. These machines never get tired, so they can work all night. In some hospitals, medicine is carried to nurses by small robots. Doctors say these helpers make their work easier and safer.",
        "translation": "在工厂里，沉重的箱子每天都被机器人搬运。这些机器从不疲倦，所以它们能整夜工作。在一些医院里，药品由小机器人送往护士手中。医生说，这些帮手让他们的工作更轻松、更安全。"
      },
      {
        "text": "AI is also used in the apps on our phones. When you take a photo, the picture can be made clearer by AI. When you meet a new word, its meaning may be shown at once. Some apps can even turn your voice into text.",
        "translation": "人工智能也被用在手机的应用程序里。你拍照时，照片可以由人工智能变得更清晰。当你遇到一个新单词时，它的意思也许马上就会显示出来。有些应用甚至能把你的声音变成文字。"
      },
      {
        "text": "Transport is changing fast in our cities. Electric cars are charged at home. Some buses can be driven by computers. Every new model must be tested again and again.",
        "translation": "交通工具也在我们的城市里快速变化着。电动汽车在家里充电。一些公交车可以由电脑驾驶。每一个新车型都必须一次又一次地接受测试。"
      },
      {
        "text": "Nobody knows what will come next or what will happen tomorrow. More smart machines may be built in the coming years. They might help farmers grow food or clean up rivers. However, AI is only a tool, and it cannot feel or dream.",
        "translation": "没有人知道接下来会出现什么，也不知道明天会发生什么。未来几年里，可能会有更多智能机器被制造出来。它们也许能帮助农民种粮食，或者清理河流。不过，人工智能只是一种工具，它不能感受，也不会做梦。"
      },
      {
        "text": "So we should not be afraid of smart machines. They are made by people, and they work for people. The best ideas still come from the human mind.",
        "translation": "所以我们不必害怕智能机器。它们由人制造，也为人们工作。最好的想法仍然来自人脑。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the passage, which machine moves heavy boxes in factories?",
        "audioText": "In the passage, which machine moves heavy boxes in factories?",
        "options": [
          {
            "emoji": "🤖",
            "value": "robot",
            "text": "Robot"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "Car"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "Phone"
          }
        ],
        "answer": "robot"
      },
      {
        "type": "word_builder",
        "word": "medicine",
        "audioText": "medicine"
      },
      {
        "type": "word_builder",
        "word": "electric",
        "audioText": "electric"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Electric",
          "cars",
          "are",
          "charged",
          "at",
          "home"
        ],
        "audioText": "Electric cars are charged at home."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Today, AI ___ used in many places around the world.",
        "choices": [
          "is",
          "are",
          "were"
        ],
        "answer": "is",
        "audioText": "Today, AI is used in many places around the world."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "These machines never get tired, so they ___ work all night.",
        "choices": [
          "can",
          "cannot",
          "must not"
        ],
        "answer": "can",
        "audioText": "These machines never get tired, so they can work all night."
      }
    ]
  },
  {
    "id": "zk-r3-s03",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 3,
    "title": "AI Helps Us Every Day",
    "titleCn": "人工智能每天都在帮助我们",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Today, AI is used in many places around us. It helps people at home, at school and at work. Maybe you use it every day and never know it.",
        "translation": "如今，人工智能被用在我们的许多生活场景中。它在家、在学校、在工作中帮助人们。也许你每天都在用它，却从来没有察觉。"
      },
      {
        "text": "Many apps on your phone are built with AI. When you speak to a voice helper, your words are heard and understood. A map app can find the best way for you. It was made by a team of clever engineers.",
        "translation": "你手机上的很多应用都是用人工智能做出来的。当你对着语音助手说话时，你说的话会被听到、被理解。地图应用能为你找到最好的路线，它是由一群聪明的工程师做出来的。"
      },
      {
        "text": "Robots are used in many factories today. They can work all day and never feel tired. In some homes, small robots are used to clean the floor. These machines were designed to help busy people.",
        "translation": "如今很多工厂里都用上了机器人。它们能整天工作，从不觉得累。在一些家庭里，小机器人被用来打扫地板。这些机器是为了帮助忙碌的人们而设计出来的。"
      },
      {
        "text": "Smart cars are tested in many cities today. They can see the road with small cameras. A shared bike can be found with your phone in a minute. This kind of travel may be green and cheap.",
        "translation": "现在许多城市都在测试智能汽车。它们能用小摄像头“看”路。用手机一分钟就能找到一辆共享单车。这种出行方式也许既环保又便宜。"
      },
      {
        "text": "AI may become much smarter in the future. Some people think it could do more work than us. But it cannot love, dream or feel real joy. A machine may look clever, but it is not alive.",
        "translation": "未来人工智能可能会变得聪明得多。有人觉得它能做比我们更多的工作。但它不会爱，不会做梦，也感受不到真正的快乐。机器也许看起来很聪明，但它并不是活的生命。"
      },
      {
        "text": "AI is a tool, and people are its owners. It should be used in a good and careful way. Will it change our life? Maybe. Let us learn to use it well.",
        "translation": "人工智能是一种工具，而它的主人是人。它应该被好好、谨慎地使用。它会改变我们的生活吗？也许吧。让我们学会好好地使用它。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the text, what is used to clean the floor in some homes?",
        "audioText": "In the text, what is used to clean the floor in some homes?",
        "options": [
          {
            "emoji": "🤖",
            "value": "robot",
            "text": "A small robot"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "A phone app"
          },
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A shared bike"
          }
        ],
        "answer": "robot"
      },
      {
        "type": "word_builder",
        "word": "robot",
        "audioText": "robot"
      },
      {
        "type": "word_builder",
        "word": "machine",
        "audioText": "machine"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Robots",
          "are",
          "used",
          "in",
          "many",
          "factories",
          "today."
        ],
        "audioText": "Robots are used in many factories today."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Many apps on your phone ___ built with AI.",
        "choices": [
          "are",
          "is",
          "was"
        ],
        "answer": "are",
        "audioText": "Many apps on your phone are built with AI."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "AI ___ become much smarter in the future.",
        "choices": [
          "may",
          "need",
          "must"
        ],
        "answer": "may",
        "audioText": "AI may become much smarter in the future."
      }
    ]
  },
  {
    "id": "zk-r3-s04",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 4,
    "title": "A Watch That Knows Your Heart",
    "titleCn": "懂你心跳的手表",
    "coverEmoji": "⌚",
    "paragraphs": [
      {
        "text": "Smart watches are worn by millions of people today. Many years ago, a watch was only used to tell the time. Now these small machines can do much more than that.",
        "translation": "如今，智能手表被数以百万计的人佩戴着。很多年前，手表只被用来报时。现在，这些小机器能做的事情远不止这些。"
      },
      {
        "text": "Your watch can count your steps and measure how fast your heart beats. The information is sent to your phone at once. You can read it on a small screen, day and night. Some watches can even say that you should move more.",
        "translation": "你的手表能计步，还能测出你的心跳有多快。这些信息会立刻被发送到你的手机上。你可以在一个小屏幕上随时查看。有些手表甚至会提醒你该多活动活动。"
      },
      {
        "text": "A tiny part inside the watch is used to check your heart. It sends a light through your skin and watches the blood. The results are stored in the watch and studied by a program.",
        "translation": "手表内部有一个小小的部件，被用来监测你的心脏。它发出一束光穿过你的皮肤，观察血液的流动。这些结果会被保存在手表里，并由一个程序进行分析。"
      },
      {
        "text": "Last year, a man in the UK was woken by his watch at night. His heart was beating much too fast. He thought that something must be wrong with his heart. He called a doctor at once, and his life was saved.",
        "translation": "去年，英国一位男士夜里被他的手表叫醒了。他的心跳得太快了。他觉得自己的心脏一定出了问题。他立刻叫来了医生，他的生命被救了回来。"
      },
      {
        "text": "However, a smart watch is not a real doctor. Its advice might not always be right. The numbers must be checked by a doctor. So do not worry too much about them.",
        "translation": "不过，智能手表并不是真正的医生。它给出的建议可能并不总是正确的。这些数据必须由医生来核实。所以不要为它们过分担心。"
      },
      {
        "text": "Today, smart watches are used by people of all ages. They can help us live more healthily and feel safe. But remember that they are only tools. You must still take good care of yourself.",
        "translation": "如今，各个年龄段的人都在使用智能手表。它们能帮助我们生活得更健康，也让我们感到安心。但请记住，它们只是工具。你仍然必须好好照顾自己。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the watch send through your skin?",
        "audioText": "What does the watch send through your skin?",
        "options": [
          {
            "emoji": "💡",
            "value": "light",
            "text": "Light"
          },
          {
            "emoji": "💧",
            "value": "water",
            "text": "Water"
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
        "word": "measure",
        "audioText": "measure"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A tiny part inside the watch ___ used to check your heart.",
        "choices": [
          "is",
          "are",
          "were"
        ],
        "answer": "is",
        "audioText": "A tiny part inside the watch is used to check your heart."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "numbers",
          "must",
          "be",
          "checked",
          "by",
          "a",
          "doctor."
        ],
        "audioText": "The numbers must be checked by a doctor."
      },
      {
        "type": "word_builder",
        "word": "screen",
        "audioText": "screen"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He thought that something ___ be wrong with his heart.",
        "choices": [
          "must",
          "mustn't",
          "can't"
        ],
        "answer": "must",
        "audioText": "He thought that something must be wrong with his heart."
      }
    ]
  },
  {
    "id": "zk-r3-s05",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 5,
    "title": "Small Robots, Big Help",
    "titleCn": "小机器人，大帮手",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Robots are used in many places today. Some of them work in factories, and others help people at home. They may look like simple machines, but they can do clever things. Many people believe that robots will change our lives.",
        "translation": "如今，机器人在许多地方被使用。有些在工厂里工作，还有些在家里帮助人们。它们看起来可能像简单的机器，却能做很聪明的事情。许多人相信机器人会改变我们的生活。"
      },
      {
        "text": "In big factories, heavy boxes are moved by robots every day. Cars are made by machines that work all night. These robots are checked by workers every morning. They never feel tired, so the work is done much faster.",
        "translation": "在大工厂里，沉重的箱子每天由机器人搬运。汽车是由整夜工作的机器制造的。这些机器人每天早上都由工人检查。它们从不觉得累，所以工作完成得快得多。"
      },
      {
        "text": "At home, small robots can clean the floor for us. The floor is swept while we watch TV or read. Some of them might be a little noisy, but they save us time. My mother says our robot must be a great helper.",
        "translation": "在家里，小机器人能为我们打扫地板。我们看电视或看书的时候，地板就被扫干净了。其中有些可能有点吵，但它们为我们节省了时间。我妈妈说我们的机器人一定是个好帮手。"
      },
      {
        "text": "AI is also used in the phone apps we use every day. When we take a photo, the picture may be made better by AI. Doctors can be helped by computers when they study body pictures. The right answer can be found in a few seconds.",
        "translation": "人工智能也被用在我们每天使用的手机应用里。我们拍照时，照片可能会被人工智能变得更漂亮。医生研究身体图片时，可以借助计算机的帮助。正确的答案几秒钟内就能找到。"
      },
      {
        "text": "New buses and cars can drive themselves on some roads. Their speed is controlled by computers inside the car. A driver might not be needed in the future. But these cars must be tested again and again before they are safe.",
        "translation": "新型公交车和汽车能在一些道路上自己行驶。它们的速度由车内的电脑控制。将来可能不再需要司机。但这些车在上路安全之前，必须一次又一次地接受测试。"
      },
      {
        "text": "Robots and AI are changing the world we live in. They cannot do everything, and people are still needed. But they can help us work better and live more easily. Maybe one day, a robot will be your best helper.",
        "translation": "机器人和人工智能正在改变我们生活的世界。它们不能做所有事情，人依然是必需的。但它们能帮我们工作得更好，生活得更轻松。也许有一天，机器人会成为你最好的帮手。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What can small robots do at home?",
        "audioText": "What can small robots do at home?",
        "options": [
          {
            "emoji": "🧹",
            "value": "clean",
            "text": "Clean the floor"
          },
          {
            "emoji": "🍳",
            "value": "cook",
            "text": "Cook dinner"
          },
          {
            "emoji": "📚",
            "value": "read",
            "text": "Read books"
          }
        ],
        "answer": "clean"
      },
      {
        "type": "word_builder",
        "word": "factory",
        "audioText": "factory"
      },
      {
        "type": "word_builder",
        "word": "computer",
        "audioText": "computer"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Robots",
          "are",
          "used",
          "in",
          "many",
          "places",
          "today."
        ],
        "audioText": "Robots are used in many places today."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Cars ___ made by machines that work all night.",
        "choices": [
          "is",
          "are",
          "was"
        ],
        "answer": "are",
        "audioText": "Cars are made by machines that work all night."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Their speed ___ by computers inside the car.",
        "choices": [
          "controls",
          "is controlled",
          "control"
        ],
        "answer": "is controlled",
        "audioText": "Their speed is controlled by computers inside the car."
      }
    ]
  },
  {
    "id": "zk-r3-s06",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 6,
    "title": "Robots on the Sidewalk",
    "titleCn": "人行道上的小机器人",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "In some cities today, small robots can be seen on the sidewalks. They are used to carry food, drinks and small packages to people's homes. If a small box moves by itself, it must be a robot. These robots move slowly and always stop when people walk near them.",
        "translation": "如今在一些城市里，人行道上能看到小小的机器人。它们被用来把食物、饮料和小包裹送到人们家门口。如果一个小盒子自己在往前移动，那它一定是个机器人。这些机器人走得很慢，只要有人走近，它们就会停下来。"
      },
      {
        "text": "How does a delivery robot work on a busy street? First, an order is sent to the robot by a phone app. Then the robot is given a map of the streets nearby. Its box is locked, so nobody can open it on the way.",
        "translation": "在繁忙的街道上，送东西的机器人是怎么工作的呢？首先，订单会通过手机应用发送给机器人。接着，机器人会拿到一份附近街道的地图。它的箱子是锁着的，所以路上没人能把它打开。"
      },
      {
        "text": "When the robot arrives, a message is sent to your phone. You can open the box with a code. The trip is usually finished in thirty minutes.",
        "translation": "机器人到达的时候，你的手机会收到一条消息。你可以用一个取件码打开箱子。这一趟路程通常三十分钟内就完成了。"
      },
      {
        "text": "These robots were designed to work both day and night. They must follow traffic rules on the street. They can't cross busy roads alone. Some people believe robots might take jobs away from humans. In fact, new jobs are also created.",
        "translation": "这些机器人被设计成白天黑夜都能工作。它们必须遵守街上的交通规则，不能独自穿过繁忙的马路。有些人认为机器人可能会抢走人类的工作。事实上，新的工作岗位也随之出现了。"
      },
      {
        "text": "In the future, more smart machines may be built for our cities. But they can't do everything, and they must be checked often. So a warm “thank you” must still come from a real person.",
        "translation": "未来，也许会有更多智能机器为我们的城市而造。但它们并不是什么都做得了，而且还必须经常被检查。所以，一句温暖的“谢谢”，还是得由真正的人说出口。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In some cities, what carries food and small packages to people's homes?",
        "audioText": "In some cities, what carries food and small packages to people's homes?",
        "options": [
          {
            "emoji": "🤖",
            "value": "robot",
            "text": "A small robot"
          },
          {
            "emoji": "🚚",
            "value": "truck",
            "text": "A big truck"
          },
          {
            "emoji": "✈️",
            "value": "plane",
            "text": "A plane"
          }
        ],
        "answer": "robot"
      },
      {
        "type": "word_builder",
        "word": "message",
        "audioText": "message"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "can't",
          "cross",
          "busy",
          "roads",
          "alone."
        ],
        "audioText": "They can't cross busy roads alone."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "trip",
          "is",
          "usually",
          "finished",
          "in",
          "thirty",
          "minutes."
        ],
        "audioText": "The trip is usually finished in thirty minutes."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "First, an order ___ sent to the robot by a phone app.",
        "choices": [
          "is",
          "are",
          "were"
        ],
        "answer": "is",
        "audioText": "First, an order is sent to the robot by a phone app."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In the future, more smart machines may ___ built for our cities.",
        "choices": [
          "be",
          "is",
          "are"
        ],
        "answer": "be",
        "audioText": "In the future, more smart machines may be built for our cities."
      }
    ]
  },
  {
    "id": "zk-r3-s07",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 7,
    "title": "Smart Streets, Safe Rides",
    "titleCn": "智慧街道，安全出行",
    "coverEmoji": "🚦",
    "paragraphs": [
      {
        "text": "Cities around the world are growing fast. More and more cars are on the roads every year. To keep people safe, many cities are trying new ideas. Some streets are becoming smart streets. They may change the way we travel.",
        "translation": "世界各地的城市正在快速变大。每年路上的汽车越来越多。为了保障人们的安全，许多城市正在尝试新的办法。有些街道正在变成“智慧街道”。它们也许会改变我们出行的方式。"
      },
      {
        "text": "A smart street uses cameras and small computers. These computers are placed inside boxes near the road. The cameras can see how many cars and bikes are passing. This information is sent to a computer center in a few seconds.",
        "translation": "智慧街道会用到摄像头和小型电脑。这些电脑被安放在路边的小箱子里。摄像头能看清有多少汽车和自行车正在经过。这些信息会在几秒钟内被送到一个电脑中心。"
      },
      {
        "text": "Traffic lights are controlled by this center. When the road is busy, the green light can be made longer. When no cars are waiting, the light is changed quickly. So drivers and walkers do not have to wait so long.",
        "translation": "交通灯由这个中心控制。当路上车多时，绿灯可以被调得更长一些。当没有车在等的时候，灯会很快变换。所以司机和行人都用不着等那么久。"
      },
      {
        "text": "Smart streets can also help buses. A bus may be given a green light first. Then it can move faster than cars. This idea was tested in some cities last year. After the test, more people chose to take the bus to work.",
        "translation": "智慧街道也能帮助公交车。公交车可能先得到绿灯。这样它就能比小汽车跑得更快。这个办法去年在一些城市做了测试。测试之后，更多人选择坐公交车上班。"
      },
      {
        "text": "Some people may worry about the cameras. They think their faces or car numbers might be recorded. City workers say the pictures are used only for traffic. They are kept for just a short time, and this rule must be followed by everyone.",
        "translation": "有些人可能会担心这些摄像头。他们认为自己的脸或车牌号码也许会被录下来。城市的工作人员说，这些画面只用于交通方面。它们只会被保留很短的一段时间，而且这条规定必须被每个人遵守。"
      },
      {
        "text": "Smart streets are still new, and nobody knows all the answers. But one thing is clear: technology can be a good helper. With the right rules, our cities may become safer, cleaner and easier to live in.",
        "translation": "智慧街道还很新，没有人知道所有的答案。但有一点很清楚：科技可以是一个好帮手。有了合适的规则，我们的城市可能会变得更安全、更干净，也更适合生活。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is placed inside the boxes near the road?",
        "audioText": "What is placed inside the boxes near the road?",
        "options": [
          {
            "emoji": "💻",
            "value": "computer",
            "text": "A small computer"
          },
          {
            "emoji": "🍕",
            "value": "pizza",
            "text": "A pizza"
          },
          {
            "emoji": "🎸",
            "value": "guitar",
            "text": "A guitar"
          }
        ],
        "answer": "computer"
      },
      {
        "type": "word_builder",
        "word": "traffic",
        "audioText": "traffic"
      },
      {
        "type": "word_builder",
        "word": "cameras",
        "audioText": "cameras"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "This",
          "information",
          "is",
          "sent",
          "to",
          "a",
          "computer",
          "center."
        ],
        "audioText": "This information is sent to a computer center."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Traffic lights are ___ by this center.",
        "choices": [
          "controlled",
          "control",
          "controlling"
        ],
        "answer": "controlled",
        "audioText": "Traffic lights are controlled by this center."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Some people may ___ about the cameras.",
        "choices": [
          "worry",
          "worried",
          "worries"
        ],
        "answer": "worry",
        "audioText": "Some people may worry about the cameras."
      }
    ]
  },
  {
    "id": "zk-r3-s08",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 8,
    "title": "Delivery Robots Come to Town",
    "titleCn": "送货机器人进城了",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "In some cities, small robots are seen on the streets every day. They are used to carry meals, letters and other small things. The first ones were tested in a few cities a few years ago. These robots move on six wheels and are not much taller than a dog.",
        "translation": "在一些城市，人们每天都能在街上看到小机器人。它们被用来运送饭菜、信件和其他小物品。几年前，第一批这样的机器人曾在几个城市里进行过测试。它们靠六个轮子移动，个头并不比一只狗高多少。"
      },
      {
        "text": "A robot is told where to go by a phone app. Then it opens its box, and the food is put inside. The box can only be opened by the person who ordered it. So the meal must be safe on the way.",
        "translation": "手机应用会告诉机器人该去哪里。接着它打开自己的箱子，食物被放进去。箱子只能由下单的那个人打开。所以饭菜在路上一定是安全的。"
      },
      {
        "text": "These machines are not as clever as people, but they are very careful. When a robot meets a person, it will stop and wait. Cameras help it to see the road and the traffic lights. If the road is busy, the robot might choose another way.",
        "translation": "这些机器不像人那么聪明，但它们非常小心。当机器人遇到行人时，它会停下来等待。摄像头帮助它看清道路和红绿灯。如果路上很拥挤，机器人可能会挑选另一条路。"
      },
      {
        "text": "Some people are worried about these new workers. Will drivers lose their jobs? Maybe not. In fact, more people are needed to check and repair the robots. New jobs are created when new machines arrive.",
        "translation": "有些人对这些新“员工”感到担心。司机会失去工作吗？也许不会。事实上，需要更多的人来检查和维修机器人。当新机器出现时，新的工作也会随之产生。"
      },
      {
        "text": "Robots cannot climb stairs yet, and rain is still a problem. Some robots are stopped by steps, and water can get inside them. So engineers are trying to make them stronger and smarter.",
        "translation": "机器人目前还不会爬楼梯，下雨也仍然是个问题。有些机器人会被台阶挡住，水也可能进到它们里面。因此工程师们正努力让它们变得更强壮、更聪明。"
      },
      {
        "text": "In the future, robots might be as common as bikes in our cities. Maybe one day a robot will knock on your door with your dinner. That day may not be far away.",
        "translation": "将来，机器人在我们的城市里也许会像自行车一样常见。也许有一天，机器人会端着你的晚餐来敲你家的门。那一天可能并不遥远。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "How tall are these delivery robots?",
        "audioText": "How tall are these delivery robots?",
        "options": [
          {
            "emoji": "🐕",
            "value": "dog",
            "text": "About as tall as a dog"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "About as big as a car"
          },
          {
            "emoji": "🏠",
            "value": "house",
            "text": "About as big as a house"
          }
        ],
        "answer": "dog"
      },
      {
        "type": "word_builder",
        "word": "wheel",
        "audioText": "wheel"
      },
      {
        "type": "word_builder",
        "word": "repair",
        "audioText": "repair"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "New",
          "jobs",
          "are",
          "created",
          "when",
          "new",
          "machines",
          "arrive."
        ],
        "audioText": "New jobs are created when new machines arrive."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The box can only be ___ by the person who ordered it.",
        "choices": [
          "opened",
          "opening",
          "opens"
        ],
        "answer": "opened",
        "audioText": "The box can only be opened by the person who ordered it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If the road is busy, the robot ___ choose another way.",
        "choices": [
          "might",
          "must",
          "cannot"
        ],
        "answer": "might",
        "audioText": "If the road is busy, the robot might choose another way."
      }
    ]
  },
  {
    "id": "zk-r3-s09",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 9,
    "title": "AI Behind the Wheel",
    "titleCn": "方向盘后的 AI",
    "coverEmoji": "🚗",
    "paragraphs": [
      {
        "text": "Look at the road. In some cities, cars without drivers are already moving along the streets. These cars are called self-driving cars, and they are tested every day.",
        "translation": "看看马路。在一些城市里，没有司机的汽车已经在街道上行驶了。这些车被称为自动驾驶汽车，而且每天都要接受测试。"
      },
      {
        "text": "How can a car drive itself? Many small cameras and sensors are fixed on the top and sides. They watch the road and send pictures to a computer inside the car. The computer must decide what to do next in a second.",
        "translation": "一辆车怎么能自己开呢？许多小型摄像头和传感器被装在车顶和车身两侧。它们观察道路，并把画面发送给车里的电脑。电脑必须在一秒之内决定下一步怎么做。"
      },
      {
        "text": "The computer is trained with millions of road pictures. In this way, it learns to know people, bikes and traffic lights. When a child runs into the street, the car may stop at once. A human driver might not be so fast.",
        "translation": "这台电脑是用数百万张道路图片训练出来的。这样一来，它学会了识别行人、自行车和红绿灯。当有孩子跑进街道时，汽车可能会立刻停下。而人类司机也许没有那么快。"
      },
      {
        "text": "There are still problems. Bad weather can make the cameras blind, so the car cannot see clearly. Sometimes the car must be controlled by a person again. Rules for these cars are also written in many countries.",
        "translation": "不过问题依然存在。恶劣的天气会让摄像头“失明”，于是汽车就看不清楚了。有时，汽车必须重新由人来控制。许多国家也在为这类汽车制定规则。"
      },
      {
        "text": "Will we all own a self-driving car one day? Maybe not. Shared robot taxis could be used more often in big cities. You may call one with your phone, and it will come to you. Then the roads might become safer and quieter.",
        "translation": "将来我们都会拥有一辆自动驾驶汽车吗？也许不会。共享的机器人出租车可能会在大城市里被更频繁地使用。你可以用手机叫一辆，它就会来到你身边。到那时，道路可能会变得更安全、更安静。"
      },
      {
        "text": "Self-driving cars are not perfect yet. But they are getting better each year. One day, they may take us to school while we read or rest. The future on the road could be very different.",
        "translation": "自动驾驶汽车目前还不完美。但它们一年比一年更好。总有一天，它们可能会在我们读书或休息时送我们去学校。路上的未来可能会大不一样。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which thing helps a self-driving car see the road?",
        "audioText": "Which thing helps a self-driving car see the road?",
        "options": [
          {
            "emoji": "📷",
            "value": "camera",
            "text": "Camera"
          },
          {
            "emoji": "🔊",
            "value": "speaker",
            "text": "Speaker"
          },
          {
            "emoji": "🪑",
            "value": "seat",
            "text": "Seat"
          }
        ],
        "answer": "camera"
      },
      {
        "type": "word_builder",
        "word": "computer",
        "audioText": "computer"
      },
      {
        "type": "word_builder",
        "word": "traffic",
        "audioText": "traffic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "a",
          "human",
          "driver",
          "might",
          "not",
          "be",
          "so",
          "fast"
        ],
        "audioText": "A human driver might not be so fast."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Sometimes the car must be ___ by a person again.",
        "choices": [
          "controlled",
          "controlling",
          "control"
        ],
        "answer": "controlled",
        "audioText": "Sometimes the car must be controlled by a person again."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You ___ call one with your phone, and it will come to you.",
        "choices": [
          "may",
          "must",
          "can't"
        ],
        "answer": "may",
        "audioText": "You may call one with your phone, and it will come to you."
      }
    ]
  },
  {
    "id": "zk-r3-s10",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 10,
    "title": "The Bus That Drives Itself",
    "titleCn": "会自己开车的公交车",
    "coverEmoji": "🚌",
    "paragraphs": [
      {
        "text": "Have you ever seen a bus without a driver? In a few Chinese cities, such buses can be seen on the road today. They look like small boxes with big windows. No driver sits in the front, but the bus still moves.",
        "translation": "你见过没有司机的公交车吗？在中国的一些城市，如今这样的公交车已经能在路上看到了。它们看上去像装了大窗户的小盒子。前面没有司机坐着，可车子照样行驶。"
      },
      {
        "text": "How does it work? The bus is controlled by a computer inside it. Cameras on the bus watch the road all the time. Pictures are sent to the computer at once. Then the computer decides when to stop and when to go.",
        "translation": "它是怎么工作的呢？这辆车由车内的一台电脑控制。车上的摄像头一直注视着路面。画面会立刻传送到电脑里。然后由电脑决定什么时候停车、什么时候前行。"
      },
      {
        "text": "The bus was tested for many months before people got on it. Engineers followed it and watched every move. If anything went wrong, the bus could be stopped by a button. Anyone on the bus can press that button.",
        "translation": "在有人上车之前，这种公交车经过了几个月的测试。工程师们跟在它后面，观察它的每一个动作。万一出了状况，这辆车可以被一个按钮停下来。车上任何人都能按下那个按钮。"
      },
      {
        "text": "Today such buses are used in parks and on quiet streets. They carry people slowly, so the ride feels soft and safe. \"It must be safer than my dad's car,\" a young boy said. His mother smiled and nodded.",
        "translation": "如今，这类公交车被用在公园里和安静的路段上。它们慢慢地载着人，所以坐起来平稳又安全。“它肯定比我爸爸的车还安全，”一个小男孩说道。他妈妈笑着点了点头。"
      },
      {
        "text": "Some people still ask questions about these buses. \"Can a computer really see a child or a dog?\" they ask. Engineers say the cameras can see more than our eyes can. That may be true, but many people are not sure. In the future, such buses may be seen on more streets. Still, human drivers are needed in most cities today.",
        "translation": "有些人仍然对这种公交车存有疑问。“电脑真的能看见一个小孩或者一只狗吗？”他们问。工程师们说，摄像头的视力比我们的眼睛还要好。这也许是真的，但很多人并不确定。将来，这样的公交车可能会出现在更多的街道上。不过，如今大多数城市里还是需要人类司机的。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What watches the road for the bus all the time?",
        "audioText": "What watches the road for the bus all the time?",
        "options": [
          {
            "emoji": "📷",
            "value": "camera",
            "text": "A camera"
          },
          {
            "emoji": "🐕",
            "value": "dog",
            "text": "A dog"
          },
          {
            "emoji": "🎈",
            "value": "balloon",
            "text": "A balloon"
          }
        ],
        "answer": "camera"
      },
      {
        "type": "word_builder",
        "word": "computer",
        "audioText": "computer"
      },
      {
        "type": "word_builder",
        "word": "driver",
        "audioText": "driver"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Pictures",
          "are",
          "sent",
          "to",
          "the",
          "computer",
          "at",
          "once."
        ],
        "audioText": "Pictures are sent to the computer at once."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The bus is ___ by a computer inside it.",
        "choices": [
          "controlled",
          "carried",
          "cleaned"
        ],
        "answer": "controlled",
        "audioText": "The bus is controlled by a computer inside it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In the future, such buses ___ be seen on more streets.",
        "choices": [
          "may",
          "can't",
          "must not"
        ],
        "answer": "may",
        "audioText": "In the future, such buses may be seen on more streets."
      }
    ]
  },
  {
    "id": "zk-r3-s11",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 11,
    "title": "When Drones Bring Your Food",
    "titleCn": "当无人机送来你的食物",
    "coverEmoji": "🚁",
    "paragraphs": [
      {
        "text": "A drone is a small flying machine with no pilot inside. It can be controlled by a person standing on the ground. Today drones are used in many different ways around the world. Some of them can carry a small box through the air.",
        "translation": "无人机是一种小型飞行器，里面没有飞行员。它可以由站在地面上的人来控制。如今，无人机在世界各地被用于许多不同的用途。其中一些能带着一个小箱子在空中飞行。"
      },
      {
        "text": "In some cities, hot food is delivered by drone every day. You order your meal on a phone app in a few seconds. Then the food is put into a special box. The box is fixed under the drone. Ten minutes later, the drone lands quietly near your home.",
        "translation": "在一些城市，热腾腾的饭菜每天由无人机配送。你只需在手机应用上花几秒钟点餐。然后食物会被装进一个特制的盒子里，盒子牢牢固定在无人机下方。十分钟后，无人机就会安静地降落在你家附近。"
      },
      {
        "text": "Every drone must be checked carefully before it goes up. Each flight is planned by a computer on the ground. The machine must not fly over busy roads or tall buildings. If the wind is too strong, the flight may be stopped.",
        "translation": "每架无人机起飞前都必须经过仔细检查。每一次飞行都由地面上的电脑来规划。机器不能飞越繁忙的马路或高楼。如果风太大，飞行可能会被叫停。"
      },
      {
        "text": "The first delivery drones were tested about ten years ago. At that time, they were used only in a few small towns. People were surprised by those strange flying boxes in the sky. Some of them thought the machines might be dangerous.",
        "translation": "最早的配送无人机大约在十年前进行测试。那时，它们只在少数小镇使用。人们看到天空中那些奇怪的飞行盒子都很惊讶，有些人觉得这些机器可能很危险。"
      },
      {
        "text": "Drones cannot carry heavy things, so large orders must be sent by truck. Their batteries must also be changed many times a day. Some people say that the noise may be a problem at night. Others think that the flying cameras may bring new problems.",
        "translation": "无人机搬不动重物，所以大批订单必须用卡车运送。它们的电池每天也得更换很多次。有人说，夜晚的噪音可能会成为问题；也有人认为，会飞的摄像头可能带来新的麻烦。"
      },
      {
        "text": "In the future, more things may be carried by drone. Perhaps your new shoes will be dropped outside your window. However, drones cannot do everything, and people are still needed. A machine can fly, but only a person can understand you.",
        "translation": "将来，可能会有更多东西由无人机运送。也许你的新鞋会被送到你的窗外。不过，无人机并不能做所有事情，人们仍然不可缺少。机器会飞，但只有人才能理解你。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the passage, what carries hot food to people in some cities?",
        "audioText": "In the passage, what carries hot food to people in some cities?",
        "options": [
          {
            "emoji": "🚁",
            "value": "drone",
            "text": "A drone"
          },
          {
            "emoji": "🚚",
            "value": "truck",
            "text": "A truck"
          },
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A bike"
          }
        ],
        "answer": "drone"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Every drone must be ___ carefully before it goes up.",
        "choices": [
          "checked",
          "check",
          "checking"
        ],
        "answer": "checked",
        "audioText": "Every drone must be checked carefully before it goes up."
      },
      {
        "type": "word_builder",
        "word": "drone",
        "audioText": "drone"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "box",
          "is",
          "fixed",
          "under",
          "the",
          "drone."
        ],
        "audioText": "The box is fixed under the drone."
      },
      {
        "type": "word_builder",
        "word": "flight",
        "audioText": "flight"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Some of them thought the machines ___ be dangerous.",
        "choices": [
          "might",
          "must",
          "should"
        ],
        "answer": "might",
        "audioText": "Some of them thought the machines might be dangerous."
      }
    ]
  },
  {
    "id": "zk-r3-s12",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 12,
    "title": "Drones Over the Fields",
    "titleCn": "无人机飞过田野",
    "coverEmoji": "🚁",
    "paragraphs": [
      {
        "text": "A drone is a small machine that can fly in the sky. From far away, it might look like a big bird. No one sits inside it, so it can work alone. Today drones are seen above many farms and fields.",
        "translation": "无人机是一种能在天空中飞行的小机器。远远看去，它可能像一只大鸟。里面没有人坐着，所以它可以独自工作。如今，无人机常出现在许多农场和田野的上空。"
      },
      {
        "text": "Farmers use them to watch their crops. A camera on the drone takes photos of every part of the field. The photos are sent to a phone or a computer.",
        "translation": "农民用它们来照看地里的庄稼。无人机上的摄像头会拍下田里每一处的照片。这些照片会被发送到手机或电脑上。"
      },
      {
        "text": "In the past, farmers walked through the fields to check the plants. That work was done by hand, and it took a long time. Now the same job can be finished by a drone in minutes.",
        "translation": "过去，农民要走进田里去查看庄稼。那些活都是靠手做的，要花很长时间。现在，同样的活由无人机几分钟就能完成。"
      },
      {
        "text": "Drones can also be used to give water and medicine to crops. They fly low and drop just enough water on each plant. This way, less water is wasted, and the plants stay healthy.",
        "translation": "无人机还可以用来给庄稼浇水和施药。它们飞得很低，只让每株植物落下刚好够用的水。这样一来，浪费的水更少，庄稼也能保持健康。"
      },
      {
        "text": "However, drones must be controlled by people with care. If a drone flies too high, it may hit a bird or a plane. So every flight should be planned before it starts.",
        "translation": "不过，无人机必须由人小心操控。如果无人机飞得太高，它可能会撞到鸟或者飞机。所以每次飞行开始前都应该做好计划。"
      },
      {
        "text": "In the future, drones may be used in many more ways. They could carry medicine to small villages far away. Maybe one day a drone will bring a letter to your door.",
        "translation": "将来，无人机可能会被用在更多地方。它们可以把药品送到很远的小村庄。也许有一天，无人机会把一封信送到你家门口。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What might a drone look like when it is far away?",
        "audioText": "What might a drone look like when it is far away?",
        "options": [
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "A big bird"
          },
          {
            "emoji": "🌳",
            "value": "tree",
            "text": "A tall tree"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "A small car"
          }
        ],
        "answer": "bird"
      },
      {
        "type": "word_builder",
        "word": "camera",
        "audioText": "camera"
      },
      {
        "type": "word_builder",
        "word": "healthy",
        "audioText": "healthy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Farmers",
          "use",
          "them",
          "to",
          "watch",
          "their",
          "crops."
        ],
        "audioText": "Farmers use them to watch their crops."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The photos are sent to a phone or a ___.",
        "choices": [
          "computer",
          "window",
          "letter"
        ],
        "answer": "computer",
        "audioText": "The photos are sent to a phone or a computer."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Drones must be ___ by people with care.",
        "choices": [
          "controlled",
          "collected",
          "carried"
        ],
        "answer": "controlled",
        "audioText": "Drones must be controlled by people with care."
      }
    ]
  },
  {
    "id": "zk-r3-s13",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 13,
    "title": "Robots That Sort Our Rubbish",
    "titleCn": "给垃圾分类的机器人",
    "coverEmoji": "🤖",
    "paragraphs": [
      {
        "text": "Every day, our city produces a huge amount of rubbish. Some of it can be recycled, but some of it cannot. In the past, this work was done by hand. It was slow, and people got very tired.",
        "translation": "每天，我们的城市都会产生大量垃圾。其中一些可以回收，另一些却不行。过去，这项工作靠手工完成，速度很慢，人也累得不行。"
      },
      {
        "text": "Today, smart robots are used in many recycling centres. They can pick up bottles, cans and paper very quickly. These machines never get tired, so they work all day and all night.",
        "translation": "如今，许多回收中心都用上了智能机器人。它们能飞快地捡起瓶子、易拉罐和纸张。这些机器从不疲倦，所以可以日夜不停地工作。"
      },
      {
        "text": "How do they know what is what? Cameras take photos of the rubbish as it moves along the belt. Then AI software studies the pictures and tells the robot what it sees. A plastic bottle may look like glass, so the AI must be very careful.",
        "translation": "它们怎么知道什么是什么？当垃圾沿着传送带移动时，摄像机会给它拍照。接着 AI 软件分析这些照片，并告诉机器人它看到的是什么。塑料瓶可能看起来像玻璃瓶，所以 AI 必须非常小心。"
      },
      {
        "text": "The robot's arm is moved by a small motor. When the AI says 'this is a bottle', the arm picks it up. Then the bottle is dropped into the right box. All of this can be done in less than a second.",
        "translation": "机器人的手臂由一台小马达带动。当 AI 说出“这是一个瓶子”时，手臂就把它捡起来，然后瓶子被投进对应的箱子里。这一切在不到一秒钟内就能完成。"
      },
      {
        "text": "These robots are helpful, but they cannot do everything. Soft or dirty things may be hard for them to hold. So people still work beside them and check the boxes. The robots and the workers make a good team.",
        "translation": "这些机器人很有用，但并不是什么都能做。又软又脏的东西，它们可能很难抓起来。所以人们仍然在它们旁边工作，检查箱子里的东西。机器人和工人组成了一支好团队。"
      },
      {
        "text": "In the future, more smart machines will be used in our cities. They could help us save energy and keep the Earth clean. Maybe one day, the rubbish bin itself will tell you where to put your cup!",
        "translation": "将来，我们的城市会使用更多智能机器。它们或许能帮我们节约能源，让地球保持干净。也许有一天，垃圾桶自己就会告诉你，杯子该扔在哪里！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which of these do the smart robots pick up in the text?",
        "audioText": "Which of these do the smart robots pick up in the text?",
        "options": [
          {
            "emoji": "🥤",
            "value": "bottle",
            "text": "A bottle"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "An old phone"
          },
          {
            "emoji": "👟",
            "value": "shoe",
            "text": "An old shoe"
          }
        ],
        "answer": "bottle"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "word_builder",
        "word": "careful",
        "audioText": "careful"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "These",
          "machines",
          "never",
          "get",
          "tired."
        ],
        "audioText": "These machines never get tired."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In the past, this work ___ done by hand.",
        "choices": [
          "was",
          "were",
          "is"
        ],
        "answer": "was",
        "audioText": "In the past, this work was done by hand."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A plastic bottle ___ look like glass, so the AI must be careful.",
        "choices": [
          "may",
          "must",
          "can't"
        ],
        "answer": "may",
        "audioText": "A plastic bottle may look like glass, so the AI must be careful."
      }
    ]
  },
  {
    "id": "zk-r3-s14",
    "track": "zhongkao",
    "regionId": "zk-r3",
    "order": 14,
    "title": "A Home That Listens",
    "titleCn": "会听话的家",
    "coverEmoji": "🏠",
    "paragraphs": [
      {
        "text": "Imagine a home that listens to your voice and knows what you need. In many cities today, this is no longer just a story. Smart homes are built with small computers inside their walls. These computers never sleep, and they are always ready to help.",
        "translation": "想象一个能听懂你的声音、知道你需要什么的房子。在今天许多城市里，这已经不再只是故事。智能住宅的墙体里装着小电脑。这些电脑从不睡觉，随时准备帮忙。"
      },
      {
        "text": "In the morning, the lights are turned on by a soft voice. \"Good morning,\" you say, and the curtains open slowly. The radio is set to your favorite music. The water is heated for your shower. Everything is ready before you leave your bed.",
        "translation": "早晨，一句轻声的话就能把灯打开。你说一声“早上好”，窗帘便慢慢拉开。收音机被调到你喜欢听的音乐。洗澡水已经热好了。你还没下床，一切就已准备妥当。"
      },
      {
        "text": "Sensors are placed in every room of the house. They can feel the temperature, the light and even the air. If the air is too dry, a small machine might add water to it. If a window is left open, a message may be sent to your phone.",
        "translation": "房子的每个房间都装了传感器。它们能感知温度、光线，甚至空气。如果空气太干，小机器可能会给它加些水分。如果窗户没关，你的手机上可能会收到一条信息。"
      },
      {
        "text": "Safety is another big part of the smart home. The front door can be locked by your phone from far away. A camera can be checked at any time from your office. When something looks wrong, a warning is sent to you at once.",
        "translation": "安全是智能住宅的另一个重要部分。即使你身在远处，也能用手机把前门锁好。在办公室，你随时都能查看摄像头。一旦有什么不对劲，警告会立刻发给你。"
      },
      {
        "text": "Some people worry that their homes know too much about them. Your daily habits are recorded, and this information must be kept safe. Companies are asked to protect it, and new laws are made in many countries.",
        "translation": "有些人担心，这样的家对他们了解得太多。你的日常习惯会被记录下来，而这些信息必须被妥善保护。公司被要求保护好这些信息，许多国家也制定了新的法律。"
      },
      {
        "text": "A smart home cannot cook a perfect dinner or love you like a family. But it can save time, energy and water every single day. The house is not alive, yet it works like a quiet helper. Maybe your next home will be one of them.",
        "translation": "智能住宅没法做出一顿完美的晚餐，也不会像家人那样爱你。但它每天都能省下时间、能源和水。房子并没有生命，却像一位安静的帮手。也许你的下一个家，就是这样的房子。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the passage, which thing can be checked at any time?",
        "audioText": "In the passage, which thing can be checked at any time?",
        "options": [
          {
            "emoji": "📷",
            "value": "camera",
            "text": "Camera"
          },
          {
            "emoji": "🪟",
            "value": "window",
            "text": "Window"
          },
          {
            "emoji": "🔊",
            "value": "radio",
            "text": "Radio"
          }
        ],
        "answer": "camera"
      },
      {
        "type": "word_builder",
        "word": "sensor",
        "audioText": "sensor"
      },
      {
        "type": "word_builder",
        "word": "warning",
        "audioText": "warning"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "A",
          "message",
          "may",
          "be",
          "sent",
          "to",
          "your",
          "phone."
        ],
        "audioText": "A message may be sent to your phone."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In the morning, the lights are ___ on by a soft voice.",
        "choices": [
          "turned",
          "turns",
          "turning"
        ],
        "answer": "turned",
        "audioText": "In the morning, the lights are turned on by a soft voice."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If the air is too dry, a small machine ___ add water to it.",
        "choices": [
          "might",
          "must",
          "cannot"
        ],
        "answer": "might",
        "audioText": "If the air is too dry, a small machine might add water to it."
      }
    ]
  },
  {
    "id": "zk-r4-s01",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 1,
    "title": "Small Actions, Big Changes",
    "titleCn": "小小的行动，大大的改变",
    "coverEmoji": "♻️",
    "paragraphs": [
      {
        "text": "Our school starts a Green Action Week today. Every class will join in and do something useful for our city. If we work together, small actions can make a big difference.",
        "translation": "我们学校今天开启了“绿色行动周”。每个班级都会参与，为我们的城市做些有用的事。只要我们一起努力，小小的行动也能带来大大的改变。"
      },
      {
        "text": "The first step is sorting rubbish at school. There are four bins near the school gate: blue, green, red and grey. Please put paper and glass bottles in the blue bin.",
        "translation": "第一步是在学校里进行垃圾分类。校门口有四个垃圾桶：蓝色、绿色、红色和灰色。请把纸张和玻璃瓶放进蓝色垃圾桶。"
      },
      {
        "text": "If you bring your own bottle, you will not need to buy drinks. Please do not use paper cups or plastic bags anymore. Always turn off the lights when you leave.",
        "translation": "如果你自己带水杯，就不用买饮料了。请不要再使用纸杯或塑料袋。离开的时候一定要随手关灯。"
      },
      {
        "text": "Animals need our help too. We can plant trees to give birds safe homes. If we keep the river clean, fish will come back to it. Never throw waste into the water.",
        "translation": "动物也需要我们的帮助。我们可以种树，为鸟儿提供安全的家。如果我们让河水保持干净，鱼儿就会重新回到河里。绝不要把垃圾扔进水里。"
      },
      {
        "text": "Healthy habits are part of a green life. Walk or ride a bike to school if your home is near. Eat more vegetables and fruit every day. These choices are good for you and for the Earth.",
        "translation": "健康的习惯也是绿色生活的一部分。如果家离学校近，就走路或骑车去上学。每天多吃蔬菜和水果。这些选择对你和地球都有好处。"
      },
      {
        "text": "Let's start with one small action this week. If everyone does a little, our world will be cleaner. Join us and make every day a Green Day!",
        "translation": "这个星期，让我们从一件小事开始。如果每个人都出一份力，我们的世界会更干净。加入我们，让每一天都成为绿色日！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which bin should we put paper and glass bottles in?",
        "audioText": "Which bin should we put paper and glass bottles in?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "The blue bin"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "The red bin"
          },
          {
            "emoji": "⚫",
            "value": "grey",
            "text": "The grey bin"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Always",
          "turn",
          "off",
          "the",
          "lights",
          "when",
          "you",
          "leave."
        ],
        "audioText": "Always turn off the lights when you leave."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Animals",
          "need",
          "our",
          "help",
          "too."
        ],
        "audioText": "Animals need our help too."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you bring your own ___, you will not need to buy drinks.",
        "choices": [
          "bottle",
          "bag",
          "book"
        ],
        "answer": "bottle",
        "audioText": "If you bring your own bottle, you will not need to buy drinks."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Walk or ride a bike to school if your home is ___.",
        "choices": [
          "near",
          "far",
          "new"
        ],
        "answer": "near",
        "audioText": "Walk or ride a bike to school if your home is near."
      }
    ]
  },
  {
    "id": "zk-r4-s02",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 2,
    "title": "Recycling Starts at Home",
    "titleCn": "垃圾分类，从家做起",
    "coverEmoji": "♻️",
    "paragraphs": [
      {
        "text": "Last week our teacher showed us a short video about rubbish. Every day our city throws away a lot of paper and plastic. If we do nothing, these piles will only grow bigger. So my classmates and I decided to start a green team.",
        "translation": "上周，老师给我们看了一段关于垃圾的短片。每天，我们的城市都会扔掉大量的纸和塑料。如果我们什么都不做，这些垃圾堆只会越来越大。于是，我和同学们决定成立一个环保小组。"
      },
      {
        "text": "Sorting waste is the first easy step. We now have three boxes in our classroom. Blue is for paper, green is for food, and red is for other waste. If you put paper in the right box, it can become something new.",
        "translation": "垃圾分类是第一步，也是最简单的一步。现在我们的教室里放了三个箱子。蓝色装纸，绿色装食物，红色装其他垃圾。如果你把纸放进正确的箱子，它就能变成新东西。"
      },
      {
        "text": "At home I do the same thing with my family. My little brother used to throw everything into one bin. Now he checks the colour before he drops his rubbish in. Please give your old clothes and books to others instead of throwing them away.",
        "translation": "在家里，我也和家人一起这样做。我弟弟以前把什么东西都扔进同一个垃圾桶里。现在他扔垃圾前会先看看颜色。请把你的旧衣服和旧书送给别人，而不要直接扔掉。"
      },
      {
        "text": "Rubbish does not only stay on land. Plastic bags often end up in rivers and then in the sea. If a turtle eats a plastic bag, it will get very sick. We should use cloth bags when we go shopping. Never drop litter on the beach.",
        "translation": "垃圾并不只留在陆地上。塑料袋常常流进河里，最后进入大海。如果一只海龟吃下塑料袋，它会病得很重。购物时我们应当使用布袋子。绝不要在海滩上乱扔垃圾。"
      },
      {
        "text": "Green action is also about how we move and eat. If your school is not far away, you can walk or ride a bike. Try to eat more vegetables and less meat. Remember to turn off the lights when you leave a room.",
        "translation": "环保行动还和我们怎样出行、怎样吃饭有关。如果学校离家不远，你可以走路或骑自行车去。试着多吃蔬菜、少吃肉。离开房间时，记得关灯。"
      },
      {
        "text": "Small habits can make a big difference over time. If each of us does one green thing every day, our city will be cleaner. Let's start today, right now!",
        "translation": "小小的习惯日积月累，就能带来很大的不同。如果我们每人每天都做一件环保小事，我们的城市会更干净。让我们从今天就开始，就从现在开始！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In their classroom, which box should paper go in?",
        "audioText": "In their classroom, which box should paper go in?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue box"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green box"
          },
          {
            "emoji": "🔴",
            "value": "red",
            "text": "Red box"
          }
        ],
        "answer": "blue"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If a turtle eats a plastic bag, it will get very ___.",
        "choices": [
          "sick",
          "happy",
          "hungry"
        ],
        "answer": "sick",
        "audioText": "If a turtle eats a plastic bag, it will get very sick."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Sorting",
          "waste",
          "is",
          "the",
          "first",
          "easy",
          "step."
        ],
        "audioText": "Sorting waste is the first easy step."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Remember to ___ off the lights when you leave a room.",
        "choices": [
          "turn",
          "take",
          "put"
        ],
        "answer": "turn",
        "audioText": "Remember to turn off the lights when you leave a room."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Never",
          "drop",
          "litter",
          "on",
          "the",
          "beach."
        ],
        "audioText": "Never drop litter on the beach."
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      }
    ]
  },
  {
    "id": "zk-r4-s03",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 3,
    "title": "Put It in the Right Bin",
    "titleCn": "把它放进正确的垃圾桶",
    "coverEmoji": "♻️",
    "paragraphs": [
      {
        "text": "Last Monday, our teacher put three new bins in our classroom. They were blue, green and grey. She told us that each bin has a different job. At first, we did not know where to put our rubbish. We just threw everything into the same bin.",
        "translation": "上周一，老师在教室里放了三个新垃圾桶。它们是蓝色、绿色和灰色的。她告诉我们，每个桶都有不同的工作。一开始，我们不知道该把垃圾放到哪里。我们只是把所有东西都扔进同一个桶里。"
      },
      {
        "text": "Then our teacher showed us a short video about waste. If you put paper in the blue bin, it can become new paper. If you put a plastic bottle in the green bin, it can be used again. Glass and metal go into the grey bin, and they can be reused too. If we mix everything together, none of it can be used again. That was the first time I understood why sorting matters.",
        "translation": "然后老师给我们看了一段关于垃圾的短片。如果你把纸放进蓝色桶，它可以变成新纸。如果你把塑料瓶放进绿色桶，它可以被再次利用。玻璃和金属放进灰色桶，它们也能被回收再利用。如果我们把所有东西混在一起，就一样也用不上了。那是我第一次明白为什么要分类。"
      },
      {
        "text": "Food waste is another big problem in our dining hall. Every day, students throw away a lot of rice and vegetables. Take only what you can eat. If you take too much food, you will leave some on your plate. A clean plate is a small green action.",
        "translation": "食物浪费是我们食堂里的另一个大问题。每天，同学们都会扔掉很多米饭和蔬菜。只拿你能吃完的量。如果你拿太多食物，你就会在盘子里剩下一些。吃干净的餐盘也是一种小小的环保行动。"
      },
      {
        "text": "Plastic bags are the worst, because they can hurt sea animals. Turtles and fish sometimes eat plastic and get very sick. You should carry your own bag when you go shopping. If we use a cloth bag, we can keep the sea cleaner. Never throw plastic into rivers or lakes.",
        "translation": "塑料袋最糟糕，因为它们会伤害海洋动物。海龟和鱼有时会吃到塑料，然后生病。购物时你应该带上自己的袋子。如果我们使用布袋，就能让海洋更干净。绝不要把塑料扔进河里或湖里。"
      },
      {
        "text": "Small habits at home can make a real difference too. Turn off the lights when you leave. Save water when you wash your hands. We must remember that the Earth is our only home. If everyone does a little, we can make a big change.",
        "translation": "家里的小习惯也能带来真正的改变。离开时关掉灯。洗手时节约用水。我们必须记住，地球是我们唯一的家。如果每个人都做一点点，我们就能带来大改变。"
      },
      {
        "text": "Now our classroom has three bins and no mixed rubbish. My classmates and I check the bins every afternoon. If you want to join us, start with one small action today. Let us keep our planet clean together.",
        "translation": "现在我们的教室有三个垃圾桶，没有混合垃圾了。我和同学们每天下午都会检查这些桶。如果你想加入我们，今天就从一个小行动开始吧。让我们一起保持地球清洁。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which bin should a plastic bottle go in?",
        "audioText": "Which bin should a plastic bottle go in?",
        "options": [
          {
            "emoji": "🟩",
            "value": "green",
            "text": "Green bin"
          },
          {
            "emoji": "🟦",
            "value": "blue",
            "text": "Blue bin"
          },
          {
            "emoji": "⬜",
            "value": "grey",
            "text": "Grey bin"
          }
        ],
        "answer": "green"
      },
      {
        "type": "word_builder",
        "word": "plastic",
        "audioText": "plastic"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Take",
          "only",
          "what",
          "you",
          "can",
          "eat."
        ],
        "audioText": "Take only what you can eat."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Turn",
          "off",
          "the",
          "lights",
          "when",
          "you",
          "leave."
        ],
        "audioText": "Turn off the lights when you leave."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you put paper in the blue bin, it can become new ___.",
        "choices": [
          "paper",
          "plastic",
          "glass"
        ],
        "answer": "paper",
        "audioText": "If you put paper in the blue bin, it can become new paper."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You should carry your own ___ when you go shopping.",
        "choices": [
          "bag",
          "bottle",
          "book"
        ],
        "answer": "bag",
        "audioText": "You should carry your own bag when you go shopping."
      }
    ]
  },
  {
    "id": "zk-r4-s04",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 4,
    "title": "Sort It Right, Save the Earth",
    "titleCn": "分好垃圾，守护地球",
    "coverEmoji": "♻️",
    "paragraphs": [
      {
        "text": "Every day, our family throws away a lot of rubbish at home. Do you know where all of it goes? If we put everything in one bin, it becomes a big problem.",
        "translation": "每天，我们家都会扔掉很多垃圾。你知道它们最后都去了哪里吗？如果我们把所有东西都丢进同一个桶里，它就会变成一个大问题。"
      },
      {
        "text": "In many cities, people now sort their rubbish into different bins. Paper, plastic, glass and old batteries each have their own home. It only takes a few seconds, but it helps a lot.",
        "translation": "在许多城市，人们现在会把垃圾分进不同的桶里。纸张、塑料、玻璃和旧电池都有自己的“家”。这只需要几秒钟，却能帮上大忙。"
      },
      {
        "text": "If you sort your rubbish well, factories can reuse the useful parts. For example, old paper can become new books again. Please rinse the bottles and boxes first.",
        "translation": "如果你把垃圾分好，工厂就能重新利用其中有用的部分。比如，旧纸可以再一次变成新书。请先把瓶子和盒子冲洗一下。"
      },
      {
        "text": "Try to carry a cloth bag when you go shopping. Say no to plastic bags. Use fewer plastic bottles too. Remember that the best rubbish is the rubbish we never make.",
        "translation": "去购物时尽量带一个布袋。对塑料袋说不。也少用一些塑料瓶。记住：最好的垃圾，就是我们从未制造出来的垃圾。"
      },
      {
        "text": "Saving the Earth is also good for animals and plants. If we keep rivers and parks clean, birds and fish can live safely. Don't leave your litter in the park after your picnic.",
        "translation": "保护地球对动物和植物也有好处。如果我们让河流和公园保持干净，鸟儿和鱼儿就能安全地生活。野餐之后，不要把垃圾留在公园里。"
      },
      {
        "text": "You can also live a healthier life and help the planet. Walk or ride a bike to school if your home is near. Start today, and our city will be cleaner and greener tomorrow.",
        "translation": "你还可以在过上更健康生活的同时帮助地球。如果家离得近，就走路或骑车去上学。从今天开始，我们的城市明天会更干净、更绿。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, what can become new books again?",
        "audioText": "According to the text, what can become new books again?",
        "options": [
          {
            "emoji": "📄",
            "value": "paper",
            "text": "Paper"
          },
          {
            "emoji": "🔋",
            "value": "batteries",
            "text": "Old batteries"
          },
          {
            "emoji": "🥛",
            "value": "glass",
            "text": "Glass"
          }
        ],
        "answer": "paper"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we ___ everything in one bin, it becomes a big problem.",
        "choices": [
          "put",
          "puts",
          "putting"
        ],
        "answer": "put",
        "audioText": "If we put everything in one bin, it becomes a big problem."
      },
      {
        "type": "word_builder",
        "word": "reuse",
        "audioText": "reuse"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Say",
          "no",
          "to",
          "plastic",
          "bags."
        ],
        "audioText": "Say no to plastic bags."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You can also live a healthier life and ___ the planet.",
        "choices": [
          "help",
          "helps",
          "helping"
        ],
        "answer": "help",
        "audioText": "You can also live a healthier life and help the planet."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Please",
          "rinse",
          "the",
          "bottles",
          "and",
          "boxes",
          "first."
        ],
        "audioText": "Please rinse the bottles and boxes first."
      }
    ]
  },
  {
    "id": "zk-r4-s05",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 5,
    "title": "Waste Less, Live Better",
    "titleCn": "少一点浪费，生活更美好",
    "coverEmoji": "♻️",
    "paragraphs": [
      {
        "text": "Every day, our school throws away a lot of rubbish. Do you know where it all goes? Most of it goes to a big place outside the city.",
        "translation": "每天，我们学校都会扔掉很多垃圾。你知道它们最后都去哪儿了吗？大部分都运到了城外一个很大的地方。"
      },
      {
        "text": "If we sort our rubbish, we can help the Earth. Put paper and boxes in the blue bin. Glass bottles should go in the green bin. Old food and fruit skins go in the brown bin.",
        "translation": "如果我们把垃圾分好类，就能帮助地球。把纸张和纸盒放进蓝色垃圾桶。玻璃瓶应该放进绿色垃圾桶。剩饭和果皮放进棕色垃圾桶。"
      },
      {
        "text": "Why should we do this? If we mix all the rubbish together, it is hard to use again. If we sort it well, it can become new things. Old paper can turn into new books and boxes.",
        "translation": "我们为什么要这样做呢？如果把所有垃圾混在一起，就很难再被利用。如果分得好，垃圾可以变成新东西。旧纸张能变成新书和新纸盒。"
      },
      {
        "text": "Rubbish also hurts animals in the sea. Some sea animals think plastic bags are food and eat them. If we use less plastic, fewer animals will get hurt. Never drop plastic bags on the beach.",
        "translation": "垃圾也会伤害海里的动物。有些海洋动物以为塑料袋是食物，就把它们吃掉。如果我们少用塑料，受伤的动物就会更少。千万不要把塑料袋扔在海滩上。"
      },
      {
        "text": "There is more we can do at home and at school. Walk or ride a bike to school. Bring your own water bottle and lunch box. If everyone does these things, our city will be a better place.",
        "translation": "在家里和学校，我们还能做更多的事。走路或骑自行车去上学。带上自己的水杯和饭盒。如果每个人都这样做，我们的城市会变得更美好。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which bin should glass bottles go in?",
        "audioText": "Which bin should glass bottles go in?",
        "options": [
          {
            "emoji": "🔵",
            "value": "blue",
            "text": "Blue bin"
          },
          {
            "emoji": "🟢",
            "value": "green",
            "text": "Green bin"
          },
          {
            "emoji": "🟤",
            "value": "brown",
            "text": "Brown bin"
          }
        ],
        "answer": "green"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Put",
          "paper",
          "and",
          "boxes",
          "in",
          "the",
          "blue",
          "bin."
        ],
        "audioText": "Put paper and boxes in the blue bin."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Walk",
          "or",
          "ride",
          "a",
          "bike",
          "to",
          "school."
        ],
        "audioText": "Walk or ride a bike to school."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we ___ our rubbish, we can help the Earth.",
        "choices": [
          "sort",
          "sorts",
          "sorting"
        ],
        "answer": "sort",
        "audioText": "If we sort our rubbish, we can help the Earth."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Never ___ plastic bags on the beach.",
        "choices": [
          "drop",
          "drops",
          "dropping"
        ],
        "answer": "drop",
        "audioText": "Never drop plastic bags on the beach."
      }
    ]
  },
  {
    "id": "zk-r4-s06",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 6,
    "title": "Our Plastic-Free Lunch Day",
    "titleCn": "我们的无塑料午餐日",
    "coverEmoji": "🍱",
    "paragraphs": [
      {
        "text": "Last Friday, our school had a special day called Plastic-Free Lunch Day. All the students and teachers joined it with great interest. We wanted to use less plastic for one whole day.",
        "translation": "上周五，我们学校举办了一个特别的活动，叫“无塑料午餐日”。全校师生都兴致勃勃地参加了。我们想整整一天都少用塑料。"
      },
      {
        "text": "A few days before, our teacher told us what to bring. She said, \"If you bring your own box, you will make less rubbish.\" \"Please bring a cloth bag and a glass bottle to school.\" If everyone does this, our school will be much cleaner.",
        "translation": "活动前几天，老师告诉我们要带些什么。她说：“如果你自己带饭盒，产生的垃圾就会更少。”“请带一个布袋和一个玻璃瓶来学校。”如果每个人都这样做，我们的学校会干净得多。"
      },
      {
        "text": "On Friday morning, I put rice and vegetables in my lunch box. My classmate Li Ming brought a glass bottle of water. We did not use any plastic bags or paper cups that day.",
        "translation": "星期五早上，我把米饭和蔬菜装进了自己的饭盒。我的同学李明带了一个玻璃水瓶。那天我们没有用任何塑料袋或纸杯。"
      },
      {
        "text": "At lunch time, we saw how much rubbish we made in one day. Usually, our school produces three big bags of plastic every day. But that Friday, we had only one small bag of rubbish. If we keep trying, we can reduce a lot of waste.",
        "translation": "午饭时，我们看到了自己一天产生了多少垃圾。平时，我们学校每天都会产生三大袋塑料垃圾。但那个星期五，我们只有一小袋垃圾。如果我们继续努力，就能减少很多浪费。"
      },
      {
        "text": "Our teacher said we should keep this habit every day. We can also save water and turn off the lights. If you care about the Earth, start with small habits. Do not wait for other people to begin.",
        "translation": "老师说，我们应该每天保持这个习惯。我们还可以节约用水、随手关灯。如果你关心地球，就从小的习惯开始。不要等着别人先行动。"
      },
      {
        "text": "Now my family takes cloth bags when we go shopping. We also use fewer plastic bottles at home. If we all work together, our world will be green and clean.",
        "translation": "现在，我家人去买东西时会带上布袋。我们在家也少用塑料瓶了。如果我们一起努力，我们的世界将会绿色又干净。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the students use to carry their lunch on that day?",
        "audioText": "What did the students use to carry their lunch on that day?",
        "options": [
          {
            "emoji": "🍱",
            "value": "box",
            "text": "A lunch box"
          },
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "A plastic bag"
          },
          {
            "emoji": "🥤",
            "value": "cup",
            "text": "A paper cup"
          }
        ],
        "answer": "box"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Do",
          "not",
          "wait",
          "for",
          "other",
          "people",
          "to",
          "begin"
        ],
        "audioText": "Do not wait for other people to begin."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "also",
          "use",
          "fewer",
          "plastic",
          "bottles",
          "at",
          "home"
        ],
        "audioText": "We also use fewer plastic bottles at home."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you bring your own box, you ___ make less rubbish.",
        "choices": [
          "will",
          "are",
          "do"
        ],
        "answer": "will",
        "audioText": "If you bring your own box, you will make less rubbish."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "We can also save water and ___ off the lights.",
        "choices": [
          "turn",
          "turns",
          "turning"
        ],
        "answer": "turn",
        "audioText": "We can also save water and turn off the lights."
      }
    ]
  },
  {
    "id": "zk-r4-s07",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 7,
    "title": "Bring Your Own Bottle",
    "titleCn": "带上自己的水杯",
    "coverEmoji": "🚰",
    "paragraphs": [
      {
        "text": "Every day, people around the world buy millions of plastic bottles. We drink the water quickly and throw the empty bottle away. Many bottles end up in rivers, and some of them reach the sea. If we keep doing this, our beautiful planet will be in trouble.",
        "translation": "每天，世界各地的人们都会买下数百万个塑料瓶。我们把水很快喝完，就把空瓶子扔掉。很多瓶子最后流进了河里，有些还会漂到大海。如果我们继续这样做，我们美丽的星球就会陷入麻烦。"
      },
      {
        "text": "Sea animals sometimes mistake plastic for food, and this can hurt them. Turtles and fish may eat small pieces of plastic every day. If you love animals, please think before you buy a bottle. You can help them with one small change in your life.",
        "translation": "海洋动物有时会把塑料误当成食物，这会伤害它们。海龟和鱼每天可能都会吃下小片塑料。如果你喜欢动物，买瓶子之前请先想一想。只要在生活中做一点小小的改变，你就能帮到它们。"
      },
      {
        "text": "A bottle you can use again is a simple answer. Fill it with clean water at home. If you carry your own bottle, you will save money every week. You will also drink more water, so your body stays healthy.",
        "translation": "一个可以重复使用的瓶子，就是一个简单的解决办法。在家把它装满干净的水。如果你随身带着自己的水杯，每周都能省下一些钱。你还会喝更多的水，身体也会更健康。"
      },
      {
        "text": "Some students say they often forget to bring their bottle. Put it in your bag before bed, next to your books. If you see a friend with a plastic bottle, share this idea. Tell them kindly, and they may join you tomorrow.",
        "translation": "有些同学说，他们常常忘记带自己的水杯。睡觉前把它放进书包，挨着你的书。如果你看到朋友手里拿着塑料瓶，就把这个主意告诉他。友善地跟他们说，他们明天也许就会和你一起做。"
      },
      {
        "text": "Small habits can grow into big changes for our shared home. Say no to plastic waste. Bring your own bottle every day, and the sea will be cleaner. If we all work together, our planet will thank us. Let's start today, because our home needs our help now.",
        "translation": "小小的习惯，能长成影响我们共同家园的大改变。对塑料垃圾说不。每天带上自己的水杯，大海就会更干净。如果我们一起努力，我们的星球会感谢我们。让我们从今天开始吧，因为我们的家现在就需要我们的帮助。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What can hurt sea animals?",
        "audioText": "What can hurt sea animals?",
        "options": [
          {
            "emoji": "🧴",
            "value": "plastic",
            "text": "Plastic"
          },
          {
            "emoji": "💧",
            "value": "water",
            "text": "Clean water"
          },
          {
            "emoji": "🌊",
            "value": "sea",
            "text": "The sea"
          }
        ],
        "answer": "plastic"
      },
      {
        "type": "word_builder",
        "word": "bottle",
        "audioText": "bottle"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Fill",
          "it",
          "with",
          "clean",
          "water",
          "at",
          "home"
        ],
        "audioText": "Fill it with clean water at home."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you carry your own bottle, you ___ save money every week.",
        "choices": [
          "will",
          "are",
          "do"
        ],
        "answer": "will",
        "audioText": "If you carry your own bottle, you will save money every week."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Say",
          "no",
          "to",
          "plastic",
          "waste"
        ],
        "audioText": "Say no to plastic waste."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You can help them ___ one small change in your life.",
        "choices": [
          "with",
          "for",
          "of"
        ],
        "answer": "with",
        "audioText": "You can help them with one small change in your life."
      }
    ]
  },
  {
    "id": "zk-r4-s08",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 8,
    "title": "Pack a Green Lunch",
    "titleCn": "带一份绿色午餐",
    "coverEmoji": "🍱",
    "paragraphs": [
      {
        "text": "At twelve o'clock, the school dining hall becomes very busy. Hundreds of students open their lunch boxes at the same time. But after lunch, look at the bins near the door. They are full of plastic bags, paper cups and half-eaten food.",
        "translation": "十二点一到，学校食堂就变得非常热闹。成百上千的学生同时打开饭盒。可午饭之后，看看门口那几个垃圾桶吧——里面塞满了塑料袋、纸杯和只吃了一半的食物。"
      },
      {
        "text": "If you bring your own lunch box, you can cut down a lot of waste. A strong box can be washed and used again and again. Choose one made of glass or metal if you can. Then you will never need a paper box from the shop.",
        "translation": "如果你自己带饭盒，就能少产生很多垃圾。结实的饭盒可以洗一洗反复使用。如果可以，就选玻璃或金属做的饭盒。这样你就再也不需要店里的一次性纸盒了。"
      },
      {
        "text": "Food waste is a big problem too. If you take only what you can eat, you will not throw food away. Put a small amount of rice on your plate first. You can always go back for more if you are still hungry. Never leave food in your bowl. It is a waste of water and land.",
        "translation": "食物浪费也是个大问题。如果你只盛自己吃得完的量，就不会把食物扔掉。先往盘子里盛一点点米饭。要是还饿，你随时可以再去添。千万别剩饭——那是在浪费水和土地。"
      },
      {
        "text": "Drinks are easy to fix. Bring a water bottle from home and fill it at school. If you buy one bottle a day, you use two hundred a year. So do not buy sweet drinks in plastic bottles. Water is better for you and for the planet.",
        "translation": "喝的问题很好解决。从家里带个水壶，在学校接满水。如果每天买一瓶，一年就要用掉两百瓶。所以别买塑料瓶装的甜饮料。水对你的身体和地球都更好。"
      },
      {
        "text": "A green lunch is also good for your body. Put some vegetables and fruit in your box every day. If you eat slowly, you will feel full with less food. Try to finish your meal with a friend and talk about your day.",
        "translation": "绿色午餐对你的身体也有好处。每天在饭盒里放些蔬菜和水果。如果吃得慢一些，你会用更少的食物就感到饱。试着和朋友一起吃完午饭，聊聊你们的一天。"
      },
      {
        "text": "Every lunch time gives you a chance to help the Earth. If we all bring our own boxes and bottles, our school will make much less waste. So start tomorrow: pack a green lunch, and ask your friends to do the same.",
        "translation": "每一顿午餐都是你帮助地球的机会。如果大家都带上自己的饭盒和水壶，学校产生的垃圾就会少得多。那就从明天开始吧：装一份绿色午餐，再叫上朋友们一起做。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What is the best way to make less waste at lunch time?",
        "audioText": "What is the best way to make less waste at lunch time?",
        "options": [
          {
            "emoji": "🍱",
            "value": "box",
            "text": "Bring your own lunch box"
          },
          {
            "emoji": "🥡",
            "value": "paper",
            "text": "Buy a paper box every day"
          },
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "Use a new plastic bag"
          }
        ],
        "answer": "box"
      },
      {
        "type": "word_builder",
        "word": "waste",
        "audioText": "waste"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Food",
          "waste",
          "is",
          "a",
          "big",
          "problem",
          "too."
        ],
        "audioText": "Food waste is a big problem too."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Drinks",
          "are",
          "easy",
          "to",
          "fix."
        ],
        "audioText": "Drinks are easy to fix."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you take only what you can ___, you will not throw food away.",
        "choices": [
          "eat",
          "buy",
          "cook"
        ],
        "answer": "eat",
        "audioText": "If you take only what you can eat, you will not throw food away."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Bring a water ___ from home and fill it at school.",
        "choices": [
          "bottle",
          "box",
          "bag"
        ],
        "answer": "bottle",
        "audioText": "Bring a water bottle from home and fill it at school."
      }
    ]
  },
  {
    "id": "zk-r4-s09",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 9,
    "title": "Less Plastic, More Life",
    "titleCn": "塑料少一点，生命多一点",
    "coverEmoji": "🐢",
    "paragraphs": [
      {
        "text": "Last week our science teacher showed us a short video about sea animals. In the video, a turtle could not swim away from a plastic bag. We felt sad and wanted to do something useful.",
        "translation": "上周，我们的科学老师给我们看了一段关于海洋动物的短视频。视频里，一只海龟被塑料袋缠住，怎么也游不开。我们心里很难过，想做一些有用的事。"
      },
      {
        "text": "If we use fewer plastic bags, fewer animals will get hurt. You should take a cloth bag when you go shopping. Remember to say no to plastic forks and cups at the restaurant.",
        "translation": "如果我们少用一些塑料袋，受伤的动物就会更少。去购物时，你应该带一个布袋子。在餐馆里，记得对塑料叉子和塑料杯说“不”。"
      },
      {
        "text": "At school, we started a green group to sort our rubbish. Put paper and bottles in the blue bin. If you are not sure, ask the group leader for help.",
        "translation": "在学校，我们成立了一个环保小组来给垃圾分类。把纸张和瓶子放进蓝色垃圾桶。如果你不确定，就问小组长。"
      },
      {
        "text": "Being green is also about living a healthy life. Ride a bike or walk to school if your home is not far. You should carry your own bottle instead of buying drinks.",
        "translation": "环保也意味着过健康的生活。如果家离得不远，就骑车或走路去上学。你应该带上自己的水杯，而不是去买饮料喝。"
      },
      {
        "text": "We also built a small garden behind our classroom. Bees and birds visit it every morning. If we plant more flowers, more small animals will find a home. Never throw rubbish into the garden.",
        "translation": "我们还在教室后面建了一个小花园。每天早晨，蜜蜂和小鸟都会来拜访。如果我们种下更多的花，就会有更多小动物找到家。千万不要往花园里扔垃圾。"
      },
      {
        "text": "Small choices can make a big difference, so start today. If everyone does one green thing, our world will be better. Join us and build a cleaner, greener future together.",
        "translation": "小小的选择也能带来大大的改变，所以从今天就开始吧。如果每个人都做一件环保的事，我们的世界会变得更好。加入我们，一起建设一个更干净、更绿色的未来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which thing hurt the sea turtle in the video?",
        "audioText": "Which thing hurt the sea turtle in the video?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "plastic",
            "text": "A plastic bag"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A fish"
          },
          {
            "emoji": "🌊",
            "value": "water",
            "text": "Sea water"
          }
        ],
        "answer": "plastic"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Put",
          "paper",
          "and",
          "bottles",
          "in",
          "the",
          "blue",
          "bin."
        ],
        "audioText": "Put paper and bottles in the blue bin."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Bees",
          "and",
          "birds",
          "visit",
          "it",
          "every",
          "morning."
        ],
        "audioText": "Bees and birds visit it every morning."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "You ___ take a cloth bag when you go shopping.",
        "choices": [
          "should",
          "shouldn't",
          "can't"
        ],
        "answer": "should",
        "audioText": "You should take a cloth bag when you go shopping."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we plant more flowers, more small animals will find a ___.",
        "choices": [
          "home",
          "school",
          "game"
        ],
        "answer": "home",
        "audioText": "If we plant more flowers, more small animals will find a home."
      }
    ]
  },
  {
    "id": "zk-r4-s10",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 10,
    "title": "Our Green Weekend",
    "titleCn": "我们的绿色周末",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Our school Green Club has a big plan for this Saturday. We put the plan on the classroom board on Friday. If you want to join us, come to the school gate at eight.",
        "translation": "我们学校的绿色俱乐部这周六有个大计划。我们周五把计划写在了教室的黑板上。如果你想加入我们，八点到学校门口来。"
      },
      {
        "text": "At nine, we will start work in the small park. Please wear old clothes and bring a pair of gloves. If we pick up the rubbish together, the park will look much better.",
        "translation": "九点钟，我们会在小公园里开始劳动。请穿上旧衣服，再带上一副手套。如果我们一起把垃圾捡起来，公园会漂亮很多。"
      },
      {
        "text": "Then we should put paper, glass and plastic into different bags. If you are not sure where to put something, just ask. Never mix food waste with bottles or cans. They go to different bins.",
        "translation": "然后，我们应该把纸、玻璃和塑料装进不同的袋子里。如果你不确定某样东西该放哪儿，问一下就好。千万不要把厨余垃圾和瓶瓶罐罐混在一起，它们要去不同的垃圾桶。"
      },
      {
        "text": "At noon, we will sit on the grass and eat a simple lunch. Please bring your own bottle and a box for your food. If everyone brings a bottle, we will not need any paper cups.",
        "translation": "中午，我们会坐在草地上吃一顿简单的午餐。请带上自己的水杯和装食物的小盒子。如果每个人都自带水杯，我们就用不着纸杯了。"
      },
      {
        "text": "In the afternoon, we will plant ten young trees by the lake. Birds can build their homes in those trees next spring. If you give the trees enough water, they will grow tall and strong.",
        "translation": "下午，我们会在湖边种十棵小树。明年春天，鸟儿可以在这些树上安家。如果你给树浇足够的水，它们会长得又高又壮。"
      },
      {
        "text": "Come by bike or on foot. Leave the car at home. If we walk more, the air will be cleaner and we will be healthier. A green weekend is good for the Earth and for us.",
        "translation": "骑自行车或步行来吧，把车留在家里。如果我们多走路，空气会更干净，我们也会更健康。一个绿色的周末，对地球好，对我们也好。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What should students bring to the park?",
        "audioText": "What should students bring to the park?",
        "options": [
          {
            "emoji": "🧤",
            "value": "gloves",
            "text": "Gloves"
          },
          {
            "emoji": "🎒",
            "value": "bag",
            "text": "A school bag"
          },
          {
            "emoji": "🍔",
            "value": "burger",
            "text": "A hamburger"
          }
        ],
        "answer": "gloves"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Never",
          "mix",
          "food",
          "waste",
          "with",
          "bottles",
          "or",
          "cans."
        ],
        "audioText": "Never mix food waste with bottles or cans."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Come",
          "by",
          "bike",
          "or",
          "on",
          "foot."
        ],
        "audioText": "Come by bike or on foot."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we pick up the rubbish together, the park ___ look much better.",
        "choices": [
          "will",
          "was",
          "did"
        ],
        "answer": "will",
        "audioText": "If we pick up the rubbish together, the park will look much better."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "A green weekend is good for the Earth and for ___.",
        "choices": [
          "us",
          "we",
          "our"
        ],
        "answer": "us",
        "audioText": "A green weekend is good for the Earth and for us."
      }
    ]
  },
  {
    "id": "zk-r4-s11",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 11,
    "title": "Join Our Green Week",
    "titleCn": "加入我们的绿色周",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Next Monday, our school will start a Green Week for everyone. If you want to help the Earth, please join us. We have five simple activities, and each one is easy to try. You do not need money or special tools to take part.",
        "translation": "下周一，我们学校将启动面向所有人的“绿色周”。如果你想为地球出一份力，请加入我们。我们有五项简单的活动，每一项都很容易尝试。你不需要花钱，也不需要特别的工具就能参与。"
      },
      {
        "text": "On Monday, we will walk or ride a bike to school. If your home is not far, please leave the car at home. Cars make our air dirty, and the smoke is bad for us. When we walk, we also get some good exercise.",
        "translation": "周一，我们将步行或骑自行车上学。如果你家离得不远，请把汽车留在家里。汽车让我们的空气变脏，尾气对我们也有害。走路的时候，我们还能顺便锻炼一下身体。"
      },
      {
        "text": "On Tuesday, we will save water in the school kitchen. Turn off the tap when you are not using it. If you see a tap running, please close it at once. Every drop of water is useful, so do not waste it.",
        "translation": "周二，我们将在学校厨房里节约用水。不用水的时候，请关掉水龙头。如果你看到水龙头一直流着水，请马上关掉它。每一滴水都很有用，所以不要浪费它。"
      },
      {
        "text": "On Wednesday, we will plant small trees near the school gate. Trees give us clean air and cool shade in summer. If we plant them now, they will grow strong in a few years. Later, birds will build their homes in the green leaves.",
        "translation": "周三，我们将在校门附近种下小树。树木给我们带来干净的空气和夏日里的阴凉。如果我们现在种下它们，几年后它们会长得又高又壮。以后，鸟儿会在绿叶间筑巢。"
      },
      {
        "text": "On Thursday, we should eat more vegetables and less meat at lunch. Try some fresh food that grows near your home. If we buy food from nearby farms, we save energy on the road. It is good for your body and for the planet.",
        "translation": "周四，我们午餐应该多吃蔬菜、少吃肉。尝一尝你家附近出产的新鲜食物吧。如果我们购买附近农场的食物，就能在路上节省能源。这对你的身体和地球都有好处。"
      },
      {
        "text": "On Friday, we will clean the small park and watch the birds. Please pick up the rubbish. Put it in the right bin. If everyone does one small thing, the world will be much better. We should start today, not tomorrow.",
        "translation": "周五，我们将打扫小公园，并观察鸟儿。请把垃圾捡起来。把它放进正确的垃圾桶。如果每个人都做一件小事，世界就会好得多。我们应该从今天开始，而不是明天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What will students do on Monday?",
        "audioText": "What will students do on Monday?",
        "options": [
          {
            "emoji": "🚶",
            "value": "walk",
            "text": "Walk or ride a bike"
          },
          {
            "emoji": "🚗",
            "value": "car",
            "text": "Go to school by car"
          },
          {
            "emoji": "✈️",
            "value": "plane",
            "text": "Fly to school"
          }
        ],
        "answer": "walk"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Please",
          "pick",
          "up",
          "the",
          "rubbish."
        ],
        "audioText": "Please pick up the rubbish."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If you ___ a tap running, please close it at once.",
        "choices": [
          "see",
          "seeing",
          "saw"
        ],
        "answer": "see",
        "audioText": "If you see a tap running, please close it at once."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "should",
          "start",
          "today,",
          "not",
          "tomorrow."
        ],
        "audioText": "We should start today, not tomorrow."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "When we walk, we also get some good ___.",
        "choices": [
          "exercise",
          "food",
          "sleep"
        ],
        "answer": "exercise",
        "audioText": "When we walk, we also get some good exercise."
      }
    ]
  },
  {
    "id": "zk-r4-s12",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 12,
    "title": "Give Old Clothes a Second Life",
    "titleCn": "给旧衣服第二次生命",
    "coverEmoji": "👕",
    "paragraphs": [
      {
        "text": "Look at your clothes before you go shopping. Many of us keep clothes we never wear. If you find a shirt that is too small, do not throw it away. Someone else may need it, and it can still be useful.",
        "translation": "买东西之前，先看看自己已有的衣服。我们很多人留着从来不穿的衣服。如果你发现一件衬衫太小了，不要把它扔掉。别人可能正需要它，它仍然有用。"
      },
      {
        "text": "Every year, people throw away millions of tons of clothes. These clothes sit in rubbish dumps and take many years to break down. If we throw away less, we save land and water. Making new clothes also uses a lot of energy.",
        "translation": "每年，人们扔掉成百上千万吨的衣服。这些衣服堆在垃圾场里，要很多年才能分解。如果我们少扔一些，就能省下土地和水。制作新衣服也要消耗大量能源。"
      },
      {
        "text": "So what can you do? First, sort your clothes into three groups: keep, give away and repair. If a button falls off, you can fix it yourself. Take your old clothes to a clothes bank near your home. You can also give them to a younger cousin or a friend.",
        "translation": "那你能做些什么呢？首先，把衣服分成三类：留下、送人和修补。如果纽扣掉了，你可以自己把它修好。把旧衣服送到离家不远的旧衣回收点。你也可以把它们送给表弟表妹或朋友。"
      },
      {
        "text": "Some shops collect old clothes and give you a small gift. Ask your parents before you take anything there. If you are not sure where to go, ask your teacher or search online. Remember to wash the clothes before you give them away.",
        "translation": "有些商店会回收旧衣服，还会送你一份小礼物。去之前先问问父母。如果你不确定该去哪儿，可以问问老师，或者上网查一查。记得把衣服洗干净再送出去。"
      },
      {
        "text": "Old clothes can also become something new. You can cut an old T-shirt into a bag for shopping. If you use it every week, you will need fewer plastic bags. Small actions like these keep our city clean and green.",
        "translation": "旧衣服也能变成新东西。你可以把旧T恤剪成购物袋。如果你每周都用它，就能少用一些塑料袋。像这样的小行动能让我们的城市干净又环保。"
      },
      {
        "text": "Start today. Choose five things you no longer wear. Then find a new home for them. If everyone does this, we will waste less and help the Earth. Let us give our old clothes a second life!",
        "translation": "从今天开始吧。挑出五件你不再穿的衣服。然后给它们找个新家。如果每个人都这样做，我们就能少浪费，也能帮助地球。让我们给旧衣服第二次生命！"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What can you make from an old T-shirt, according to the text?",
        "audioText": "What can you make from an old T-shirt, according to the text?",
        "options": [
          {
            "emoji": "🛍️",
            "value": "bag",
            "text": "A shopping bag"
          },
          {
            "emoji": "🧦",
            "value": "socks",
            "text": "A pair of socks"
          },
          {
            "emoji": "🧢",
            "value": "hat",
            "text": "A winter hat"
          }
        ],
        "answer": "bag"
      },
      {
        "type": "word_builder",
        "word": "repair",
        "audioText": "repair"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Then",
          "find",
          "a",
          "new",
          "home",
          "for",
          "them"
        ],
        "audioText": "Then find a new home for them."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Old",
          "clothes",
          "can",
          "also",
          "become",
          "something",
          "new"
        ],
        "audioText": "Old clothes can also become something new."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we throw away ___, we save land and water.",
        "choices": [
          "less",
          "more",
          "many"
        ],
        "answer": "less",
        "audioText": "If we throw away less, we save land and water."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If everyone ___ this, we will waste less and help the Earth.",
        "choices": [
          "do",
          "does",
          "doing"
        ],
        "answer": "does",
        "audioText": "If everyone does this, we will waste less and help the Earth."
      }
    ]
  },
  {
    "id": "zk-r4-s13",
    "track": "zhongkao",
    "regionId": "zk-r4",
    "order": 13,
    "title": "Save Energy, Save Tomorrow",
    "titleCn": "省下能源，点亮明天",
    "coverEmoji": "🌱",
    "paragraphs": [
      {
        "text": "Last month our school Green Club started a new plan. We want to save energy at home and at school. It is not hard, and everyone can join us.",
        "translation": "上个月，我们学校的绿色社团开始了一项新计划。我们想在家里和学校节约能源。这件事并不难，每个人都能加入我们。"
      },
      {
        "text": "First, look around your room. If you leave a room, turn off the lights and the fan. If the sun is bright, you can read near the window. Good habits can save a lot of energy.",
        "translation": "首先，看看你的房间。如果你离开房间，就关掉电灯和风扇。如果阳光很亮，你可以靠窗看书。好习惯能省下很多能源。"
      },
      {
        "text": "Second, think about how you go to school. If your school is near, walk or ride a bike. You will get fresh air and good exercise every day. If you take a bus, you help keep the air clean.",
        "translation": "其次，想一想你怎样去上学。如果学校很近，就步行或者骑自行车。这样你每天都能呼吸新鲜空气，还能得到很好的锻炼。如果你坐公交车，你也帮助保持了空气的清洁。"
      },
      {
        "text": "Third, do not forget the animals around us. If you find a bird's nest in a tree, never touch it. Keep your cat inside at night. Every small animal needs a safe and quiet home.",
        "translation": "第三，别忘了我们身边的动物。如果你在树上发现鸟巢，千万不要碰它。晚上把猫留在家里。每一只小动物都需要一个安全又安静的家。"
      },
      {
        "text": "Some students say, \"I am only one person. What can I do?\" You can do a lot. You should tell your family about your ideas. You can turn off the computer when you finish your homework.",
        "translation": "有些同学说：“我只是一个人。我能做什么呢？”你能做的可多了。你应该把自己的想法告诉家人。做完作业以后，你可以把电脑关掉。"
      },
      {
        "text": "If we all do these things, our city will be cleaner and greener. Let's start today. Small steps today can build a better tomorrow.",
        "translation": "如果我们都这样做，我们的城市会变得更干净、更绿。让我们从今天开始吧。今天的小小一步，可以建设一个更好的明天。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "If you leave a room, what should you do?",
        "audioText": "If you leave a room, what should you do?",
        "options": [
          {
            "emoji": "💡",
            "value": "lights_off",
            "text": "Turn off the lights"
          },
          {
            "emoji": "🪟",
            "value": "open_window",
            "text": "Open the window"
          },
          {
            "emoji": "📺",
            "value": "tv_on",
            "text": "Turn on the TV"
          }
        ],
        "answer": "lights_off"
      },
      {
        "type": "word_builder",
        "word": "energy",
        "audioText": "energy"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Turn",
          "off",
          "the",
          "lights",
          "and",
          "the",
          "fan."
        ],
        "audioText": "Turn off the lights and the fan."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "You",
          "should",
          "tell",
          "your",
          "family",
          "about",
          "your",
          "ideas."
        ],
        "audioText": "You should tell your family about your ideas."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If we all do these things, our city will be cleaner and ___.",
        "choices": [
          "greener",
          "green",
          "greenest"
        ],
        "answer": "greener",
        "audioText": "If we all do these things, our city will be cleaner and greener."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If your school is near, ___ or ride a bike.",
        "choices": [
          "walk",
          "walking",
          "walks"
        ],
        "answer": "walk",
        "audioText": "If your school is near, walk or ride a bike."
      }
    ]
  },
  {
    "id": "zk-r5-s01",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 1,
    "title": "The Girl Who Fixes Bikes",
    "titleCn": "修自行车的女孩",
    "coverEmoji": "🚲",
    "paragraphs": [
      {
        "text": "Amy is a fourteen-year-old girl who lives in a small town in Yunnan. She loves riding her bike to school along the river every morning. On her way, she often sees some broken bikes lying beside the road. She feels sad because a few children in her town have no bikes at all.",
        "translation": "Amy 是一个住在云南小镇上的十四岁女孩。她喜欢每天早上沿着河边骑自行车去上学。在路上，她常常看到一些坏掉的自行车躺在路边。她心里很难过，因为她镇上有些孩子根本没有自行车。"
      },
      {
        "text": "One day, she asked her father, who worked in a bike shop, for help. He taught her how to repair a wheel and a broken chain carefully. After that, Amy began to collect old bikes from her neighbors. She cleaned them and repaired them. Then she gave the bikes to the children who really needed them.",
        "translation": "一天，她向在自行车店工作的爸爸求助。爸爸耐心地教她怎样修车轮和断掉的链条。从那以后，Amy 开始从邻居那里收集旧自行车。她把车子擦干净，再修好。然后她把自行车送给真正需要它们的孩子们。"
      },
      {
        "text": "By the end of last year, she had fixed more than fifty old bikes. Some of them were so old that they looked like rubbish. But after Amy's careful work, they shone like new ones again. The children who got the bikes smiled happily and rode away.",
        "translation": "到去年年底，她已经修好了五十多辆旧自行车。其中一些太旧了，看起来就像一堆垃圾。但在 Amy 的细心修理之后，它们又变得像新的一样闪闪发亮。得到自行车的孩子们开心地笑着骑走了。"
      },
      {
        "text": "Amy's wonderful story spread quickly through the small town last spring. A local newspaper wrote a long article which called her 'the bike angel'. More and more people joined her. They brought old bikes, tools and even some money to help her.",
        "translation": "去年春天，Amy 的暖心故事很快传遍了整个小镇。当地一家报纸写了一篇长文，称她为“自行车天使”。越来越多的人加入了她。他们带来旧自行车、工具，甚至一些钱来帮助她。"
      },
      {
        "text": "Amy says that she is not a hero at all. She just wants every child in her town to have a bike. 'When I see them riding to school, I feel really happy,' she says. Her small but warm action has changed many lives in her town.",
        "translation": "Amy 说，她根本算不上什么英雄。她只是想让镇上的每个孩子都有一辆自行车。“当我看到他们骑车去上学时，我真的很快乐，”她说。她这个小小却温暖的举动，改变了她镇上许多人的生活。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does Amy give to the children in her town?",
        "audioText": "What does Amy give to the children in her town?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "Bikes"
          },
          {
            "emoji": "📚",
            "value": "books",
            "text": "Books"
          },
          {
            "emoji": "⚽",
            "value": "balls",
            "text": "Balls"
          }
        ],
        "answer": "bike"
      },
      {
        "type": "word_builder",
        "word": "repair",
        "audioText": "repair"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "By the end of last year, she ___ more than fifty old bikes.",
        "choices": [
          "had fixed",
          "was fixing",
          "has fixed"
        ],
        "answer": "had fixed",
        "audioText": "By the end of last year, she had fixed more than fifty old bikes."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "One day, she asked her father, ___ worked in a bike shop, for help.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "One day, she asked her father, who worked in a bike shop, for help."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "She",
          "cleaned",
          "them",
          "and",
          "repaired",
          "them."
        ],
        "audioText": "She cleaned them and repaired them."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "More",
          "and",
          "more",
          "people",
          "joined",
          "her."
        ],
        "audioText": "More and more people joined her."
      }
    ]
  },
  {
    "id": "zk-r5-s02",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 2,
    "title": "The Boy Who Shared His Books",
    "titleCn": "分享图书的男孩",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "Lin Hao was a middle school student who lived in a small mountain village. He loved reading and had read almost every book in his school. But the village had no library. Most children there had nothing to read at home.",
        "translation": "林浩是一个住在小山村里的中学生。他非常爱读书，几乎读遍了学校里的每一本书。可是村里没有图书馆，那里的大多数孩子在家里没有书可读。"
      },
      {
        "text": "One summer, he found a box of old books which his cousin had left behind. He began to think about how he could help the children around him. \"If I share these books, more kids can enjoy them,\" he said to himself.",
        "translation": "有一年夏天，他找到一箱旧书，那是他表哥留下的。他开始琢磨怎样才能帮到身边的孩子们。“如果我把这些书分享出去，就会有更多孩子读到它们，”他自言自语道。"
      },
      {
        "text": "He put the books in a wooden box that he had made with his father. Every Saturday, he carried the box to the square near the village gate. Children who passed by could take one book home for a week.",
        "translation": "他把书装进一个木箱，那箱子是他和爸爸一起做的。每个星期六，他都把箱子搬到村口附近的小广场上。路过的孩子可以把一本书带回家看一个星期。"
      },
      {
        "text": "At first, only three children came to his small library. But Lin Hao did not give up. He told his story to his teachers, who loved his idea and gave him more books for free. Soon the box was full again.",
        "translation": "起初，只有三个孩子来到他的小图书馆。但林浩没有放弃。他把自己的故事讲给老师听，老师们很喜欢他的想法，免费送给他更多的书。很快，箱子里又装满了。"
      },
      {
        "text": "Two years later, more than five hundred books had been collected in the box. Over one hundred children had joined the little library. Lin Hao said the happiest thing was to see a child smile.",
        "translation": "两年后，箱子里已经收集了五百多本书。一百多个孩子加入了这个小小的图书馆。林浩说，最开心的事就是看到一个孩子露出笑容。"
      },
      {
        "text": "Today Lin Hao is in high school, but his little library is still open. \"A book that you share with others will never be lost,\" he often says. Now other students in the village have started their own small libraries too.",
        "translation": "如今林浩已经上高中了，但他的小图书馆仍然开着。“一本你与他人分享的书永远不会丢失，”他常这样说。现在村里其他学生也办起了自己的小图书馆。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Lin Hao was a middle school student ___ lived in a small mountain village.",
        "choices": [
          "who",
          "which",
          "where"
        ],
        "answer": "who",
        "audioText": "Lin Hao was a middle school student who lived in a small mountain village."
      },
      {
        "type": "image_choice",
        "question": "What did Lin Hao carry to the square every Saturday?",
        "audioText": "What did Lin Hao carry to the square every Saturday?",
        "options": [
          {
            "emoji": "📚",
            "value": "books",
            "text": "A box of books"
          },
          {
            "emoji": "⚽",
            "value": "ball",
            "text": "A football"
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
        "type": "sentence_order",
        "correctOrder": [
          "Soon",
          "the",
          "box",
          "was",
          "full",
          "again."
        ],
        "audioText": "Soon the box was full again."
      },
      {
        "type": "word_builder",
        "word": "library",
        "audioText": "library"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "One summer, he found a box of old books which his cousin had ___ behind.",
        "choices": [
          "left",
          "leave",
          "leaving"
        ],
        "answer": "left",
        "audioText": "One summer, he found a box of old books which his cousin had left behind."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "But",
          "Lin",
          "Hao",
          "did",
          "not",
          "give",
          "up."
        ],
        "audioText": "But Lin Hao did not give up."
      }
    ]
  },
  {
    "id": "zk-r5-s03",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 3,
    "title": "The Boy Who Fixed Bikes",
    "titleCn": "修旧自行车的男孩",
    "coverEmoji": "🚲",
    "paragraphs": [
      {
        "text": "Li Wei is a fifteen-year-old boy who lives in a small town in Yunnan. Three years ago, he found an old bike in his grandfather's yard. The bike was broken, and nobody wanted it.",
        "translation": "李伟是一个十五岁的男孩，住在云南的一个小镇上。三年前，他在爷爷的院子里发现了一辆旧自行车。这辆车坏了，没有人想要它。"
      },
      {
        "text": "Li Wei decided to fix it by himself. He watched many videos and learned how to clean the parts. He had never repaired anything before, but he did not give up.",
        "translation": "李伟决定自己把它修好。他看了很多视频，学会了怎样清理零件。他以前从没修过任何东西，但他没有放弃。"
      },
      {
        "text": "After two months, the old bike could run again. A classmate who lived far away needed a bike. Li Wei gave it to him for free, and the boy smiled all the way home.",
        "translation": "两个月后，这辆旧车又能骑了。一位家住得很远的同学需要一辆自行车。李伟免费把它送给了他，那个男孩一路笑着回家。"
      },
      {
        "text": "From then on, Li Wei began to look for broken bikes in his town. Some neighbours gave him bikes that they no longer used. By last year, he had fixed more than forty bikes.",
        "translation": "从那以后，李伟开始在小镇上寻找坏掉的自行车。一些邻居把不再骑的车送给了他。到去年为止，他已经修好了四十多辆自行车。"
      },
      {
        "text": "Most of the bikes go to students who walk a long way to school. Li Wei also teaches them how to take care of the bikes. \"A bike that is loved can last for many years,\" he says.",
        "translation": "这些车大多送给要走很远路上学的学生。李伟还教他们怎样保养自行车。“一辆被爱惜的车能骑很多年，”他说。"
      },
      {
        "text": "Li Wei is not rich, and he does not want money. He only hopes that more children can get to school quickly and safely. His small shop has become the warmest place in the town.",
        "translation": "李伟并不富裕，他也不想要钱。他只希望更多的孩子能又快又安全地到学校。他的小铺子成了镇上最温暖的地方。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Li Wei find in his grandfather's yard?",
        "audioText": "What did Li Wei find in his grandfather's yard?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A bike"
          },
          {
            "emoji": "📱",
            "value": "phone",
            "text": "A phone"
          },
          {
            "emoji": "⚽",
            "value": "ball",
            "text": "A ball"
          }
        ],
        "answer": "bike"
      },
      {
        "type": "word_builder",
        "word": "broken",
        "audioText": "broken"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Li",
          "Wei",
          "decided",
          "to",
          "fix",
          "it",
          "by",
          "himself."
        ],
        "audioText": "Li Wei decided to fix it by himself."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "bike",
          "was",
          "broken,",
          "and",
          "nobody",
          "wanted",
          "it."
        ],
        "audioText": "The bike was broken, and nobody wanted it."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "By last year, he ___ fixed more than forty bikes.",
        "choices": [
          "had",
          "has",
          "have"
        ],
        "answer": "had",
        "audioText": "By last year, he had fixed more than forty bikes."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Li Wei is a fifteen-year-old boy ___ lives in a small town in Yunnan.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "Li Wei is a fifteen-year-old boy who lives in a small town in Yunnan."
      }
    ]
  },
  {
    "id": "zk-r5-s04",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 4,
    "title": "The Boy Who Built a Book Corner",
    "titleCn": "建起图书角的男孩",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "Wang Lin lives in a small village that sits between two green mountains. The nearest bookshop is more than fifty kilometres away. When he was a boy, he often wished that he could read more books.",
        "translation": "王林住在一个小村庄里，村子坐落在两座青山之间。离他最近的书店也在五十多公里以外。小时候，他常常盼着自己能读到更多的书。"
      },
      {
        "text": "His grandfather, who had been a teacher, loved books all his life. Before he died, he had collected a big box of old books. The box stayed in a dark corner for years.",
        "translation": "他的爷爷当过老师，一辈子都爱书。去世前，爷爷收藏了一大箱旧书。那只箱子在一个昏暗的角落里放了好些年。"
      },
      {
        "text": "One rainy afternoon, Wang Lin opened the old box and began to read. The books were full of red marks which his grandfather had made. The storybooks that his grandfather had loved made him smile. Then Wang Lin had a good idea. He thought other children in the village would love these books too.",
        "translation": "一个下雨的午后，王林打开那只旧箱子，读了起来。书上满是他爷爷留下的红色记号。爷爷当年喜爱的那些故事书让他笑了起来。接着，王林有了一个好主意。他觉得村里别的孩子也会喜欢这些书。"
      },
      {
        "text": "With his mother's help, he cleaned an old room next to his house. He put the books on three wooden shelves that his father had built. Then he made a small wooden sign for the door. The sign said, 'Free Book Corner'.",
        "translation": "在妈妈的帮助下，他把家旁边的一间旧屋子打扫干净。他把书放在爸爸做好的三个木架子上。然后他给门做了一块小木牌。牌子上写着：“免费图书角”。"
      },
      {
        "text": "At first, only five children came. Soon more than thirty children came to the corner every week. Kids who had never owned a book borrowed one or two. Wang Lin also read aloud to those who could not read well.",
        "translation": "一开始，只有五个孩子来。很快，每个星期都有三十多个孩子来到这个小角落。从没拥有过一本书的孩子可以借走一两本。王林还会给那些读不好的孩子大声朗读。"
      },
      {
        "text": "So far, the little corner has lent out more than six hundred books. Wang Lin says the best thing is the smile on a child's face. A boy who once hated reading now reads a story every week.",
        "translation": "到现在为止，这个小角落已经借出了六百多本书。王林说，最好的事情是孩子脸上的笑容。一个曾经讨厌读书的男孩，现在每周都会读一个故事。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Where did Wang Lin put the old books?",
        "audioText": "Where did Wang Lin put the old books?",
        "options": [
          {
            "emoji": "📚",
            "value": "shelves",
            "text": "On wooden shelves"
          },
          {
            "emoji": "🪑",
            "value": "chair",
            "text": "On a chair"
          },
          {
            "emoji": "🚪",
            "value": "door",
            "text": "Behind the door"
          }
        ],
        "answer": "shelves"
      },
      {
        "type": "word_builder",
        "word": "village",
        "audioText": "village"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Then",
          "Wang",
          "Lin",
          "had",
          "a",
          "good",
          "idea."
        ],
        "audioText": "Then Wang Lin had a good idea."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Before he died, Wang Lin's grandfather had ___ a big box of old books.",
        "choices": [
          "collected",
          "borrowed",
          "sold"
        ],
        "answer": "collected",
        "audioText": "Before he died, Wang Lin's grandfather had collected a big box of old books."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "At",
          "first,",
          "only",
          "five",
          "children",
          "came."
        ],
        "audioText": "At first, only five children came."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Wang Lin also read aloud to those ___ could not read well.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "Wang Lin also read aloud to those who could not read well."
      }
    ]
  },
  {
    "id": "zk-r5-s05",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 5,
    "title": "The Girl Who Started a Library",
    "titleCn": "办起一座图书馆的女孩",
    "coverEmoji": "📚",
    "paragraphs": [
      {
        "text": "Lin Yue was a middle school student who lived in a small mountain town. She loved reading more than anything else in the world. The books on her shelf were like her best friends. She had read every one of them many times before.",
        "translation": "林月是一名住在山间小镇的初中生。她爱读书，胜过世上任何别的事情。书架上的书就像她最好的朋友。每一本她都已经读过很多遍了。"
      },
      {
        "text": "One winter, Lin Yue visited her cousin in a village far up the mountain. The village had no library, and the school had only a few old textbooks. The children there had never seen a storybook. Lin Yue felt sad, and a small idea began to grow in her heart.",
        "translation": "一年冬天，林月去大山深处的一个村子看望表姐。村里没有图书馆，学校也只有几本旧课本。那里的孩子从没见过故事书。林月心里很难过，一个小小的念头开始在心里萌生。"
      },
      {
        "text": "Back home, she asked her friends for books that they no longer needed. Many classmates brought storybooks which they had finished long ago. In two months, Lin Yue had collected more than three hundred books. Her father, who was a driver, helped her carry them up the mountain.",
        "translation": "回到家后，她向朋友们讨要那些他们不再需要的书。许多同学带来了自己早就读完的故事书。两个月里，林月已经收集了三百多本书。她的爸爸是司机，帮她把书运上了山。"
      },
      {
        "text": "The village school gave her a small room which had one window. Lin Yue cleaned it and put the books on six wooden shelves. More than forty children came on the first day. She told them that a book can open a door to a bigger world.",
        "translation": "村小学给了她一间只有一扇窗户的小屋。林月把它打扫干净，把书摆在六个木书架上。第一天就来了四十多个孩子。她告诉他们，一本书能打开一扇通向更大世界的门。"
      },
      {
        "text": "Every summer, Lin Yue returns to the village which she calls her second home. Some of her first readers have grown up and become teachers. They say that the little library changed their lives. Lin Yue smiles and says that she has learned something important too.",
        "translation": "每年夏天，林月都会回到那个她称为第二故乡的村子。她最早的一批小读者已经长大，当上了老师。他们说，这座小小的图书馆改变了他们的人生。林月也笑着说，自己同样学到了重要的东西。"
      },
      {
        "text": "One small girl can help a whole village. You do not need to be rich or famous to do something good. If you love something, you can share it with others.",
        "translation": "一个小女孩也能帮助整个村子。想做点好事，你不需要富有，也不需要出名。只要你喜欢某样东西，就可以把它分享给别人。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Lin Yue love more than anything else?",
        "audioText": "What did Lin Yue love more than anything else?",
        "options": [
          {
            "emoji": "📚",
            "value": "books",
            "text": "Books"
          },
          {
            "emoji": "⚽",
            "value": "football",
            "text": "Football"
          },
          {
            "emoji": "🎨",
            "value": "painting",
            "text": "Painting"
          }
        ],
        "answer": "books"
      },
      {
        "type": "word_builder",
        "word": "library",
        "audioText": "library"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "children",
          "there",
          "had",
          "never",
          "seen",
          "a",
          "storybook."
        ],
        "audioText": "The children there had never seen a storybook."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "One",
          "small",
          "girl",
          "can",
          "help",
          "a",
          "whole",
          "village."
        ],
        "audioText": "One small girl can help a whole village."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Lin Yue was a middle school student ___ lived in a small mountain town.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "Lin Yue was a middle school student who lived in a small mountain town."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In two months, Lin Yue ___ collected more than three hundred books.",
        "choices": [
          "had",
          "has",
          "have"
        ],
        "answer": "had",
        "audioText": "In two months, Lin Yue had collected more than three hundred books."
      }
    ]
  },
  {
    "id": "zk-r5-s06",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 6,
    "title": "The Girl Who Cleaned the Lake",
    "titleCn": "清理湖泊的女孩",
    "coverEmoji": "💧",
    "paragraphs": [
      {
        "text": "Lily is a thirteen-year-old girl who lives in a small town in Yunnan. Every morning, she walks to school along a lake which she loves very much.",
        "translation": "莉莉是一个十三岁的女孩，住在云南的一个小镇上。每天早晨，她都沿着一个她非常喜欢的湖走去上学。"
      },
      {
        "text": "But last year, the lake that had once been blue turned grey and dirty. People threw bottles and bags into the water, and the fish disappeared.",
        "translation": "但去年，这个曾经碧蓝的湖变得又灰又脏。人们把瓶子和袋子扔进水里，湖里的鱼也不见了。"
      },
      {
        "text": "Lily felt sad about this. She went to her science teacher, Ms. Wang, and asked her for help. Ms. Wang was a kind woman who loved nature and always helped others. She told Lily that one person could make a big difference in the world.",
        "translation": "莉莉为此感到难过。她去找她的科学老师王老师，向她求助。王老师是一位热爱自然、总是乐于助人的善良女性。她告诉莉莉，一个人也能给世界带来很大的改变。"
      },
      {
        "text": "So they started a club which they called Blue Water. Twenty students who joined the club met every Saturday morning. They picked up rubbish, planted small trees, and put up signs by the lake. By that autumn, they had collected over three hundred bags of rubbish.",
        "translation": "于是她们创办了一个俱乐部，取名“蓝水”。加入俱乐部的二十名学生每周六早上集合。他们捡垃圾、种小树，还在湖边立起告示牌。到那年秋天，他们已经收集了三百多袋垃圾。"
      },
      {
        "text": "At first, some people laughed at them and said the lake was too dirty. But Lily and her friends did not stop. Slowly, the water became clear again, and birds came back to the lake.",
        "translation": "起初，有些人嘲笑他们，说这湖太脏了。但莉莉和她的朋友们没有停下来。慢慢地，湖水又变清了，鸟儿也回到了湖边。"
      },
      {
        "text": "Now Lily is fifteen years old, and her club has over one hundred members. Two years ago, she had never believed a small idea could change a town. \"If we all do a little,\" she says, \"the world will be better.\"",
        "translation": "如今莉莉十五岁了，她的俱乐部已有一百多名成员。两年前，她还从未相信一个小小的想法能改变一个小镇。“如果我们每个人都做一点点，”她说，“世界就会变得更好。”"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "How did the lake look after Lily and her friends worked hard?",
        "audioText": "How did the lake look after Lily and her friends worked hard?",
        "options": [
          {
            "emoji": "🌊",
            "value": "clear",
            "text": "Clear and clean"
          },
          {
            "emoji": "🗑️",
            "value": "rubbish",
            "text": "Full of rubbish"
          },
          {
            "emoji": "🏜️",
            "value": "dry",
            "text": "Dry and empty"
          }
        ],
        "answer": "clear"
      },
      {
        "type": "word_builder",
        "word": "rubbish",
        "audioText": "rubbish"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "But",
          "Lily",
          "and",
          "her",
          "friends",
          "did",
          "not",
          "stop."
        ],
        "audioText": "But Lily and her friends did not stop."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lily",
          "felt",
          "sad",
          "about",
          "this."
        ],
        "audioText": "Lily felt sad about this."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Ms. Wang was a kind woman ___ loved nature and always helped others.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "Ms. Wang was a kind woman who loved nature and always helped others."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "By that autumn, they ___ collected over three hundred bags of rubbish.",
        "choices": [
          "had",
          "have",
          "has"
        ],
        "answer": "had",
        "audioText": "By that autumn, they had collected over three hundred bags of rubbish."
      }
    ]
  },
  {
    "id": "zk-r5-s07",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 7,
    "title": "The Teacher Who Grew a Forest",
    "titleCn": "种出一片森林的老师",
    "coverEmoji": "🌳",
    "paragraphs": [
      {
        "text": "Mr. Chen was a teacher who lived in a small village in the north. The hills around his home were dry and brown. When he was a boy, he had seen tall trees on those hills. But by 1990, most of them were gone.",
        "translation": "陈先生是一位住在北方小村庄里的老师。他家周围的山丘又干又秃。小时候，他曾在那些山上见过高大的树。可是到了1990年，它们大多都不见了。"
      },
      {
        "text": "One spring morning, Mr. Chen found a small plant which grew near a rock. It was the only green thing on the hill that year. He looked at it for a long time. Then he made a plan that changed his whole life.",
        "translation": "一个春天的早晨，陈先生发现岩石边长着一棵小植物。那是那年山上唯一的绿色。他盯着它看了很久。然后，他定下了一个改变他一生的计划。"
      },
      {
        "text": "He began to plant trees on the hill every weekend. Many people laughed at him, because the ground was too dry. His wife, who always believed in him, helped him carry water. In the first year, only three young trees lived.",
        "translation": "他开始每个周末都到山上种树。很多人嘲笑他，因为那里的土太干了。他的妻子一直相信他，帮他挑水。第一年，只有三棵小树活了下来。"
      },
      {
        "text": "After that, he learned which trees could grow in dry ground. He collected seeds from other villages and small towns. He walked for hours to find the right ones. By 2010, he had planted ten thousand trees.",
        "translation": "在那之后，他弄清了哪些树能在干旱的土地上生长。他从别的村庄和小镇收集种子。为了找到合适的种子，他一走就是好几个小时。到2010年，他已经种下了一万棵树。"
      },
      {
        "text": "Today the hill is covered with green leaves and tall trees. Birds that had left the village long ago have come back. The air is cooler, and the ground is soft and rich. Children play under trees which Mr. Chen planted with his own hands.",
        "translation": "如今，山丘上盖满了绿叶和高大的树木。很久以前离开村子的鸟儿又回来了。空气更凉爽了，土地松软又肥沃。孩子们在陈先生亲手种下的树下玩耍。"
      },
      {
        "text": "Mr. Chen is over eighty now, but he still works on the hill. \"A forest begins with one small seed,\" he says with a smile. His students, who call him Grandpa Green, often come to help him.",
        "translation": "陈先生现在八十多岁了，但他仍然在山上干活。“一片森林，始于一颗小小的种子。”他笑着说。他的学生们都叫他“绿色爷爷”，常常来帮他。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the hills look like before Mr. Chen planted trees?",
        "audioText": "What did the hills look like before Mr. Chen planted trees?",
        "options": [
          {
            "emoji": "🟤",
            "value": "dry",
            "text": "Dry and brown"
          },
          {
            "emoji": "🌳",
            "value": "green",
            "text": "Green and full of trees"
          },
          {
            "emoji": "❄️",
            "value": "snow",
            "text": "Covered with snow"
          }
        ],
        "answer": "dry"
      },
      {
        "type": "word_builder",
        "word": "forest",
        "audioText": "forest"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "He",
          "looked",
          "at",
          "it",
          "for",
          "a",
          "long",
          "time."
        ],
        "audioText": "He looked at it for a long time."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "By",
          "2010,",
          "he",
          "had",
          "planted",
          "ten",
          "thousand",
          "trees."
        ],
        "audioText": "By 2010, he had planted ten thousand trees."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Mr. Chen was a teacher ___ lived in a small village in the north.",
        "choices": [
          "who",
          "which",
          "what"
        ],
        "answer": "who",
        "audioText": "Mr. Chen was a teacher who lived in a small village in the north."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He collected ___ from other villages and small towns.",
        "choices": [
          "seeds",
          "leaves",
          "rocks"
        ],
        "answer": "seeds",
        "audioText": "He collected seeds from other villages and small towns."
      }
    ]
  },
  {
    "id": "zk-r5-s08",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 8,
    "title": "The Woman Who Planted a Forest",
    "titleCn": "种下一片森林的女人",
    "coverEmoji": "🌳",
    "paragraphs": [
      {
        "text": "In a small village in the north, there was a hill which had no trees. Every spring, strong winds blew sand into the windows of the houses. Many families had left before Mei came home. She was born in the village, and she loved it.",
        "translation": "在北方的一个小村子里，有一座光秃秃的山，山上连一棵树也没有。每年春天，大风都会把沙子吹进村民家的窗户里。在梅回到家乡之前，很多人家已经搬走了。她出生在这个村子，也深爱着这里。"
      },
      {
        "text": "After Mei finished school in the city, she worked in a big shop for three years. Then one day she read a book which was about planting trees. The book said that a hill without trees can slowly turn into a desert. Mei thought about her village for many nights.",
        "translation": "梅在城里念完书后，在一家大商店里工作了三年。后来有一天，她读到一本关于种树的书。书上说，一座没有树的山会慢慢变成沙漠。梅一连好几个晚上都在想着自己的村子。"
      },
      {
        "text": "When she went back, some old people laughed at her. \"A girl who digs holes all day is wasting her time,\" they said. Mei smiled and kept working. She carried water up the hill in two heavy buckets, and nobody helped her at first.",
        "translation": "她回到村里时，一些老人嘲笑她。他们说：“一个整天挖坑的姑娘是在浪费时间。”梅笑了笑，继续干活。她用两只沉甸甸的水桶把水挑上山，起初没有一个人帮她。"
      },
      {
        "text": "In the first year, most of the small trees died because the ground was too dry. Mei had planted them too late, so she learned to wait for the rain. She also found a way which kept the water in the soil. Slowly, some green leaves appeared.",
        "translation": "第一年，因为土地太干，大部分小树都死了。梅种得太晚了，于是她学会了等雨。她还找到了一种能把水分留在土壤里的办法。渐渐地，一些绿叶冒了出来。"
      },
      {
        "text": "Three years later, the hill looked quite different. Birds that had never come before began to build nests there. The village children helped Mei every weekend, carrying water and pulling out dry grass.",
        "translation": "三年后，这座山的样子大不一样了。以前从没来过的鸟儿开始在山上筑巢。村里的孩子们每个周末都来帮梅，挑水、拔枯草。"
      },
      {
        "text": "Today, more than ten thousand trees stand on the hill, and people call it \"Mei's Forest\". Mei often tells visitors that one person cannot do everything, but one person can do something. That is how a hill becomes green again.",
        "translation": "如今，一万多棵树挺立在这座山上，人们把它叫做“梅的森林”。梅常常对来访的人说，一个人不可能做完所有的事，但一个人可以做一件事。一座山就是这样重新变绿的。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the story, what did Mei use to carry water up the hill?",
        "audioText": "In the story, what did Mei use to carry water up the hill?",
        "options": [
          {
            "emoji": "🪣",
            "value": "buckets",
            "text": "Buckets"
          },
          {
            "emoji": "🧺",
            "value": "baskets",
            "text": "Baskets"
          },
          {
            "emoji": "🎒",
            "value": "bags",
            "text": "School bags"
          }
        ],
        "answer": "buckets"
      },
      {
        "type": "word_builder",
        "word": "forest",
        "audioText": "forest"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Mei",
          "smiled",
          "and",
          "kept",
          "working."
        ],
        "audioText": "Mei smiled and kept working."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "is",
          "how",
          "a",
          "hill",
          "becomes",
          "green",
          "again."
        ],
        "audioText": "That is how a hill becomes green again."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Birds ___ had never come before began to build nests on the hill.",
        "choices": [
          "that",
          "what",
          "whose"
        ],
        "answer": "that",
        "audioText": "Birds that had never come before began to build nests on the hill."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Mei had ___ them too late, so most of the small trees died.",
        "choices": [
          "planted",
          "picked",
          "painted"
        ],
        "answer": "planted",
        "audioText": "Mei had planted them too late, so most of the small trees died."
      }
    ]
  },
  {
    "id": "zk-r5-s09",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 9,
    "title": "The Girl Who Made Clean Water",
    "titleCn": "让水变干净的女孩",
    "coverEmoji": "💧",
    "paragraphs": [
      {
        "text": "Lily is a girl who lives in a small village near the mountains. The old river that runs past her home was often very dirty. Many people in the village had been sick after drinking the water.",
        "translation": "莉莉是一个住在山边小村子里的女孩。流经她家的那条老河常常很脏。村里很多人喝了这水以后都病倒了。"
      },
      {
        "text": "Lily's grandmother was one of the people who had been sick. She had felt weak and tired for many weeks that winter. Lily wanted to help her, so she began to read books about water. In one book she found a simple tool that could clean dirty water.",
        "translation": "莉莉的奶奶就是生病的人之一。那年冬天，她已经虚弱疲惫了好几个星期。莉莉想帮她，于是开始读关于水的书。在一本书里，她发现了一个能净化脏水的简易工具。"
      },
      {
        "text": "The tool was cheap and easy to make. Lily used a plastic bottle, some sand, small stones and a piece of cloth. She cut a hole in the bottle and put everything inside it. Then she put the dirty water in and waited for a long time.",
        "translation": "这个工具便宜又好做。莉莉用了一个塑料瓶、一些沙子、小石子和一块布。她在瓶子上剪了个洞，把这些东西都放了进去。然后她把脏水倒进去，等了很久。"
      },
      {
        "text": "Her first try did not work well. The water was still dirty. She had tried and failed six times before she got it right. Her science teacher, who helped her after school, told her to keep trying.",
        "translation": "她的第一次尝试不太成功，水还是脏的。她试了六次、失败了六次，才终于做对。她的科学老师放学后帮她，告诉她要继续努力。"
      },
      {
        "text": "Two months later, the water came out clear and safe to drink. Lily gave the first tool to her grandmother and some other families. By the end of that year, she had made thirty tools for the village.",
        "translation": "两个月后，流出来的水变得清澈，可以安全饮用。莉莉把第一个工具送给了奶奶和另外几户人家。到那年年底，她已经为村里做了三十个这样的工具。"
      },
      {
        "text": "Lily won a prize at her school science show last spring. Now she teaches younger students how to make the same tool. She often tells people that anyone who tries can make a small change.",
        "translation": "去年春天，莉莉在学校的科学展上获了奖。现在她教更小的学生做同样的工具。她常常告诉大家，只要肯尝试，任何人都能带来一点小小的改变。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which of these did Lily put inside the bottle?",
        "audioText": "Which of these did Lily put inside the bottle?",
        "options": [
          {
            "emoji": "🪨",
            "value": "sand",
            "text": "Sand and small stones"
          },
          {
            "emoji": "🍬",
            "value": "sweets",
            "text": "Some sweets"
          },
          {
            "emoji": "🌸",
            "value": "flowers",
            "text": "Some flowers"
          }
        ],
        "answer": "sand"
      },
      {
        "type": "word_builder",
        "word": "village",
        "audioText": "village"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "tool",
          "was",
          "cheap",
          "and",
          "easy",
          "to",
          "make"
        ],
        "audioText": "The tool was cheap and easy to make."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Her",
          "first",
          "try",
          "did",
          "not",
          "work",
          "well"
        ],
        "audioText": "Her first try did not work well."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Lily is a girl ___ lives in a small village near the mountains.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "Lily is a girl who lives in a small village near the mountains."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "By the end of that year, she ___ made thirty tools for the village.",
        "choices": [
          "had",
          "has",
          "have"
        ],
        "answer": "had",
        "audioText": "By the end of that year, she had made thirty tools for the village."
      }
    ]
  },
  {
    "id": "zk-r5-s10",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 10,
    "title": "The Boy Who Counted Birds",
    "titleCn": "数鸟的男孩",
    "coverEmoji": "🐦",
    "paragraphs": [
      {
        "text": "Lin Tao was a quiet boy who lived near a lake. Every morning before school, he walked to the lake with a small notebook. He had started this habit when he was only nine years old. In the book, he wrote down the names of the birds which he saw.",
        "translation": "林涛是个安静的男孩，他家住在湖边。每天上学前，他都带着一个小本子走到湖边。他这个习惯从九岁就开始了。在本子上，他记下自己看到的鸟的名字。"
      },
      {
        "text": "At first, Lin Tao knew only a few common birds. He wanted to learn the names of the others. So he borrowed a bird book from the school library. He had read it three times before the summer holiday ended. After that, he could name almost every bird that flew over the lake.",
        "translation": "起初，林涛只认识几种常见的鸟。他想知道其他鸟的名字。于是他从学校图书馆借了一本关于鸟的书。暑假结束前，他已经把这本书读了三遍。从那以后，他几乎能叫出飞过湖面的每一只鸟的名字。"
      },
      {
        "text": "One autumn, some workers came and cut down many trees by the lake. The birds had lived there for many years. They began to leave one by one. Lin Tao was worried, so he wrote a short report about the birds. He also drew a simple map which showed where each bird liked to stay.",
        "translation": "有一年秋天，一些工人来到湖边，砍掉了许多树。这些鸟在那里已经生活了很多年。它们开始一只只地离开。林涛很担心，于是他写了一份关于这些鸟的简短报告。他还画了一张简单的地图，标出每种鸟喜欢待的地方。"
      },
      {
        "text": "Then he took his notebook and his map to the village office. The head of the village read them carefully and said nothing at first. A few days later, he told Lin Tao that the village would plant new trees. Lin Tao had never felt so happy.",
        "translation": "然后他把自己的本子和地图带到了村委会。村长仔细地看了这些材料，起初什么也没说。几天后，他告诉林涛，村里会种上新树。林涛从未这么开心过。"
      },
      {
        "text": "Other children in the village soon joined him on his morning walks. They formed a small group which met by the lake every weekend. Together they counted the birds and wrote down what they had found. Last year, their lake became a small park for birds and people.",
        "translation": "村里其他的孩子很快也加入了他的晨间散步。他们组成了一个小团体，每个周末都在湖边碰面。他们一起数鸟，并把发现的情况记下来。去年，他们的湖变成了一个供鸟和人们使用的小公园。"
      },
      {
        "text": "Now Lin Tao is a student who studies birds at a famous university. He still keeps his first notebook, which is old and full of notes. He often tells young people about his small village. Small actions can change a place.",
        "translation": "如今，林涛是一名在著名大学研究鸟类的学生。他仍然保留着自己的第一个本子，它已经很旧，里面写满了笔记。他常常向年轻人讲起自己那个小村庄。小小的行动也能改变一个地方。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which animal did Lin Tao watch and write about every morning?",
        "audioText": "Which animal did Lin Tao watch and write about every morning?",
        "options": [
          {
            "emoji": "🐦",
            "value": "birds",
            "text": "Birds"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🐝",
            "value": "bees",
            "text": "Bees"
          }
        ],
        "answer": "birds"
      },
      {
        "type": "word_builder",
        "word": "notebook",
        "audioText": "notebook"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Lin",
          "Tao",
          "had",
          "never",
          "felt",
          "so",
          "happy."
        ],
        "audioText": "Lin Tao had never felt so happy."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "began",
          "to",
          "leave",
          "one",
          "by",
          "one."
        ],
        "audioText": "They began to leave one by one."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He had ___ it three times before the summer holiday ended.",
        "choices": [
          "read",
          "reads",
          "reading"
        ],
        "answer": "read",
        "audioText": "He had read it three times before the summer holiday ended."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "After that, he could name almost every bird ___ flew over the lake.",
        "choices": [
          "that",
          "who",
          "where"
        ],
        "answer": "that",
        "audioText": "After that, he could name almost every bird that flew over the lake."
      }
    ]
  },
  {
    "id": "zk-r5-s11",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 11,
    "title": "The Boy Who Started a Phone Class",
    "titleCn": "开手机课堂的男孩",
    "coverEmoji": "📱",
    "paragraphs": [
      {
        "text": "Leo was a fourteen-year-old boy who loved new technology. When he was twelve, he had already learned to fix small problems on a phone. His grandpa often watched him with a smile. \"How do you talk to people on that small screen?\" Grandpa asked one evening.",
        "translation": "利奥是一个热爱新科技的十四岁男孩。十二岁时，他就已经学会了修理手机上的小毛病。他的爷爷常常微笑着看他摆弄手机。“你是怎么在那块小屏幕上跟人说话的？”一天晚上，爷爷问道。"
      },
      {
        "text": "Leo tried to teach his grandpa, but the old man forgot the steps again and again. After three days, Grandpa had written every step in a small notebook. Still, he could not send a photo to his friends. Leo felt sad when he saw his grandpa put the phone down.",
        "translation": "利奥试着教爷爷，可老人一次又一次地忘了步骤。三天后，爷爷已经把每一个步骤都写进了一个小本子里。可他还是没法给朋友们发照片。看到爷爷把手机放下，利奥心里很难过。"
      },
      {
        "text": "One morning, Leo had an idea. Many old people had the same problem. They wanted to see their children who lived in other cities. So Leo decided to open a free phone class in the community room.",
        "translation": "一天早上，利奥有了一个主意。附近很多老人都有同样的难题。他们想看看住在别的城市的儿女。于是利奥决定在社区活动室开一个免费的手机课堂。"
      },
      {
        "text": "At first, only two people came. Leo wrote a small book which used big letters and clear pictures. In the second week, eight grandparents sat in a circle with their phones. Leo moved from one to another and answered every question with patience.",
        "translation": "起初只来了两个人。利奥写了一本小册子，里面用大大的字和清楚的图片。到了第二周，八位爷爷奶奶围成一圈，手里都拿着手机。利奥从一个人走到另一个人，耐心地回答每一个问题。"
      },
      {
        "text": "Slowly, the class grew, and the room was full of laughter. One grandma who had not seen her son for two years made a video call. Tears ran down her face, and Leo smiled too. That night he told his mother it was the best day of his life.",
        "translation": "慢慢地，来上课的人多了起来，屋子里满是笑声。一位两年没见过儿子的奶奶终于打了一个视频电话。泪水顺着她的脸流下来，利奥也笑了。那天晚上他告诉妈妈，这是他一生中最棒的一天。"
      },
      {
        "text": "Leo is now fifteen, and he still teaches the class every Saturday. He says that technology should bring people together. The little notebook which his grandpa once used now sits on the teacher's desk.",
        "translation": "利奥现在十五岁了，他仍然每周六给这个班上课。他说，科技应该把人聚在一起。爷爷当年用过的那本小本子，如今就放在讲台上。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does Leo teach the old people to use?",
        "audioText": "What does Leo teach the old people to use?",
        "options": [
          {
            "emoji": "📱",
            "value": "phone",
            "text": "A phone"
          },
          {
            "emoji": "📷",
            "value": "camera",
            "text": "A camera"
          },
          {
            "emoji": "⌚",
            "value": "watch",
            "text": "A watch"
          }
        ],
        "answer": "phone"
      },
      {
        "type": "word_builder",
        "word": "notebook",
        "audioText": "notebook"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "His",
          "grandpa",
          "often",
          "watched",
          "him",
          "with",
          "a",
          "smile."
        ],
        "audioText": "His grandpa often watched him with a smile."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Many",
          "old",
          "people",
          "had",
          "the",
          "same",
          "problem."
        ],
        "audioText": "Many old people had the same problem."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Grandpa had ___ every step in a small notebook.",
        "choices": [
          "written",
          "wrote",
          "writing"
        ],
        "answer": "written",
        "audioText": "Grandpa had written every step in a small notebook."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "He says that technology should bring people ___.",
        "choices": [
          "together",
          "away",
          "alone"
        ],
        "answer": "together",
        "audioText": "He says that technology should bring people together."
      }
    ]
  },
  {
    "id": "zk-r5-s12",
    "track": "zhongkao",
    "regionId": "zk-r5",
    "order": 12,
    "title": "The Girl Who Kept a Weather Diary",
    "titleCn": "记录天气日记的女孩",
    "coverEmoji": "🌦️",
    "paragraphs": [
      {
        "text": "Mei was a quiet girl who lived in a small village near the mountains. Every morning, she stood in the yard and wrote down the weather. Her father was a farmer who worked hard in the fields. \"Will it rain today?\" he often asked before he left the house.",
        "translation": "梅是一个安静的女孩，住在山脚下的一个小村子里。每天早晨，她都站在院子里记下天气。她的父亲是个在田里辛苦干活的农民。他出门前常问她：“今天会下雨吗？”"
      },
      {
        "text": "Mei did not guess; she watched and recorded. Wind, temperature and cloud colour all went into her little book. By the time she finished primary school, she had filled twenty notebooks. Her teacher was surprised that a young girl could be so patient.",
        "translation": "梅不是靠猜，而是靠看和记录。风、气温和云的颜色，她都写进那个小本子里。等她小学毕业时，她已经写满了二十本笔记。老师很惊讶，一个小女孩竟能这么有耐心。"
      },
      {
        "text": "One spring, the village had very little rain for many weeks. The farmers were worried about their young plants. Mei looked at her notes and found a pattern which repeated every few years. She told the farmers that heavy rain was coming in three days. At first, nobody believed the girl who wrote in a notebook.",
        "translation": "有一年春天，村里好几个星期几乎没下过雨。农民们为地里的幼苗发愁。梅翻看笔记，发现了一个每隔几年就会重复出现的规律。她告诉农民们，三天后会下大雨。起初，没有人相信这个爱记笔记的女孩。"
      },
      {
        "text": "Three days later, the rain arrived and saved the crops. After that, the farmers came to her with many questions. They called her \"the little weather girl\". Mei smiled and said that anyone could do it. \"You only need to watch carefully and write it down,\" she said.",
        "translation": "三天后，雨真的来了，救了庄稼。从那以后，农民们带着许多问题来找她。他们叫她“天气小博士”。梅笑着说，谁都能做到。“你只需要仔细观察，然后把它写下来。”她说。"
      },
      {
        "text": "Mei kept her diary for many years after that spring. When she went to high school, she joined a science club which studied the weather. Last year, she won a prize for a report she had written. The judges said her work was simple but useful.",
        "translation": "那个春天之后，梅坚持写了很多年日记。上高中时，她加入了一个研究天气的科学社团。去年，她因为一篇自己写的报告得了奖。评委说，她的研究简单却很有用。"
      },
      {
        "text": "Today Mei still writes in her notebook every morning. She wants to become a scientist who helps farmers grow more food. Her old teacher often tells this story to younger students. \"Big things start with small habits,\" she says. And a girl who watched clouds became the pride of her village.",
        "translation": "如今，梅每天早晨仍然在本子上记录。她想成为一名帮助农民种出更多粮食的科学家。她的老师常把这个故事讲给更小的学生听。“大事都从小习惯开始。”老师说。而一个看云的小女孩，成了全村人的骄傲。"
      }
    ],
    "quiz": [
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Mei was a quiet girl ___ lived in a small village near the mountains.",
        "choices": [
          "who",
          "which",
          "what"
        ],
        "answer": "who",
        "audioText": "Mei was a quiet girl who lived in a small village near the mountains."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Mei",
          "kept",
          "her",
          "diary",
          "for",
          "many",
          "years."
        ],
        "audioText": "Mei kept her diary for many years."
      },
      {
        "type": "word_builder",
        "word": "notebook",
        "audioText": "notebook"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "By the time she finished primary school, she ___ filled twenty notebooks.",
        "choices": [
          "had",
          "has",
          "was"
        ],
        "answer": "had",
        "audioText": "By the time she finished primary school, she had filled twenty notebooks."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Big",
          "things",
          "start",
          "with",
          "small",
          "habits."
        ],
        "audioText": "Big things start with small habits."
      },
      {
        "type": "image_choice",
        "question": "What arrived three days later and saved the crops?",
        "audioText": "What arrived three days later and saved the crops?",
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
            "emoji": "🌬️",
            "value": "wind",
            "text": "Wind"
          }
        ],
        "answer": "rain"
      }
    ]
  },
  {
    "id": "zk-r6-s01",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 1,
    "title": "Lanterns and New Friends",
    "titleCn": "灯笼与新朋友",
    "coverEmoji": "🏮",
    "paragraphs": [
      {
        "text": "The Lantern Festival is one of the most important festivals in China. It comes on the fifteenth day of the first month in the Chinese calendar. This year, my Australian friend Emma came to my city to see it with me.",
        "translation": "元宵节是中国最重要的节日之一。它在农历正月十五到来。今年，我的澳大利亚朋友埃玛来到我所在的城市，和我一起看灯。"
      },
      {
        "text": "Emma told me that she had never seen so many red lanterns before. The streets were so bright that they looked like a river of light. We walked slowly under the big trees.",
        "translation": "埃玛告诉我，她以前从没见过这么多红灯笼。街道亮得像一条光的河。我们在大树下面慢慢地走着。"
      },
      {
        "text": "My mother made tangyuan, which is a sweet rice ball with sugar inside. Emma said that it was the best food she had ever tasted. It was such a lovely food that she asked for a second bowl.",
        "translation": "妈妈做了汤圆，那是一种里面包着糖的甜米团。埃玛说，这是她吃过的最好吃的东西。它太可口了，她又吃了一碗。"
      },
      {
        "text": "An old man taught us how to make a small lantern with bamboo and red paper. He said that people have made lanterns like these for more than a thousand years. We finished it together.",
        "translation": "一位老人教我们用竹子和红纸做小灯笼。他说，人们做这样的灯笼已经有一千多年了。我们一起把它做好了。"
      },
      {
        "text": "Emma showed me photos of the Christmas lights in her home town. She said that people in her country also love bright lights at night. Although our festivals are different, they carry the same warm wish.",
        "translation": "埃玛给我看了她家乡圣诞灯的照片。她说，在她的国家，人们也喜欢夜晚明亮的灯。虽然我们的节日不同，但它们带着同样温暖的祝愿。"
      },
      {
        "text": "On that night I understood that culture is a bridge which connects different people. I hope Emma will come back next year, when we can enjoy the festival again.",
        "translation": "那一晚我明白了，文化是一座连接不同人的桥。我希望埃玛明年再来，那时我们可以一起再过这个节日。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What sweet food did Emma taste at the festival?",
        "audioText": "What sweet food did Emma taste at the festival?",
        "options": [
          {
            "emoji": "🍡",
            "value": "tangyuan",
            "text": "Sweet rice balls"
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
        "answer": "tangyuan"
      },
      {
        "type": "word_builder",
        "word": "lantern",
        "audioText": "lantern"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "walked",
          "slowly",
          "under",
          "the",
          "big",
          "trees."
        ],
        "audioText": "We walked slowly under the big trees."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "We",
          "finished",
          "it",
          "together."
        ],
        "audioText": "We finished it together."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My mother made tangyuan, ___ is a sweet rice ball with sugar inside.",
        "choices": [
          "which",
          "who",
          "what"
        ],
        "answer": "which",
        "audioText": "My mother made tangyuan, which is a sweet rice ball with sugar inside."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The streets were so ___ that they looked like a river of light.",
        "choices": [
          "bright",
          "quiet",
          "cold"
        ],
        "answer": "bright",
        "audioText": "The streets were so bright that they looked like a river of light."
      }
    ]
  },
  {
    "id": "zk-r6-s02",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 2,
    "title": "Red Lanterns and Dumplings",
    "titleCn": "红灯笼与饺子",
    "coverEmoji": "🏮",
    "paragraphs": [
      {
        "text": "My name is Li Hua, and I live in a city in northern China. Last winter, my Canadian friend Emma came to visit my family. She arrived in my city a few days before the Spring Festival started. The Spring Festival is a holiday that almost every Chinese family celebrates.",
        "translation": "我叫李华，住在中国北方的一座城市。去年冬天，我的加拿大朋友艾玛来我家做客。她在春节开始前几天就到了我所在的城市。春节是几乎每个中国家庭都会庆祝的节日。"
      },
      {
        "text": "On the first evening, my mother showed us how to make dumplings. Emma said that she had never made dumplings with her family before. My mother told her that dumplings are shaped like old gold money. People believe that eating them brings good luck for the new year. Emma's first dumpling was so ugly that we all laughed.",
        "translation": "第一天晚上，妈妈教我们怎么包饺子。艾玛说，她以前从没和家人一起包过饺子。妈妈告诉她，饺子的形状像古代的金币。人们相信，吃饺子能给新的一年带来好运。艾玛包的第一个饺子太丑了，我们都笑了。"
      },
      {
        "text": "The next morning, my grandmother taught us paper cutting, which is a traditional art. She gave Emma a small pair of red scissors and some thin red paper. Emma cut a flower that looked almost real. My grandmother was so pleased that she put it on the window.",
        "translation": "第二天早上，奶奶教我们剪纸，剪纸是一门传统艺术。她给了艾玛一把红色的小剪刀和一些薄薄的红纸。艾玛剪出了一朵看起来几乎跟真的一样的花。奶奶高兴极了，把它贴在了窗户上。"
      },
      {
        "text": "In the afternoon, Emma showed us photos of her own family festival. She explained that Canadians celebrate Thanksgiving in autumn with a big dinner. Her family always eats turkey, which her father cooks for hours. My parents listened carefully and asked her many questions about Canada.",
        "translation": "下午，艾玛给我们看了她自己家过节的照片。她解释说，加拿大人在秋天庆祝感恩节，会吃一顿大餐。她家总会吃火鸡，那是她爸爸花好几个小时烤的。我父母听得很认真，还问了她很多关于加拿大的问题。"
      },
      {
        "text": "In the evening, we walked through the streets to see the lanterns. Thousands of red lanterns were hanging above us. The whole street looked like a river of light. Emma said that she finally understood why Chinese people love this festival. It was such a beautiful night that nobody wanted to go home.",
        "translation": "晚上，我们走上街头去看花灯。成千上万的红灯笼挂在我们头顶。整条街看起来就像一条光的河流。艾玛说她终于明白中国人为什么这么喜欢这个节日了。那个夜晚太美了，谁都不想回家。"
      },
      {
        "text": "Before she left, Emma wrote a short letter to my family. She said that she would teach her friends how to make dumplings. I learned that culture is not a wall between people. It is more like a bridge that everyone can cross.",
        "translation": "离开前，艾玛给我家写了一封短信。她说她会教她的朋友们怎么包饺子。我明白了，文化不是人与人之间的一堵墙。它更像一座每个人都能走过的桥。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does Emma's family eat at Thanksgiving?",
        "audioText": "What does Emma's family eat at Thanksgiving?",
        "options": [
          {
            "emoji": "🦃",
            "value": "turkey",
            "text": "Turkey"
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
        "answer": "turkey"
      },
      {
        "type": "word_builder",
        "word": "dumpling",
        "audioText": "dumpling"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "My",
          "mother",
          "showed",
          "us",
          "how",
          "to",
          "make",
          "dumplings"
        ],
        "audioText": "My mother showed us how to make dumplings."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "It was such a beautiful night ___ nobody wanted to go home.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "It was such a beautiful night that nobody wanted to go home."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Emma",
          "cut",
          "a",
          "flower",
          "that",
          "looked",
          "almost",
          "real"
        ],
        "audioText": "Emma cut a flower that looked almost real."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My grandmother taught us paper cutting, ___ is a traditional art.",
        "choices": [
          "which",
          "who",
          "what"
        ],
        "answer": "which",
        "audioText": "My grandmother taught us paper cutting, which is a traditional art."
      }
    ]
  },
  {
    "id": "zk-r6-s03",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 3,
    "title": "The Night We Made Dumplings",
    "titleCn": "包饺子的那个夜晚",
    "coverEmoji": "🥟",
    "paragraphs": [
      {
        "text": "Last winter, my Australian friend Emma came to my home for the Spring Festival. She is an exchange student who studies in our city. Before that night, she had never seen how Chinese families welcome the new year. She kept asking me what this festival really meant to us.",
        "translation": "去年冬天，我澳大利亚的朋友艾玛来我家过春节。她是一位在我们这座城市学习的交换生。在那一晚之前，她从未见过中国家庭是怎样迎接新年的。她不停地问我，这个节日对我们究竟意味着什么。"
      },
      {
        "text": "My grandmother said that dumplings were the most important food of the evening. Emma watched her old hands very carefully. She showed us how she rolled the thin wrappers with a small wooden stick. The kitchen was so warm that we all took off our heavy coats.",
        "translation": "奶奶说，饺子是那天晚上最重要的食物。艾玛非常仔细地看着奶奶那双苍老的手。她给我们演示怎样用小木棍把薄薄的饺子皮擀出来。厨房里太暖和了，我们都脱下了厚外套。"
      },
      {
        "text": "Emma's first dumpling looked like a small stone that nobody wanted to eat. My little brother laughed so loudly that my mother told him to be quiet. Emma laughed too and tried again. Her second one stood on the plate like a real white moon.",
        "translation": "艾玛包的第一个饺子看起来像一块谁都不想吃的石头。我弟弟笑得那么大声，妈妈让他安静点。艾玛也笑了，又重新试了一次。她包的第二个稳稳地立在盘子里，像一轮真正的白月亮。"
      },
      {
        "text": "While we were eating, Emma told us that Christmas in Australia happens in hot summer. People swim at the beach and have a picnic which lasts all afternoon. I was surprised to hear that her family eats cold fruit instead of hot soup. A festival can look completely different in another part of the world.",
        "translation": "我们吃饭的时候，艾玛告诉我们，澳大利亚的圣诞节是在炎热的夏天。人们去海边游泳，还会来一场持续整个下午的野餐。我惊讶地听说，她家里吃的是冰凉的水果，而不是热汤。在世界的另一个地方，同一个节日可以看起来完全不一样。"
      },
      {
        "text": "The dumplings were so delicious that Emma ate twenty of them in ten minutes. She said it was such a wonderful night that she would never forget it. Before she left, she asked my grandmother to teach her the recipe. My grandmother smiled and promised to send it to her by email.",
        "translation": "饺子太好吃了，艾玛十分钟里就吃了二十个。她说这是一个如此美妙的夜晚，她永远都不会忘记。临走前，她请奶奶教她这道食谱。奶奶笑着答应，说会用电子邮件把食谱发给她。"
      },
      {
        "text": "Now Emma and I often talk about the festivals which we celebrate in our own countries. I have learned that a tradition is a language which everyone can understand. It does not matter where you come from or what you eat on that day. What matters is the warm feeling that we share with other people.",
        "translation": "现在我和艾玛常常聊起各自国家庆祝的节日。我明白了，传统是一种人人都能理解的语言。你来自哪里、那天吃些什么，都不重要。重要的是我们与别人一起分享的那份温暖的感觉。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Emma learn to make with her friend's family?",
        "audioText": "What did Emma learn to make with her friend's family?",
        "options": [
          {
            "emoji": "🥟",
            "value": "dumplings",
            "text": "Dumplings"
          },
          {
            "emoji": "🍰",
            "value": "cake",
            "text": "Cake"
          },
          {
            "emoji": "🍜",
            "value": "noodles",
            "text": "Noodles"
          }
        ],
        "answer": "dumplings"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "My grandmother said ___ dumplings were the most important food of the evening.",
        "choices": [
          "that",
          "what",
          "which"
        ],
        "answer": "that",
        "audioText": "My grandmother said that dumplings were the most important food of the evening."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Emma",
          "watched",
          "her",
          "old",
          "hands",
          "very",
          "carefully."
        ],
        "audioText": "Emma watched her old hands very carefully."
      },
      {
        "type": "word_builder",
        "word": "festival",
        "audioText": "festival"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She is an exchange student ___ studies in our city.",
        "choices": [
          "who",
          "which",
          "what"
        ],
        "answer": "who",
        "audioText": "She is an exchange student who studies in our city."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Emma",
          "laughed",
          "too",
          "and",
          "tried",
          "again."
        ],
        "audioText": "Emma laughed too and tried again."
      }
    ]
  },
  {
    "id": "zk-r6-s04",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 4,
    "title": "Mooncakes and Maple Syrup",
    "titleCn": "月饼与枫糖浆",
    "coverEmoji": "🥮",
    "paragraphs": [
      {
        "text": "Emma is a Canadian exchange student who came to China last month. She lives with a friendly Chinese family in the old city of Nanjing. She loves trying new food, so she was excited about the coming festival. When she learned that the Mid-Autumn Festival was near, she smiled.",
        "translation": "艾玛是一名加拿大的交换生，上个月来到中国。她现在住在南京老城区一个友善的中国家庭里。她喜欢尝试新食物，所以对即将到来的节日充满期待。当她得知中秋节快到了，她开心地笑了。"
      },
      {
        "text": "On the morning of the festival, Grandma Wang asked Emma to help make mooncakes. Emma did not know that mooncakes are made by hand in many Chinese homes. The old lady showed her how to press sweet bean paste into a small round shape. The mooncakes were so beautiful that Emma took photos with her phone. Grandma said that the round shape stands for family and good luck.",
        "translation": "节日那天早上，王奶奶叫艾玛一起做月饼。艾玛并不知道，在中国许多家庭里月饼都是手工做的。这位老奶奶教她怎样把甜甜的豆沙压成一个小小的圆形。月饼做得太漂亮了，艾玛忍不住用手机拍了好几张照片。奶奶说，圆圆的形状代表着团圆和好运。"
      },
      {
        "text": "In the evening, the whole family sat in the yard to enjoy the full moon. The moon was round and bright. Emma learned that people eat mooncakes while they watch the moon together. Grandma told a story which Emma had never heard before. Emma listened carefully and wrote some notes in her little notebook.",
        "translation": "傍晚，全家人坐在院子里赏月。那天的月亮又圆又亮。艾玛了解到，人们会一边吃月饼，一边一起赏月。奶奶讲了一个故事，艾玛以前从没听过。她听得很认真，还在小本子上记了些笔记。"
      },
      {
        "text": "Then Emma wanted to share something from her own country. She took out a small bottle of maple syrup which her mother had sent her. She explained that Canadians put it on pancakes and bread in the morning. The family loved the sweet taste. Emma felt so happy that she almost forgot she was far from home.",
        "translation": "然后，艾玛想分享一些自己国家的东西。她拿出一小瓶妈妈寄来的枫糖浆。她解释说，加拿大人早上会把它涂在薄煎饼和面包上。全家人都很喜欢这种甜甜的味道。艾玛高兴得几乎忘了自己离家很远。"
      },
      {
        "text": "Different countries have different festivals, food and traditional skills. However, people everywhere enjoy sharing food with the ones they love. Emma realised that a small taste of home can build a bridge between cultures. She decided that she would learn more about Chinese traditions.",
        "translation": "不同的国家有不同的节日、食物和传统技艺。不过，世界各地的人们都喜欢和所爱的人分享食物。艾玛意识到，一点点家乡的味道就能在不同文化之间搭起一座桥。她决定要更多地了解中国的传统。"
      },
      {
        "text": "Before she went to bed, Emma wrote a short message to her parents. She told them that she had made mooncakes with her Chinese family. She also said that she would cook Chinese food for them one day.",
        "translation": "睡觉前，艾玛给父母写了一条短短的留言。她告诉他们，她和中国家人一起做了月饼。她还说，有一天她要给他们做中国菜。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Which food did Emma help to make with Grandma Wang?",
        "audioText": "Which food did Emma help to make with Grandma Wang?",
        "options": [
          {
            "emoji": "🥮",
            "value": "mooncake",
            "text": "Mooncakes"
          },
          {
            "emoji": "🍞",
            "value": "bread",
            "text": "Bread"
          },
          {
            "emoji": "🍜",
            "value": "noodles",
            "text": "Noodles"
          }
        ],
        "answer": "mooncake"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She took out a small bottle of maple syrup ___ her mother had sent her.",
        "choices": [
          "which",
          "who",
          "what"
        ],
        "answer": "which",
        "audioText": "She took out a small bottle of maple syrup which her mother had sent her."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "moon",
          "was",
          "round",
          "and",
          "bright."
        ],
        "audioText": "The moon was round and bright."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The mooncakes were so beautiful ___ Emma took photos with her phone.",
        "choices": [
          "that",
          "which",
          "because"
        ],
        "answer": "that",
        "audioText": "The mooncakes were so beautiful that Emma took photos with her phone."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Emma",
          "took",
          "photos",
          "with",
          "her",
          "phone."
        ],
        "audioText": "Emma took photos with her phone."
      },
      {
        "type": "word_builder",
        "word": "mooncake",
        "audioText": "mooncake"
      }
    ]
  },
  {
    "id": "zk-r6-s05",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 5,
    "title": "Scissors and Smiles",
    "titleCn": "剪刀与微笑",
    "coverEmoji": "✂️",
    "paragraphs": [
      {
        "text": "Last spring, our school held a culture week that brought many interesting activities. That afternoon, an exchange student from Canada named Anna joined our paper-cutting class. She said that she had never seen such beautiful paper art before.",
        "translation": "去年春天，我们学校举办了文化周，带来了许多有趣的活动。那天下午，一位来自加拿大、名叫安娜的交换生加入了我们的剪纸课。她说，她以前从未见过这么美的纸艺作品。"
      },
      {
        "text": "Our teacher, Ms. Li, showed us a paper flower which she had made herself. The flower was so lovely that everyone in the room kept quiet for a moment. Then we tried to cut our own shapes with red paper and small scissors.",
        "translation": "我们的老师李老师给我们看了一朵她自己剪的纸花。这朵花太可爱了，屋里每个人都安静了一会儿。然后我们试着用红纸和小剪刀剪出自己想要的形状。"
      },
      {
        "text": "Anna's first flower looked like a strange star. She laughed and said that paper-cutting was much harder than it looked. I told her that my grandmother, who lives in the countryside, could cut a fish in two minutes.",
        "translation": "安娜剪的第一朵花看起来像一颗奇怪的星星。她笑着说，剪纸比看起来难多了。我告诉她，我奶奶住在乡下，两分钟就能剪出一条鱼。"
      },
      {
        "text": "After class, Anna asked me whether she could visit my home. She wanted to meet my grandmother and learn the old skill. My grandmother was happy, and she gave Anna a small red fish. It was such a wonderful afternoon that nobody wanted to go home.",
        "translation": "下课后，安娜问我能不能去我家玩。她想见见我奶奶，学一学这门老手艺。奶奶很高兴，送给安娜一条小红鱼。那个下午太美好了，谁都不想回家。"
      },
      {
        "text": "Anna put the paper fish on her desk at school. Her classmates asked her where it came from. She told them that it was a gift which carried a thousand years of Chinese stories.",
        "translation": "安娜把纸鱼放在学校她的桌子上。同学们问她这是从哪儿来的。她告诉大家，这是一件礼物，里面装着中国上千年的故事。"
      },
      {
        "text": "Now I understand that culture is something we can share with our hands. A pair of scissors and a piece of red paper can bring people together. That is what our culture week taught me.",
        "translation": "现在我明白了，文化是可以用双手分享的东西。一把剪刀、一张红纸，就能把人们聚在一起。这就是文化周教会我的道理。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Anna get from the grandmother?",
        "audioText": "What did Anna get from the grandmother?",
        "options": [
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "A paper flower"
          },
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A paper fish"
          },
          {
            "emoji": "⭐",
            "value": "star",
            "text": "A paper star"
          }
        ],
        "answer": "fish"
      },
      {
        "type": "word_builder",
        "word": "scissors",
        "audioText": "scissors"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Anna's",
          "first",
          "flower",
          "looked",
          "like",
          "a",
          "strange",
          "star."
        ],
        "audioText": "Anna's first flower looked like a strange star."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She said that she had never seen ___ beautiful paper art before.",
        "choices": [
          "such",
          "so",
          "very"
        ],
        "answer": "such",
        "audioText": "She said that she had never seen such beautiful paper art before."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Her",
          "classmates",
          "asked",
          "her",
          "where",
          "it",
          "came",
          "from."
        ],
        "audioText": "Her classmates asked her where it came from."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She told them that it was a gift ___ carried a thousand years of Chinese stories.",
        "choices": [
          "which",
          "who",
          "where"
        ],
        "answer": "which",
        "audioText": "She told them that it was a gift which carried a thousand years of Chinese stories."
      }
    ]
  },
  {
    "id": "zk-r6-s06",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 6,
    "title": "A Lesson in Paper Cutting",
    "titleCn": "一堂剪纸课",
    "coverEmoji": "✂️",
    "paragraphs": [
      {
        "text": "Paper cutting is a traditional Chinese art that is more than 1,500 years old. People use red paper and a pair of scissors to make beautiful pictures. I once thought it was so easy that anyone could do it in a minute.",
        "translation": "剪纸是一门古老的中国传统艺术，已经有一千五百多年的历史。人们用红纸和一把剪刀，剪出美丽的图案。我曾以为它太简单了，谁都能一分钟就学会。"
      },
      {
        "text": "Last spring, an American exchange student named Emma came to our town. She told me that she wanted to learn something truly Chinese. So I took her to Grandma Li, who has cut paper for over fifty years.",
        "translation": "去年春天，一位名叫艾玛的美国交换生来到我们镇上。她告诉我，她想学一点真正有中国味道的东西。于是我把她带到了李奶奶家——李奶奶剪纸已经剪了五十多年。"
      },
      {
        "text": "Grandma Li showed us a box which was full of paper flowers, birds and fish. \"Each picture carries a wish,\" she said. \"Fish mean wealth, and flowers mean a happy life.\" Emma said that she couldn't believe how lively a piece of paper could be.",
        "translation": "李奶奶给我们看了一个盒子，里面装满了纸剪的花、鸟和鱼。“每一幅图案都带着一份心愿，”她说。“鱼代表富足，花代表幸福的生活。”艾玛说，她简直不敢相信一张纸能这样活灵活现。"
      },
      {
        "text": "Emma picked up the scissors and tried to cut a fish. Her first fish was such a strange shape that we all laughed. But Emma did not give up. Grandma Li held her hand and smiled. \"Patience matters more than speed,\" she said.",
        "translation": "艾玛拿起剪刀，试着剪一条鱼。她的第一条鱼形状太奇怪了，我们都笑了起来。但艾玛没有放弃。李奶奶握住她的手，笑了。“耐心比速度更重要，”她说。"
      },
      {
        "text": "After two hours, Emma finally cut out a real fish. It was not perfect, but Grandma Li said that it was the best one that day. Emma smiled and put it into her pocket carefully.",
        "translation": "两个小时后，艾玛终于剪出了一条真正的鱼。它并不完美，但李奶奶说，这是那天她见过最好的一条。艾玛笑了，小心地把它放进了口袋。"
      },
      {
        "text": "Before she left, Emma said that she would hang it in her room in New York. Now I understand that culture travels quietly, like a small red fish.",
        "translation": "临走前，艾玛说她会把它挂在自己纽约的房间里。现在我明白了：文化会静静地流动，就像一条小小的红鱼。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Emma finally cut out of paper?",
        "audioText": "What did Emma finally cut out of paper?",
        "options": [
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "Fish"
          },
          {
            "emoji": "🌸",
            "value": "flower",
            "text": "Flower"
          },
          {
            "emoji": "🐦",
            "value": "bird",
            "text": "Bird"
          }
        ],
        "answer": "fish"
      },
      {
        "type": "word_builder",
        "word": "scissors",
        "audioText": "scissors"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Her first fish was ___ a strange shape that we all laughed.",
        "choices": [
          "such",
          "so",
          "very"
        ],
        "answer": "such",
        "audioText": "Her first fish was such a strange shape that we all laughed."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "So I took her to Grandma Li, ___ has cut paper for over fifty years.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "So I took her to Grandma Li, who has cut paper for over fifty years."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Grandma",
          "Li",
          "held",
          "her",
          "hand",
          "and",
          "smiled"
        ],
        "audioText": "Grandma Li held her hand and smiled."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "But",
          "Emma",
          "did",
          "not",
          "give",
          "up"
        ],
        "audioText": "But Emma did not give up."
      }
    ]
  },
  {
    "id": "zk-r6-s07",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 7,
    "title": "Scissors That Brought Us Together",
    "titleCn": "把我们连在一起的剪刀",
    "coverEmoji": "✂️",
    "paragraphs": [
      {
        "text": "Last month, a girl from London came to our school and joined our class. Her name is Anna, and she told us that she loved Chinese culture. Our teacher said that each of us should show her one traditional Chinese art. I chose paper cutting, which my grandmother had taught me when I was small.",
        "translation": "上个月，一个来自伦敦的女孩来到我们学校，加入了我们班。她叫安娜，她告诉我们她很喜欢中国文化。老师说，我们每个人都应该向她展示一门中国传统艺术。我选了剪纸，那是我小时候奶奶教我的。"
      },
      {
        "text": "Paper cutting is a Chinese art that is more than a thousand years old. People use small scissors to cut red paper into flowers, animals and words. My grandmother said that red paper brings good luck to every family. She was such a patient teacher that I soon fell in love with the art.",
        "translation": "剪纸是一门有一千多年历史的中国艺术。人们用小剪刀把红纸剪成花朵、动物和文字。奶奶说，红纸会给每个家庭带来好运。她是一位非常有耐心的老师，我很快就爱上了这门艺术。"
      },
      {
        "text": "On Friday afternoon, I put my scissors and some red paper on the desk. Anna sat next to me, and her eyes were full of questions and excitement. I showed her how to fold the paper and where to cut carefully. She was so excited that she cut the first shape without waiting for me.",
        "translation": "周五下午，我把剪刀和一些红纸放在桌上。安娜坐在我旁边，眼里满是好奇和兴奋。我教她怎么折纸，在哪儿下剪刀要小心。她太兴奋了，还没等我反应过来就剪出了第一个图形。"
      },
      {
        "text": "Her first piece looked like a strange bird. It was such a difficult skill that she wanted to give up at once. I told her that nobody could cut a perfect flower in one minute. She laughed, took a new piece of paper and tried again very slowly.",
        "translation": "她的第一件作品看起来像一只奇怪的鸟。这门手艺太难了，她一下子就想放弃。我告诉她，没有人能在一分钟内剪出一朵完美的花。她笑了，拿起一张新纸，又非常慢慢地试了一次。"
      },
      {
        "text": "Half an hour later, a beautiful butterfly appeared in her two hands. She held up the butterfly and asked me what it meant in China. I told her the answer with a smile. In China, a butterfly stands for love and a happy life. Anna said that she would teach this art to her friends in London.",
        "translation": "半小时后，一只美丽的蝴蝶出现在她手中。她把蝴蝶举起来，问我它在中国是什么意思。我笑着告诉了她答案。在中国，蝴蝶象征着爱与幸福的生活。安娜说，她会把这门手艺教给伦敦的朋友们。"
      },
      {
        "text": "Before she left, she gave me a card with a small paper flower on it. I now understand that culture is like paper cutting, which needs patience and care. When we share what we love, the world becomes a warmer and smaller place. Anna and I are still friends, and our scissors cut a bridge between us.",
        "translation": "临走前，她送给我一张卡片，上面贴着一朵小小的纸花。现在我明白了，文化就像剪纸，需要耐心和用心。当我们分享自己热爱的东西时，世界会变得更温暖、更小。安娜和我现在还是朋友，我们的剪刀在我们之间剪出了一座桥。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the writer use to cut the red paper?",
        "audioText": "What did the writer use to cut the red paper?",
        "options": [
          {
            "emoji": "✂️",
            "value": "scissors",
            "text": "Scissors"
          },
          {
            "emoji": "🔪",
            "value": "knife",
            "text": "Knife"
          },
          {
            "emoji": "🖌️",
            "value": "brush",
            "text": "Brush"
          }
        ],
        "answer": "scissors"
      },
      {
        "type": "word_builder",
        "word": "butterfly",
        "audioText": "butterfly"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Her",
          "first",
          "piece",
          "looked",
          "like",
          "a",
          "strange",
          "bird."
        ],
        "audioText": "Her first piece looked like a strange bird."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "told",
          "her",
          "the",
          "answer",
          "with",
          "a",
          "smile."
        ],
        "audioText": "I told her the answer with a smile."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She was ___ excited that she cut the first shape without waiting for me.",
        "choices": [
          "very",
          "so",
          "such"
        ],
        "answer": "so",
        "audioText": "She was so excited that she cut the first shape without waiting for me."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "I told her ___ nobody could cut a perfect flower in one minute.",
        "choices": [
          "which",
          "that",
          "what"
        ],
        "answer": "that",
        "audioText": "I told her that nobody could cut a perfect flower in one minute."
      }
    ]
  },
  {
    "id": "zk-r6-s08",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 8,
    "title": "Sweet Art on a Stick",
    "titleCn": "甜蜜的糖画艺术",
    "coverEmoji": "🍬",
    "paragraphs": [
      {
        "text": "Last spring, I visited a beautiful park in Chengdu with my cousin. Near the old gate, we saw a man who was making art with hot sugar. A crowd of children stood around him, and nobody wanted to leave. I had never seen anything like it before that afternoon.",
        "translation": "去年春天，我和表哥去了成都一个美丽的公园。在古老的公园门口附近，我们看到一个人正在用热糖作画。一群孩子围在他身边，没有人愿意离开。在那天下午之前，我从未见过这样的场景。"
      },
      {
        "text": "The man held a small spoon which was full of hot, golden sugar. He moved his hand quickly over a smooth white board. In less than a minute, a beautiful dragon appeared on it. The sugar was so hot that it looked like shining gold in the sun. Then he pressed a thin stick onto the dragon, and it could stand up.",
        "translation": "那个人拿着一把小勺子，里面装满了滚烫的金黄色糖稀。他的手在一块光滑的白板上飞快地移动。不到一分钟，一条美丽的龙就出现在上面。糖太烫了，在阳光下看起来像闪闪发光的金子。然后他把一根细木棍按在龙上，糖龙就能立起来了。"
      },
      {
        "text": "Making sugar paintings is not easy. The artist must work fast, because the sugar becomes hard when it cools. If he moves too slowly, the picture will break into small pieces. He told me that he started to learn this skill when he was ten. For him, every painting is a gift that he gives to others.",
        "translation": "做糖画并不容易。糖画艺人必须动作很快，因为糖一凉就会变硬。如果他动作太慢，画就会碎成小块。他告诉我，他十岁就开始学习这门手艺了。对他来说，每一幅画都是送给别人的礼物。"
      },
      {
        "text": "I asked him what the dragon meant in Chinese culture. He smiled and said that it stood for good luck and power. He also explained that many people love sugar paintings because they are sweet and beautiful. I understood what he wanted to tell me.",
        "translation": "我问他龙在中国文化里意味着什么。他笑着说，龙代表着好运和力量。他还解释说，很多人喜欢糖画，因为它们又甜又美。我明白了他想告诉我的意思。"
      },
      {
        "text": "A young woman from Canada was standing next to me. She said that she had never seen such a clever artist before. She took many photos and asked the man to draw a panda for her. It was such a lovely picture that everyone around clapped their hands.",
        "translation": "一位来自加拿大的年轻女子站在我旁边。她说她以前从未见过这么聪明的艺人。她拍了很多照片，还请那个人给她画了一只熊猫。那幅画太可爱了，周围的人都鼓起了掌。"
      },
      {
        "text": "Before I left, I bought a small sugar bird for myself. It looked so lovely that I did not want to eat it. Now I often think about the man whose hands can turn sugar into art. Traditions like this are the reason why I love Chinese culture.",
        "translation": "离开之前，我给自己买了一只小糖鸟。它看起来太可爱了，我都舍不得吃。现在，我常常想起那个能用糖变成艺术的人。像这样的传统，正是我热爱中国文化的原因。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the man draw on the white board in less than a minute?",
        "audioText": "What did the man draw on the white board in less than a minute?",
        "options": [
          {
            "emoji": "🐉",
            "value": "dragon",
            "text": "A dragon"
          },
          {
            "emoji": "🐼",
            "value": "panda",
            "text": "A panda"
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
        "word": "artist",
        "audioText": "artist"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "I",
          "understood",
          "what",
          "he",
          "wanted",
          "to",
          "tell",
          "me."
        ],
        "audioText": "I understood what he wanted to tell me."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Making",
          "sugar",
          "paintings",
          "is",
          "not",
          "easy."
        ],
        "audioText": "Making sugar paintings is not easy."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The sugar was so hot ___ it looked like shining gold in the sun.",
        "choices": [
          "that",
          "which",
          "because"
        ],
        "answer": "that",
        "audioText": "The sugar was so hot that it looked like shining gold in the sun."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Now I often think about the man ___ hands can turn sugar into art.",
        "choices": [
          "who",
          "whose",
          "which"
        ],
        "answer": "whose",
        "audioText": "Now I often think about the man whose hands can turn sugar into art."
      }
    ]
  },
  {
    "id": "zk-r6-s09",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 9,
    "title": "When Tea Travels the World",
    "titleCn": "当茶走向世界",
    "coverEmoji": "🍵",
    "paragraphs": [
      {
        "text": "My cousin Emma came from London last spring to see how Chinese people live. I told her that our small town was famous for its green tea. She smiled and said that she drank tea every day in England too.",
        "translation": "去年春天，我的表姐艾玛从伦敦来，想看看中国人是怎样生活的。我告诉她，我们的小镇以绿茶闻名。她笑着说，她在英国也每天都喝茶。"
      },
      {
        "text": "On the first morning, we walked up a hill which was covered with tea bushes. An old farmer showed us how to pick the young leaves that grow at the top. Emma learned so quickly that the farmer praised her in front of everyone. It was such a clear morning that we could see the hills far away.",
        "translation": "第一天早上，我们爬上一座长满茶树的小山。一位老农教我们采摘长在顶端的新叶。艾玛学得特别快，老农当着大家的面夸奖了她。那是一个如此晴朗的早晨，我们连远处的山丘都能看见。"
      },
      {
        "text": "The farmer then invited us into his little house, where he taught us how to make tea. He told us that the water should not be too hot. We watched him pour the tea into small cups that were as white as snow. The smell was so sweet that Emma closed her eyes and took a deep breath.",
        "translation": "随后，老农把我们请进他的小屋，在那里教我们怎样泡茶。他告诉我们，水不能太烫。我们看着他往白得像雪一样的小杯子里倒茶。那香味如此清甜，艾玛闭上眼睛深深吸了一口气。"
      },
      {
        "text": "Then Emma asked whether she could make tea in her own way. She added milk and sugar, which surprised the farmer at first. She explained that most people in Britain drink tea with milk. The farmer laughed and said that he had never tried it.",
        "translation": "接着，艾玛问她能不能按自己的方式泡茶。她加了牛奶和糖，这让老农一开始很惊讶。她解释说，英国大多数人喝茶都加牛奶。老农笑了，说他从没这样试过。"
      },
      {
        "text": "When he tasted Emma's tea, he nodded and said it was not bad at all. The tea tasted light and fresh. I realized that tea is a drink which connects people from different countries. Emma said that she would take some green tea home for her family. We were both so happy that we forgot the time.",
        "translation": "他尝过艾玛的茶后，点点头说味道其实很不错。那茶喝起来清淡又清新。我意识到，茶是一种把不同国家的人联系在一起的饮品。艾玛说她要带些绿茶回家给家人。我们俩都那么开心，把时间都忘了。"
      },
      {
        "text": "That evening, we sat by the window and talked about the journey of tea. Emma told me that tea had traveled from China to the world hundreds of years ago. A drink which begins in one country can become a friend of many others. A cup of tea is a small bridge.",
        "translation": "那天傍晚，我们坐在窗边，聊起了茶的旅程。艾玛告诉我，几百年前茶就从中国传到了世界各地。一种起源于一个国家的饮品，可以成为许多人的朋友。一杯茶就是一座小小的桥。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did Emma add to her tea?",
        "audioText": "What did Emma add to her tea?",
        "options": [
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          },
          {
            "emoji": "🍋",
            "value": "lemon",
            "text": "Lemon"
          },
          {
            "emoji": "🍯",
            "value": "honey",
            "text": "Honey"
          }
        ],
        "answer": "milk"
      },
      {
        "type": "word_builder",
        "word": "bridge",
        "audioText": "bridge"
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She added milk and ___, which surprised the farmer at first.",
        "choices": [
          "sugar",
          "salt",
          "honey"
        ],
        "answer": "sugar",
        "audioText": "She added milk and sugar, which surprised the farmer at first."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "tea",
          "tasted",
          "light",
          "and",
          "fresh."
        ],
        "audioText": "The tea tasted light and fresh."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The smell was ___ sweet that Emma closed her eyes and took a deep breath.",
        "choices": [
          "so",
          "such",
          "too"
        ],
        "answer": "so",
        "audioText": "The smell was so sweet that Emma closed her eyes and took a deep breath."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "A",
          "cup",
          "of",
          "tea",
          "is",
          "a",
          "small",
          "bridge."
        ],
        "audioText": "A cup of tea is a small bridge."
      }
    ]
  },
  {
    "id": "zk-r6-s10",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 10,
    "title": "Two Cups of Tea",
    "titleCn": "两杯茶，一样暖",
    "coverEmoji": "🍵",
    "paragraphs": [
      {
        "text": "For thousands of years, Chinese people have been drinking tea every day. My aunt often says that a cup of tea is a way of life. She told me that the first cup should always go to a guest. In her kitchen, there are always several kinds of tea on the shelf.",
        "translation": "几千年来，中国人每天都喝茶。我的姑姑常说，一杯茶就是一种生活方式。她告诉过我，第一杯茶应该先给客人。在她家的厨房里，架子上总是放着好几种茶。"
      },
      {
        "text": "Last month, an exchange student from London came to stay with us. Her name is Emma, who had never tasted real Chinese tea before. My aunt welcomed her with a small purple teapot that she kept for special visitors.",
        "translation": "上个月，一位来自伦敦的交换生来我们家住。她叫艾玛，以前从没喝过真正的中国茶。姑姑用一只紫色的小茶壶招待她，那是她专门留给特别客人的。"
      },
      {
        "text": "First, my aunt showed Emma how to make tea in the Chinese way. She put a few green leaves into the small teapot. Then she poured hot water over them. The water was so hot that the lovely smell filled the whole room. Emma watched everything carefully and wrote it down in her notebook.",
        "translation": "首先，姑姑教艾玛怎样按中国人的方式泡茶。她把几片绿叶放进小茶壶里，然后往上面倒热水。水那么烫，好闻的茶香一下子充满了整个房间。艾玛认真地观察着一切，并把它记在了笔记本上。"
      },
      {
        "text": "Then Emma told us something that surprised everyone at the table. In Britain, she said, people usually drink tea with milk and sugar. Her grandmother makes such a strong black tea that it can wake you up at once. In her country, tea is often served with small cakes at four o'clock.",
        "translation": "接着，艾玛讲了一件让在座所有人都感到意外的事。她说，在英国，人们通常在茶里加牛奶和糖。她的奶奶泡的红茶特别浓，喝一口就能让你立刻清醒。在她的国家，下午四点人们常常一边喝茶一边吃小蛋糕。"
      },
      {
        "text": "My aunt asked whether Emma liked the green tea. Emma smiled and nodded happily. She said that the green tea tasted like spring itself. The two drinks are different, but the warm feeling is the same.",
        "translation": "姑姑问艾玛喜不喜欢这杯绿茶。艾玛开心地笑着点了点头。她说这绿茶尝起来就像春天一样。两种茶味道不同，但那份温暖的感觉是一样的。"
      },
      {
        "text": "Before Emma went back to London, my aunt gave her a small box of tea. She had kept it for months and wanted Emma to take it home. Emma promised that she would make a cup of it for her family. Now she sends us photos of her afternoon tea, which always makes my aunt laugh.",
        "translation": "艾玛回伦敦之前，姑姑送给她一小盒茶叶。那是姑姑留了好几个月的，她想让艾玛把它带回家。艾玛答应会给家人泡上一杯。现在她常常给我们发她下午茶的照片，每次都能把姑姑逗笑。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In Britain, what do people usually put into their tea?",
        "audioText": "In Britain, what do people usually put into their tea?",
        "options": [
          {
            "emoji": "🥛",
            "value": "milk",
            "text": "Milk"
          },
          {
            "emoji": "🍋",
            "value": "lemon",
            "text": "Lemon"
          },
          {
            "emoji": "🧂",
            "value": "salt",
            "text": "Salt"
          }
        ],
        "answer": "milk"
      },
      {
        "type": "word_builder",
        "word": "teapot",
        "audioText": "teapot"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Then",
          "she",
          "poured",
          "hot",
          "water",
          "over",
          "them."
        ],
        "audioText": "Then she poured hot water over them."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Emma",
          "smiled",
          "and",
          "nodded",
          "happily."
        ],
        "audioText": "Emma smiled and nodded happily."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The water was ___ hot that the lovely smell filled the whole room.",
        "choices": [
          "so",
          "such",
          "much"
        ],
        "answer": "so",
        "audioText": "The water was so hot that the lovely smell filled the whole room."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Her name is Emma, ___ had never tasted real Chinese tea before.",
        "choices": [
          "who",
          "which",
          "whose"
        ],
        "answer": "who",
        "audioText": "Her name is Emma, who had never tasted real Chinese tea before."
      }
    ]
  },
  {
    "id": "zk-r6-s11",
    "track": "zhongkao",
    "regionId": "zk-r6",
    "order": 11,
    "title": "The Kite That Crossed the Sea",
    "titleCn": "飞过大海的风筝",
    "coverEmoji": "🪁",
    "paragraphs": [
      {
        "text": "Every spring, the sky over Weifang in Shandong becomes a colourful sea of kites. People say that Weifang is the city where kites were born in China. My grandpa is a kite maker who has worked with bamboo for over forty years. He often tells me that a kite is art, not just a toy.",
        "translation": "每年春天，山东潍坊的天空就变成一片五颜六色的风筝海洋。人们说，潍坊是中国风筝诞生的城市。我的爷爷是一位风筝匠人，他和竹子打了四十多年交道。他常对我说，风筝是艺术，而不只是玩具。"
      },
      {
        "text": "This year, a student from Canada named Emma came to our school. She was so interested in Chinese culture that she asked me to teach her something traditional. I decided to show her my grandpa's kites. When she saw the thin bamboo sticks, she said that they looked like small wings.",
        "translation": "今年，一位来自加拿大的学生艾玛来到了我们学校。她对中国文化如此感兴趣，以至于请我教她一些传统的东西。我决定带她去看我爷爷做的风筝。看到那些细细的竹条时，她说它们看起来像小翅膀。"
      },
      {
        "text": "Grandpa taught us that the first step is to cut the bamboo into thin pieces. Emma learned quickly, and the kite which we made together had a red fish on it. Grandpa explained that in China a fish stands for having more than enough. Emma smiled and said that she had never seen such a beautiful fish.",
        "translation": "爷爷教我们，第一步是把竹子削成细细的竹条。艾玛学得很快，我们一起做的那只风筝上画着一条红鱼。爷爷解释说，在中国，鱼代表着年年有余。艾玛笑着说，她从没见过这么漂亮的鱼。"
      },
      {
        "text": "We took our kite to the park on a windy afternoon. Emma ran so fast that her hat flew off her head. The little fish rose into the sky. Everyone around us began to cheer, and Emma shouted that it was the most wonderful thing that she had ever done.",
        "translation": "一个刮风的下午，我们把风筝带到了公园。艾玛跑得太快，帽子都从头上飞掉了。那条小鱼升上了天空。我们周围的人都欢呼起来，艾玛喊道，这是她做过的最棒的事。"
      },
      {
        "text": "Before Emma went back to Canada, she wrote a letter to my grandpa. In the letter, she said that she would build a kite club in her own school. She also sent us a photo which showed her first kite flying over a lake near her home. Grandpa smiled and told me that culture is like the wind. We cannot see it, but it can carry us far away.",
        "translation": "艾玛回加拿大之前，给我爷爷写了一封信。信中她说，她要在自己的学校办一个风筝社团。她还给我们寄来一张照片，照片上她的第一只风筝正飞在她家附近的湖面上空。爷爷笑着告诉我，文化就像风。我们看不见它，但它能带我们去很远的地方。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "In the story, what was on the kite that Emma and the writer made together?",
        "audioText": "In the story, what was on the kite that Emma and the writer made together?",
        "options": [
          {
            "emoji": "🐟",
            "value": "fish",
            "text": "A red fish"
          },
          {
            "emoji": "🐉",
            "value": "dragon",
            "text": "A dragon"
          },
          {
            "emoji": "🦋",
            "value": "butterfly",
            "text": "A butterfly"
          }
        ],
        "answer": "fish"
      },
      {
        "type": "word_builder",
        "word": "culture",
        "audioText": "culture"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "little",
          "fish",
          "rose",
          "into",
          "the",
          "sky."
        ],
        "audioText": "The little fish rose into the sky."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Culture",
          "is",
          "like",
          "the",
          "wind."
        ],
        "audioText": "Culture is like the wind."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "She was so interested in Chinese culture ___ she asked me to teach her something traditional.",
        "choices": [
          "that",
          "which",
          "what"
        ],
        "answer": "that",
        "audioText": "She was so interested in Chinese culture that she asked me to teach her something traditional."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The kite ___ we made together had a red fish on it.",
        "choices": [
          "which",
          "who",
          "whose"
        ],
        "answer": "which",
        "audioText": "The kite which we made together had a red fish on it."
      }
    ]
  },
  {
    "id": "zk-r7-s01",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 1,
    "title": "The City We Share",
    "titleCn": "我们共享的城市",
    "coverEmoji": "🚲",
    "paragraphs": [
      {
        "text": "In our city, thousands of people use the same buses, parks and shared bikes every day. Sharing these things sounds simple, but it quietly tests how we treat other people.",
        "translation": "在我们这座城市里，成千上万的人每天使用同样的公交车、公园和共享单车。共享这些东西听起来很简单，但它却在悄悄检验我们如何对待他人。"
      },
      {
        "text": "Last week, I saw a young man leave his shared bike in the middle of the road. An old woman with a heavy bag had to walk around it slowly. Nobody said anything, but everybody noticed.",
        "translation": "上周，我看见一个年轻人把共享单车停在了路中间。一位提着沉重袋子的老奶奶只好慢慢地绕过去。没有人说什么，但每个人都看到了。"
      },
      {
        "text": "Why does this happen so often in a busy city? Perhaps he was in a hurry and simply forgot other people. I wish everyone could think about the person behind them.",
        "translation": "在繁忙的城市里，为什么这种事常常发生呢？也许他赶时间，只是忘了还有别人。我真希望每个人都能想到自己身后的人。"
      },
      {
        "text": "Rules do not take our freedom away; they are the reason we can share. A rule tells us where to park, so the next person can ride. Without such rules, a busy city would soon become a messy one.",
        "translation": "规则并没有夺走我们的自由；恰恰是规则让我们能够共享。规则告诉我们该把车停在哪里，下一个人才能骑。没有这些规则，繁忙的城市很快就会变得乱糟糟的。"
      },
      {
        "text": "To put a bike in the right place takes only five seconds. To help a neighbor costs nothing at all. If I were the city leader, I would thank such people every day.",
        "translation": "把单车放到该放的地方只需要五秒钟。帮邻居一下完全不花一分钱。如果我是这座城市的负责人，我会每天感谢这样的人。"
      },
      {
        "text": "So the next time you use something shared, ask yourself one simple question. Am I leaving this place a little better than I found it? Small choices, made by many people, can change a whole city.",
        "translation": "所以，下一次使用共享的东西时，请问自己一个简单的问题：我离开的时候，有没有让这个地方比我发现它时更好一点？许多人的小小选择，可以改变一整座城市。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What did the young man leave in the middle of the road?",
        "audioText": "What did the young man leave in the middle of the road?",
        "options": [
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A shared bike"
          },
          {
            "emoji": "🧺",
            "value": "bag",
            "text": "A heavy bag"
          },
          {
            "emoji": "🚌",
            "value": "bus",
            "text": "A city bus"
          }
        ],
        "answer": "bike"
      },
      {
        "type": "word_builder",
        "word": "shared",
        "audioText": "shared"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "To",
          "help",
          "a",
          "neighbor",
          "costs",
          "nothing",
          "at",
          "all."
        ],
        "audioText": "To help a neighbor costs nothing at all."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Nobody",
          "said",
          "anything,",
          "but",
          "everybody",
          "noticed."
        ],
        "audioText": "Nobody said anything, but everybody noticed."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If I ___ the city leader, I would thank such people every day.",
        "choices": [
          "am",
          "was",
          "were"
        ],
        "answer": "were",
        "audioText": "If I were the city leader, I would thank such people every day."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "To put a bike in the right place ___ only five seconds.",
        "choices": [
          "take",
          "takes",
          "taking"
        ],
        "answer": "takes",
        "audioText": "To put a bike in the right place takes only five seconds."
      }
    ]
  },
  {
    "id": "zk-r7-s02",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 2,
    "title": "Why Rules Matter",
    "titleCn": "规则为什么重要",
    "coverEmoji": "🚦",
    "paragraphs": [
      {
        "text": "We follow small rules every day, from waiting in line to keeping quiet in a library. Some students believe that rules only limit what they can do. In fact, good rules make daily life easier and safer for everyone.",
        "translation": "每天我们都要遵守一些小规则，从排队等候到在图书馆里保持安静。有些学生认为规则只会限制他们能做的事。其实，好的规则让大家的日子更轻松、也更安全。"
      },
      {
        "text": "Think about a busy crossing where the traffic lights suddenly stop working. If there were no rules, everyone would rush and nobody could move. To wait for your turn is not weakness. It is a quiet, simple way of showing respect for other people.",
        "translation": "想一想一个繁忙的十字路口，那里的红绿灯突然坏了。如果没有任何规则，大家都会往前挤，谁也走不了。轮流等候并不是软弱，它只是一种安静而简单的方式，表达对他人的尊重。"
      },
      {
        "text": "The same idea is true when we spend time on the Internet. Some people say online words cost nothing, so they can write anything they like. But words can hurt people, even when we cannot see their faces. I wish every one of us would think twice before sending a quick message.",
        "translation": "我们在上网时，道理也是一样的。有人说网上的话不花钱，所以想写什么就写什么。但话语会伤人，即使我们看不见对方的脸。我希望我们每个人在发出快捷信息之前，都能多想一遍。"
      },
      {
        "text": "Rules also teach us how to solve problems together instead of shouting at each other. When we disagree about something, we can talk and listen to different ideas. That is why our class makes its own rules for the reading corner.",
        "translation": "规则还教我们如何一起解决问题，而不是互相吵嚷。当我们对某件事意见不同时，我们可以交谈，听听不同的想法。正因为如此，我们班自己为阅读角制定了规则。"
      },
      {
        "text": "Following rules is not always easy, especially when we are in a hurry. But small choices add up and slowly change the place we live in. If I were a team leader, I would thank the person who waits quietly.",
        "translation": "遵守规则并不总是容易，尤其是在我们赶时间的时候。但小小的选择会累积起来，慢慢改变我们生活的地方。如果我是队长，我会感谢那个安静等候的人。"
      },
      {
        "text": "So next time you notice a rule, stop and ask yourself what it protects. Rules are not walls that keep people apart. They are roads that help us walk together.",
        "translation": "所以下次你注意到某条规则时，停下来问问自己：它在保护什么？规则不是把人隔开的墙。它们是帮助我们同行的一条条路。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What stops working at the busy crossing in the text?",
        "audioText": "What stops working at the busy crossing in the text?",
        "options": [
          {
            "emoji": "🚦",
            "value": "lights",
            "text": "Traffic lights"
          },
          {
            "emoji": "📚",
            "value": "books",
            "text": "Books"
          },
          {
            "emoji": "☂️",
            "value": "umbrellas",
            "text": "Umbrellas"
          }
        ],
        "answer": "lights"
      },
      {
        "type": "word_builder",
        "word": "respect",
        "audioText": "respect"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "To",
          "wait",
          "for",
          "your",
          "turn",
          "is",
          "not",
          "weakness"
        ],
        "audioText": "To wait for your turn is not weakness."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "are",
          "roads",
          "that",
          "help",
          "us",
          "walk",
          "together"
        ],
        "audioText": "They are roads that help us walk together."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If there ___ no rules, everyone would rush and nobody could move.",
        "choices": [
          "were",
          "are",
          "is"
        ],
        "answer": "were",
        "audioText": "If there were no rules, everyone would rush and nobody could move."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "I wish every one of us ___ think twice before sending a quick message.",
        "choices": [
          "would",
          "will",
          "can"
        ],
        "answer": "would",
        "audioText": "I wish every one of us would think twice before sending a quick message."
      }
    ]
  },
  {
    "id": "zk-r7-s03",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 3,
    "title": "Rules and Kindness Online",
    "titleCn": "网络上的规则与善意",
    "coverEmoji": "🌐",
    "paragraphs": [
      {
        "text": "The internet is now a big part of our daily life. It lets us talk with friends and find useful information quickly and easily. However, it can also bring problems when people forget to be kind.",
        "translation": "如今，互联网是我们日常生活中很重要的一部分。它让我们能和朋友们聊天，也能又快又方便地找到有用的信息。不过，当人们忘记友善时，它也会带来问题。"
      },
      {
        "text": "In the real world, we follow rules on the road and in the classroom. If there were no rules, our city would be a dangerous place. The online world works in the same way, because it is a shared space. Rules keep our shared space safe and fair. If someone shares false news, other people may believe it and feel worried.",
        "translation": "在现实世界里，我们在马路上、在教室里都要遵守规则。如果没有规则，我们的城市会变得很危险。网络世界也是这样运作的，因为它同样是一个共享的空间。规则让我们的共享空间安全而公平。如果有人传播虚假消息，其他人可能会信以为真，并因此感到担忧。"
      },
      {
        "text": "Being polite online is not difficult, but it needs a little thought. We should think twice before we type angry words on a screen. Words can hurt more than we think. If I were a writer with many readers, I would choose my words carefully. To hurt other people with words is never a brave or clever thing. In fact, a kind comment can make the person who reads it feel much happier.",
        "translation": "在网上讲礼貌并不难，只是需要多想一步。在屏幕上敲下愤怒的字句之前，我们应该多想一想。言语带来的伤害比我们想象的要大。如果我是一位拥有很多读者的作家，我也会谨慎地选择自己的用词。用言语去伤害别人，从来都不是勇敢或聪明的做法。其实，一条友善的评论就能让读到它的人开心许多。"
      },
      {
        "text": "Rules are important, and kindness is just as important as rules in our lives. Many students spend their free time helping other people in need. Some of them teach old people how to use smart phones. Others clean parks or collect rubbish with their friends at weekends. If I had more free time, I would join a volunteer team too.",
        "translation": "规则很重要，而在我们的生活中，善意和规则同样重要。许多学生把空闲时间用来帮助有需要的人。他们中有些人教老人使用智能手机，还有些人在周末和朋友一起打扫公园、捡拾垃圾。如果我有更多空闲时间，我也会加入一个志愿者团队。"
      },
      {
        "text": "To help other people is really a way of helping ourselves. When we give our time, we also learn new skills and make new friends. I wish more young people could feel this kind of happiness.",
        "translation": "帮助别人其实也是在帮助自己。当我们付出时间时，我们也会学到新技能、交到新朋友。我希望更多年轻人能感受到这种快乐。"
      },
      {
        "text": "So why not start from today and from small things? We can follow the rules, speak kindly online, and help someone nearby. If each of us did one small good thing, our world would be much warmer.",
        "translation": "那么，何不从今天开始、从小事开始呢？我们可以遵守规则，在网上友善发言，也可以帮助身边的人。如果我们每个人都做一件小小的好事，我们的世界会温暖得多。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What do some students teach old people to use?",
        "audioText": "What do some students teach old people to use?",
        "options": [
          {
            "emoji": "📱",
            "value": "phone",
            "text": "A smart phone"
          },
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A bicycle"
          },
          {
            "emoji": "🎸",
            "value": "guitar",
            "text": "A guitar"
          }
        ],
        "answer": "phone"
      },
      {
        "type": "word_builder",
        "word": "volunteer",
        "audioText": "volunteer"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rules",
          "keep",
          "our",
          "shared",
          "space",
          "safe",
          "and",
          "fair."
        ],
        "audioText": "Rules keep our shared space safe and fair."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Words",
          "can",
          "hurt",
          "more",
          "than",
          "we",
          "think."
        ],
        "audioText": "Words can hurt more than we think."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If there were no rules, our city ___ be a dangerous place.",
        "choices": [
          "would",
          "will",
          "was"
        ],
        "answer": "would",
        "audioText": "If there were no rules, our city would be a dangerous place."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "Many students spend their free time ___ other people in need.",
        "choices": [
          "helping",
          "help",
          "helps"
        ],
        "answer": "helping",
        "audioText": "Many students spend their free time helping other people in need."
      }
    ]
  },
  {
    "id": "zk-r7-s04",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 4,
    "title": "Good Rules, Warm Hearts",
    "titleCn": "好的规则，温暖的心",
    "coverEmoji": "🌐",
    "paragraphs": [
      {
        "text": "More and more students in our school use the internet every day now. We chat with friends, watch short videos and look for answers online. The internet makes our lives easier and much more interesting than before. However, it also brings some new problems that we cannot ignore.",
        "translation": "现在，我们学校越来越多的学生每天都在上网。我们在网上和朋友聊天、看短视频、查资料。互联网让我们的生活比以前更方便、更有趣。但是，它也带来了一些我们无法忽视的新问题。"
      },
      {
        "text": "Some people say unkind words online because they think nobody knows who they are. When they hide behind a screen, they forget that real people are reading. If I were one of them, I would think twice before writing anything. I wish everyone could remember this simple truth.",
        "translation": "有些人在网上说难听的话，因为他们觉得没人知道他们是谁。当他们躲在屏幕后面时，就忘了读这些话的都是真实的人。如果我是他们中的一员，我会在写下任何东西之前再三考虑。我希望每个人都能记住这个简单的道理。"
      },
      {
        "text": "To follow the rules of a website is not always easy, but it is necessary. Rules protect us instead of limiting us. Although some young people feel that rules are boring, most of us understand their value. When everyone follows the same rules, we can all enjoy the internet safely.",
        "translation": "遵守一个网站的规则并不总是容易，但这是必要的。规则是在保护我们，而不是限制我们。虽然有些年轻人觉得规则很无聊，但我们大多数人明白它们的价值。当每个人都遵守同样的规则时，我们才能一起安全地享受互联网。"
      },
      {
        "text": "Last month our class started a small group to help older people use their phones. We visit a community centre every Saturday and answer their questions patiently. To teach an old person how to send a photo takes time and care. When they say thank you with a big smile, we feel that our work is meaningful.",
        "translation": "上个月，我们班成立了一个小组，帮助老年人使用手机。我们每周六去社区中心，耐心地回答他们的问题。教一位老人怎样发送照片，需要时间和耐心。当他们带着大大的笑容对我们说谢谢时，我们觉得自己的付出很有意义。"
      },
      {
        "text": "If everyone followed the rules and treated others with respect, our online world would be warmer. To be kind online is not difficult. Kindness costs us nothing, but it means a lot to others. I wish more people would stop and think before they type. Good rules and warm hearts can change our online life for the better.",
        "translation": "如果每个人都遵守规则、以尊重之心对待他人，我们的网络世界会变得更温暖。在网上友善并不难。善良不花费我们什么，但对别人意义重大。我希望更多的人能在打字之前停下来想一想。好的规则和温暖的心，能让我们的网络生活变得更好。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What do the students in the writer's class do every Saturday?",
        "audioText": "What do the students in the writer's class do every Saturday?",
        "options": [
          {
            "emoji": "📱",
            "value": "phones",
            "text": "Help older people use phones"
          },
          {
            "emoji": "⚽",
            "value": "sports",
            "text": "Play ball games in the park"
          },
          {
            "emoji": "🎬",
            "value": "films",
            "text": "Watch films at the cinema"
          }
        ],
        "answer": "phones"
      },
      {
        "type": "word_builder",
        "word": "respect",
        "audioText": "respect"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Rules",
          "protect",
          "us",
          "instead",
          "of",
          "limiting",
          "us"
        ],
        "audioText": "Rules protect us instead of limiting us."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "To",
          "be",
          "kind",
          "online",
          "is",
          "not",
          "difficult"
        ],
        "audioText": "To be kind online is not difficult."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "___ follow the rules of a website is not always easy, but it is necessary.",
        "choices": [
          "To",
          "For",
          "With"
        ],
        "answer": "To",
        "audioText": "To follow the rules of a website is not always easy, but it is necessary."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If I ___ one of them, I would think twice before writing anything.",
        "choices": [
          "were",
          "am",
          "will be"
        ],
        "answer": "were",
        "audioText": "If I were one of them, I would think twice before writing anything."
      }
    ]
  },
  {
    "id": "zk-r7-s05",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 5,
    "title": "Kindness Behind the Screen",
    "titleCn": "屏幕背后的善意",
    "coverEmoji": "💬",
    "paragraphs": [
      {
        "text": "Today, most middle school students spend a lot of their free time online. We chat with friends, watch short videos, and share photos with others. However, some people use the internet in a bad and careless way. They say unkind words online and make other people feel sad.",
        "translation": "如今，大多数中学生把大量空闲时间花在网上。我们和朋友聊天、看短视频、和别人分享照片。然而，有些人使用网络的方式很不友好，也很不小心。他们在网上说不友善的话，让别人感到难过。"
      },
      {
        "text": "Maybe those people think that nobody can see them online. They believe that the internet is a free world without rules. If I were one of them, I would feel very lonely too.",
        "translation": "也许那些人以为，网上没人看得见自己。他们相信互联网是一个没有规则的自由世界。如果我是他们中的一员，我也会感到非常孤独。"
      },
      {
        "text": "To be kind online is not hard. Before you write a message, ask yourself one simple question. How would I feel if someone said these words to me? If I were you, I would send a warm word instead.",
        "translation": "在网上对别人友善一点也不难。在写消息之前，先问自己一个简单的问题：如果有人对我说这些话，我会有什么感受？如果我是你，我会改发一句温暖的话。"
      },
      {
        "text": "Volunteering online is another good way to help other people. Some students teach old people how to use phones through video calls. Others share useful study notes with classmates who really need them. Although these actions look small, they can make a real difference.",
        "translation": "做线上志愿者是帮助别人的另一种好方式。有些学生通过视频通话教老年人使用手机。另一些学生把有用的学习笔记分享给真正需要的同学。虽然这些行动看起来很小，却能带来真正的改变。"
      },
      {
        "text": "Rules matter on the internet as well as in real life. Words can hurt more than we think. We should not tell lies or hurt others with our words. I wish everyone could remember this simple rule all the time. Be polite online, just as you are in your daily life.",
        "translation": "规则在网上和在现实生活中一样重要。言语带来的伤害比我们想象的更大。我们不应该说谎，也不应该用语言伤害别人。我希望每个人都能一直记住这条简单的规则。在网上要有礼貌，就像你在日常生活中一样。"
      },
      {
        "text": "Nobody is perfect, and we all make mistakes sometimes. The important thing is to learn from them and do better. To make the internet a warmer place, we can start with one kind sentence today.",
        "translation": "没有人是完美的，我们有时候都会犯错。重要的是从中学习，做得更好。为了让网络变得更温暖，我们可以从今天的一句善意的话开始。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, which action is a good way to use the internet?",
        "audioText": "According to the passage, which action is a good way to use the internet?",
        "options": [
          {
            "emoji": "😡",
            "value": "unkind",
            "text": "Say unkind words"
          },
          {
            "emoji": "💬",
            "value": "warm",
            "text": "Send a warm word"
          },
          {
            "emoji": "📋",
            "value": "copy",
            "text": "Copy others' work"
          }
        ],
        "answer": "warm"
      },
      {
        "type": "word_builder",
        "word": "polite",
        "audioText": "polite"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "To",
          "be",
          "kind",
          "online",
          "is",
          "not",
          "hard."
        ],
        "audioText": "To be kind online is not hard."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Words",
          "can",
          "hurt",
          "more",
          "than",
          "we",
          "think."
        ],
        "audioText": "Words can hurt more than we think."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If I ___ you, I would send a warm word instead.",
        "choices": [
          "am",
          "were",
          "will be"
        ],
        "answer": "were",
        "audioText": "If I were you, I would send a warm word instead."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "The important thing is ___ from them and do better.",
        "choices": [
          "to learn",
          "learn",
          "learns"
        ],
        "answer": "to learn",
        "audioText": "The important thing is to learn from them and do better."
      }
    ]
  },
  {
    "id": "zk-r7-s06",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 6,
    "title": "Think Before You Share",
    "titleCn": "转发之前，先想一想",
    "coverEmoji": "🤔",
    "paragraphs": [
      {
        "text": "Every day, millions of people share messages, photos and short videos with friends online. Sharing takes only a second, and it feels like a very small thing. However, small things can travel far, and they can change how other people feel.",
        "translation": "每天，数百万人通过网络和朋友们分享消息、照片和短视频。分享只需要一秒钟，感觉是件很小的事。可是，小事也能传得很远，还能影响别人的心情。"
      },
      {
        "text": "Have you ever read a story online that made you angry or worried? Perhaps the story was not true at all. Some people write exciting stories to get more readers. Many of us then share them too quickly.",
        "translation": "你有没有在网上读到过一个让你生气或担心的故事？也许那个故事根本不是真的。有些人为了吸引更多读者，专门写些耸动的故事。而我们很多人，转得太快了。"
      },
      {
        "text": "If I were you, I would check a story before sharing it. If I were that writer, I would not feel proud at all. So we should ask ourselves some simple questions. Who wrote this? Where did it come from? These questions take only a minute, but they can save a lot of trouble.",
        "translation": "如果我是你，我会先核实再转发。如果我是那个作者，我一点也不会感到自豪。所以，我们应该问问自己几个简单的问题：这是谁写的？它来自哪里？问这些问题只要一分钟，却能省去很多麻烦。"
      },
      {
        "text": "To check a story takes only a minute. To say sorry after hurting someone may take much longer. That is why thinking first is much better than saying sorry later.",
        "translation": "核实一个故事只要一分钟，而伤害了别人再道歉，可能要花长得多的时间。所以说，先想一想，总比事后道歉好得多。"
      },
      {
        "text": "I wish everyone could remember one simple rule: we are responsible for what we pass on. When we share a message, it is like throwing a stone into a lake. The waves travel far, and they reach people we have never met.",
        "translation": "我希望每个人都能记住一条简单的规则：我们要为自己转发的东西负责。我们转发一条消息，就像往湖里扔了一块石头。水波会传得很远，一直传到我们从未见过的人那里。"
      },
      {
        "text": "So before you press the share button, stop and think for a moment. If we all did this, the internet would be a kinder and safer place for everyone.",
        "translation": "所以，按下转发键之前，先停下来想一想。如果我们都这样做，网络对每个人来说都会变得更友善、更安全。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What does the writer ask us to do before we share a message?",
        "audioText": "What does the writer ask us to do before we share a message?",
        "options": [
          {
            "emoji": "🔍",
            "value": "check",
            "text": "Check the story first"
          },
          {
            "emoji": "⚡",
            "value": "quick",
            "text": "Share it as fast as we can"
          },
          {
            "emoji": "🙈",
            "value": "never",
            "text": "Never read any news again"
          }
        ],
        "answer": "check"
      },
      {
        "type": "word_builder",
        "word": "message",
        "audioText": "message"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Many",
          "of",
          "us",
          "then",
          "share",
          "them",
          "too",
          "quickly."
        ],
        "audioText": "Many of us then share them too quickly."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Perhaps",
          "the",
          "story",
          "was",
          "not",
          "true",
          "at",
          "all."
        ],
        "audioText": "Perhaps the story was not true at all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "To check a story ___ only a minute.",
        "choices": [
          "takes",
          "take",
          "taking"
        ],
        "answer": "takes",
        "audioText": "To check a story takes only a minute."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "I wish everyone ___ remember one simple rule.",
        "choices": [
          "could",
          "can",
          "will"
        ],
        "answer": "could",
        "audioText": "I wish everyone could remember one simple rule."
      }
    ]
  },
  {
    "id": "zk-r7-s07",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 7,
    "title": "Kindness Is a Choice",
    "titleCn": "善意是一种选择",
    "coverEmoji": "🤝",
    "paragraphs": [
      {
        "text": "We live in two worlds every day, and both of them feel real to us. One is the busy street outside our window, and the other is the internet inside our phone. Neither world works well without people who care about others.",
        "translation": "我们每天都生活在两个世界里，而且这两个世界对我们来说都很真实。一个是窗外繁忙的街道，另一个是手机里的网络。如果没有关心他人的人，这两个世界都无法好好运转。"
      },
      {
        "text": "Behind a screen, some people seem to forget that real people are reading their words. They type angry words that they would never say face to face. If I were that person, I would stop and think before I sent anything. Kind words are never wasted.",
        "translation": "躲在屏幕后面，有些人似乎忘了，读他们文字的是一群真实的人。他们敲下一些当面绝不会说的气话。如果我是那个人，我会先停下来想一想，再决定要不要发出去。善意的话永远不会白说。"
      },
      {
        "text": "I wish more of us remembered how much a kind message can help. A short thank-you message online may make someone's whole day much brighter. To be polite to others costs us almost nothing at all.",
        "translation": "我真希望我们更多人能记得，一条善意的留言能帮上多大的忙。网上一条简短的“谢谢”，也许就能让某人的一整天明亮许多。对别人客气有礼，几乎不费我们什么力气。"
      },
      {
        "text": "Volunteering is another way to show that we are part of a community. Last month our class spent three hours cleaning a small park near the school. What surprised me most was how quickly a few pairs of hands changed things. Small teams can move big things.",
        "translation": "做志愿服务，是另一种表明自己是社区一员的方式。上个月，我们班花了三个小时打扫学校附近的一个小公园。让我最惊讶的是，几双手很快就让那里变了样。小的团队也能推动大的改变。"
      },
      {
        "text": "Rules matter as well, because they protect everyone who shares the same space. When we wait in line, we show respect for the people around us. If nobody followed any rules, a busy city would soon become a mess.",
        "translation": "规则同样重要，因为它们保护着共享同一片空间的每一个人。排队等候时，我们表现出对周围人的尊重。如果没有人遵守任何规则，繁忙的城市很快就会乱成一团。"
      },
      {
        "text": "So what kind of world do we really want to live in? I wish we could all see that our small choices add up. If we were kinder online and more helpful in person, our city would be a warmer place.",
        "translation": "那么，我们究竟想生活在什么样的世界里呢？我真希望我们都能看见，自己那些小小的选择会一点点累积。如果我们上网时更友善、在现实中更乐于助人，我们的城市会变成一个更温暖的地方。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "Besides the busy street outside our window, what is the other world we live in?",
        "audioText": "Besides the busy street outside our window, what is the other world we live in?",
        "options": [
          {
            "emoji": "📱",
            "value": "phone",
            "text": "The internet in our phone"
          },
          {
            "emoji": "🌳",
            "value": "park",
            "text": "A park near the school"
          },
          {
            "emoji": "🏫",
            "value": "school",
            "text": "A classroom at school"
          }
        ],
        "answer": "phone"
      },
      {
        "type": "word_builder",
        "word": "community",
        "audioText": "community"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Kind",
          "words",
          "are",
          "never",
          "wasted."
        ],
        "audioText": "Kind words are never wasted."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Small",
          "teams",
          "can",
          "move",
          "big",
          "things."
        ],
        "audioText": "Small teams can move big things."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "To be polite to others ___ us almost nothing at all.",
        "choices": [
          "costs",
          "cost",
          "costing"
        ],
        "answer": "costs",
        "audioText": "To be polite to others costs us almost nothing at all."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "I wish more of us ___ how much a kind message can help.",
        "choices": [
          "remembered",
          "remember",
          "remembering"
        ],
        "answer": "remembered",
        "audioText": "I wish more of us remembered how much a kind message can help."
      }
    ]
  },
  {
    "id": "zk-r7-s08",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 8,
    "title": "The Gift of Time",
    "titleCn": "时间的礼物",
    "coverEmoji": "⏳",
    "paragraphs": [
      {
        "text": "Many students believe that helping others always means giving away their money. In fact, to give your own time is often a more useful and warmer gift.",
        "translation": "许多学生以为，帮助别人就意味着捐出钱来。其实，献出你自己的时间，往往是一份更有用、也更温暖的礼物。"
      },
      {
        "text": "Last month, a group of students in our school visited an old people's home. They read the news, played games and simply listened to the old people's stories. Nobody paid them, but everyone in the room was smiling when they left.",
        "translation": "上个月，我们学校的一群学生去了一家敬老院。他们给老人读新闻、陪他们做游戏，也只是安安静静地听老人讲故事。没有人付钱给他们，但他们离开时，屋子里的每个人都在微笑。"
      },
      {
        "text": "I wish more teenagers could feel how happy a small act of kindness makes us. If I were busier with my homework, I would still find one free hour for others. Time is something we can always share, even when our money is short.",
        "translation": "我希望有更多青少年能体会到，一个小小的善举会让我们多么快乐。就算我的作业再多再忙，我也还是会为别人留出一小时。时间是我们总能分享的东西，哪怕钱不多的时候也一样。"
      },
      {
        "text": "Volunteer work also teaches us something important about rules and promises. If everyone arrives late or leaves early, the people we help will feel upset. That is why volunteers should keep their promises and follow the plan together.",
        "translation": "志愿工作也教会我们一些关于规则和承诺的重要道理。如果每个人都迟到早退，我们帮助的人就会难过。这就是为什么志愿者应该信守承诺，一起按计划行事。"
      },
      {
        "text": "To help without asking for anything back is a habit, not a talent. If more of us gave an hour each week, our city would be a kinder place. Start this weekend, and you will see how your own heart slowly changes.",
        "translation": "不求回报地去帮助别人，是一种习惯，而不是一种天赋。如果我们中有更多人每周拿出一小时，我们的城市会变得更友善。这个周末就开始吧，你会看到自己的心在慢慢发生变化。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the text, which gift is often more useful and warmer than money?",
        "audioText": "According to the text, which gift is often more useful and warmer than money?",
        "options": [
          {
            "emoji": "⏰",
            "value": "time",
            "text": "Time"
          },
          {
            "emoji": "💰",
            "value": "money",
            "text": "Money"
          },
          {
            "emoji": "🍬",
            "value": "candy",
            "text": "Candy"
          }
        ],
        "answer": "time"
      },
      {
        "type": "word_builder",
        "word": "kindness",
        "audioText": "kindness"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Time",
          "is",
          "something",
          "we",
          "can",
          "always",
          "share"
        ],
        "audioText": "Time is something we can always share."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "That",
          "is",
          "why",
          "volunteers",
          "should",
          "keep",
          "their",
          "promises"
        ],
        "audioText": "That is why volunteers should keep their promises."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "In fact, to give your own ___ is often a more useful and warmer gift.",
        "choices": [
          "time",
          "money",
          "space"
        ],
        "answer": "time",
        "audioText": "In fact, to give your own time is often a more useful and warmer gift."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If I ___ busier with my homework, I would still find one free hour for others.",
        "choices": [
          "were",
          "am",
          "be"
        ],
        "answer": "were",
        "audioText": "If I were busier with my homework, I would still find one free hour for others."
      }
    ]
  },
  {
    "id": "zk-r7-s09",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 9,
    "title": "Why We Give Our Time",
    "titleCn": "为什么我们要付出时间",
    "coverEmoji": "🤝",
    "paragraphs": [
      {
        "text": "Every Saturday morning, some students in our town meet at the old library. They clean the shelves, sort out the books and read stories to younger children. To give one hour a week seems small, but it is not.",
        "translation": "每周六早上，我们镇上的一些学生都会在老图书馆集合。他们擦书架、整理图书，还给更小的孩子读故事。每周拿出一小时看起来微不足道，其实并非如此。"
      },
      {
        "text": "Many people say that they are too busy to help others. They wish they had more free time. But we all have some, if we look for it.",
        "translation": "很多人说自己太忙，没空帮助别人。他们希望自己有更多空闲时间。可只要愿意去找，时间其实人人都有。"
      },
      {
        "text": "Volunteering is not only about giving; it is also about learning. When you help others, you learn how the world really works. You also learn that a warm smile can open a closed door.",
        "translation": "志愿服务不只是付出，也是一种学习。当你帮助别人时，你会明白这个世界究竟是怎样运转的。你还会发现，一个温暖的微笑能打开一扇紧闭的门。"
      },
      {
        "text": "Rules matter too, both online and in the real world. If everyone followed the traffic rules, our streets would be safer. I wish more people understood that rules are there to help. In short, rules protect us all.",
        "translation": "规则同样重要，无论是在网络上还是在现实世界里。如果每个人都遵守交通规则，我们的街道就会安全得多。我真希望更多人明白，规则是为了帮助我们而存在的。简而言之，规则保护着我们每一个人。"
      },
      {
        "text": "The internet gives us a new place to be kind. To write a kind comment online matters as much as giving a seat. Everyone can play a part.",
        "translation": "互联网给了我们一个行善的新场所。在网上写一条友善的评论，其意义不亚于给他人让座。每个人都能出一份力。"
      },
      {
        "text": "So if you want to make a difference, begin with one small step. You do not need money or special skills; you only need to begin. If I were you, I would start this weekend.",
        "translation": "所以，如果你想带来改变，就从一小步开始吧。你不需要钱，也不需要特别的技能；你只需要迈出第一步。如果我是你，这周末我就会行动起来。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "What do the students do at the old library?",
        "audioText": "What do the students do at the old library?",
        "options": [
          {
            "emoji": "📚",
            "value": "read",
            "text": "They read stories to children."
          },
          {
            "emoji": "🍳",
            "value": "cook",
            "text": "They cook dinner for families."
          },
          {
            "emoji": "🏀",
            "value": "play",
            "text": "They play basketball outside."
          }
        ],
        "answer": "read"
      },
      {
        "type": "word_builder",
        "word": "library",
        "audioText": "library"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "They",
          "wish",
          "they",
          "had",
          "more",
          "free",
          "time."
        ],
        "audioText": "They wish they had more free time."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Everyone",
          "can",
          "play",
          "a",
          "part."
        ],
        "audioText": "Everyone can play a part."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If everyone ___ the traffic rules, our streets would be safer.",
        "choices": [
          "followed",
          "follows",
          "following"
        ],
        "answer": "followed",
        "audioText": "If everyone followed the traffic rules, our streets would be safer."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "To write a kind comment online ___ as much as giving a seat.",
        "choices": [
          "matters",
          "matter",
          "mattered"
        ],
        "answer": "matters",
        "audioText": "To write a kind comment online matters as much as giving a seat."
      }
    ]
  },
  {
    "id": "zk-r7-s10",
    "track": "zhongkao",
    "regionId": "zk-r7",
    "order": 10,
    "title": "One Hour a Week",
    "titleCn": "每周一小时",
    "coverEmoji": "🤝",
    "paragraphs": [
      {
        "text": "In many Chinese cities, students now spend part of their weekends helping others. Some of them teach old people how to use a smartphone. Others help clean a community park or read to children in a hospital. It is easy to believe that only special people become volunteers. In fact, most of them are ordinary students just like you.",
        "translation": "在中国许多城市，学生们现在会把一部分周末时间用来帮助别人。有些学生教老人使用智能手机。还有些人会帮忙打扫社区公园，或者去医院给孩子们读书。人们很容易以为，只有特别的人才会去当志愿者。事实上，他们大多是和你一样的普通学生。"
      },
      {
        "text": "To give up a free Saturday morning is never easy. New volunteers often feel a little nervous at first. \"If I were braver, I would have joined earlier,\" one boy said. After a few weeks, he found that helping others made him happier than playing games.",
        "translation": "放弃一个自由的周六上午从来都不容易。刚加入的志愿者一开始常常会有点紧张。“如果我当时更勇敢一些，我早就加入了。”一个男孩这样说。几周后，他发现帮助别人比玩游戏更让他开心。"
      },
      {
        "text": "Good volunteers follow a few simple rules. To arrive on time is the first rule, because others are waiting for you. They also listen more than they talk and never laugh at a slow learner. If everyone did whatever he liked, the whole plan would soon become a mess.",
        "translation": "好的志愿者会遵守几条简单的规则。准时到达就是第一条，因为别人正在等你。他们还会多听少说，从不嘲笑学得慢的人。如果每个人都随心所欲，整个计划很快就会变得一团糟。"
      },
      {
        "text": "The internet gives us new ways to help. Some students make short videos to show farmers how to sell fruit online. Others answer questions for younger children in a weekend study group. I wish more people knew how much good a phone can do.",
        "translation": "互联网给了我们新的助人方式。一些学生制作短视频，教农民如何在网上卖水果。还有一些人在周末的学习小组里为低年级的孩子解答问题。我真希望有更多人知道，一部手机能带来多大的好处。"
      },
      {
        "text": "Volunteering is not about doing big things once or twice. It is about doing small things again and again, week after week. If I were asked what I learned from it, I would say patience. That is a lesson that no textbook can ever give us.",
        "translation": "做志愿不在于偶尔做一两件大事。它在于一件件小事反复去做，一周又一周。如果问我从中学会了什么，我会说是耐心。这是任何课本都给不了我们的一课。"
      },
      {
        "text": "So why not begin this weekend? Choose one thing you can do well, and then give it one hour. What matters is not how much you give, but whether you keep going. Your hour may look small, but someone's whole day may change because of it.",
        "translation": "那么这个周末为什么不开始呢？选一件你能做好的事，然后给它一个小时。重要的不是你付出多少，而是你是否坚持下去。你的一个小时也许看起来微不足道，但某个人的一整天可能会因此改变。"
      }
    ],
    "quiz": [
      {
        "type": "image_choice",
        "question": "According to the passage, what do some students teach old people to use?",
        "audioText": "According to the passage, what do some students teach old people to use?",
        "options": [
          {
            "emoji": "📱",
            "value": "phone",
            "text": "A smartphone"
          },
          {
            "emoji": "🚲",
            "value": "bike",
            "text": "A bike"
          },
          {
            "emoji": "🎸",
            "value": "guitar",
            "text": "A guitar"
          }
        ],
        "answer": "phone"
      },
      {
        "type": "word_builder",
        "word": "volunteer",
        "audioText": "volunteer"
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "Good",
          "volunteers",
          "follow",
          "a",
          "few",
          "simple",
          "rules."
        ],
        "audioText": "Good volunteers follow a few simple rules."
      },
      {
        "type": "sentence_order",
        "correctOrder": [
          "The",
          "internet",
          "gives",
          "us",
          "new",
          "ways",
          "to",
          "help."
        ],
        "audioText": "The internet gives us new ways to help."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "To ___ on time is the first rule, because others are waiting for you.",
        "choices": [
          "arrive",
          "arriving",
          "arrived"
        ],
        "answer": "arrive",
        "audioText": "To arrive on time is the first rule, because others are waiting for you."
      },
      {
        "type": "fill_blank",
        "sentenceWithBlank": "If I ___ braver, I would have joined earlier.",
        "choices": [
          "am",
          "were",
          "will be"
        ],
        "answer": "were",
        "audioText": "If I were braver, I would have joined earlier."
      }
    ]
  }
];
