import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/admin",
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
        title: "Agents",
        url: "/admin/agent",
        icon: Icons.AgentIcon,
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
        icon: Icons.PhoneIcon,
        items: [],
      }
    ],
  },

];
