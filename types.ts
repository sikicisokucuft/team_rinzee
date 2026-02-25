export interface Campus {
  id: string;
  title: string;
  description: string;
  icon: string;
  income: string;
}

export interface Testimonial {
  id: string;
  name: string;
  amount: string;
  story: string;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
