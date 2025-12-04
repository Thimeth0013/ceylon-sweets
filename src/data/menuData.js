import Weli from '../assets/about.jpg';

export const menuItems = {
  Traditional: [
    {
      id: 'welithalapa',
      name: 'Welithalapa',
      desc: 'Rice flour & treacle delicacy',
      image: Weli,
      hasVariants: true,
      variants: [
        { name: 'Normal Welithalapa (1kg Box)', price: 1150 },
        { name: 'Kithul Treacle Welithalapa (1kg Box)', price: 1450 }
      ]
    },
    {
      id: 'aluwa',
      name: 'Aluwa Collection',
      desc: 'Traditional flour & nut squares',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Aluwa',
      hasVariants: true,
      variants: [
        { name: 'Normal Aluwa (25pcs)', price: 1150 },
        { name: 'Cashew Aluwa (25pcs)', price: 1250 },
        { name: 'Kithul Treacle Aluwa (25pcs)', price: 1450 },
        { name: 'Kithul Treacle Cashew Aluwa (25pcs)', price: 1500 }
      ]
    },
    {
      id: 'hendi_kevum',
      name: 'Hendi Kevum',
      desc: '10pcs Box',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Hendi',
      price: 800,
      hasVariants: false
    },
    {
      id: 'konda_kevum',
      name: 'Konda Kevum',
      desc: '10pcs Box',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Konda',
      price: 800,
      hasVariants: false
    },
    {
      id: 'mung_kevum',
      name: 'Mung Kevum',
      desc: '10pcs Box',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Mung',
      price: 800,
      hasVariants: false
    },
    {
      id: 'narang_kevum',
      name: 'Narang Kevum',
      desc: 'Sweet balls with filling',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Narang',
      hasVariants: true,
      variants: [
        { name: 'With Welithalapa Filling (10pcs)', price: 700 },
        { name: 'With Pani Pol Filling (10pcs)', price: 800 }
      ]
    },
    {
      id: 'pani_walalu',
      name: 'Pani Walalu',
      desc: '10pcs Box',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Pani',
      price: 900,
      hasVariants: false
    },
    {
      id: 'asmi',
      name: 'Asmi',
      desc: '10pcs Box',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Asmi',
      price: 1200,
      hasVariants: false,
      tag: 'Take Away Only'
    },
    {
      id: 'kokis',
      name: 'Kokis',
      desc: '30pcs Box',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Kokis',
      price: 1100,
      hasVariants: false,
      tag: 'Take Away Only'
    },
    {
      id: 'coconut_toffee',
      name: 'Coconut Toffee',
      desc: 'Rich coconut sweet',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Coco',
      hasVariants: true,
      variants: [
        { name: '15pcs Box', price: 650 },
        { name: '30pcs Box', price: 1250 }
      ]
    },
    {
      id: 'milk_toffee',
      name: 'Milk Toffee (Milkmaid)',
      desc: 'Creamy milk fudge',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Milk',
      hasVariants: true,
      variants: [
        { name: '25pcs Box', price: 1190 },
        { name: '50pcs Box', price: 2350 }
      ]
    },
    {
      id: 'watalappan',
      name: 'Watalappan',
      desc: 'Authentic Jaggery Pudding',
      image: 'https://placehold.co/70x70/2A1B12/D4AF37?text=Wata',
      hasVariants: true,
      tag: 'Take Away Only',
      variants: [
        { name: '1kg Tray', price: 1790 },
        { name: '1 Cup (MOQ 10)', price: 180 }
      ]
    }
  ],

  Baked: [
    {
      category: 'Cakes',
      items: [
        {
          id: 'butter_cake',
          name: 'Butter Cake',
          desc: 'Butter Cake 1kg',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Cake',
          hasVariants: true,
          variants: [{ name: '1kg', price: 1750 }]
        },
        {
          id: 'chocolate_cake_dark_bc',
          name: 'Chocolate Cake',
          desc: 'Dark Buttercream (1kg)',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Choc',
          hasVariants: true,
          variants: [{ name: '1kg', price: 2690 }]
        },
        {
          id: 'coffee_cake_coffee_bc',
          name: 'Coffee Cake',
          desc: 'Coffee Buttercream (1kg)',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Coff',
          hasVariants: true,
          variants: [{ name: '1kg', price: 2690 }]
        },
        {
          id: 'strawberry_cake',
          name: 'Strawberry Cake',
          desc: '1kg',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Straw',
          hasVariants: true,
          variants: [{ name: '1kg', price: 2490 }]
        },
        {
          id: 'ribbon_cake_vanilla_bc',
          name: 'Ribbon Cake',
          desc: 'Vanilla Buttercream (1kg)',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Ribb',
          hasVariants: true,
          variants: [{ name: '1kg', price: 2490 }]
        },
        {
          id: 'marble_cake',
          name: 'Marble Cake',
          desc: '1kg',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Marb',
          hasVariants: true,
          variants: [{ name: '1kg', price: 1850 }]
        },
        {
          id: 'date_cake',
          name: 'Date Cake',
          desc: '1kg',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Date',
          hasVariants: true,
          variants: [{ name: '1kg', price: 1950 }]
        }
      ]
    },

    {
      category: 'Dogs & Buns',
      items: [
        {
          id: 'hot_dog',
          name: 'Hot Dog',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=HotDog',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 175 }]
        },
        {
          id: 'chicken_bun',
          name: 'Chicken Bun',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Bun',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 250 }]
        },
        {
          id: 'chicken_cheese_bun',
          name: 'Chicken & Cheese Bun',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=ChBz',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 280 }]
        },
        {
          id: 'tuna_bun',
          name: 'Tuna Bun',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Tuna',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 280 }]
        },
        {
          id: 'egg_bun',
          name: 'Egg Bun',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Egg',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 280 }]
        }
      ]
    },

    {
      category: 'Sandwiches',
      items: [
        {
          id: 'egg_sandwich',
          name: 'Egg Sandwich',
          desc: '2 Slices',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Sand',
          hasVariants: true,
          variants: [{ name: '2 Slices', price: 220 }]
        },
        {
          id: 'tuna_sandwich',
          name: 'Tuna Sandwich',
          desc: '2 Slices',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Sand',
          hasVariants: true,
          variants: [{ name: '2 Slices', price: 250 }]
        },
        {
          id: 'chicken_sandwich',
          name: 'Chicken Sandwich',
          desc: '2 Slices',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Sand',
          hasVariants: true,
          variants: [{ name: '2 Slices', price: 280 }]
        }
      ]
    },

    {
      category: 'Savouries',
      items: [
        {
          id: 'baked_fish_patties',
          name: 'Baked Fish Patties',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Patty',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 220 }]
        },
        {
          id: 'fish_cutlet',
          name: 'Fish Cutlet',
          desc: 'Regular',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Cutlet',
          hasVariants: true,
          variants: [{ name: 'Regular', price: 250 }]
        },
        {
          id: 'kebabs',
          name: 'Kebabs',
          desc: 'Sausage / Meatball / Veg / Pineapple',
          image: 'https://placehold.co/70x70/3E2723/D4AF37?text=Kebab',
          hasVariants: true,
          variants: [
            { name: 'Sausage', price: 280 },
            { name: 'Meatball', price: 280 },
            { name: 'Veg', price: 280 },
            { name: 'Pineapple', price: 280 }
          ]
        }
      ]
    }
  ],

  Other: [
    { id: 'cashew_peanut_mix', name: 'Cashew & Peanut Mix', desc: 'Savoury Mix', image: 'https://placehold.co/70x70/5D4037/D4AF37?text=Mix', price: 2213, hasVariants: false },
    { id: 'chilli_paste', name: 'Chilli Paste', desc: 'Spicy Condiment', image: 'https://placehold.co/70x70/5D4037/D4AF37?text=Paste', price: 2213, hasVariants: false },
    { id: 'village_pickle', name: 'Village Pickle', desc: 'Traditional Pickle', image: 'https://placehold.co/70x70/5D4037/D4AF37?text=Pickle', price: 2213, hasVariants: false },
    { id: 'baby_jackfruit_pickle', name: 'Baby Jack Fruit Pickle', desc: 'Polos Ambula Style', image: 'https://placehold.co/70x70/5D4037/D4AF37?text=Jack', price: 2213, hasVariants: false },
    { id: 'eggplant_pickle', name: 'Eggplant Pickle', desc: 'Moju Style', image: 'https://placehold.co/70x70/5D4037/D4AF37?text=Moju', price: 2213, hasVariants: false }
  ]
};