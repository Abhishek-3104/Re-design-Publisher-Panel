// Applications.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApplicationsTable from "./ApplicationsTable";
import FilterSortBar from "./FilterSortBar";
import AddApplicationDialog from "./AddApplicationDialog";
import ImportApplicationDialog from "./ImportApplicationDialog";

// Enhanced dummy data with more fields
const dummyApplications = [
  {
    id: 1,
    name: "MyFitness Pro",
    category: "Health & Fitness",
    logo: "https://ui-avatars.com/api/?name=MyFitness&background=F97316&color=fff&bold=true",
    platform: "Android",
    status: "Active",
    createdOn: "2024-01-15T10:30:00",
    packageName: "com.fitness.myfitness",
    websiteUrl: "https://myfitnesspro.com",
    description: "Track your fitness journey with personalized workouts",
  },
  {
    id: 2,
    name: "Travel Buddy",
    category: "Travel & Navigation",
    logo: "https://ui-avatars.com/api/?name=Travel&background=3B82F6&color=fff&bold=true",
    platform: "iOS",
    status: "In Review",
    createdOn: "2024-01-20T14:45:00",
    packageName: "123456789",
    websiteUrl: "https://travelbuddy.app",
    description: "Your perfect travel companion for exploring the world",
  },
  {
    id: 3,
    name: "Recipe Finder",
    category: "Food & Drink",
    logo: "https://ui-avatars.com/api/?name=Recipe&background=10B981&color=fff&bold=true",
    platform: "Web",
    status: "Active",
    createdOn: "2024-02-01T09:15:00",
    websiteUrl: "https://recipefinder.io",
    description: "Discover delicious recipes from around the world",
  },
  {
    id: 4,
    name: "Music Stream",
    category: "Music & Audio",
    logo: "https://ui-avatars.com/api/?name=Music&background=8B5CF6&color=fff&bold=true",
    platform: "Android",
    status: "In Testing",
    createdOn: "2024-02-10T16:20:00",
    packageName: "com.music.stream",
    websiteUrl: "https://musicstream.com",
    description: "Stream millions of songs on demand",
  },
  {
    id: 5,
    name: "Shopping Plus",
    category: "Shopping",
    logo: "https://ui-avatars.com/api/?name=Shopping&background=EF4444&color=fff&bold=true",
    platform: "Web",
    status: "Active",
    createdOn: "2024-02-15T11:30:00",
    websiteUrl: "https://shoppingplus.com",
    description: "Shop from thousands of brands at the best prices",
  },
  {
    id: 6,
    name: "Study Master",
    category: "Education",
    logo: "https://ui-avatars.com/api/?name=Study&background=F59E0B&color=fff&bold=true",
    platform: "Android",
    status: "Active",
    createdOn: "2024-02-18T08:00:00",
    packageName: "com.education.studymaster",
    websiteUrl: "https://studymaster.edu",
    description: "Learn smarter with AI-powered study tools",
  },
  {
    id: 7,
    name: "Budget Tracker",
    category: "Finance",
    logo: "https://ui-avatars.com/api/?name=Budget&background=06B6D4&color=fff&bold=true",
    platform: "iOS",
    status: "Active",
    createdOn: "2024-02-22T13:45:00",
    packageName: "987654321",
    websiteUrl: "https://budgettracker.app",
    description: "Take control of your finances with smart budgeting",
  },
  {
    id: 8,
    name: "Photo Editor Pro",
    category: "Photography",
    logo: "https://ui-avatars.com/api/?name=Photo&background=EC4899&color=fff&bold=true",
    platform: "Android",
    status: "In Review",
    createdOn: "2024-02-25T15:10:00",
    packageName: "com.photo.editor",
    websiteUrl: "https://photoeditorpro.com",
    description: "Professional photo editing at your fingertips",
  },
  {
    id: 9,
    name: "Yoga Daily",
    category: "Health & Fitness",
    logo: "https://ui-avatars.com/api/?name=Yoga&background=14B8A6&color=fff&bold=true",
    platform: "Web",
    status: "Active",
    createdOn: "2024-03-01T07:30:00",
    websiteUrl: "https://yogadaily.com",
    description: "Daily yoga routines for mind and body wellness",
  },
  {
    id: 10,
    name: "News Hub",
    category: "News & Magazines",
    logo: "https://ui-avatars.com/api/?name=News&background=6366F1&color=fff&bold=true",
    platform: "iOS",
    status: "In Testing",
    createdOn: "2024-03-05T12:00:00",
    packageName: "555666777",
    websiteUrl: "https://newshub.io",
    description: "Stay informed with personalized news from trusted sources",
  },
  {
    id: 11,
    name: "Meditation Space",
    category: "Health & Wellness",
    logo: "https://ui-avatars.com/api/?name=Meditation&background=A855F7&color=fff&bold=true",
    platform: "Android",
    status: "Active",
    createdOn: "2024-03-08T09:20:00",
    packageName: "com.meditation.space",
    websiteUrl: "https://meditationspace.app",
    description: "Find peace and calm with guided meditation sessions",
  },
  {
    id: 12,
    name: "Task Manager Pro",
    category: "Productivity",
    logo: "https://ui-avatars.com/api/?name=Task&background=F97316&color=fff&bold=true",
    platform: "Web",
    status: "Active",
    createdOn: "2024-03-12T10:15:00",
    websiteUrl: "https://taskmanagerpro.com",
    description: "Organize your tasks and boost productivity",
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(dummyApplications);
  const [filteredApplications, setFilteredApplications] = useState(dummyApplications);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [importedData, setImportedData] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filters and Sorting
  const [filters, setFilters] = useState({
    status: [],
    platform: [],
  });
  const [sortBy, setSortBy] = useState("newest");

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...applications];

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter((app) => filters.status.includes(app.status));
    }

    // Apply platform filter
    if (filters.platform.length > 0) {
      filtered = filtered.filter((app) => filters.platform.includes(app.platform));
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  }, [filters, sortBy, applications]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddApplication = (newApp) => {
    if (editingApplication) {
      // Edit existing
      setApplications((prev) =>
        prev.map((app) =>
          app.id === editingApplication.id ? { ...app, ...newApp } : app
        )
      );
      setEditingApplication(null);
    } else {
      // Add new
      const app = {
        id: applications.length + 1,
        ...newApp,
        createdOn: new Date().toISOString(),
      };
      setApplications((prev) => [...prev, app]);
    }
    setIsAddDialogOpen(false);
  };

  const handleEdit = (app) => {
    setEditingApplication(app);
    setIsAddDialogOpen(true);
  };

  const handleView = (app) => {
    console.log("View application:", app);
    // Navigate to application details page
  };

  const handleImport = (importData) => {
    setImportedData(importData);
    setIsImportDialogOpen(false);
    setIsAddDialogOpen(true);
  };

  const handleOpenImport = () => {
    setIsAddDialogOpen(false);
    setIsImportDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setEditingApplication(null);
    setImportedData(null);
  };

  return (
    <motion.div
      className="space-y-6 sm:space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header with Title and Filters */}
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Left: Title and Description */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Applications
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage and monitor all your applications in one place.
          </p>
        </div>

        {/* Right: Filters and Actions */}
        <FilterSortBar
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onAddClick={() => setIsAddDialogOpen(true)}
        />
      </motion.div>

      {/* Applications Table with pagination */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <ApplicationsTable
          applications={paginatedApplications}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredApplications.length}
          totalPages={totalPages}
          onEdit={handleEdit}
          onView={handleView}
          onPageChange={setCurrentPage}
        />
      </motion.div>

      {/* Dialogs */}
      <AddApplicationDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddApplication}
        onImportClick={handleOpenImport}
        editingApp={editingApplication}
        importedData={importedData}
      />

      <ImportApplicationDialog
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
        onImport={handleImport}
      />
    </motion.div>
  );
};

export default Applications;