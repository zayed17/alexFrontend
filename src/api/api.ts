import { axiosInstance } from "@/lib/axios";

export enum PropertyType {
  Affordable = "affordable",
  Luxury = "luxury",
  Exclusive = "exclusive",
}

export async function getProperties(type:PropertyType) {
  try {
    const response = await axiosInstance.get("/property?type=" + type);
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching property types:", error);
    return [];
  }
}
export async function getPropertyTypes() {
  try {
    const response = await axiosInstance.get("/property-type");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching property types:", error);
    return [];
  }
}

export async function getPropertyTypeById(id:string) {
  try {
    const response = await axiosInstance.get(`/property-type/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property type with ID ${id}:`, error);
    return null;
  }
}

export async function getAmenities() {
  try {
    const response = await axiosInstance.get("/amenities");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching amenities:", error);
    return [];
  }
}
export async function MediaCenterForm() {
  try {
    return [];
  } catch (error) {
    console.error("Error fetching amenities:", error);
    return [];
  }
}

export async function getAmenityById(id:string) {
  try {
    const response = await axiosInstance.get(`/amenities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching amenity with ID ${id}:`, error);
    return null;
  }
}

export async function getCommunity() {
  try {
    const response = await axiosInstance.get("/community");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching community:", error);
    return [];
  }
}

export async function getCommunityNames () {
  try {
    const response = await axiosInstance.get("/community/names");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching community:", error);
    return [];
  }
}

export async function getCommunityById(id:string) {
  try {
    const response = await axiosInstance.get(`/community/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching amenity with ID ${id}:`, error);
    return null;
  }
}

export async function getUserCommunityById(id:string) {
  try {
    const response = await axiosInstance.get(`/community/${id}/user`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching amenity with ID ${id}:`, error);
    return null;
  }
}

export async function getCareer() {
  try {
    const response = await axiosInstance.get("/career");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching career:", error);
    return [];
  }
}
export async function getCareerById(id:string) {
  try {
    const response = await axiosInstance.get(`/career/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Career with ID ${id}:`, error);
    return null;
  }
}

export async function getSocialMedia() {
  try {
    const response = await axiosInstance.get("/social-media");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching social-media:", error);
    return [];
  }
}


export async function getSocialMediaById(id:string) {
  try {
    const response = await axiosInstance.get(`/social-media/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Social-media with ID ${id}:`, error);
    return null;
  }
}


export async function getPropertyById(id:string) {
  try {
    const response = await axiosInstance.get(`/property/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching property with ID ${id}:`, error);
    return null;
  }
}
    

export async function getHomePageData() {
  try {
    const response = await axiosInstance.get("/property/home-page");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching property:", error);
    return [];
  }
}

export async function getProperty() {
  try {
    const response = await axiosInstance.get("/property");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching property:", error);
    return [];
  }
}


export async function getClientRequestData() {
  try {
    const response = await axiosInstance.get("/client-request");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching community:", error);
    return [];
  }
}
export async function getContactData() {
  try {
    const response = await axiosInstance.get("/contact");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching community:", error);
    return [];
  }
}

export async function getReadyProperty() {
  try {
    const response = await axiosInstance.get("/ready-property");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching property:", error);
    return [];
  }
}
export async function getReadyPropertyById(id:string) {
  try {
    const response = await axiosInstance.get(`/ready-property/${id}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching property:", error);
    return [];
  }
}

export async function getJobApplication() {
  try {
    const response = await axiosInstance.get("/job-application");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching job-application:", error);
    return [];
  }
}

export async function getAgents() {
  try {
    const response = await axiosInstance.get("/agent");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

export async function getAgentById(id:string) {
  try {
    const response = await axiosInstance.get(`/agent/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching agent with ID ${id}:`, error);
    return null;
  }
}

export async function getDashboardData() {
  try {
    const response = await axiosInstance.get(`/property/dashboard`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching getDashboardData`, error);
    return null;
  }
}
export async function getAgentByIdForUser(id:string) {
  try {
    const response = await axiosInstance.get(`/agent/${id}/user`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching agent with ID ${id}:`, error);
    return null;
  }
}
export async function getMediaById(id:string) {
  try {
    const response = await axiosInstance.get(`/media-center/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching media with ID ${id}:`, error);
    return null;
  }
}
export async function getMedia() {
  try {
    const response = await axiosInstance.get(`/media-center`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching media`, error);
    return null;
  }
}


export const getMediaItemById = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/media-center/${id}`)
    return response.data
  } catch (error) {
    console.error("Error fetching media item:", error)
    throw error
  }
}

export const getAllMediaItems = async (type:string): Promise<any> => {
  try {
    const response = await axiosInstance.get(type ? `/media-center?type=${type}` : '/media-center' )
    return response.data
  } catch (error) {
    console.error("Error fetching all media items:", error)
    throw error
  }
}

export const extractYoutubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}
