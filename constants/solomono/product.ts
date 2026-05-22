import { ContentType, IDateTime } from '@constants/common';
import { FileName, IFile } from '@constants/files/files';
import { Currency } from '@constants/solomono/geo';

export interface IProduct extends IProductName, IProductStatus,
  IPrice,
  IProductGeneralInfo,  
  IDescription,
  IQty,
  IShipping {}

export interface IProduct {
  characteristics: IProductCharacteristics;
  api: {
    id: string;
  }
}

interface IProductName {
  name: string;
}

interface IProductStatus {
  status: ProductStatus;
}

interface IProductGeneralInfo {
  category: Category;
  code: string;
  image: IFile; 
  label?: Label;
  totalRating?: number;
  reviews?: IReview[];
}

interface IPrice {
  price: string;
  currency: Currency;
  fullPrice: string;
  discount?: number;
}

type IProductCharacteristics = ILaptopCharacteristics;

interface ILaptopCharacteristics {
  productType: ProductType.LAPTOP;
  color?: IColor[];
  ram?: IRam[];
  battery?: string;
  brand?: Brand;
  weight?: string;
  graphicAdapter?: string;
  network: string;
  processor?: string;
  size?: string;
  volumeDrive?: string;
  warranty: string;
  os?: string;
}

interface IDescription {
  description: string;
  shortDescription: string;
}

interface IQty {
  qty: number;
}

export interface IReview {
  reviewAttachment?: IReviewFile;
  name: string;
  comment: string;
  rating: number;
  file?: IFile;
  date?: IDateTime;
  api?: {
    id: string, 
  }
}

export interface IReviewFile {
  fileId: string;
  fileName: string;
  path: string;
}

interface IShipping {
  shippingDescription: string;
}

export interface IColor {
  id: string;
  name: Color;
  price: IPrice;
  qty: IQty;
}

export interface IRam {
  id: string;
  name: Ram;
  price: IPrice;
  qty: IQty;
} 

export enum Category {
  LAPTOPS = 'Laptops',
  TABLETS = 'Tablets',
  SMARTPHONES = 'Smartphones',
  GAMES = 'Games',
  TV = 'TV',
  APPLIANCES = 'Appliances',
  ELECTRIC_TRANSPORT = 'Electric transport',
  ACCESSORIES = 'Accessories',
}

export enum ProductType {
  LAPTOP = 'laptop',
}

export enum ProductStatus {
  IN_STOCK = 'In stock',
  OUT_OF_STOCK = 'Out of stock',
}

export enum Brand {
  LENOVO = 'Lenovo',
  ACER = 'Acer',
}

export enum Label {
  TOP = 'TOP',
  SPECIAL = 'Special',
  NEW = 'New',
}

export enum Color {
  BLACK = 'Black',
  ORANGE = 'Orange',
  STORM_GREY = 'Storm Grey',
}

export enum Ram {
  '8GB' = '8GB',
  '16GB' = '16GB',
  '32GB' = '32GB',
}

// HACK: demoLaptop is harcoded data due to limitations on demo website
export const DEMO_LAPTOP: IProduct = {
  name: 'Lenovo Yoga 7 2 in 1 14IML9 (83DJ00CMRA) Storm Grey',
  label: Label.NEW,
  status: ProductStatus.IN_STOCK,
  category: Category.LAPTOPS,
  code: 'kod5',
  price: '1247.15 ',
  currency: Currency.DOLLAR, 
  fullPrice: `${Currency.DOLLAR}1247.15 `,
  qty: 11,
  image: {
    name: 'logo',
    fileName: FileName.IMAGE_JPEG,
    path: `./constants/files/${FileName.IMAGE_JPEG}`,
    contentType: ContentType.IMAGE_JPEG,
  },
  description: 'TODO: add actual description',
  shortDescription: 'TODO: add actual short description',
  shippingDescription: 'TODO: add actual shipping description',
  characteristics: {
    productType: ProductType.LAPTOP,
    color: [
      { 
        id: '1', 
        name: Color.STORM_GREY, 
        price: { price: '$1247.15 ', currency: Currency.DOLLAR, fullPrice: `${Currency.DOLLAR}1247.15 ` },
        qty: { qty: 11 },
      },
    ],
    ram: [
      {
        id: '1',
        name: Ram['16GB'],
        price: { price: '$1247.15 ', currency: Currency.DOLLAR, fullPrice: `${Currency.DOLLAR}1247.15 ` },
        qty: { qty: 11 },
      },
    ],
    brand: Brand.LENOVO,
    weight: '1.49 Kg',
    graphicAdapter: 'Arc Graphics',
    network: 'LAN / Wi-Fi / Bluetooth',
    processor: 'Intel Core Ultra 5 125H',
    volumeDrive: '500 GB',
    warranty: '12 moths',
    os: 'Windows',
  },
  api: {
    id: '',
  },
};
