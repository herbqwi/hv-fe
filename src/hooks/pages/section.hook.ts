import { useParams } from "react-router";
import { ISection } from "../../interfaces";

const useSection = () => {
  const { section, id } = useParams();
  let sectionType: ISection.SectionType = ISection.SectionType.MY_DETAILS;
  if (section == ISection.SectionInfo[ISection.SectionType.COMPLETED_VOTES].route) {
    sectionType = ISection.SectionType.COMPLETED_VOTES;
  } else if (section == ISection.SectionInfo[ISection.SectionType.MY_ELECTIONS].route) {
    sectionType = ISection.SectionType.MY_ELECTIONS;
  } else if (section == ISection.SectionInfo[ISection.SectionType.NOTIFICATIONS].route) {
    sectionType = ISection.SectionType.NOTIFICATIONS;
  }

  return { sectionType, id }
}

export default useSection;
