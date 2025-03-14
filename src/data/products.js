const products = [
  {
    id: 1,
    name: 'Tropical Paradise Bikini',
    slug: 'tropical-paradise-bikini',
    price: 49.99,
    salePrice: null,
    categoryId: 1,
    featured: true,
    isNew: true,
    onSale: false,
    description:
      'Make a splash this summer with our vibrant Tropical Paradise Bikini. This two-piece swimsuit features a bold tropical print that will turn heads at the beach or pool. The comfortable, adjustable fit ensures you look and feel your best all day long.',
    features: [
      'Vibrant tropical print',
      'Adjustable straps for a perfect fit',
      'Supportive underwire top',
      'High-quality, quick-drying fabric',
      'UPF 50+ sun protection',
    ],
    images: [
            'https://picsum.photos/id/1005/800/800',
          ],
    stock: 25,
    rating: 4.8,
    reviews: 24,
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 2,
    name: "Azure Wave Men's Swim Shorts",
    slug: 'azure-wave-mens-swim-shorts',
    price: 39.99,
    salePrice: null,
    categoryId: 1,
    featured: true,
    isNew: true,
    onSale: false,
    description:
      "Dive into summer with our Azure Wave Men's Swim Shorts. These comfortable, quick-drying shorts feature a stunning ocean-inspired pattern that captures the essence of summer. Perfect for beach days, pool parties, or casual waterfront dining.",
    features: [
      'Quick-drying microfiber material',
      'Comfortable mesh lining',
      'Adjustable drawstring waist',
      'Side and back pockets',
      'Available in multiple sizes',
    ],
    images: [
            'https://picsum.photos/id/1003/800/800',
          ],
    stock: 30,
    rating: 4.6,
    reviews: 18,
    createdAt: '2024-03-02T10:00:00Z',
  },
  {
    id: 3,
    name: 'Sunset Aviator Sunglasses',
    slug: 'sunset-aviator-sunglasses',
    price: 89.99,
    salePrice: 69.99,
    categoryId: 2,
    featured: true,
    isNew: false,
    onSale: true,
    description:
      'Our Sunset Aviator Sunglasses combine classic style with modern technology. The gradient lenses provide excellent UV protection while the lightweight frame ensures all-day comfort. The perfect accessory for any summer outfit.',
    features: [
      'Polarized lenses reduce glare',
      'Full UV400 protection',
      'Lightweight metal frame',
      'Adjustable nose pads',
      'Includes protective case and cleaning cloth',
    ],
    images: [
            'https://picsum.photos/id/20/800/800',
          ],
    stock: 15,
    rating: 4.9,
    reviews: 32,
    createdAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 4,
    name: 'Coastal Cat-Eye Sunglasses',
    slug: 'coastal-cat-eye-sunglasses',
    price: 79.99,
    salePrice: null,
    categoryId: 2,
    featured: false,
    isNew: true,
    onSale: false,
    description:
      "Channel vintage glamour with our Coastal Cat-Eye Sunglasses. These stylish frames feature UV-protective lenses and a comfortable fit that's perfect for beach days or city strolls. A must-have accessory for your summer wardrobe.",
    features: [
      'Classic cat-eye design',
      'UV400 protection lenses',
      'Durable acetate frame',
      'Spring hinges for comfort',
      'Comes with designer case',
    ],
    images: [
            'https://picsum.photos/id/1040/800/800',
          ],
    stock: 20,
    rating: 4.7,
    reviews: 15,
    createdAt: '2024-03-05T10:00:00Z',
  },
  {
    id: 5,
    name: 'Deluxe Beach Umbrella',
    slug: 'deluxe-beach-umbrella',
    price: 59.99,
    salePrice: 49.99,
    categoryId: 3,
    featured: true,
    isNew: false,
    onSale: true,
    description:
      'Stay cool and protected with our Deluxe Beach Umbrella. This large, sturdy umbrella provides excellent shade with UPF 50+ protection. The sand anchor and tilt mechanism ensure it stays in place all day, even in breezy conditions.',
    features: [
      '7-foot diameter for maximum shade',
      'UPF 50+ sun protection',
      'Sturdy aluminum pole with sand anchor',
      'Adjustable tilt mechanism',
      'Includes carrying bag for easy transport',
    ],
    images: [
            'https://picsum.photos/id/1027/800/800',
          ],
    stock: 10,
    rating: 4.5,
    reviews: 28,
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 6,
    name: 'Waterproof Beach Tote',
    slug: 'waterproof-beach-tote',
    price: 45.99,
    salePrice: null,
    categoryId: 3,
    featured: false,
    isNew: true,
    onSale: false,
    description:
      'Our Waterproof Beach Tote is the perfect companion for your beach days. With a spacious interior and multiple pockets, it easily holds all your essentials. The waterproof material keeps your belongings safe from sand and splashes.',
    features: [
      'Durable waterproof material',
      'Spacious main compartment',
      'Multiple interior and exterior pockets',
      'Comfortable rope handles',
      'Zippered top closure',
    ],
    images: [
            'https://picsum.photos/id/21/800/800',
          ],
    stock: 18,
    rating: 4.6,
    reviews: 12,
    createdAt: '2024-03-08T10:00:00Z',
  },
  {
    id: 7,
    name: 'Breezy Linen Shirt',
    slug: 'breezy-linen-shirt',
    price: 65.99,
    salePrice: null,
    categoryId: 4,
    featured: true,
    isNew: false,
    onSale: false,
    description:
      'Stay cool and stylish with our Breezy Linen Shirt. Made from 100% premium linen, this lightweight shirt is perfect for hot summer days. The relaxed fit and breathable fabric make it an essential addition to your summer wardrobe.',
    features: [
      '100% premium linen fabric',
      'Breathable and lightweight',
      'Button-down front',
      'Relaxed fit for comfort',
      'Available in multiple colors',
    ],
    images: [
            'https://picsum.photos/id/26/800/800',
          ],
    stock: 22,
    rating: 4.8,
    reviews: 20,
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: 8,
    name: 'Floral Maxi Dress',
    slug: 'floral-maxi-dress',
    price: 79.99,
    salePrice: 59.99,
    categoryId: 4,
    featured: true,
    isNew: false,
    onSale: true,
    description:
      'Our Floral Maxi Dress is the epitome of summer elegance. The flowing silhouette and vibrant floral print make it perfect for beach outings, summer parties, or evening dinners. The lightweight fabric ensures you stay cool even on the hottest days.',
    features: [
      'Lightweight, breathable fabric',
      'Flattering A-line silhouette',
      'Adjustable spaghetti straps',
      'Side slit for easy movement',
      'Fully lined for comfort',
    ],
    images: [
            'https://picsum.photos/id/64/800/800',
          ],
    stock: 15,
    rating: 4.9,
    reviews: 25,
    createdAt: '2024-02-25T10:00:00Z',
  },
  {
    id: 9,
    name: 'Comfort Slide Sandals',
    slug: 'comfort-slide-sandals',
    price: 35.99,
    salePrice: 29.99,
    categoryId: 5,
    featured: false,
    isNew: false,
    onSale: true,
    description:
      'Our Comfort Slide Sandals are designed for all-day wear. The contoured footbed provides excellent arch support, while the waterproof material makes them perfect for beach days or pool parties. Slip into comfort and style this summer.',
    features: [
      'Waterproof EVA material',
      'Contoured footbed for arch support',
      'Non-slip textured sole',
      'Quick-drying design',
      'Available in multiple colors',
    ],
    images: [
            'https://picsum.photos/id/96/800/800',
          ],
    stock: 30,
    rating: 4.7,
    reviews: 35,
    createdAt: '2024-02-05T10:00:00Z',
  },
  {
    id: 10,
    name: 'Braided Strap Sandals',
    slug: 'braided-strap-sandals',
    price: 49.99,
    salePrice: null,
    categoryId: 5,
    featured: false,
    isNew: true,
    onSale: false,
    description:
      'Elevate your summer footwear with our Braided Strap Sandals. These stylish sandals feature intricately braided straps and a cushioned footbed for all-day comfort. Perfect for beach outings or casual summer evenings.',
    features: [
      'Soft braided straps',
      'Cushioned footbed',
      'Durable rubber outsole',
      'Adjustable ankle strap',
      'Available in multiple colors',
    ],
    images: [
            'https://picsum.photos/id/30/800/800',
          ],
    stock: 20,
    rating: 4.6,
    reviews: 15,
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 11,
    name: 'Insulated Water Bottle',
    slug: 'insulated-water-bottle',
    price: 29.99,
    salePrice: 24.99,
    categoryId: 3,
    featured: false,
    isNew: false,
    onSale: true,
    description:
      'Stay hydrated in style with our Insulated Water Bottle. This double-walled stainless steel bottle keeps your drinks cold for up to 24 hours or hot for up to 12 hours. The leak-proof design makes it perfect for beach days or outdoor adventures.',
    features: [
      'Double-walled vacuum insulation',
      'Premium 18/8 stainless steel',
      'Leak-proof screw cap',
      '750ml capacity',
      'BPA-free and eco-friendly',
    ],
    images: [
            'https://picsum.photos/id/1029/800/800',
          ],
    stock: 25,
    rating: 4.8,
    reviews: 22,
    createdAt: '2024-02-12T10:00:00Z',
  },
  {
    id: 12,
    name: 'Straw Beach Hat',
    slug: 'straw-beach-hat',
    price: 34.99,
    salePrice: null,
    categoryId: 3,
    featured: true,
    isNew: true,
    onSale: false,
    description:
      'Complete your beach look with our Straw Beach Hat. This wide-brimmed hat provides excellent sun protection while adding a touch of elegance to your summer outfit. The adjustable chin strap ensures it stays in place even on breezy days.',
    features: [
      'Natural woven straw material',
      'Wide brim for maximum sun protection',
      'Adjustable chin strap',
      'UPF 50+ rating',
      'Packable design for easy travel',
    ],
    images: [
            'https://picsum.photos/id/177/800/800',
          ],
    stock: 18,
    rating: 4.7,
    reviews: 19,
    createdAt: '2024-03-15T10:00:00Z',
  },
];

export default products;
