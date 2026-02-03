
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  edition: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
