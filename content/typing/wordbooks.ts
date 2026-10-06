// 抽卡打字馆词书库。
// - 入门精选（手写 202 具象词）内嵌 bundle；
// - ECDICT 管线 9 本（中考/高考/四六级/考研/托福/雅思/GRE/词频Top）放 public/typing-dicts/*.json，
//   运行时按需 fetch + 内存缓存（避免 4MB 词库打进 JS bundle）。
// 重新生成词书 JSON：
//   node scripts/gen-typing-wordbook.mjs /tmp/ecdict.csv <tag|freq> <limit> public/typing-dicts/<id>.json
import type { WordBook } from "@/lib/typing";
import { BASE_PATH } from "@/lib/config";

export const ZK_STARTER_BOOK: WordBook = {
  id: "zk-starter",
  name: "入门精选",
  nameEn: "Starter Picks",
  desc: "精选 202 打字友好具象词 · 起步包",
  words: [
    { en: "cat", cn: "猫", phonetic: "/kæt/", pos: "n.", difficulty: 1 },
    { en: "dog", cn: "狗", phonetic: "/dɒɡ/", pos: "n.", difficulty: 1 },
    { en: "bird", cn: "鸟", phonetic: "/bɜːd/", pos: "n.", difficulty: 1 },
    { en: "fish", cn: "鱼", phonetic: "/fɪʃ/", pos: "n.", difficulty: 1 },
    { en: "bear", cn: "熊", phonetic: "/beə(r)/", pos: "n.", difficulty: 1 },
    { en: "horse", cn: "马", phonetic: "/hɔːs/", pos: "n.", difficulty: 1 },
    { en: "monkey", cn: "猴子", phonetic: "/ˈmʌŋki/", pos: "n.", difficulty: 1 },
    { en: "panda", cn: "熊猫", phonetic: "/ˈpændə/", pos: "n.", difficulty: 1 },
    { en: "rabbit", cn: "兔子", phonetic: "/ˈræbɪt/", pos: "n.", difficulty: 1 },
    { en: "tiger", cn: "老虎", phonetic: "/ˈtaɪɡə(r)/", pos: "n.", difficulty: 1 },
    { en: "elephant", cn: "大象", phonetic: "/ˈelɪfənt/", pos: "n.", difficulty: 2 },
    { en: "lion", cn: "狮子", phonetic: "/ˈlaɪən/", pos: "n.", difficulty: 1 },
    { en: "wolf", cn: "狼", phonetic: "/wʊlf/", pos: "n.", difficulty: 2 },
    { en: "snake", cn: "蛇", phonetic: "/sneɪk/", pos: "n.", difficulty: 1 },
    { en: "zebra", cn: "斑马", phonetic: "/ˈzebrə/", pos: "n.", difficulty: 2 },
    { en: "animal", cn: "动物", phonetic: "/ˈænɪml/", pos: "n.", difficulty: 1 },
    { en: "apple", cn: "苹果", phonetic: "/ˈæpl/", pos: "n.", difficulty: 1 },
    { en: "banana", cn: "香蕉", phonetic: "/bəˈnɑːnə/", pos: "n.", difficulty: 1 },
    { en: "bread", cn: "面包", phonetic: "/bred/", pos: "n.", difficulty: 1 },
    { en: "cake", cn: "蛋糕", phonetic: "/keɪk/", pos: "n.", difficulty: 1 },
    { en: "egg", cn: "鸡蛋", phonetic: "/eɡ/", pos: "n.", difficulty: 1 },
    { en: "milk", cn: "牛奶", phonetic: "/mɪlk/", pos: "n.", difficulty: 1 },
    { en: "rice", cn: "米饭；大米", phonetic: "/raɪs/", pos: "n.", difficulty: 1 },
    { en: "water", cn: "水", phonetic: "/ˈwɔːtə(r)/", pos: "n.", difficulty: 1 },
    { en: "tea", cn: "茶", phonetic: "/tiː/", pos: "n.", difficulty: 1 },
    { en: "juice", cn: "果汁", phonetic: "/dʒuːs/", pos: "n.", difficulty: 1 },
    { en: "meat", cn: "肉", phonetic: "/miːt/", pos: "n.", difficulty: 1 },
    { en: "beef", cn: "牛肉", phonetic: "/biːf/", pos: "n.", difficulty: 2 },
    { en: "fruit", cn: "水果", phonetic: "/fruːt/", pos: "n.", difficulty: 1 },
    { en: "candy", cn: "糖果", phonetic: "/ˈkændi/", pos: "n.", difficulty: 1 },
    { en: "chocolate", cn: "巧克力", phonetic: "/ˈtʃɒklət/", pos: "n.", difficulty: 2 },
    { en: "sugar", cn: "糖", phonetic: "/ˈʃʊɡə(r)/", pos: "n.", difficulty: 2 },
    { en: "salt", cn: "盐", phonetic: "/sɔːlt/", pos: "n.", difficulty: 2 },
    { en: "noodle", cn: "面条", phonetic: "/ˈnuːdl/", pos: "n.", difficulty: 2 },
    { en: "vegetable", cn: "蔬菜", phonetic: "/ˈvedʒtəbl/", pos: "n.", difficulty: 2 },
    { en: "breakfast", cn: "早餐", phonetic: "/ˈbrekfəst/", pos: "n.", difficulty: 1 },
    { en: "lunch", cn: "午餐", phonetic: "/lʌntʃ/", pos: "n.", difficulty: 1 },
    { en: "dinner", cn: "晚餐；正餐", phonetic: "/ˈdɪnə(r)/", pos: "n.", difficulty: 1 },
    { en: "school", cn: "学校", phonetic: "/skuːl/", pos: "n.", difficulty: 1 },
    { en: "book", cn: "书", phonetic: "/bʊk/", pos: "n.", difficulty: 1 },
    { en: "pen", cn: "钢笔", phonetic: "/pen/", pos: "n.", difficulty: 1 },
    { en: "pencil", cn: "铅笔", phonetic: "/ˈpensl/", pos: "n.", difficulty: 1 },
    { en: "ruler", cn: "尺子", phonetic: "/ˈruːlə(r)/", pos: "n.", difficulty: 1 },
    { en: "bag", cn: "书包；袋子", phonetic: "/bæɡ/", pos: "n.", difficulty: 1 },
    { en: "desk", cn: "书桌", phonetic: "/desk/", pos: "n.", difficulty: 1 },
    { en: "chair", cn: "椅子", phonetic: "/tʃeə(r)/", pos: "n.", difficulty: 1 },
    { en: "classroom", cn: "教室", phonetic: "/ˈklɑːsruːm/", pos: "n.", difficulty: 1 },
    { en: "teacher", cn: "老师", phonetic: "/ˈtiːtʃə(r)/", pos: "n.", difficulty: 1 },
    { en: "student", cn: "学生", phonetic: "/ˈstjuːdnt/", pos: "n.", difficulty: 1 },
    { en: "lesson", cn: "课；教训", phonetic: "/ˈlesn/", pos: "n.", difficulty: 2 },
    { en: "test", cn: "测验；考试", phonetic: "/test/", pos: "n.", difficulty: 1 },
    { en: "homework", cn: "家庭作业", phonetic: "/ˈhəʊmwɜːk/", pos: "n.", difficulty: 1 },
    { en: "library", cn: "图书馆", phonetic: "/ˈlaɪbrəri/", pos: "n.", difficulty: 1 },
    { en: "blackboard", cn: "黑板", phonetic: "/ˈblækbɔːd/", pos: "n.", difficulty: 2 },
    { en: "computer", cn: "电脑", phonetic: "/kəmˈpjuːtə(r)/", pos: "n.", difficulty: 1 },
    { en: "dictionary", cn: "词典", phonetic: "/ˈdɪkʃənri/", pos: "n.", difficulty: 2 },
    { en: "music", cn: "音乐", phonetic: "/ˈmjuːzɪk/", pos: "n.", difficulty: 1 },
    { en: "art", cn: "美术；艺术", phonetic: "/ɑːt/", pos: "n.", difficulty: 1 },
    { en: "science", cn: "科学", phonetic: "/ˈsaɪəns/", pos: "n.", difficulty: 1 },
    { en: "history", cn: "历史", phonetic: "/ˈhɪstri/", pos: "n.", difficulty: 1 },
    { en: "maths", cn: "数学", phonetic: "/mæθs/", pos: "n.", difficulty: 1 },
    { en: "English", cn: "英语", phonetic: "/ˈɪŋɡlɪʃ/", pos: "n.", difficulty: 1 },
    { en: "subject", cn: "科目；主题", phonetic: "/ˈsʌbdʒɪkt/", pos: "n.", difficulty: 2 },
    { en: "family", cn: "家庭；家人", phonetic: "/ˈfæməli/", pos: "n.", difficulty: 1 },
    { en: "father", cn: "父亲", phonetic: "/ˈfɑːðə(r)/", pos: "n.", difficulty: 1 },
    { en: "mother", cn: "母亲", phonetic: "/ˈmʌðə(r)/", pos: "n.", difficulty: 1 },
    { en: "brother", cn: "兄弟", phonetic: "/ˈbrʌðə(r)/", pos: "n.", difficulty: 1 },
    { en: "sister", cn: "姐妹", phonetic: "/ˈsɪstə(r)/", pos: "n.", difficulty: 1 },
    { en: "parent", cn: "父母", phonetic: "/ˈpeərənt/", pos: "n.", difficulty: 2 },
    { en: "friend", cn: "朋友", phonetic: "/frend/", pos: "n.", difficulty: 1 },
    { en: "people", cn: "人们", phonetic: "/ˈpiːpl/", pos: "n.", difficulty: 1 },
    { en: "baby", cn: "婴儿", phonetic: "/ˈbeɪbi/", pos: "n.", difficulty: 1 },
    { en: "child", cn: "儿童", phonetic: "/tʃaɪd/", pos: "n.", difficulty: 1 },
    { en: "boy", cn: "男孩", phonetic: "/bɔɪ/", pos: "n.", difficulty: 1 },
    { en: "girl", cn: "女孩", phonetic: "/ɡɜːl/", pos: "n.", difficulty: 1 },
    { en: "man", cn: "男人", phonetic: "/mæn/", pos: "n.", difficulty: 1 },
    { en: "woman", cn: "女人", phonetic: "/ˈwʊmən/", pos: "n.", difficulty: 1 },
    { en: "hand", cn: "手", phonetic: "/hænd/", pos: "n.", difficulty: 1 },
    { en: "head", cn: "头", phonetic: "/hed/", pos: "n.", difficulty: 1 },
    { en: "face", cn: "脸", phonetic: "/feɪs/", pos: "n.", difficulty: 1 },
    { en: "eye", cn: "眼睛", phonetic: "/aɪ/", pos: "n.", difficulty: 1 },
    { en: "ear", cn: "耳朵", phonetic: "/ɪə(r)/", pos: "n.", difficulty: 1 },
    { en: "nose", cn: "鼻子", phonetic: "/nəʊz/", pos: "n.", difficulty: 1 },
    { en: "mouth", cn: "嘴", phonetic: "/maʊθ/", pos: "n.", difficulty: 1 },
    { en: "hair", cn: "头发", phonetic: "/heə(r)/", pos: "n.", difficulty: 1 },
    { en: "arm", cn: "手臂", phonetic: "/ɑːm/", pos: "n.", difficulty: 1 },
    { en: "leg", cn: "腿", phonetic: "/leɡ/", pos: "n.", difficulty: 1 },
    { en: "heart", cn: "心脏；内心", phonetic: "/hɑːt/", pos: "n.", difficulty: 1 },
    { en: "body", cn: "身体", phonetic: "/ˈbɒdi/", pos: "n.", difficulty: 1 },
    { en: "health", cn: "健康", phonetic: "/helθ/", pos: "n.", difficulty: 2 },
    { en: "bed", cn: "床", phonetic: "/bed/", pos: "n.", difficulty: 1 },
    { en: "room", cn: "房间", phonetic: "/ruːm/", pos: "n.", difficulty: 1 },
    { en: "home", cn: "家", phonetic: "/həʊm/", pos: "n.", difficulty: 1 },
    { en: "house", cn: "房子", phonetic: "/haʊs/", pos: "n.", difficulty: 1 },
    { en: "door", cn: "门", phonetic: "/dɔː(r)/", pos: "n.", difficulty: 1 },
    { en: "window", cn: "窗户", phonetic: "/ˈwɪndəʊ/", pos: "n.", difficulty: 1 },
    { en: "table", cn: "桌子", phonetic: "/ˈteɪbl/", pos: "n.", difficulty: 1 },
    { en: "clock", cn: "时钟", phonetic: "/klɒk/", pos: "n.", difficulty: 1 },
    { en: "light", cn: "灯；光线", phonetic: "/laɪt/", pos: "n.", difficulty: 1 },
    { en: "key", cn: "钥匙；答案", phonetic: "/kiː/", pos: "n.", difficulty: 1 },
    { en: "money", cn: "钱", phonetic: "/ˈmʌni/", pos: "n.", difficulty: 1 },
    { en: "phone", cn: "电话", phonetic: "/fəʊn/", pos: "n.", difficulty: 1 },
    { en: "picture", cn: "图片；照片", phonetic: "/ˈpɪktʃə(r)/", pos: "n.", difficulty: 1 },
    { en: "map", cn: "地图", phonetic: "/mæp/", pos: "n.", difficulty: 1 },
    { en: "gift", cn: "礼物", phonetic: "/ɡɪft/", pos: "n.", difficulty: 1 },
    { en: "game", cn: "游戏；比赛", phonetic: "/ɡeɪm/", pos: "n.", difficulty: 1 },
    { en: "flower", cn: "花", phonetic: "/ˈflaʊə(r)/", pos: "n.", difficulty: 1 },
    { en: "tree", cn: "树", phonetic: "/triː/", pos: "n.", difficulty: 1 },
    { en: "sun", cn: "太阳", phonetic: "/sʌn/", pos: "n.", difficulty: 1 },
    { en: "moon", cn: "月亮", phonetic: "/muːn/", pos: "n.", difficulty: 1 },
    { en: "star", cn: "星星", phonetic: "/stɑː(r)/", pos: "n.", difficulty: 1 },
    { en: "sky", cn: "天空", phonetic: "/skaɪ/", pos: "n.", difficulty: 1 },
    { en: "cloud", cn: "云", phonetic: "/klaʊd/", pos: "n.", difficulty: 1 },
    { en: "rain", cn: "雨；下雨", phonetic: "/reɪn/", pos: "n.", difficulty: 1 },
    { en: "snow", cn: "雪；下雪", phonetic: "/snəʊ/", pos: "n.", difficulty: 1 },
    { en: "wind", cn: "风", phonetic: "/wɪnd/", pos: "n.", difficulty: 1 },
    { en: "river", cn: "河", phonetic: "/ˈrɪvə(r)/", pos: "n.", difficulty: 1 },
    { en: "sea", cn: "海", phonetic: "/siː/", pos: "n.", difficulty: 1 },
    { en: "mountain", cn: "山", phonetic: "/ˈmaʊntən/", pos: "n.", difficulty: 1 },
    { en: "road", cn: "路", phonetic: "/rəʊd/", pos: "n.", difficulty: 1 },
    { en: "street", cn: "街道", phonetic: "/striːt/", pos: "n.", difficulty: 1 },
    { en: "bike", cn: "自行车", phonetic: "/baɪk/", pos: "n.", difficulty: 1 },
    { en: "bus", cn: "公共汽车", phonetic: "/bʌs/", pos: "n.", difficulty: 1 },
    { en: "car", cn: "汽车", phonetic: "/kɑː(r)/", pos: "n.", difficulty: 1 },
    { en: "train", cn: "火车", phonetic: "/treɪn/", pos: "n.", difficulty: 1 },
    { en: "plane", cn: "飞机", phonetic: "/pleɪn/", pos: "n.", difficulty: 1 },
    { en: "ship", cn: "轮船", phonetic: "/ʃɪp/", pos: "n.", difficulty: 1 },
    { en: "ticket", cn: "票", phonetic: "/ˈtɪkɪt/", pos: "n.", difficulty: 2 },
    { en: "run", cn: "跑", phonetic: "/rʌn/", pos: "v.", difficulty: 1 },
    { en: "jump", cn: "跳", phonetic: "/dʒʌmp/", pos: "v.", difficulty: 1 },
    { en: "swim", cn: "游泳", phonetic: "/swɪm/", pos: "v.", difficulty: 1 },
    { en: "fly", cn: "飞；放（风筝）", phonetic: "/flaɪ/", pos: "v.", difficulty: 1 },
    { en: "sing", cn: "唱歌", phonetic: "/sɪŋ/", pos: "v.", difficulty: 1 },
    { en: "dance", cn: "跳舞", phonetic: "/dɑːns/", pos: "v.", difficulty: 1 },
    { en: "draw", cn: "画画", phonetic: "/drɔː/", pos: "v.", difficulty: 1 },
    { en: "read", cn: "读；阅读", phonetic: "/riːd/", pos: "v.", difficulty: 1 },
    { en: "write", cn: "写", phonetic: "/raɪt/", pos: "v.", difficulty: 1 },
    { en: "eat", cn: "吃", phonetic: "/iːt/", pos: "v.", difficulty: 1 },
    { en: "drink", cn: "喝", phonetic: "/drɪŋk/", pos: "v.", difficulty: 1 },
    { en: "sleep", cn: "睡觉", phonetic: "/sliːp/", pos: "v.", difficulty: 1 },
    { en: "play", cn: "玩；踢（球）", phonetic: "/pleɪ/", pos: "v.", difficulty: 1 },
    { en: "study", cn: "学习；书房", phonetic: "/ˈstʌdi/", pos: "v.", difficulty: 1 },
    { en: "work", cn: "工作；作品", phonetic: "/wɜːk/", pos: "v.", difficulty: 1 },
    { en: "help", cn: "帮助", phonetic: "/help/", pos: "v.", difficulty: 1 },
    { en: "talk", cn: "谈话", phonetic: "/tɔːk/", pos: "v.", difficulty: 1 },
    { en: "speak", cn: "说（语言）", phonetic: "/spiːk/", pos: "v.", difficulty: 1 },
    { en: "listen", cn: "听", phonetic: "/ˈlɪsn/", pos: "v.", difficulty: 1 },
    { en: "look", cn: "看", phonetic: "/lʊk/", pos: "v.", difficulty: 1 },
    { en: "walk", cn: "走路", phonetic: "/wɔːk/", pos: "v.", difficulty: 1 },
    { en: "smile", cn: "微笑", phonetic: "/smaɪl/", pos: "v.", difficulty: 2 },
    { en: "laugh", cn: "大笑", phonetic: "/lɑːf/", pos: "v.", difficulty: 2 },
    { en: "cry", cn: "哭喊", phonetic: "/kraɪ/", pos: "v.", difficulty: 1 },
    { en: "cook", cn: "烹饪；厨师", phonetic: "/kʊk/", pos: "v.", difficulty: 1 },
    { en: "clean", cn: "打扫；干净的", phonetic: "/kliːn/", pos: "v.", difficulty: 1 },
    { en: "wash", cn: "洗", phonetic: "/wɒʃ/", pos: "v.", difficulty: 1 },
    { en: "open", cn: "打开；开着的", phonetic: "/ˈəʊpən/", pos: "v.", difficulty: 1 },
    { en: "close", cn: "关闭", phonetic: "/kləʊz/", pos: "v.", difficulty: 1 },
    { en: "buy", cn: "买", phonetic: "/baɪ/", pos: "v.", difficulty: 1 },
    { en: "sell", cn: "卖", phonetic: "/sel/", pos: "v.", difficulty: 1 },
    { en: "give", cn: "给", phonetic: "/ɡɪv/", pos: "v.", difficulty: 1 },
    { en: "take", cn: "拿；带", phonetic: "/teɪk/", pos: "v.", difficulty: 1 },
    { en: "make", cn: "制作；使得", phonetic: "/meɪk/", pos: "v.", difficulty: 1 },
    { en: "meet", cn: "遇见；会面", phonetic: "/miːt/", pos: "v.", difficulty: 1 },
    { en: "learn", cn: "学习；学会", phonetic: "/lɜːn/", pos: "v.", difficulty: 1 },
    { en: "teach", cn: "教", phonetic: "/tiːtʃ/", pos: "v.", difficulty: 1 },
    { en: "think", cn: "思考；认为", phonetic: "/θɪŋk/", pos: "v.", difficulty: 1 },
    { en: "love", cn: "爱", phonetic: "/lʌv/", pos: "v.", difficulty: 1 },
    { en: "happy", cn: "开心的", phonetic: "/ˈhæpi/", pos: "adj.", difficulty: 1 },
    { en: "sad", cn: "悲伤的", phonetic: "/sæd/", pos: "adj.", difficulty: 1 },
    { en: "big", cn: "大的", phonetic: "/bɪɡ/", pos: "adj.", difficulty: 1 },
    { en: "small", cn: "小的", phonetic: "/smɔːl/", pos: "adj.", difficulty: 1 },
    { en: "long", cn: "长的", phonetic: "/lɒŋ/", pos: "adj.", difficulty: 1 },
    { en: "short", cn: "短的；矮的", phonetic: "/ʃɔːt/", pos: "adj.", difficulty: 1 },
    { en: "tall", cn: "高的", phonetic: "/tɔːl/", pos: "adj.", difficulty: 1 },
    { en: "hot", cn: "热的；辣的", phonetic: "/hɒt/", pos: "adj.", difficulty: 1 },
    { en: "cold", cn: "冷的", phonetic: "/kəʊld/", pos: "adj.", difficulty: 1 },
    { en: "warm", cn: "温暖的", phonetic: "/wɔːm/", pos: "adj.", difficulty: 1 },
    { en: "cool", cn: "凉爽的；酷的", phonetic: "/kuːl/", pos: "adj.", difficulty: 1 },
    { en: "new", cn: "新的", phonetic: "/njuː/", pos: "adj.", difficulty: 1 },
    { en: "old", cn: "旧的；老的", phonetic: "/əʊld/", pos: "adj.", difficulty: 1 },
    { en: "good", cn: "好的", phonetic: "/ɡʊd/", pos: "adj.", difficulty: 1 },
    { en: "bad", cn: "坏的；差的", phonetic: "/bæd/", pos: "adj.", difficulty: 1 },
    { en: "beautiful", cn: "美丽的", phonetic: "/ˈbjuːtɪfl/", pos: "adj.", difficulty: 1 },
    { en: "busy", cn: "忙碌的", phonetic: "/ˈbɪzi/", pos: "adj.", difficulty: 1 },
    { en: "free", cn: "自由的；免费的", phonetic: "/friː/", pos: "adj.", difficulty: 1 },
    { en: "hungry", cn: "饥饿的", phonetic: "/ˈhʌŋɡri/", pos: "adj.", difficulty: 1 },
    { en: "thirsty", cn: "口渴的", phonetic: "/ˈθɜːsti/", pos: "adj.", difficulty: 2 },
    { en: "tired", cn: "疲倦的", phonetic: "/ˈtaɪəd/", pos: "adj.", difficulty: 1 },
    { en: "easy", cn: "容易的", phonetic: "/ˈiːzi/", pos: "adj.", difficulty: 1 },
    { en: "difficult", cn: "困难的", phonetic: "/ˈdɪfɪkəlt/", pos: "adj.", difficulty: 1 },
    { en: "early", cn: "早的", phonetic: "/ˈɜːli/", pos: "adj.", difficulty: 1 },
    { en: "late", cn: "迟的；晚的", phonetic: "/leɪt/", pos: "adj.", difficulty: 1 },
    { en: "fast", cn: "快的", phonetic: "/fɑːst/", pos: "adj.", difficulty: 1 },
    { en: "slow", cn: "慢的", phonetic: "/sləʊ/", pos: "adj.", difficulty: 1 },
    { en: "kind", cn: "友善的；种类", phonetic: "/kaɪnd/", pos: "adj.", difficulty: 1 },
    { en: "smart", cn: "聪明的", phonetic: "/smɑːt/", pos: "adj.", difficulty: 2 },
    { en: "strong", cn: "强壮的", phonetic: "/strɒŋ/", pos: "adj.", difficulty: 1 },
    { en: "young", cn: "年轻的", phonetic: "/jʌŋ/", pos: "adj.", difficulty: 1 },
    { en: "rich", cn: "富裕的", phonetic: "/rɪtʃ/", pos: "adj.", difficulty: 2 },
    { en: "quiet", cn: "安静的", phonetic: "/ˈkwaɪət/", pos: "adj.", difficulty: 2 },
    { en: "afraid", cn: "害怕的", phonetic: "/əˈfreɪd/", pos: "adj.", difficulty: 2 },
    { en: "angry", cn: "生气的", phonetic: "/ˈæŋɡri/", pos: "adj.", difficulty: 1 },
  ],
};

// ─── 词书元数据 + 按需加载 ───

export interface WordBookMeta {
  id: string;
  name: string;
  nameEn: string;
  wordCount: number;
  /** builtin = words 已内嵌；remote = fetch /typing-dicts/<id>.json */
  source: "builtin" | "remote";
}

export const BOOK_METAS: WordBookMeta[] = [
  { id: "zk-starter", name: "入门精选", nameEn: "Starter Picks", wordCount: ZK_STARTER_BOOK.words.length, source: "builtin" },
  { id: "zk", name: "中考核心词", nameEn: "Junior High Core", wordCount: 1468, source: "remote" },
  { id: "gk", name: "高考核心词", nameEn: "Senior High Core", wordCount: 3419, source: "remote" },
  { id: "cet4", name: "四级核心词", nameEn: "CET-4 Core", wordCount: 3743, source: "remote" },
  { id: "cet6", name: "六级核心词", nameEn: "CET-6 Core", wordCount: 5271, source: "remote" },
  { id: "ky", name: "考研核心词", nameEn: "Postgraduate Core", wordCount: 4711, source: "remote" },
  { id: "freq-top3000", name: "通用高频词", nameEn: "Frequency Top 3000", wordCount: 3000, source: "remote" },
  { id: "freq-all", name: "词库总集", nameEn: "Complete Lexicon", wordCount: 40799, source: "remote" },
  { id: "toefl", name: "托福核心词", nameEn: "TOEFL Core", wordCount: 6662, source: "remote" },
  { id: "ielts", name: "雅思核心词", nameEn: "IELTS Core", wordCount: 4620, source: "remote" },
  { id: "gre", name: "GRE 核心词", nameEn: "GRE Core", wordCount: 7257, source: "remote" },
];

const cache = new Map<string, WordBook>();

export function defaultBook(): WordBook {
  return ZK_STARTER_BOOK;
}

export function bookMeta(id: string): WordBookMeta | undefined {
  return BOOK_METAS.find((m) => m.id === id);
}

/** 按需加载词书（内存缓存；builtin 同步返回）。失败抛错由调用方处理。 */
export async function loadWordBook(id: string): Promise<WordBook> {
  if (id === ZK_STARTER_BOOK.id) return ZK_STARTER_BOOK;
  const hit = cache.get(id);
  if (hit) return hit;
  const res = await fetch(`${BASE_PATH}/typing-dicts/${id}.json`);
  if (!res.ok) throw new Error(`wordbook ${id} http_${res.status}`);
  const book = (await res.json()) as WordBook;
  // 例句包合并（gen-examples.mjs 产物 examples-<id>.json；404 静默跳过）
  try {
    const exRes = await fetch(`${BASE_PATH}/typing-dicts/examples-${id}.json`);
    if (exRes.ok) {
      const examples = (await exRes.json()) as Record<string, { example: string; exampleCn: string }>;
      for (const w of book.words) {
        const ex = examples[w.en];
        if (ex) {
          w.example = ex.example;
          w.exampleCn = ex.exampleCn;
        }
      }
    }
  } catch {
    /* 例句包缺失不影响词书可用 */
  }
  cache.set(id, book);
  return book;
}
