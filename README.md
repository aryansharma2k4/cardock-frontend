# CarDock - Smart Parking Management System

A modern, full-stack parking management solution built with Next.js frontend and Node.js backend, featuring real-time tracking, automated billing, and intuitive slot management.

## Features

### Frontend Interface
- **Responsive Design**: Beautiful UI that works seamlessly across all devices
- **Real-time Dashboard**: Live parking analytics with interactive charts
- **Visual Slot Map**: Interactive parking lot visualization with color-coded slots
- **Intuitive Forms**: User-friendly vehicle registration and management
- **Modern Animations**: Smooth transitions and hover effects for better UX

### Backend Management
- **Multi-Type Slot Support**: Regular, Compact, EV charging, and Handicap-accessible slots
- **Intelligent Assignment**: Automatic slot allocation based on vehicle type
- **Real-time Tracking**: Live updates on slot availability and occupancy

### Billing System
- **Flexible Pricing**: Hourly rates and Day-Pass options
- **Tiered Structure**:
  - ≤ 1 hour: ₹50
  - ≤ 3 hours: ₹100
  - ≤ 6 hours: ₹150
  - > 6 hours: ₹200
  - Day-Pass: ₹150 (flat rate)
- **Revenue Analytics**: Complete financial tracking and reporting

### Maintenance & Operations
- **Slot Maintenance Mode**: Mark slots for maintenance with automatic session closure
- **Session Management**: Complete tracking of active and historical parking sessions
- **Occupancy Analytics**: Real-time occupancy rates and availability metrics

## Tech Stack

### Frontend
- **Next.js** - React framework (14.0+)
- **React** - UI library (18.0+)
- **TailwindCSS** - Styling framework (3.0+)
- **JavaScript** - Programming language (ES6+)

### Backend
- **Node.js** - Runtime environment (18.0+)
- **Express.js** - Web framework (4.18+)
- **MongoDB** - Database (6.0+)
- **Mongoose** - ODM for MongoDB (7.0+)

## Project Structure

```
CarDock/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── dashboard/   # Analytics dashboard
│   │   │   ├── map/         # Slot visualization
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── layout.jsx   # Root layout
│   │   │   └── page.jsx     # Home page
│   │   └── components/      # Reusable components
│   │       ├── EntryForm.jsx
│   │       ├── Header.jsx
│   │       └── ParkedVehiclesList.jsx
│   └── package.json
│
├── backend/                  # Node.js Backend API
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── schema/          # Database models
│   │   ├── utils/           # Utility functions
│   │   ├── db/              # Database config
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server entry
│   └── package.json
│
└── README.md                # This file
```

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CarDock
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Edit .env with your MongoDB connection
   # DB_CONNECTIONSTRING=mongodb://localhost:27017
   # DB_NAME=cardock_parking
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:8000
   ```

5. **Start the Frontend Application**
   ```bash
   cd frontend
   npm run dev
   # Application runs on http://localhost:3000
   ```

6. **Initialize Parking Space**
   - Open the application in your browser
   - Click "Initialize Space" in the header
   - This creates the default parking slots

## Application Pages

### Home Page (/)
- **Vehicle Registration**: Easy-to-use form for parking new vehicles
- **Active Vehicles List**: Real-time list of currently parked vehicles
- **Quick Actions**: Instant vehicle exit and session management

### Dashboard (/dashboard)
- **Key Metrics**: Revenue, occupancy rates, and availability statistics
- **Slot Statistics**: Breakdown by slot type (Regular, Compact, EV, Handicap)
- **Session History**: Complete log of all parking sessions
- **Financial Overview**: Total revenue tracking

### Slot Map (/map)
- **Visual Parking Lot**: Interactive grid view of all parking slots
- **Color-coded Status**: Easy identification of available, occupied, and maintenance slots
- **Real-time Updates**: Live status changes and slot information
- **Maintenance Controls**: One-click slot maintenance mode

## API Endpoints

### Parking Space Management
```
POST   /api/parking-space/initialize  # Initialize parking with default slots
GET    /api/parking-space/get         # Get parking space details
```

### Vehicle Operations
```
POST   /api/vehicle/register          # Register and park a vehicle
POST   /api/vehicle/exit/:sessionId   # Exit vehicle and calculate billing
GET    /api/vehicle/get/:vehicleId    # Get vehicle details
```

### Slot Management
```
GET    /api/slot/get                  # Get all slots with their status
POST   /api/slot/mantainance/:slotId  # Mark slot for maintenance
```

### Session Tracking
```
GET    /api/sessions/get              # Get all active sessions
GET    /api/sessions/gets             # Get all sessions (active + completed)
GET    /api/sessions/notifySixHours   # Check for 6+ hour sessions
```

## Usage Examples

### Register a Vehicle via API
```bash
curl -X POST http://localhost:8000/api/vehicle/register \
  -H "Content-Type: application/json" \
  -d '{
    "number": "DL01AB1234",
    "vehicleType": "car",
    "billingType": "Hourly"
  }'
```

### Using the Web Interface
1. Navigate to Home Page - Use the registration form
2. View Dashboard - Monitor real-time analytics
3. Check Slot Map - Visual overview of parking status
4. Exit Vehicles - Use the exit button in parked vehicles list

## Database Schema

### Default Slot Configuration
- **Regular Slots**: 10 slots (R01-R10) - For standard cars
- **Compact Slots**: 10 slots (C01-C10) - For bikes and small vehicles  
- **EV Slots**: 5 slots (E01-E05) - For electric vehicles with charging
- **Handicap Slots**: 5 slots (H01-H05) - For handicap-accessible vehicles

### Vehicle Type to Slot Mapping
- **Car** → Regular Slots
- **Bike** → Compact Slots
- **EV** → EV Slots
- **Handicap-Accessible** → Handicap-Accessible Slots

## UI/UX Features

### Modern Design Elements
- **Gradient Backgrounds**: Beautiful color transitions
- **Glassmorphism Effects**: Backdrop blur and transparency
- **Micro-animations**: Smooth hover and transition effects
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Color-coded Status**: Intuitive visual indicators

### Interactive Components
- **Real-time Updates**: Live data without page refresh
- **Loading States**: Elegant loading animations
- **Form Validation**: Instant feedback on user input
- **Status Messages**: Clear success and error notifications

## Error Handling

### Comprehensive Coverage
- Frontend Validation: Client-side form validation and error states
- API Error Handling: Graceful API error responses with user-friendly messages
- Database Errors: Robust database connection and query error handling
- Network Issues: Retry mechanisms and offline state handling
- Loading States: Proper loading indicators during async operations

## Future Enhancements

### Phase 1 - Core Improvements
- Payment Integration: Stripe/Razorpay integration for online payments
- SMS Notifications: Automated alerts for parking duration
- Advanced Analytics: Revenue trends and peak usage analytics
- User Authentication: Admin login and role-based access

### Phase 2 - Advanced Features  
- Mobile App: React Native mobile application
- QR Code Integration: QR-based vehicle entry/exit
- Reservation System: Advance slot booking capabilities
- Multi-location Support: Manage multiple parking facilities

### Phase 3 - Enterprise Features
- IoT Integration: Sensor-based automatic slot detection
- AI-powered Analytics: Predictive parking patterns
- API Gateway: Rate limiting and advanced security
- Microservices Architecture: Scalable service separation

## Development

### Running in Development Mode

**Backend Development:**
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

**Frontend Development:**
```bash
cd frontend
npm run dev  # Starts Next.js dev server with hot reload
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Use conventional commit messages
- Maintain existing code formatting
- Add JSDoc comments for functions
- Ensure responsive design for UI changes
- Test across different browsers

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author & Support

**Your Name**
- GitHub: @yourusername
- LinkedIn: Your LinkedIn Profile
- Email: your.email@example.com

### Getting Help
- Issues: Report bugs or request features in GitHub Issues
- Discussions: Join community discussions in GitHub Discussions
- Documentation: Check our Wiki for detailed guides

---

**Built with ❤️ for efficient parking management**

⭐ Star this repo if you found it helpful! ⭐
