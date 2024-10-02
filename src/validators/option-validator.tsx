// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950

export const COLORS = [
    {
        label: "Black", value: "black", tw: "#1f2937"
    },
    {
        label: "Rose", value: "rose", tw: "#ef4444"
    },
    {
        label: "Sky", value: "sky", tw: "#0c4a6e"
    },
] as const;



export const MODEL = [
    {
        label: "IPhone 12 Pro", value: 'iphone-12-pro'
    },
    {
        label: "IPhone 13 Pro", value: 'iphone-13-pro'
    },
    {
        label: "IPhone 14 Pro", value: 'iphone-14-pro'
    },
    {
        label: "IPhone 15 Pro", value: 'iphone-15-pro'
    },
    {
        label: "IPhone 16 Pro", value: 'iphone-16-pro'
    },
] as const;

export const MATERIALS = {
    name: 'material',
    options: [
      {
        label: 'Silicone',
        value: 'silicone',
        description: undefined,
        price: 12,
      },
      {
        label: 'Soft Polycarbonate',
        value: 'polycarbonate',
        description: 'Scratch-resistant coating',
        price: 9,
      },
    ],
  } as const
  
  export const FINISHES = {
    name: 'finish',
    options: [
      {
        label: 'Smooth Finish',
        value: 'smooth',
        description: undefined,
        price: 9.99,
      },
      {
        label: 'Textured Finish',
        value: 'textured',
        description: 'Soft grippy texture',
        price: 14.99,
      },
    ],
  } as const