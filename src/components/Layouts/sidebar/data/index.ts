import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.DashboardIcon,
        url: "/admin",
        items: [],
      },
      {
        title: "Home Page",
        url: "/admin/home-page",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Amenities",
        url: "/admin/amenity",
        icon: Icons.AmenityIcon,
        items: [],
      },
      {
        title: "Properties",
        url: "/admin/property",
        icon: Icons.PropertyIcon,
        items: [],
      },      
      {
        title: "Contact Data",
        url: "/admin/contact-data",
        icon: Icons.PhoneIcon,
        items: [],
      },
      {
        title: "Client Request",
        url: "/admin/client-request",
        icon: Icons.ClientRequestIcon,
        items: [],
      }
    ],
  },

];
