export interface Skin {
    _id: string;         
    name: string;        
    image: string;    
    rarity: string;      
    price: number;       
    description?: string; 
    [key: string]: any;  
  }
  