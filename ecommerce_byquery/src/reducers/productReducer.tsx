
import { State, Action } from '../components/GloablState'

export const productReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':
 
            return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] }; 

        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        case 'CLEAR_CART':
 
            return { ...state, cart: [] }; 
            case 'LOGIN':
                return { ...state, user: action.payload }; 

            case 'LOGOUT':
                return { ...state, user: null }   

            case 'ADD_PRODUCT':
                    return { ...state, products: [...state.products, action.payload] };
            case 'DELETE_PRODUCT': 
                    return { 
                      ...state, 
                      products: state.products.filter(product => product.id !== action.payload) 
                    }; 

            case 'UPDATE_PRODUCT':
                        return {
                          ...state,
                          products: state.products.map(p =>
                            p.id === action.payload.id ? { ...p, ...action.payload } : p
                          )
                        };
                      
        default:
            return state;
    }
};

