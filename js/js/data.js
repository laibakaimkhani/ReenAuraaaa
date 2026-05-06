const products = [
    {
        id: 1,
        name: "Aura Gold Ring",
        category: "rings",
        price: 45.00,
        image: "http://images.pexels.com/photos/12194375/pexels-photo-12194375.jpeg?_gl=1*1hvz13g*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgwOTk5MDQkajQyJGwwJGgw",
        description: "A minimalist gold ring for everyday elegance."
    },
    {
        id: 2,
        name: "Eternity Diamond Ring",
        category: "rings",
        price: 85.00,
        image: "https://images.pexels.com/photos/7436111/pexels-photo-7436111.jpeg?_gl=1*188cixj*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDEyOTgkajMyJGwwJGgw",
        description: "A stunning band embedded with tiny, sparkling stones."
    },
    {
        id: 3,
        name: "Classic Silver Ring",
        category: "rings",
        price: 35.00,
        image: "https://images.pexels.com/photos/27014120/pexels-photo-27014120.jpeg?_gl=1*165pl8a*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDE0MDQkajgkbDAkaDA.",
        description: "A clean, polished silver ring that goes with everything."
    },
    {
        id: 4,
        name: "Pearl Drop Earrings",
        category: "earrings",
        price: 55.00,
        image: "https://images.pexels.com/photos/23495777/pexels-photo-23495777.jpeg?_gl=1*1cy5of2*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDA3NjQkajM5JGwwJGgw",
        description: "Elegant freshwater pearls suspended from gold hooks."
    },
    {
        id: 5,
        name: "Gold Hoop Set",
        category: "earrings",
        price: 40.00,
        image: "https://images.pexels.com/photos/30988726/pexels-photo-30988726.jpeg?_gl=1*awz9w6*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDA4NDQkajM2JGwwJGgw",
        description: "Thick, bold gold hoops perfect for a night out."
    },
    {
        id: 6,
        name: "Diamond Studs",
        category: "earrings",
        price: 90.00,
        image: "https://images.pexels.com/photos/30746005/pexels-photo-30746005.jpeg?_gl=1*l9qeo6*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDA2OTckajIzJGwwJGgw",
        description: "Classic, brilliant-cut diamond studs set in platinum."
    },
    {
        id: 7,
        name: "Layered Gold Chain",
        category: "necklaces",
        price: 75.00,
        image: "https://images.pexels.com/photos/9726884/pexels-photo-9726884.jpeg?_gl=1*11kajd7*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDAzMzUkajE2JGwwJGgw",
        description: "A delicate double-layered necklace in 18k gold."
    },
    {
        id: 8,
        name: "Solitaire Pendant",
        category: "necklaces",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
        description: "A breathtaking single diamond pendant on a fine chain."
    },
    {
        id: 9,
        name: "Pearl Choker",
        category: "necklaces",
        price: 65.00,
        image: "https://images.pexels.com/photos/33342840/pexels-photo-33342840.jpeg?_gl=1*1ojqlv0*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDAyMDYkajMkbDAkaDA.",
        description: "A trendy rose gold choker for a modern look."
    },
    {
        id: 10,
        name: "Tennis Bracelet",
        category: "bracelets",
        price: 95.00,
        image: "https://images.pexels.com/photos/31605843/pexels-photo-31605843.jpeg?_gl=1*5wcgn3*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTU4NDUkbzQkZzEkdDE3NzgwOTU4NjIkajQzJGwwJGgw",
        description: "A continuous line of sparkling diamonds around the wrist."
    },
    {
        id: 11,
        name: "Charm Bangle",
        category: "bracelets",
        price: 50.00,
        image: "https://images.pexels.com/photos/8766262/pexels-photo-8766262.jpeg?_gl=1*iz01er*_ga*MTIwNDY3MzY4NC4xNzQ3MzkwNTk5*_ga_8JE65Q40S6*czE3NzgwOTc5OTIkbzUkZzEkdDE3NzgxMDA2MDUkajIxJGwwJGgw",
        description: "A silver bangle with personalized charms."
    },
    {
        id: 12,
        name: "Woven Gold Cuff",
        category: "bracelets",
        price: 80.00,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
        description: "An intricately woven thick gold cuff."
    }
];
