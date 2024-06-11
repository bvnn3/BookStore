import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { Publisher } from 'src/app/models/publisher';
import { Writer } from 'src/app/models/writer';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';
import { CartItemService } from 'src/app/services/cart-item.service';
import { Cart, CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  writers: Writer[] = [];
  publishers: Publisher[] = [];
  isEditing = false;
  editForm!: Book;
  reviews: Review[] = [];
  newReview: Review = {
    id: 0,
    user: {} as User,
    book: {} as Book,
    userReview: '',
  };
  hasReviewed = false;

  isLoggedIn = false;
  email: string | null = null;
  username: string | null = null;
  isAdmin = false;
  user!: User;
  quantity: number = 1;
  userId: number = 0;

  cart!: Cart;
  cartId: number | undefined;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private reviewService: ReviewService,
    private cartItemService: CartItemService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe((book) => (this.book = book));
    }
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).id;

    this.getBook();

    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user')!);
      this.email = user.email;
      this.username = user.username;
      this.isAdmin = user.admin === 1;
      this.newReview.user = user;
    }

    const bookId = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(bookId).subscribe((book) => {
      this.book = book;
      this.editForm = { ...book };
      this.newReview.book = book;
      this.fetchReviews();
    });

    this.bookService
      .getWriters()
      .subscribe((writers) => (this.writers = writers));
    this.bookService
      .getPublishers()
      .subscribe((publishers) => (this.publishers = publishers));

    this.fetchCartId();
    
  }

  fetchCartId(): void {

    this.cartService.getCartByUserId(this.userId).subscribe(
      (cart) => {
        this.cartId = cart.id;
        console.log('Cart ID:', this.cartId);
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  fetchReviews(): void {
    if (this.book) {
      this.reviewService.getReviewsByBookId(this.book.id).subscribe(
        (reviews) => {
          this.reviews = reviews;
          const user = JSON.parse(localStorage.getItem('user')!);
          this.hasReviewed = this.reviews.some(
            (review) => review.user.id === user.id
          );
        },
        (error) => {
          console.error('Error fetching reviews:', error);
        }
      );
    }
  }

  editBook(): void {
    this.isEditing = true;
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.router.navigate(['/homePage']);
    });
  }

  onSubmit(): void {
    this.bookService.updateBook(this.editForm).subscribe(() => {
      this.book = { ...this.editForm };
      this.isEditing = false;
    });
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe(
      () => {
        console.log('Review deleted successfully');
        this.reviews = this.reviews.filter((review) => review.id !== reviewId);
        const user = JSON.parse(localStorage.getItem('user')!);
        this.hasReviewed = this.reviews.some(
          (review) => review.user.id === user.id
        );
      },
      (error) => {
        console.error('Error deleting review:', error);
      }
    );
  }

  canDeleteReview(review: Review): boolean {
    if (this.isAdmin) return true;
    const user = JSON.parse(localStorage.getItem('user')!);
    return review.user.id === user.id;
  }

  addReview(): void {
    this.reviewService.createReview(this.newReview).subscribe(
      (review) => {
        this.reviews.push(review);
        this.newReview.userReview = '';
        this.hasReviewed = true;
      },
      (error) => {
        console.error('Error adding review:', error);
      }
    );
  }

  addToCart(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    const bookId = this.route.snapshot.paramMap.get('id')!;
    const parsedBookId: number = parseInt(bookId, 10);

    // Full user details
    const userDetail: User = {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      admin: user.admin,
    };
    
    this.cartService.getCartByUserId(this.userId).subscribe(
      (cart) => {
        const cartId = cart.id;
        console.log('Cart ID:', cartId);
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );

    const cart: Cart = {
      id: this.cartId!,
       user: userDetail,
      // user: user -- i ovo radi
    };

    const cartItem: CartItem = {
      id: 0,
      cart: cart,
      book: {
        id: parsedBookId,
        bookTitle: this.book.bookTitle,
        bookImageUrl: this.book.bookImageUrl,
        bookGenre: this.book.bookGenre,
        price: this.book.price,
        bookYear: this.book.bookYear,
        writer: this.book.writer,
        publisher: this.book.publisher,
      },
      quantity: this.quantity,
    };

    this.cartItemService.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
        alert('Book is sucsessfuly added to cart');
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }
}
