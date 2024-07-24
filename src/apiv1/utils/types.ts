type PostContentType = {
  username: string;
  content: string;
  image: string;
};

type UserDetailsType = {
    username: string;
    password: string;
    email: string;
  };

  
  type UserLoginDetailsType = {
    username: string;
    password: string; 
  };
  

export  {PostContentType, UserDetailsType, UserLoginDetailsType}