import React from "react";

const ArtistsTable = ({ artists }) => {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm mx-auto px-4 max-w-full overflow-x-auto">
      <table className="w-full min-w-[400px] sm:min-w-[600px] text-left text-foreground">
        <thead>
          <tr>
            <th className="py-2 px-3 border-b border-border font-playfair text-xs sm:text-sm font-bold">
              
            </th>
            <th className="py-2 px-3 border-b border-border font-playfair text-xs sm:text-sm font-bold">
              Name
            </th>
            <th className="py-2 px-3 border-b border-border font-playfair text-xs sm:text-sm font-bold">
              City
            </th>
            <th className="py-2 px-3 border-b border-border font-playfair text-xs sm:text-sm font-bold">
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {artists.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-muted-foreground font-semibold text-sm"
              >
                No artists found.
              </td>
            </tr>
          ) : (
            (artists || []).map((artist, index) => (
              <tr
                key={artist.position || index}
                className="hover:bg-accent/20  transition-colors cursor-pointer"
              >
                <td className="py-2 px-3 border-b border-border text-xs sm:text-sm">
                  {artist.position || index + 1}.
                </td>
                <td className="py-2 px-3 border-b border-border text-xs sm:text-sm">
                  {artist.name}
                </td>
                <td className="py-2 px-3 border-b border-border text-xs sm:text-sm">
                  {artist.begin_area && artist.begin_area.trim() !== "" ? artist.begin_area : "Unknown"}
                </td>
                <td className="py-2 px-3 border-b border-border text-xs sm:text-sm">
                  {artist.country && artist.country.trim() !== "" ? artist.country : "Unknown"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistsTable;
