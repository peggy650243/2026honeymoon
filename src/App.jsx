import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Clock, Coffee, Utensils, Moon, Sun, ChevronDown, Heart, Share2, Navigation, Anchor, Plane, Palmtree, Beer, ShoppingBag, Info, Train, Calculator, CalendarDays, ArrowRightLeft, Delete, Ticket, ListTodo, Plus, X, CheckCircle2, Circle, Menu, Sparkles, CloudRain, CloudSun, CloudLightning, WifiOff, TrainFront, Thermometer, Wind, Droplets, Cloud, Calendar, Umbrella, Car, Search, UtensilsCrossed } from 'lucide-react';

// --- 1. 資料定義 ---

const TRIP_DATA = {
  title: "新加坡 Singapore",
  subtitle: "9天8夜 · 獅城探險與遊輪之旅",
  coverImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2552&auto=format&fit=crop",
  days: [
    {
      id: 1,
      date: "2026/03/31 (二)",
      theme: "星耀獅城與璀璨夜景",
      items: [
        {
          time: "05:30",
          title: "桃園機場 T2 報到",
          type: "transport",
          desc: "星宇航空貴賓室享受早餐，準備開啟美好旅程。",
          icon: "plane",
          details: {
            info: "起飛前 2.5 小時開櫃",
            location: "桃園機場第二航廈 3F 出境大廳",
            tips: "記得預留時間安檢，貴賓室位於 D6 登機門旁"
          }
        },
        {
          time: "08:00 - 12:40",
          title: "飛往新加坡 (Starlux)",
          type: "transport",
          desc: "搭乘星宇航空前往樟宜機場，享受高空飛行時光。",
          icon: "plane",
          details: {
            info: "航班 JX771",
            location: "Singapore Changi Airport",
            tips: "機上提供免費 Wi-Fi (文字訊息)，記得先申請會員"
          }
        },
        {
          time: "14:00",
          title: "飯店 Check-in：Carlton Hotel",
          type: "stay",
          desc: "抵達飯店辦理入住，位於 City Hall 精華地段，交通便利。",
          icon: "hotel",
          details: {
            info: "入住時間: 15:00 後",
            location: "Carlton Hotel Singapore (76 Bras Basah Rd)",
            transport: "從機場站 (CG2) 搭乘東西線 (綠線) 至丹那美拉站 (EW4)，同月台換乘市區方向列車，至政府大廈站 (City Hall, EW13) 下車，步行約 5 分鐘即達。",
            tips: "對面就是 CHIJMES 讚美廣場，晚上氣氛很好"
          }
        },
        {
          time: "16:00 - 17:30",
          title: "Merlion Park (魚尾獅公園)",
          type: "activity",
          desc: "與經典魚尾獅地標合影，欣賞濱海灣美景。",
          details: {
            info: "活動: 拍照留念",
            location: "Merlion Park",
            transport: "從飯店步行至政府大廈站，搭乘紅線/綠線一站至 萊佛士坊站 (Raffles Place, EW14)，H 出口步行約 5 分鐘。亦可直接散步前往約 15-20 分鐘。",
            tips: "建議在 17:00 前抵達，光線較適合拍照"
          }
        },
        {
          time: "17:30 - 19:15",
          title: "晚餐：Jypsy One Fullerton",
          type: "food",
          desc: "享用現代日式料理，就在魚尾獅旁。",
          icon: "utensils",
          details: {
            info: "訂位 17:30，用餐 1.5-2 小時",
            location: "One Fullerton 1F",
            transport: "就在魚尾獅公園旁，步行即達。",
            tips: "戶外座位可欣賞金沙景色，氛圍極佳"
          }
        },
        {
          time: "19:15 - 19:45",
          title: "散步：濱海灣至金沙",
          type: "walk",
          desc: "經 Jubilee Bridge & Helix Bridge，沿途欣賞極美夜景。",
          details: {
            info: "移動時間: 約 20-30 分鐘",
            location: "Jubilee Bridge to Helix Bridge",
            transport: "沿著濱海灣散步道步行前往金沙。",
            tips: "沿途夜景極美，適合拍照"
          }
        },
        {
          time: "19:45 - 20:00",
          title: "抵達水舞秀廣場",
          type: "map-pin",
          desc: "前往金沙 Event Plaza 尋找前排位置。",
          details: {
            info: "地點: 戶外活動廣場",
            location: "Marina Bay Sands Event Plaza",
            transport: "步行抵達。",
            tips: "人潮眾多，建議提早卡位"
          }
        },
        {
          time: "20:00 - 20:15",
          title: "Spectra - Light & Water Show",
          type: "activity",
          desc: "觀賞第一場震撼的聲光水舞秀。",
          icon: "camera",
          details: {
            info: "費用: 免費 (場次 20:00 & 21:00)",
            location: "Event Plaza",
            transport: "已抵達現場。",
            tips: "建議坐在木棧道階梯視野最佳"
          }
        },
        {
          time: "20:15 - 21:30",
          title: "金沙購物中心 / 賭場",
          type: "shop",
          desc: "自由活動，探索 The Shoppes at MBS。",
          icon: "shopping",
          details: {
            info: "活動: 逛街 / 參觀",
            location: "The Shoppes at Marina Bay Sands",
            transport: "步行進入金沙購物中心。",
            tips: "賭場外國人憑護照免費入場 (需滿21歲)"
          }
        }
      ]
    },
    {
      id: 2,
      date: "2026/04/01 (三)",
      theme: "花園城市與在地美食",
      items: [
        {
          time: "09:00",
          title: "喜園咖啡店 YY Kafei Dian",
          type: "food",
          desc: "享用道地的新加坡早餐，必點咖椰麵包與海南咖啡。",
          icon: "coffee",
          details: {
            info: "營業時間: 07:30 - 19:00",
            location: "37 Beach Rd, #01-01",
            transport: "從 Carlton Hotel 步行約 3-5 分鐘即達 (就在隔壁街區)。",
            tips: "推薦點口感鬆軟的「太空包」(Kaya Bun) 配半熟蛋"
          }
        },
        {
          time: "11:00",
          title: "新加坡鴨子船 Ducktours",
          type: "activity",
          desc: "於 Suntec City Mall 搭乘水陸兩棲車，從河上探索城市風光。",
          details: {
            info: "營業時間: 10:00 - 18:00",
            location: "Suntec City Mall",
            transport: "從喜園咖啡店步行至 Suntec City 約 10 分鐘，或穿過 Raffles City 地下街。",
            tips: "已預約，請提早 30 分鐘報到兌換票券"
          }
        },
        {
          time: "12:00",
          title: "松發肉骨茶 Song Fa",
          type: "food",
          desc: "午餐享用米其林推薦的胡椒風味肉骨茶。",
          icon: "utensils",
          details: {
            info: "營業時間: 09:00 - 21:15",
            location: "Song Fa Bak Kut Teh Suntec City",
            tips: "湯可以無限續加，推薦搭配油條"
          }
        },
        {
          time: "14:00 - 17:30",
          title: "濱海灣花園 Gardens by the Bay",
          type: "activity",
          desc: "漫步於未來感十足的超級樹與溫室花園。",
          details: {
            info: "溫室: 09:00 - 21:00",
            location: "Gardens by the Bay",
            transport: "搭乘湯申-東海岸線 (棕線) 至 濱海灣花園站 (TE22) 1號出口。",
            tips: "冷室(Cloud Forest)溫度較低，建議帶薄外套"
          }
        },
        {
          time: "17:30 - 19:30",
          title: "Satay by the Bay",
          type: "food",
          desc: "在花園旁享用晚餐，延續熱帶夜晚的美味。",
          icon: "utensils",
          details: {
            info: "營業時間: 11:00 - 22:00",
            location: "Satay by the Bay",
            transport: "位於濱海灣花園內，跟隨路標步行前往。",
            tips: "除了沙嗲，這裡的烤雞翅和魔鬼魚也很受歡迎"
          }
        },
        {
          time: "19:45",
          title: "Garden Rhapsody 花園狂想曲",
          type: "activity",
          desc: "欣賞超級樹 (Supertrees) 隨著音樂變換燈光的魔幻時刻。",
          icon: "moon",
          details: {
            info: "場次: 19:45 / 20:45",
            location: "Supertree Grove",
            tips: "免費欣賞，躺在樹下的石椅上觀賞體驗最佳"
          }
        },
        {
          time: "21:00",
          title: "Nutmeg & Clove",
          type: "beer",
          desc: "亞洲 50 大酒吧，品嚐融入新加坡歷史與香料元素的特色調酒。",
          icon: "beer",
          details: {
            info: "營業時間: 17:00 - 00:00",
            location: "8 Purvis St",
            transport: "從海灣舫站 (Bayfront, DT16) 搭乘藍線至 武吉士站 (Bugis, DT14)，C 出口步行約 5 分鐘。",
            tips: "強烈建議事先訂位，推薦嘗試他們以新加坡歷史時期命名的調酒"
          }
        }
      ]
    },
    {
      id: 3,
      date: "2026/04/02 (四)",
      theme: "色彩巷弄與遊輪啟航",
      items: [
        {
          time: "09:00",
          title: "Blanco Court Prawn Mee",
          type: "food",
          desc: "在地人也愛的白蘭閣街蝦麵，湯頭濃郁鮮甜。",
          icon: "utensils",
          details: {
            info: "營業時間: 07:00 - 16:00 (週二公休)",
            location: "243 Beach Rd, #01-01",
            transport: "從 Carlton Hotel 步行約 10 分鐘，或搭乘公車。",
            tips: "建議點排骨蝦麵，可以免費續湯"
          }
        },
        {
          time: "10:00",
          title: "甘榜格南 & 哈芝巷",
          type: "walk",
          desc: "Kampong Glam 欣賞蘇丹回教堂，漫步於色彩繽紛的 Haji Lane 塗鴉牆。",
          details: {
            info: "建議停留: 1.5 - 2 小時",
            location: "Kampong Glam & Haji Lane",
            transport: "從蝦麵店步行約 3-5 分鐘即可抵達哈芝巷。",
            tips: "必拍景點：1. 蘇丹回教堂 (金色圓頂) 2. 哈芝巷 (色彩繽紛塗鴉牆) 3. 巴索拉街 (Bussorah St. 棕櫚樹街景) 4. 阿拉伯街 (異國風情布店)"
          }
        },
        {
          time: "11:30",
          title: "前往郵輪碼頭",
          type: "transport",
          desc: "收拾行囊，移動至濱海灣郵輪中心。",
          icon: "car",
          details: {
            info: "目的地: Marina Bay Cruise Centre",
            location: "Marina Bay Cruise Centre Singapore",
            transport: "回飯店領取行李後，直接搭乘 Grab 或計程車前往。",
            tips: "預計車資約 SGD 20-30 (視時段與車型而定)。行李多建議叫 6 人座。"
          }
        },
        {
          time: "13:00",
          title: "迪士尼遊輪登船手續",
          type: "activity",
          desc: "辦理 Check-in，準備登上夢幻的迪士尼遊輪！",
          icon: "anchor",
          details: {
            info: "必備: 護照、船票(APP)",
            location: "Marina Bay Cruise Centre Arrival",
            tips: "記得先下載 Disney Cruise Line APP"
          }
        }
      ]
    },
    {
      id: 4,
      date: "2026/04/06 (一)",
      theme: "重返陸地與海鮮盛宴",
      items: [
        {
          time: "07:00",
          title: "遊輪抵達與下船",
          type: "anchor",
          desc: "結束夢幻的海上之旅，辦理通關手續。",
          icon: "anchor",
          details: {
            info: "程序: 下船 -> 移民官 -> 領行李",
            location: "Marina Bay Cruise Centre",
            tips: "早餐建議在船上吃完再下船"
          }
        },
        {
          time: "11:30",
          title: "飯店 Check-in：The Robertson House",
          type: "stay",
          desc: "入住 The Crest Collection 系列精品酒店，充滿殖民地風情。",
          icon: "hotel",
          details: {
            info: "入住時間: 15:00",
            location: "The Robertson House (1 Unity St)",
            transport: "搭乘 Grab 或計程車前往飯店。",
            tips: "預計車資約 SGD 20-30。可先寄放行李，輕裝前往吃午餐"
          }
        },
        {
          time: "12:30",
          title: "Maxwell 熟食中心",
          type: "food",
          desc: "午餐：朝聖著名的天天海南雞飯或其他在地小吃。",
          details: {
            info: "營業時間: 08:00 - 02:00",
            location: "Maxwell Food Centre",
            transport: "從 Fort Canning 站 (DT20) 搭乘藍線至 牛車水站 (DT19)，轉乘棕線至 麥士威站 (TE18)。",
            tips: "天天雞飯週一可能休息，可改吃阿仔雞飯"
          }
        },
        {
          time: "14:30",
          title: "牛車水文化漫步",
          type: "activity",
          desc: "參觀佛牙寺龍華院與馬里安曼興都廟，感受多元信仰文化。",
          icon: "camera",
          details: {
            info: "佛牙寺: 07:00 - 17:00",
            location: "Buddha Tooth Relic Temple",
            transport: "從 Maxwell 步行即可抵達，佛牙寺就在對面。",
            tips: "進入寺廟需穿著覆蓋肩膀與膝蓋的服裝"
          }
        },
        {
          time: "18:00",
          title: "珍寶海鮮 Jumbo Seafood",
          type: "food",
          desc: "晚餐：享受新加坡國菜「辣椒螃蟹」的吮指美味。",
          details: {
            info: "營業時間: 11:30-14:30 / 17:30-22:30",
            location: "Jumbo Seafood Riverside Point",
            transport: "從牛車水站 (NE4) 搭乘東北線 (紫線) 至 克拉碼頭站 (NE5)，E 出口過橋。",
            tips: "強烈建議事先訂位，且自備手套"
          }
        },
        {
          time: "20:30",
          title: "克拉碼頭與 Southbridge",
          type: "beer",
          desc: "漫步 Clarke Quay 河畔，隨後前往酒吧小酌，俯瞰城市夜景。",
          icon: "beer",
          details: {
            info: "氣氛: 熱鬧夜生活",
            location: "Clarke Quay",
            tips: "搭船遊河(River Cruise)也是不錯的選擇"
          }
        }
      ]
    },
    {
      id: 5,
      date: "2026/04/07 (二)",
      theme: "聖淘沙陽光與魔法",
      items: [
        {
          time: "09:00",
          title: "Tiong Bahru Bakery",
          type: "food",
          desc: "享用新加坡著名的法式可頌與咖啡，開啟美好的一天。",
          icon: "coffee",
          details: {
            info: "營業時間: 07:30 - 19:00",
            location: "Tiong Bahru Bakery (Fort Canning)",
            transport: "從飯店步行約 10 分鐘即可抵達 Fort Canning 分店。",
            tips: "必點原味可頌 (Croissant) 與 Kouign-Amann"
          }
        },
        {
          time: "10:30",
          title: "前往聖淘沙",
          type: "transport",
          desc: "移動至度假勝地聖淘沙島。",
          icon: "navigation",
          details: {
            info: "方式: 輕軌 / 纜車 / 步行",
            location: "VivoCity Station",
            transport: "從 Fort Canning 站 (DT20) 搭乘藍線至 牛車水站 (DT19)，轉乘紫線至 港灣站 (NE1)。",
            tips: "VivoCity 3樓可搭乘 Sentosa Express 輕軌"
          }
        },
        {
          time: "11:00",
          title: "聖淘沙名勝世界",
          type: "activity",
          desc: "參觀賭場或周邊景點，感受度假氛圍。",
          details: {
            info: "入場: 賭場外國人憑護照免費",
            location: "Resorts World Sentosa",
            transport: "搭乘 Sentosa Express 至 Waterfront Station (名勝世界站) 下車。",
            tips: "需滿21歲才能進入賭場，不可穿拖鞋"
          }
        },
        {
          time: "12:00",
          title: "哈利波特：魔法幻境",
          type: "activity",
          desc: "體驗沉浸式互動展覽，探索魔法世界。",
          icon: "ticket",
          details: {
            info: "展覽: 需事先購票",
            location: "Resorts World Sentosa",
            tips: "建議預留 1.5 - 2 小時體驗時間"
          }
        },
        {
          time: "14:00",
          title: "Vivocity 大食代",
          type: "food",
          desc: "午餐：在擁有復古裝潢的 Food Republic 享用午餐。",
          icon: "utensils",
          details: {
            info: "位置: VivoCity 3樓",
            location: "Food Republic VivoCity",
            transport: "搭乘 Sentosa Express 返回 VivoCity 站。",
            tips: "裝潢很有 60 年代復古風，適合拍照"
          }
        },
        {
          time: "15:00",
          title: "Palawan Beach",
          type: "sun",
          desc: "走過吊橋前往「亞洲大陸最南端」，享受海風與椰林。",
          details: {
            info: "開放時間: 海灘全天開放",
            location: "Palawan Beach",
            transport: "再次搭乘 Sentosa Express 至 Beach Station，轉乘海灘接駁車。",
            tips: "吊橋是著名打卡點，日落時分最美"
          }
        },
        {
          time: "17:00",
          title: "烏節路購物",
          type: "shop",
          desc: "移動至烏節路 Orchard Road 商圈逛街。",
          icon: "shopping",
          details: {
            info: "商場: ION, Takashimaya, Paragon",
            location: "Orchard Road",
            transport: "返回港灣站 (NE1)，搭乘紫線至 多美歌站 (NE6) 轉乘紅線至 烏節站 (NS22)。",
            tips: "ION Sky 觀景台若有消費憑據可兌換入場"
          }
        }
      ]
    },
    {
      id: 6,
      date: "2026/04/08 (三)",
      theme: "再見獅城 · 星耀樟宜",
      items: [
        {
          time: "10:30",
          title: "前往樟宜機場",
          type: "transport",
          desc: "帶著滿滿的回憶，移動至世界最佳機場。",
          icon: "plane",
          details: {
            info: "建議: 班機起飛前 3-4 小時抵達",
            location: "Singapore Changi Airport",
            transport: "從 Fort Canning 站 (DT20) 搭乘藍線至 Expo 站 (DT35)，轉乘綠線機場支線至樟宜機場站 (CG2)。",
            tips: "預留充足時間逛 Jewel (星耀樟宜)"
          }
        },
        {
          time: "11:00",
          title: "報到托運行李",
          type: "activity",
          desc: "辦理登機與托運手續，輕鬆逛機場。",
          icon: "plane",
          details: {
            info: "櫃檯: 第二航廈第 12 號櫃檯",
            location: "Changi Airport Terminal 2 Row 12",
            tips: "起飛前 3 小時開放報到，完成後可前往 Jewel"
          }
        },
        {
          time: "11:30",
          title: "星耀樟宜 Jewel",
          type: "activity",
          desc: "欣賞雨漩渦 (Rain Vortex) 瀑布秀，最後的打卡點。",
          details: {
            info: "瀑布時間: 11:00 - 22:00",
            location: "Jewel Changi Airport",
            transport: "位於機場管制區外，可從 T1/T2/T3 步行連通道抵達。",
            tips: "位於管制區外，建議托運完行李後再去"
          }
        },
        {
          time: "12:30",
          title: "T2 貴賓室與轉機區",
          type: "break",
          desc: "於 SATS Premier Lounge 休息，探索轉機區花園。",
          icon: "coffee",
          details: {
            info: "位置: 第二航廈出境大廳 3 樓",
            location: "SATS Premier Lounge T2",
            tips: "經過證照查驗後左轉往登機區 E 方向，搭乘電扶梯往 3 樓"
          }
        },
        {
          time: "14:00",
          title: "航班起飛",
          type: "transport",
          desc: "搭機返家，期待下一次的旅行。",
          icon: "plane",
          details: {
            info: "祝旅途平安！",
            location: "Singapore Changi Airport",
            tips: "記得將液體類免稅品妥善打包"
          }
        }
      ]
    }
  ]
};

const SINGAPORE_FOODS = [
  {
    id: 1,
    name: "海南雞飯",
    originalName: "Hainanese Chicken Rice",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop",
    desc: "新加坡國菜，嫩滑白斬雞配上香氣十足的雞油飯。"
  },
  {
    id: 2,
    name: "叻沙",
    originalName: "Laksa",
    image: "https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=1000&auto=format&fit=crop",
    desc: "濃郁椰奶與香料熬製的湯頭，搭配粗米粉與鮮蝦。"
  },
  {
    id: 3,
    name: "辣椒螃蟹",
    originalName: "Chili Crab",
    image: "https://images.unsplash.com/photo-1555547639-6555198d003a?q=80&w=1000&auto=format&fit=crop",
    desc: "酸甜微辣的醬汁，搭配炸饅頭是絕配。"
  },
  {
    id: 4,
    name: "沙嗲",
    originalName: "Satay",
    image: "https://images.unsplash.com/photo-1552590635-27c2c2128abf?q=80&w=1000&auto=format&fit=crop",
    desc: "炭烤肉串（雞/牛/羊），蘸上濃郁的花生醬。"
  },
  {
    id: 5,
    name: "肉骨茶",
    originalName: "Bak Kut Teh",
    image: "https://images.unsplash.com/photo-1623963229729-195679dc6e46?q=80&w=1000&auto=format&fit=crop",
    desc: "新加坡式通常為胡椒味較重的潮州派系，湯頭清澈辛辣。"
  },
  {
    id: 6,
    name: "咖椰吐司",
    originalName: "Kaya Toast",
    image: "https://images.unsplash.com/photo-1626264696010-39e248a3f769?q=80&w=1000&auto=format&fit=crop",
    desc: "酥脆吐司夾上椰香咖椰醬與牛油，配半熟蛋與咖啡。"
  },
  {
    id: 7,
    name: "印度煎餅",
    originalName: "Roti Prata",
    image: "https://images.unsplash.com/photo-1626809714836-7936647971e9?q=80&w=1000&auto=format&fit=crop",
    desc: "外酥內軟的印度薄餅，可沾咖哩吃或加蛋、起司。"
  },
  {
    id: 8,
    name: "椰漿飯",
    originalName: "Nasi Lemak",
    image: "https://images.unsplash.com/photo-1626117637860-612c3f56999a?q=80&w=1000&auto=format&fit=crop",
    desc: "椰奶烹煮的香飯，配上參巴醬、花生小魚乾與炸雞。"
  },
  {
    id: 9,
    name: "炒粿條",
    originalName: "Char Kway Teow",
    image: "https://images.unsplash.com/photo-1632733979607-422204c3db73?q=80&w=1000&auto=format&fit=crop",
    desc: "大火快炒的扁麵條，加入黑醬油、血蛤、臘腸，鑊氣十足。"
  },
  {
    id: 10,
    name: "福建麵",
    originalName: "Hokkien Mee",
    image: "https://images.unsplash.com/photo-1644309325990-2c7003460677?q=80&w=1000&auto=format&fit=crop",
    desc: "黃麵與米粉混合，以濃郁蝦湯燜煮，配上參巴辣椒。"
  },
  {
    id: 11,
    name: "炒蘿蔔糕",
    originalName: "Chai Tow Kway",
    image: "https://images.unsplash.com/photo-1605333202937-29929d29759c?q=80&w=1000&auto=format&fit=crop",
    desc: "分為「黑」（加甜醬油）與「白」（原味加蛋）兩種風味。"
  },
  {
    id: 12,
    name: "紅豆冰",
    originalName: "Ice Kacang",
    image: "https://images.unsplash.com/photo-1563583597-9a489243763f?q=80&w=1000&auto=format&fit=crop",
    desc: "色彩繽紛的刨冰，底部藏有紅豆、果凍、玉米等配料。"
  }
];

// --- 2. 輔助元件 ---

const IconWrapper = ({ type }) => {
  const className = "w-5 h-5 text-white";
  switch (type) {
    case 'food': return <Utensils className={className} />;
    case 'stay': return <Moon className={className} />;
    case 'transport': return <Plane className={className} />;
    case 'navigation': return <Navigation className={className} />;
    case 'break': return <Coffee className={className} />;
    case 'camera': return <Camera className={className} />;
    case 'anchor': return <Anchor className={className} />;
    case 'sun': return <Palmtree className={className} />;
    case 'beer': return <Beer className={className} />;
    case 'shop': return <ShoppingBag className={className} />;
    case 'ticket': return <Ticket className={className} />;
    case 'car': return <Car className={className} />;
    default: return <MapPin className={className} />;
  }
};

const TimelineItem = ({ item, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative pl-8 pb-8 group">
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-white/40 to-transparent group-hover:from-emerald-300/60 transition-colors duration-500"></div>
      )}

      <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:bg-emerald-400/20 group-hover:border-emerald-400 transition-all duration-300 z-10">
        <div className={`w-2 h-2 rounded-full transition-colors ${isOpen ? 'bg-emerald-300' : 'bg-white group-hover:bg-emerald-300'}`}></div>
      </div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`backdrop-blur-lg border rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
            isOpen
            ? 'bg-white/20 border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.1)]'
            : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40 hover:-translate-y-1'
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2 text-emerald-200 font-mono text-sm tracking-wider">
            <Clock className="w-4 h-4" />
            <span>{item.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${
                item.type === 'food' ? 'bg-orange-400/20' :
                item.type === 'anchor' ? 'bg-indigo-400/30' :
                item.type === 'beer' ? 'bg-yellow-400/20' :
                item.type === 'sun' ? 'bg-sky-400/20' :
                item.type === 'ticket' ? 'bg-pink-400/20' :
                item.type === 'car' ? 'bg-cyan-400/20' :
                'bg-blue-400/20'}`}>
                <IconWrapper type={item.type} />
            </div>
            <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-300' : ''}`} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-gray-200 text-sm leading-relaxed mb-1">{item.desc}</p>

        <div
            className={`grid transition-all duration-500 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10' : 'grid-rows-[0fr] opacity-0 mt-0 pt-0'
            }`}
        >
            <div className="min-h-0 overflow-hidden">
                {item.details && (
                    <div className="grid gap-4 text-sm">
                        <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-emerald-200 text-xs uppercase tracking-wider mb-0.5">營業/時間</span>
                                <span className="text-gray-200">{item.details.info}</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <span className="block text-emerald-200 text-xs uppercase tracking-wider mb-0.5">位置</span>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                    <span className="text-gray-200">{item.details.location}</span>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title + " " + item.details.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-300 text-xs transition-colors border border-emerald-400/20"
                                    >
                                        <MapPin className="w-3 h-3" />
                                        <span>地圖</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {item.details.transport && (
                            <div className="flex items-start gap-3">
                                <TrainFront className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                                <div>
                                    <span className="block text-emerald-200 text-xs uppercase tracking-wider mb-0.5">交通/路線</span>
                                    <span className="text-gray-200 leading-relaxed">{item.details.transport}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3">
                            <Info className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
                            <div>
                                <span className="block text-emerald-200 text-xs uppercase tracking-wider mb-0.5">貼心小提醒</span>
                                <span className="text-gray-200">{item.details.tips}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

const PageHeader = ({ title, subtitle, icon: Icon, coverImage, isMain = false }) => {
  return (
    <div className={`relative w-full flex items-center justify-center overflow-hidden ${isMain ? 'h-[30vh] md:h-[45vh]' : 'h-[20vh] md:h-[30vh]'}`}>
      <div className="absolute inset-0 z-0">
        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-slate-900/40 to-slate-900"></div>
      </div>

      <div className="relative z-10 text-center px-4 animate-fade-in-up mt-4">
        {isMain && (
           <div className="inline-block px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-emerald-300 text-[10px] md:text-xs font-bold tracking-[0.15em] mb-2 uppercase">
              Travel Itinerary
           </div>
        )}
        <div className={`flex items-center justify-center gap-3 ${isMain ? 'mb-2' : 'mb-1'}`}>
            {Icon && <Icon className="w-6 h-6 text-emerald-300" />}
            <h1 className={`${isMain ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'} font-bold text-white tracking-tight drop-shadow-xl`}>
              {title}
            </h1>
        </div>
        <p className={`text-gray-200 font-light ${isMain ? 'text-sm md:text-lg' : 'text-xs md:text-sm opacity-80'}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const CurrencyConverter = ({ coverImage }) => {
  const [sgd, setSgd] = useState(() => localStorage.getItem('calc_sgd') || '');
  const [ntd, setNtd] = useState(() => localStorage.getItem('calc_ntd') || '');
  const RATE = 23;

  useEffect(() => {
    localStorage.setItem('calc_sgd', sgd);
    localStorage.setItem('calc_ntd', ntd);
  }, [sgd, ntd]);

  const handleSgdChange = (e) => {
    const val = e.target.value;
    if (val === '') {
        setSgd('');
        setNtd('');
        return;
    }
    if (!/^\d*\.?\d*$/.test(val)) return;

    setSgd(val);
    setNtd((parseFloat(val) * RATE).toFixed(0));
  };

  const handleNtdChange = (e) => {
    const val = e.target.value;
    if (val === '') {
        setNtd('');
        setSgd('');
        return;
    }
    if (!/^\d*\.?\d*$/.test(val)) return;

    setNtd(val);
    setSgd((parseFloat(val) / RATE).toFixed(2));
  };

  const clearAll = () => {
    setSgd('');
    setNtd('');
  };

  return (
    <div className="flex flex-col animate-fade-in-up">
        <PageHeader
            title="匯率計算機"
            subtitle="1 SGD ≈ 23 NTD"
            icon={Calculator}
            coverImage={coverImage}
        />

        <div className="flex-1 p-6 flex flex-col items-center">
            <div className="w-full max-w-md space-y-6">
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-lg transition-opacity opacity-0 group-focus-within:opacity-100"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition-colors group-focus-within:bg-white/15 group-focus-within:border-emerald-500/50">
                        <label className="block text-emerald-300 text-sm font-bold tracking-widest mb-2">SGD 新加坡幣</label>
                        <div className="flex items-baseline">
                            <span className="text-2xl text-white/50 mr-2">$</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                placeholder="0.00"
                                value={sgd}
                                onChange={handleSgdChange}
                                className="w-full bg-transparent text-4xl font-bold text-white outline-none placeholder-white/10"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center -my-3 relative z-10">
                    <div className="bg-slate-800 border border-white/20 p-2 rounded-full text-white/50 shadow-lg">
                        <ArrowRightLeft className="w-6 h-6" />
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg transition-opacity opacity-0 group-focus-within:opacity-100"></div>
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition-colors group-focus-within:bg-white/15 group-focus-within:border-blue-500/50">
                        <label className="block text-blue-300 text-sm font-bold tracking-widest mb-2">NTD 新台幣</label>
                        <div className="flex items-baseline">
                            <span className="text-2xl text-white/50 mr-2">$</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="0"
                                value={ntd}
                                onChange={handleNtdChange}
                                className="w-full bg-transparent text-4xl font-bold text-white outline-none placeholder-white/10"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <button
                        onClick={clearAll}
                        className="flex items-center justify-center space-x-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 transition-all active:scale-95"
                    >
                        <Delete className="w-5 h-5" />
                        <span>清除</span>
                    </button>
                    <button
                        onClick={() => {
                            const current = parseFloat(sgd) || 0;
                            const newVal = current + 10;
                            setSgd(newVal.toString());
                            setNtd((newVal * RATE).toFixed(0));
                        }}
                        className="py-4 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-xl text-emerald-300 font-bold transition-all active:scale-95"
                    >
                        +10 SGD
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

const PackingList = ({ coverImage }) => {
    const defaultItems = [
        { id: 1, text: "護照 (效期6個月以上)", checked: false, category: "必備" },
        { id: 2, text: "新加坡入境卡 (SG Arrival Card)", checked: false, category: "必備" },
        { id: 3, text: "迪士尼郵輪船票 (APP)", checked: false, category: "必備" },
        { id: 4, text: "網卡 / eSIM", checked: false, category: "必備" },
        { id: 5, text: "信用卡 & 現金 (SGD)", checked: false, category: "錢包" },
        { id: 6, text: "萬用轉接頭 (英式三腳)", checked: false, category: "電子" },
        { id: 7, text: "行動電源", checked: false, category: "電子" },
        { id: 8, text: "牙刷牙膏 (環保旅店可能不附)", checked: false, category: "生活" },
        { id: 9, text: "薄外套 (室內冷氣強)", checked: false, category: "衣物" },
        { id: 10, text: "泳衣 (遊輪/飯店泳池)", checked: false, category: "衣物" },
    ];

    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('packing_list');
        return saved ? JSON.parse(saved) : defaultItems;
    });

    useEffect(() => {
        localStorage.setItem('packing_list', JSON.stringify(items));
    }, [items]);

    const toggleItem = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const categories = [...new Set(items.map(item => item.category))];
    const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

    return (
        <div className="flex flex-col animate-fade-in-up">
            <PageHeader
                title="行前清單"
                subtitle="Packing List"
                icon={ListTodo}
                coverImage={coverImage}
            />

            <div className="flex-1 p-6 max-w-lg mx-auto w-full">
                <div className="mb-8 bg-white/10 rounded-full h-4 overflow-hidden border border-white/10 relative">
                    <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-right text-xs text-emerald-300 mb-6">完成度: {progress}%</div>

                <div className="space-y-6 pb-24">
                    {categories.map(category => (
                        <div key={category}>
                            <h3 className="text-sm font-bold text-gray-400 mb-3 ml-1 uppercase tracking-wider">{category}</h3>
                            <div className="space-y-2">
                                {items.filter(i => i.category === category).map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => toggleItem(item.id)}
                                        className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
                                            item.checked
                                            ? 'bg-emerald-500/10 border-emerald-500/30'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        <div className={`mr-4 transition-colors ${item.checked ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            {item.checked ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                        </div>
                                        <span className={`text-lg transition-all ${item.checked ? 'text-gray-500 line-through' : 'text-white'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LiveWeather = ({ coverImage }) => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeatherIcon = (code) => {
        if (code <= 1) return { icon: Sun, label: "晴朗", color: "text-yellow-400" };
        if (code <= 3) return { icon: CloudSun, label: "多雲", color: "text-gray-300" };
        if (code <= 48) return { icon: Cloud, label: "陰天", color: "text-gray-400" };
        if (code <= 67) return { icon: CloudRain, label: "雨天", color: "text-blue-400" };
        if (code <= 77) return { icon: Cloud, label: "降雪", color: "text-white" };
        if (code <= 82) return { icon: CloudRain, label: "陣雨", color: "text-blue-300" };
        if (code <= 99) return { icon: CloudLightning, label: "雷雨", color: "text-purple-400" };
        return { icon: Cloud, label: "未知", color: "text-gray-400" };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW', { weekday: 'long', month: 'numeric', day: 'numeric' });
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSingapore&forecast_days=3'
                );

                if (!response.ok) throw new Error('無法取得天氣資料');

                const data = await response.json();
                setCurrentWeather(data.current);
                setForecast(data.daily);

                const currentHour = new Date().getHours();
                const next24Hours = data.hourly.time.slice(currentHour, currentHour + 24).map((time, index) => {
                    const originalIndex = currentHour + index;
                    return {
                        time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
                        temp: data.hourly.temperature_2m[originalIndex],
                        code: data.hourly.weather_code[originalIndex],
                        precip: data.hourly.precipitation_probability[originalIndex]
                    };
                });
                setHourlyForecast(next24Hours);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const wInfo = currentWeather ? getWeatherIcon(currentWeather.weather_code) : null;
    const Icon = wInfo ? wInfo.icon : Sun;

    return (
        <div className="flex flex-col animate-fade-in-up">
            <PageHeader
                title="即時天氣"
                subtitle="Live Weather in Singapore"
                icon={CloudSun}
                coverImage={coverImage}
            />

            <div className="flex-1 p-6 flex flex-col items-center justify-start min-h-[70vh] pb-24">
                {loading && (
                    <div className="flex flex-col items-center space-y-4 mt-10">
                        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                        <p className="text-gray-400">正在連線至氣象衛星...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center p-6 bg-red-500/20 rounded-xl border border-red-500/30 mt-10">
                        <WifiOff className="w-12 h-12 text-red-400 mx-auto mb-2" />
                        <p className="text-red-200">{error}</p>
                        <p className="text-xs text-red-300/70 mt-2">請檢查網路連線</p>
                    </div>
                )}

                {currentWeather && !loading && (
                    <div className="w-full max-w-sm space-y-6">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:scale-105 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`p-6 rounded-full bg-white/5 mb-6 ${wInfo.color}`}>
                                    <Icon className="w-20 h-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                                </div>

                                <h2 className="text-6xl font-bold text-white mb-2 tracking-tighter">
                                    {Math.round(currentWeather.temperature_2m)}°
                                </h2>
                                <p className={`text-2xl font-medium mb-8 ${wInfo.color}`}>{wInfo.label}</p>

                                <div className="grid grid-cols-3 gap-4 w-full">
                                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5">
                                        <Thermometer className="w-5 h-5 text-orange-400 mb-1" />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">體感</span>
                                        <span className="text-lg font-bold text-white">{Math.round(currentWeather.apparent_temperature)}°</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5">
                                        <Droplets className="w-5 h-5 text-blue-400 mb-1" />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">濕度</span>
                                        <span className="text-lg font-bold text-white">{currentWeather.relative_humidity_2m}%</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/5">
                                        <Wind className="w-5 h-5 text-teal-400 mb-1" />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">風速</span>
                                        <span className="text-lg font-bold text-white">{currentWeather.wind_speed_10m}<span className="text-xs font-normal ml-1">km/h</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {hourlyForecast && (
                            <div className="space-y-3">
                                <h3 className="text-white/70 text-sm font-bold uppercase tracking-widest pl-2 mb-2">每小時預測</h3>
                                <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
                                    {hourlyForecast.map((hour, idx) => {
                                        const hInfo = getWeatherIcon(hour.code);
                                        const HIcon = hInfo.icon;
                                        const isRainy = hour.precip > 30;

                                        return (
                                            <div key={idx} className={`flex flex-col items-center p-3 rounded-2xl min-w-[70px] border ${isRainy ? 'bg-blue-500/20 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                                                <span className="text-xs text-gray-300 mb-2">{hour.time}</span>
                                                <HIcon className={`w-6 h-6 mb-2 ${hInfo.color}`} />
                                                <span className="text-sm font-bold text-white mb-1">{Math.round(hour.temp)}°</span>

                                                <div className="flex items-center space-x-1">
                                                    <Umbrella className={`w-3 h-3 ${isRainy ? 'text-blue-300' : 'text-gray-600'}`} />
                                                    <span className={`text-[10px] ${isRainy ? 'text-blue-300 font-bold' : 'text-gray-600'}`}>
                                                        {hour.precip}%
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {forecast && (
                            <div className="space-y-3">
                                <h3 className="text-white/70 text-sm font-bold uppercase tracking-widest pl-2 mb-2">未來預報</h3>
                                {forecast.time.slice(1, 3).map((date, index) => {
                                    const i = index + 1;
                                    const fInfo = getWeatherIcon(forecast.weather_code[i]);
                                    const FIcon = fInfo.icon;

                                    return (
                                        <div key={date} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className={`p-2 rounded-full bg-white/5 ${fInfo.color}`}>
                                                    <FIcon className="w-6 h-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium">{index === 0 ? '明天' : '後天'}</span>
                                                    <span className="text-xs text-gray-400">{formatDate(date)}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <div className="flex items-center space-x-2 text-white">
                                                    <span className="font-bold">{Math.round(forecast.temperature_2m_max[i])}°</span>
                                                    <span className="text-gray-500 text-sm">/</span>
                                                    <span className="text-gray-400 text-sm">{Math.round(forecast.temperature_2m_min[i])}°</span>
                                                </div>
                                                <span className={`text-xs ${fInfo.color}`}>{fInfo.label}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <p className="text-center text-xs text-gray-500 font-mono pt-4">
                            Data provided by Open-Meteo API
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const FoodGuide = ({ coverImage }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFoods = SINGAPORE_FOODS.filter(food =>
        food.name.includes(searchTerm) ||
        food.originalName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col animate-fade-in-up">
            <PageHeader
                title="美食圖鑑"
                subtitle="Food Guide"
                icon={UtensilsCrossed}
                coverImage={coverImage}
            />

            <div className="flex-1 p-6 pb-24">
                <div className="relative mb-6 max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:border-emerald-500/50 transition-colors"
                        placeholder="搜尋美食名稱 (如: 叻沙 / Laksa)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {filteredFoods.map(food => (
                        <div key={food.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-xl group">
                            <div className="h-48 w-full overflow-hidden relative">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-3 left-4">
                                    <h3 className="text-xl font-bold text-white">{food.name}</h3>
                                    <p className="text-emerald-300 font-mono text-sm">{food.originalName}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-300 text-sm leading-relaxed">{food.desc}</p>
                            </div>
                        </div>
                    ))}

                    {filteredFoods.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-400">
                            <p>找不到符合的美食... 😅</p>
                            <p className="text-xs mt-2">試試看輸入 "Crab" 或 "麵"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const DaySelector = ({ days, activeDay, setActiveDay }) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 py-2 px-2 overflow-x-auto no-scrollbar">
      <div className="flex space-x-2 min-w-max justify-start md:justify-center px-2">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
              activeDay === day.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-100'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="text-sm font-bold tracking-wide">
              {day.date.substring(5)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const FabMenu = ({ currentView, setView }) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { id: 'itinerary', icon: CalendarDays, label: "行程", color: "bg-emerald-500" },
        { id: 'food-guide', icon: UtensilsCrossed, label: "美食", color: "bg-red-500" },
        { id: 'calculator', icon: Calculator, label: "匯率", color: "bg-blue-500" },
        { id: 'weather', icon: CloudSun, label: "天氣", color: "bg-orange-500" },
        { id: 'packing', icon: ListTodo, label: "清單", color: "bg-purple-500" },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end space-y-3">
            <div className={`flex flex-col space-y-3 transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setView(item.id);
                            setIsOpen(false);
                        }}
                        className={`flex items-center justify-end group`}
                    >
                        <span className="mr-3 px-2 py-1 bg-black/50 text-white text-xs rounded-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.label}
                        </span>
                        <div className={`p-3 rounded-full shadow-lg text-white ${item.color} ${currentView === item.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-700 rotate-45' : 'bg-emerald-500 hover:scale-110'}`}
            >
                <Plus className="w-6 h-6 text-white" />
            </button>
        </div>
    );
};

export default function App() {
  const [activeDay, setActiveDay] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [view, setView] = useState('itinerary');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const currentDayData = TRIP_DATA.days.find(d => d.id === activeDay);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderContent = () => {
      switch (view) {
          case 'calculator':
              return <CurrencyConverter coverImage={TRIP_DATA.coverImage} />;
          case 'packing':
              return <PackingList coverImage={TRIP_DATA.coverImage} />;
          case 'weather':
              return <LiveWeather coverImage={TRIP_DATA.coverImage} />;
          case 'food-guide':
              return <FoodGuide coverImage={TRIP_DATA.coverImage} />;
          default:
              return (
                <>
                    <PageHeader
                        title={TRIP_DATA.title}
                        subtitle={TRIP_DATA.subtitle}
                        coverImage={TRIP_DATA.coverImage}
                        isMain={true}
                    />

                    <DaySelector
                        days={TRIP_DATA.days}
                        activeDay={activeDay}
                        setActiveDay={setActiveDay}
                    />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 min-h-[50vh]">
                        <div key={activeDay} className="animate-slide-up">
                            <div className="mb-4 flex flex-col items-start md:flex-row md:items-end md:space-x-4 border-b border-white/10 pb-4">
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                    {currentDayData.date.replace(/^\d{4}\//, '')}
                                </h2>
                            </div>

                            <div className="space-y-2">
                                {currentDayData.items.map((item, index) => (
                                    <TimelineItem
                                        key={index}
                                        item={item}
                                        isLast={index === currentDayData.items.length - 1}
                                    />
                                ))}
                            </div>

                            <div className="mt-12 text-center pb-24">
                                <p className="text-gray-500 text-sm italic">
                                    {activeDay === 6 ? "Home Sweet Home!" : activeDay === 3 ? "Next Stop: The High Seas!" : "旅途的意義，在於發現未知的自己。"}
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <Sun className="w-6 h-6 text-yellow-500/50 animate-spin-slow" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
              );
      }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-emerald-500/30">
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
            <div className="absolute bottom-0 left-1/3 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]"></div>
        </div>

        {isOffline && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[70] bg-red-500/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 animate-bounce">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm font-bold">目前處於離線狀態</span>
            </div>
        )}

        <FabMenu currentView={view} setView={setView} />

        {renderContent()}

      <style>{`
        @keyframes fadeInUps {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-up {
          animation: fadeInUps 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s infinite ease-in-out;
        }
        .animate-spin-slow {
            animation: spinSlow 12s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}