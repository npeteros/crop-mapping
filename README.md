# 🌾 Crop Mapping Web Application for Balamban, Cebu

![Project Banner](https://via.placeholder.com/1200x400.png?text=Crop+Mapping+Web+App)

A **Laravel + Inertia + React** web application designed to bridge the gap between **Balamban farmers** and the **local government** by streamlining agricultural services. The platform enables farmers to **request crop insurance, equipment, seeds, fertilizers**, and facilitates **farm/land monitoring** through **GIS mapping**.

## 🚀 Features

✅ **Interactive Crop Mapping** using **ArcGIS & GeoJSON**  
✅ **Satellite Imagery Integration** for land monitoring  
✅ **Government-to-Farmer Service Requests** for agricultural support  
✅ **Future Research Support** through structured agricultural data

## 📌 Tech Stack

-   **Frontend**: React + Inertia.js
-   **Backend**: Laravel
-   **Database**: (MySQL)
-   **Mapping Tools**: ArcGIS, GeoJSON, Satellite Imagery

## 🛠 Installation

### Prerequisites

-   PHP `^8.x`
-   Composer
-   Node.js & npm
-   Laravel `^10.x`
-   Database (MySQL/PostgreSQL)

### Setup

1. **Clone the repository**
    ```sh
    git clone https://github.com/npeteros/crop-mapping.git
    cd crop-mapping

    ```
2. **Install dependencies**
    ```sh
    composer install
    npm install && npm run dev

    ```
3. **Set up environment variables**
    ```sh
    cp .env.example .env
    php artisan key:generate

    ```

_Modify .env file with database configurations._

4. **Run migrations**

    ```sh
    php artisan migrate --seed

    ```

5. **Start the development server**

    ```sh
    php artisan serve

    ```

## 🗺 Usage

-   Farmers can log in and request agricultural support.
-   The local government can process and monitor requests.
-   Users can visualize and track farm data using interactive maps.

## 🎯 Target Audience

-   👨‍🌾 Balamban Farmers
-   🏛 Local Government Units (LGUs)
-   📊 Future Researchers

## 📬 Contact

For inquiries, reach out to:  
 📧 Email: n.peteros2003@gmail.com

This project aims to empower Balamban’s farming community, support local governance, and contribute to agricultural research. 🌱
