import productImg01 from "../Images/double-sofa-01.png";
import productImg02 from "../Images/double-sofa-02.png";
import productImg03 from "../Images/double-sofa-03.png";
import productImg004 from "../Images/double-sofa-04.png";

import productImg04 from "../Images/single-sofa-01.jpg";
import productImg05 from "../Images/single-sofa-02.jpg";
import productImg06 from "../Images/single-sofa-03.jpg";
import productImg007 from "../Images/single-sofa-04.png";

import productImg07 from "../Images/arm-chair-01.jpg";
import productImg08 from "../Images/arm-chair-02.jpg";
import productImg09 from "../Images/arm-chair-03.jpg";
import productImg10 from "../Images/arm-chair-01.jpg";

import phone01 from "../Images/phone-01.jpg";
import phone02 from "../Images/phone-02.jpg";
import phone03 from "../Images/phone-03.jpg";
import phone04 from "../Images/phone-04.jpg";
import phone05 from "../Images/phone-05.jpg";
import phone06 from "../Images/phone-06.jpg";
import phone08 from "../Images/phone-08.png";

import watch01 from "../Images/watch-01.jpg";
import watch02 from "../Images/watch-02.jpg";
import watch03 from "../Images/watch-03.jpg";
import watch04 from "../Images/watch-04.jpg";

import wireless01 from "../Images/wireless-01.png";
import wireless02 from "../Images/wireless-02.png";
import wireless03 from "../Images/wireless-03.png";
import wireless04 from "../Images/wireless-04.png";

import sofaSlide from "../Images/hero-img.png";
import watchSlide from "../Images/watch-07.png";

export const SliderData = [
  {
    id: 1,
    title: "50% Off For Your First Shopping",
    desc: "Grab your favorites at half the price! Limited time offer—enjoy a fantastic 50% discount on your inaugural purchase!",
    cover: sofaSlide,
  },
  {
    id: 2,
    title: "Discover unBoatable deals and fill your cart with joy!",
    desc: "Explore unBoatable bargains and indulge in the joy of saving while you shop 'til you drop!",
    cover: phone08,
  },
  {
    id: 3,
    title: "Uncover incredible savings and fill your cart with delight!",
    desc: "Transform your routine shopping trips into opportunities to stretch your budget further and live more abundantly!",
    cover: wireless01,
  },
  {
    id: 4,
    title: "Explore unBoatable bargains and fill your cart with happiness!",
    desc: "Uncover hidden gems and express your unique personality through our curated collection of must-have items.",
    cover: watchSlide,
  },
];

export const serviceData = [
  {
    icon: <ion-icon name="car"></ion-icon>,
    title: "Free Shipping",
    subtitle: "Enjoy free shipping on all orders!",
    bg: "#fdefe6",
  },
  {
    icon: <ion-icon name="card"></ion-icon>,
    title: "Safe Payment",
    subtitle: "Make secure payments with peace of mind!",
    bg: "#ceebe9",
  },
  {
    icon: <ion-icon name="shield-half-outline"></ion-icon>,
    title: "Secure Payment",
    subtitle: "Shop confidently with our secure payment methods!",
    bg: "#e2f2b2",
  },
  {
    icon: <ion-icon name="headset"></ion-icon>,
    title: "Product Replacement Guarantee",
    subtitle:
      "In case of any issues, we offer hassle-free product replacements!",
    bg: "#d6e5fb",
  },
];

export const discoutProducts = [
  {
    id: "01",
    productName: "Stone and Beam Westview",
    imgUrl: productImg01,
    category: "sofa",
    price: 193,
    discount: 30,
    shortDesc:
      "Enhance your living room with the Stone and Beam Westview sofa, offering unmatched comfort and style.",
    description:
      "Indulge in the luxury of the Stone and Beam Westview sofa. Designed to elevate your space, it combines elegance and comfort seamlessly. Crafted with premium materials, it's the epitome of sophistication and relaxation.",
    reviews: [
      {
        rating: 4.7,
        text: "Elevate your home with this exquisite Stone and Beam Westview sofa.",
      },
    ],
    avgRating: 4.5,
  },

  {
    id: "02",
    productName: "Rivet Bigelow Modern",
    imgUrl: productImg02,
    category: "sofa",
    price: 253,
    discount: 20,
    shortDesc:
      "Experience luxury and comfort with the Rivet Bigelow Modern sofa, perfect for any contemporary living space.",
    description:
      "Elevate your home decor with the Rivet Bigelow Modern sofa. Crafted with attention to detail and style, it offers unparalleled comfort and durability. Whether you're entertaining guests or relaxing after a long day, this sofa is sure to impress.",
    reviews: [
      {
        rating: 4.8,
        text: "Transform your living room with the Rivet Bigelow Modern sofa.",
      },
      {
        rating: 4.8,
        text: "Upgrade your home with the Rivet Bigelow Modern sofa today.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "08",
    productName: "Baltsar Chair",
    imgUrl: productImg08,
    category: "chair",
    price: 89,
    discount: 15,
    shortDesc:
      "Introducing the stylish and comfortable Baltsar Chair, perfect for any modern home or office setting.",
    description:
      "Upgrade your seating experience with the Baltsar Chair. Designed for both style and comfort, it features premium materials and ergonomic design. Whether you're working or relaxing, this chair provides the support you need.",
    reviews: [
      {
        rating: 4.6,
        text: "Experience unmatched comfort with the Baltsar Chair.",
      },
      {
        rating: 4.9,
        text: "Transform your space with the Baltsar Chair today.",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "09",
    productName: "Helmar Chair",
    imgUrl: productImg09,
    category: "chair",
    price: 112,
    discount: 35,
    shortDesc:
      "Discover the Helmar Chair, crafted for both style and comfort, perfect for any contemporary space.",
    description:
      "Elevate your seating experience with the Helmar Chair. Designed with premium materials and ergonomic features, it provides optimal support for extended periods of sitting.",
    reviews: [
      {
        rating: 4.6,
        text: "Experience unparalleled comfort with the Helmar Chair.",
      },
      {
        rating: 4.9,
        text: "Transform your living space with the Helmar Chair today.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "12",
    productName: "Realme 8",
    imgUrl: phone03,
    category: "mobile",
    price: 599,
    discount: 10,
    shortDesc:
      "Introducing the Realme 8, packed with features and performance to keep you ahead of the game.",
    description:
      "Unlock the power of innovation with the Realme 8. Boasting cutting-edge technology and sleek design, it's the perfect companion for your digital lifestyle.",
    reviews: [
      {
        rating: 4.8,
        text: "Experience the next level of mobile innovation with Realme 8.",
      },
      {
        rating: 4.9,
        text: "Discover a world of possibilities with Realme 8.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "13",
    productName: "One Plus Nord",
    imgUrl: phone04,
    category: "mobile",
    price: 799,
    discount: 5,
    shortDesc:
      "Unleash the power of performance with the One Plus Nord, designed to exceed your expectations.",
    description:
      "Experience unparalleled speed and efficiency with the One Plus Nord. With its cutting-edge technology and sleek design, it's the perfect blend of style and substance.",
    reviews: [
      {
        rating: 4.8,
        text: "Experience the future of mobile technology with One Plus Nord.",
      },
      {
        rating: 4.9,
        text: "Unlock endless possibilities with One Plus Nord.",
      },
    ],
    avgRating: 4.8,
  },
];

export const products = [
  {
    id: "01",
    productName: "Stone and Beam Westview ",
    imgUrl: productImg01,
    category: "sofa",
    price: 193,
    shortDesc:
      "Experience the comfort of the Stone and Beam Westview sofa! Perfect for your living space.",
    description:
      "Transform your living space with the Stone and Beam Westview sofa. Crafted with quality materials, this sofa offers both style and comfort. Its modern design and durable construction make it a perfect addition to any home. Relax and unwind in style with the Stone and Beam Westview sofa!",
    reviews: [
      {
        rating: 4.7,
        text: "I absolutely love my Stone and Beam Westview sofa! It's stylish, comfortable, and durable. Highly recommend!",
      },
    ],
    avgRating: 4.7,
  },

  {
    id: "02",
    productName: "Rivet Bigelow Modern ",
    imgUrl: productImg02,
    category: "sofa",
    price: 253,
    shortDesc:
      "Experience comfort and style with our Rivet Bigelow Modern sofa.",
    description:
      "Elevate your living space with the Rivet Bigelow Modern sofa. Crafted with premium materials and attention to detail, this sofa offers unparalleled comfort and sophistication. Whether you're entertaining guests or unwinding after a long day, the Rivet Bigelow Modern sofa provides the perfect seating solution. Its contemporary design seamlessly blends with any decor, making it a versatile addition to your home.",
    reviews: [
      {
        rating: 4.8,
        text: "The Rivet Bigelow Modern sofa exceeded my expectations. It's incredibly comfortable and well-made.",
      },
      {
        rating: 4.8,
        text: "I'm impressed with the quality and design of the Rivet Bigelow Modern sofa. It's a fantastic addition to my living room.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "03",
    productName: "Amazon Brand Modern Sofa",
    imgUrl: productImg03,
    category: "sofa",
    price: 173,
    shortDesc: "Enhance your living space with the Amazon Brand Modern Sofa.",
    description:
      "Elevate your comfort and style with the Amazon Brand Modern Sofa. This sofa combines sleek design with premium quality materials to provide the ultimate seating experience. Whether you're relaxing with family or entertaining guests, the Amazon Brand Modern Sofa offers the perfect blend of sophistication and comfort. Its contemporary design and versatile color make it a stylish addition to any home decor.",
    reviews: [
      {
        rating: 4.6,
        text: "I am very satisfied with the Amazon Brand Modern Sofa. It exceeded my expectations in terms of comfort and style.",
      },
      {
        rating: 4.9,
        text: "The Amazon Brand Modern Sofa is a fantastic addition to my living room. It's comfortable, stylish, and well-made.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "26",
    productName: "Rivet Bigelow Modern",
    imgUrl: productImg004,
    category: "sofa",
    price: 253,
    shortDesc:
      "Experience unparalleled comfort with the Rivet Bigelow Modern Sofa.",
    description:
      "Elevate your living space with the Rivet Bigelow Modern Sofa. Crafted with premium materials and a contemporary design, this sofa offers both style and comfort. Whether you're entertaining guests or enjoying a quiet night in, the Rivet Bigelow Modern Sofa is the perfect choice. Its sleek silhouette and luxurious upholstery make it a standout piece in any room.",
    reviews: [
      {
        rating: 4.8,
        text: "I absolutely love the Rivet Bigelow Modern Sofa. It's incredibly comfortable and looks stunning in my living room.",
      },
      {
        rating: 4.8,
        text: "The Rivet Bigelow Modern Sofa exceeded my expectations. It's stylish, comfortable, and well-made.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "04",
    productName: "Fluffy Sheep Sofa",
    imgUrl: productImg04,
    category: "sofa",
    price: 163,
    shortDesc: "Experience ultimate coziness with the Fluffy Sheep Sofa.",
    description:
      "Transform your living room into a haven of comfort with the Fluffy Sheep Sofa. Designed for relaxation, this sofa features plush cushions and a charming aesthetic. The Fluffy Sheep Sofa is not just a piece of furniture; it's a statement of warmth and style. Whether you're unwinding after a long day or hosting friends, the Fluffy Sheep Sofa ensures a delightful seating experience.",
    reviews: [
      {
        rating: 4.6,
        text: "The Fluffy Sheep Sofa is incredibly comfortable and adds a touch of charm to my living space.",
      },
      {
        rating: 4.9,
        text: "I love the design and comfort of the Fluffy Sheep Sofa. It's a fantastic addition to my home.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "05",
    productName: "Faux Velvet Sofa",
    imgUrl: productImg05,
    category: "sofa",
    price: 163,
    shortDesc: "Elevate your living space with the luxurious Faux Velvet Sofa.",
    description:
      "Indulge in opulence with the Faux Velvet Sofa. Crafted with premium materials and exquisite attention to detail, this sofa exudes sophistication and comfort. Its elegant design and plush cushions make it the perfect centerpiece for any modern home. Whether you're relaxing with a book or entertaining guests, the Faux Velvet Sofa offers unparalleled style and relaxation.",
    reviews: [
      {
        rating: 4.6,
        text: "The Faux Velvet Sofa exceeded my expectations. It's both stylish and comfortable.",
      },
      {
        rating: 4.9,
        text: "I'm impressed by the quality and comfort of the Faux Velvet Sofa. It's a fantastic addition to my living room.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "06",
    productName: "Fllufy Sheep Sofa",
    imgUrl: productImg06,
    category: "sofa",
    price: 163,
    shortDesc: "Experience unparalleled comfort with the Fllufy Sheep Sofa.",
    description:
      "Indulge in supreme comfort with the Fllufy Sheep Sofa. Crafted with the finest materials and designed for maximum relaxation, this sofa elevates your lounging experience to new heights. Its plush cushions and stylish design make it the perfect addition to any contemporary living space. Whether you're unwinding after a long day or hosting friends, the Fllufy Sheep Sofa offers both style and comfort.",
    reviews: [
      {
        rating: 4.6,
        text: "The Fllufy Sheep Sofa is incredibly comfortable. It's my new favorite spot in the house.",
      },
      {
        rating: 4.9,
        text: "I'm amazed by the quality and comfort of the Fllufy Sheep Sofa. It's a must-have for any modern home.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "07",
    productName: "Sakarias Armchair",
    imgUrl: productImg07,
    category: "chair",
    price: 99,
    shortDesc: "Elevate your relaxation with the Sakarias Armchair.",
    description:
      "Experience ultimate relaxation with the Sakarias Armchair. Designed with your comfort in mind, this armchair combines sleek style with cozy cushioning to create the perfect seating solution for your home. Whether you're reading a book or enjoying a cup of coffee, the Sakarias Armchair offers luxurious comfort and contemporary design. Treat yourself to the ultimate lounging experience with the Sakarias Armchair.",
    reviews: [
      {
        rating: 4.6,
        text: "The Sakarias Armchair is the epitome of comfort. I love sinking into its plush cushions after a long day.",
      },
      {
        rating: 4.9,
        text: "I'm impressed by the quality and design of the Sakarias Armchair. It's the perfect addition to my living room.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "27",
    productName: "Modern Arm Sofa",
    imgUrl: productImg007,
    category: "sofa",
    price: 173,
    shortDesc: "Experience luxury with the Modern Arm Sofa.",
    description:
      "Indulge in luxurious comfort with the Modern Arm Sofa. Crafted with the finest materials and designed for maximum relaxation, this sofa elevates your lounging experience to new heights. Its sleek design and plush cushions make it the perfect centerpiece for any modern living space. Whether you're unwinding after a long day or hosting guests, the Modern Arm Sofa offers both style and comfort.",
    reviews: [
      {
        rating: 4.6,
        text: "The Modern Arm Sofa exceeded my expectations. It's incredibly comfortable and stylish.",
      },
      {
        rating: 4.9,
        text: "I'm impressed by the quality and design of the Modern Arm Sofa. It's the perfect addition to my home.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "08",
    productName: "Baltsar Chair",
    imgUrl: productImg08,
    category: "chair",
    price: 89,
    shortDesc: "Elevate your seating experience with the Baltsar Chair.",
    description:
      "Upgrade your seating area with the Baltsar Chair. Designed for both style and comfort, this chair features a sleek silhouette and plush cushioning for ultimate relaxation. Whether you're lounging in the living room or adding extra seating to your home office, the Baltsar Chair offers both versatility and charm. Treat yourself to the perfect blend of comfort and style with the Baltsar Chair.",
    reviews: [
      {
        rating: 4.6,
        text: "The Baltsar Chair is fantastic. It's comfortable, stylish, and fits perfectly in my space.",
      },
      {
        rating: 4.9,
        text: "I'm thrilled with the Baltsar Chair. It's well-made and adds a touch of elegance to my room.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "09",
    productName: "Helmar Chair",
    imgUrl: productImg09,
    category: "chair",
    price: 112,
    shortDesc: "Experience comfort and style with the Helmar Chair.",
    description:
      "Transform your space with the Helmar Chair. Designed for both comfort and style, this chair features a modern silhouette and plush cushioning for maximum relaxation. Whether you're curling up with a book or entertaining guests, the Helmar Chair offers both versatility and charm. Treat yourself to the perfect blend of comfort and style with the Helmar Chair.",
    reviews: [
      {
        rating: 4.6,
        text: "The Helmar Chair is amazing. It's comfortable, stylish, and adds a modern touch to my room.",
      },
      {
        rating: 4.9,
        text: "I couldn't be happier with the Helmar Chair. It's exactly what I was looking for in terms of style and comfort.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "10",
    productName: "Apple iPhone 12 Pro",
    imgUrl: phone01,
    category: "mobile",
    price: 799,
    shortDesc:
      "Experience the power of innovation with the Apple iPhone 12 Pro.",
    description:
      "Discover the ultimate smartphone experience with the Apple iPhone 12 Pro. Featuring cutting-edge technology and sleek design, this device redefines what's possible. With its advanced camera system, stunning display, and lightning-fast performance, the iPhone 12 Pro lets you capture every moment with unparalleled clarity and detail. Elevate your mobile experience with the Apple iPhone 12 Pro.",
    reviews: [
      {
        rating: 4.8,
        text: "The Apple iPhone 12 Pro is truly impressive. It's packed with features and delivers exceptional performance.",
      },
      {
        rating: 4.9,
        text: "I'm blown away by the Apple iPhone 12 Pro. It exceeds all my expectations and offers unmatched functionality.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "25",
    productName: "Sakarias Armchair",
    imgUrl: productImg10,
    category: "chair",
    price: 99,
    shortDesc: "Experience comfort and style with the Sakarias Armchair.",
    description:
      "Transform your space with the Sakarias Armchair. Designed for both comfort and style, this chair features a modern silhouette and plush cushioning for maximum relaxation. Whether you're curling up with a book or unwinding after a long day, the Sakarias Armchair offers both versatility and charm. Treat yourself to the perfect blend of comfort and style with the Sakarias Armchair.",
    reviews: [
      {
        rating: 4.6,
        text: "The Sakarias Armchair is amazing. It's comfortable, stylish, and adds a modern touch to my room.",
      },
      {
        rating: 4.9,
        text: "I couldn't be happier with the Sakarias Armchair. It's exactly what I was looking for in terms of style and comfort.",
      },
    ],
    avgRating: 4.7,
  },
  {
    id: "11",
    productName: "Apple iPhone 12 Max",
    imgUrl: phone02,
    category: "mobile",
    price: 799,
    shortDesc:
      "Experience the pinnacle of smartphone technology with the Apple iPhone 12 Max.",
    description:
      "Discover the future of mobile technology with the Apple iPhone 12 Max. Featuring an impressive array of features and cutting-edge design, this device sets a new standard for smartphones. From its stunning display to its powerful performance, the iPhone 12 Max delivers an unparalleled user experience. Elevate your mobile experience with the Apple iPhone 12 Max.",
    reviews: [
      {
        rating: 4.8,
        text: "The Apple iPhone 12 Max is simply outstanding. It's fast, responsive, and delivers exceptional performance.",
      },
      {
        rating: 4.9,
        text: "I'm extremely satisfied with the Apple iPhone 12 Max. It's the perfect combination of style and functionality.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "12",
    productName: "Realme 8",
    imgUrl: phone03,
    category: "mobile",
    price: 599,
    shortDesc: "Experience innovation and style with the Realme 8.",
    description:
      "Discover a new era of innovation with the Realme 8. Featuring cutting-edge technology and sleek design, this smartphone is built to impress. From its stunning display to its powerful performance, the Realme 8 delivers an exceptional user experience. Whether you're capturing memories or staying connected on the go, the Realme 8 has you covered. Elevate your mobile experience with the Realme 8.",
    reviews: [
      {
        rating: 4.8,
        text: "The Realme 8 is fantastic. It's fast, reliable, and offers great value for money.",
      },
      {
        rating: 4.9,
        text: "I'm amazed by the Realme 8. It exceeds my expectations in terms of performance and design.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "13",
    productName: "One Plus Nord",
    imgUrl: phone04,
    category: "mobile",
    price: 799,
    shortDesc:
      "Experience the future of mobile technology with the One Plus Nord.",
    description:
      "Discover a new level of innovation with the One Plus Nord. Featuring cutting-edge technology and sleek design, this smartphone redefines what's possible. From its stunning display to its powerful performance, the One Plus Nord offers an unparalleled user experience. Whether you're capturing memories or staying connected on the go, the One Plus Nord has you covered. Elevate your mobile experience with the One Plus Nord.",
    reviews: [
      {
        rating: 4.8,
        text: "The One Plus Nord is incredible. It's fast, reliable, and offers great features.",
      },
      {
        rating: 4.9,
        text: "I'm extremely satisfied with the One Plus Nord. It's the perfect blend of style and performance.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "14",
    productName: "Apple iPhone 13 Pro",
    imgUrl: phone05,
    category: "mobile",
    price: 899,
    shortDesc:
      "Experience the next generation of mobile technology with the Apple iPhone 13 Pro.",
    description:
      "Discover the future of smartphones with the Apple iPhone 13 Pro. Packed with cutting-edge features and stunning design, this device takes innovation to the next level. From its advanced camera system to its powerful performance, the iPhone 13 Pro delivers an unparalleled user experience. Elevate your mobile experience with the Apple iPhone 13 Pro.",
    reviews: [
      {
        rating: 4.8,
        text: "The Apple iPhone 13 Pro is amazing. It's packed with features and delivers exceptional performance.",
      },
      {
        rating: 4.9,
        text: "I'm blown away by the Apple iPhone 13 Pro. It exceeds all my expectations and offers unmatched functionality.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "15",
    productName: "Samsung Galaxy S22",
    imgUrl: phone06,
    category: "mobile",
    price: 699,
    shortDesc:
      "Experience the future of mobile technology with the Samsung Galaxy S22.",
    description:
      "Discover the ultimate smartphone experience with the Samsung Galaxy S22. Featuring cutting-edge technology and sleek design, this device redefines what's possible. From its stunning display to its powerful performance, the Galaxy S22 lets you do more than ever before. Elevate your mobile experience with the Samsung Galaxy S22.",
    reviews: [
      {
        rating: 4.8,
        text: "The Samsung Galaxy S22 is incredible. It's fast, reliable, and offers great features.",
      },
      {
        rating: 4.9,
        text: "I'm extremely satisfied with the Samsung Galaxy S22. It's the perfect combination of style and functionality.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "16",
    productName: "Rolex Watch",
    imgUrl: watch01,
    category: "watch",
    price: 299,
    shortDesc: "Experience elegance and precision with the Rolex Watch.",
    description:
      "Elevate your style with the timeless elegance of the Rolex Watch. Crafted with precision and attention to detail, this iconic timepiece is a symbol of luxury and sophistication. Whether you're dressing up for a special occasion or simply want to make a statement, the Rolex Watch is the perfect choice. Make every moment count with the Rolex Watch.",
    reviews: [
      {
        rating: 4.8,
        text: "The Rolex Watch is truly exceptional. It's a masterpiece of craftsmanship and design.",
      },
      {
        rating: 4.9,
        text: "I'm amazed by the Rolex Watch. It exceeds all my expectations and adds a touch of luxury to my everyday life.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "17",
    productName: "Timex Easy Reader Watch",
    imgUrl: watch02,
    category: "watch",
    price: 299,
    shortDesc: "Experience timeless style with the Timex Easy Reader Watch.",
    description:
      "Make a statement with the classic elegance of the Timex Easy Reader Watch. Featuring a timeless design and reliable performance, this watch is perfect for any occasion. Whether you're dressing up for a formal event or keeping it casual, the Timex Easy Reader Watch adds a touch of sophistication to your look. Elevate your style with the Timex Easy Reader Watch.",
    reviews: [
      {
        rating: 4.8,
        text: "The Timex Easy Reader Watch is fantastic. It's stylish, reliable, and offers great value for money.",
      },
      {
        rating: 4.9,
        text: "I'm extremely satisfied with the Timex Easy Reader Watch. It's the perfect blend of style and functionality.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "18",
    productName: "Rolex Watch",
    imgUrl: watch03,
    category: "watch",
    price: 299,
    shortDesc: "Experience elegance and precision with the Rolex Watch.",
    description:
      "Elevate your style with the timeless elegance of the Rolex Watch. Crafted with precision and attention to detail, this iconic timepiece is a symbol of luxury and sophistication. Whether you're dressing up for a special occasion or simply want to make a statement, the Rolex Watch is the perfect choice. Make every moment count with the Rolex Watch.",
    reviews: [
      {
        rating: 4.8,
        text: "The Rolex Watch is truly exceptional. It's a masterpiece of craftsmanship and design.",
      },
      {
        rating: 4.9,
        text: "I'm amazed by the Rolex Watch. It exceeds all my expectations and adds a touch of luxury to my everyday life.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "19",
    productName: "Apple Watch series 6",
    imgUrl: watch04,
    category: "watch",
    price: 399,
    shortDesc: "Experience innovation and style with the Apple Watch.",
    description:
      "Discover the future of wearable technology with the Apple Watch. Featuring cutting-edge features and sleek design, this device redefines what's possible. From its advanced health tracking capabilities to its seamless integration with your iPhone, the Apple Watch is the ultimate companion for your active lifestyle. Elevate your style and stay connected with the Apple Watch.",
    reviews: [
      {
        rating: 4.8,
        text: "The Apple Watch is amazing. It's packed with features and offers unmatched functionality.",
      },
      {
        rating: 4.9,
        text: "I'm blown away by the Apple Watch. It exceeds all my expectations and makes staying active easier than ever.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "20",
    productName: "Boat Studio Wireless",
    imgUrl: wireless01,
    category: "wireless",
    price: 199,
    shortDesc:
      "Experience immersive sound with the Boat Studio Wireless headphones.",
    description:
      "Immerse yourself in your favorite music with the Boat Studio Wireless headphones. Featuring premium sound quality and wireless convenience, these headphones deliver an unparalleled listening experience. With their sleek design and comfortable fit, they're perfect for all-day wear. Elevate your audio experience with the Boat Studio Wireless headphones.",
    reviews: [
      {
        rating: 4.8,
        text: "The Boat Studio Wireless headphones are fantastic. They deliver crystal-clear sound and are incredibly comfortable to wear.",
      },
      {
        rating: 4.9,
        text: "I'm extremely satisfied with the Boat Studio Wireless headphones. They offer great value for money and sound amazing.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "21",
    productName: "Boat EP Headphones",
    imgUrl: wireless03,
    category: "wireless",
    price: 199,
    shortDesc: "Experience superior sound quality with the Boat EP Headphones.",
    description:
      "Enjoy superior sound quality and comfort with the Boat EP Headphones. Designed for music lovers, these headphones deliver powerful bass and clear highs for an immersive listening experience. With their lightweight design and adjustable fit, they're perfect for on-the-go use. Take your music to the next level with the Boat EP Headphones.",
    reviews: [
      {
        rating: 4.8,
        text: "The Boat EP Headphones are amazing. They provide excellent sound quality and are comfortable to wear for long periods.",
      },
      {
        rating: 4.9,
        text: "I'm extremely happy with the Boat EP Headphones. They exceeded my expectations and offer great value for money.",
      },
    ],
    avgRating: 4.8,
  },
  {
    id: "22",
    productName: "Sony Headphones",
    imgUrl: wireless02,
    category: "wireless",
    price: 169,
    shortDesc:
      "Experience superior comfort and style with the sony Headphones.",
    description:
      "Elevate your listening experience with the sony Headphones. Designed for comfort and style, these headphones deliver premium sound quality and sleek design. Whether you're commuting, working out, or just relaxing at home, the sony Headphones are the perfect companion. Step up your audio game with the sony Headphones.",
    reviews: [
      {
        rating: 4.8,
        text: "The sony Headphones are excellent. They offer great sound quality and are stylish and comfortable to wear.",
      },
      {
        rating: 4.9,
        text: "I'm extremely satisfied with the sony Headphones. They provide exceptional value for money and sound amazing.",
      },
    ],
    avgRating: 4.8,
  },

  {
    id: "23",
    productName: "Apple airpods pro",
    imgUrl: wireless04,
    category: "wireless",
    price: 139,
    shortDesc: "Experience wireless freedom with the apple airpods pro.",
    description:
      "Enjoy wireless convenience and exceptional sound quality with the apple airpods pro. With their advanced Bluetooth technology, these headphones provide seamless connectivity and freedom of movement. Whether you're working, exercising, or traveling, the apple airpods pro keep you connected to your music wherever you go. Elevate your listening experience with the apple airpods pro.",
    reviews: [
      {
        rating: 4.8,
        text: "The apple airpods pro are fantastic. They offer great sound quality and are comfortable to wear for long periods.",
      },
      {
        rating: 4.9,
        text: "I'm extremely happy with the apple airpods pro. They provide excellent value for money and sound amazing.",
      },
    ],
    avgRating: 4.8,
  },
];
