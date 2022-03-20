import DesktopView from "./Desktop View/DesktopView";
import { MobileView } from "./Mobile View/MobileView";

export function ApplicantDetails({
  editDetails,
  setEditDetails,
  fetchedDetails,
  setFetchedDetails,
}) {
  return (
    <section>
      {/* TABLE TO DISPLAY THE APPLIICANT DETAILS */}

      {/* DESKTOP VIEW */}
      <DesktopView
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        fetchedDetails={fetchedDetails}
        setFetchedDetails={setFetchedDetails}
      />
      {/* MOBILE VIEW */}
      <MobileView
        editDetails={editDetails}
        setEditDetails={setEditDetails}
        fetchedDetails={fetchedDetails}
        setFetchedDetails={setFetchedDetails}
      />
    </section>
  );
}