import { IDateTime } from '@constants/common';
import { IFile } from '@constants/files/files';

export interface IProduct extends IProductName, IProductStatus,
  IPrice,
  IProductGeneralInfo, 
  IProductCharacteristics, 
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
  totalRating: number;
  reviews?: IReview[];
}

interface IPrice {
  price: number;
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
  network?: string;
  processor?: string;
  size: string;
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

interface IReview {
  id: string;
  name: string;
  comment: string;
  rating: number;
  file: IFile;
  date: IDateTime;
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
}

export enum Ram {
  '8GB' = '8GB',
  '16GB' = '16GB',
  '32GB' = '32GB',
}
