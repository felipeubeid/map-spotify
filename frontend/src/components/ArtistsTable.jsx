import React from "react";

const ArtistsTable = ({ artists }) => {
  return (
    <div className="bg-muted/40 rounded-xl border border-border shadow-sm mx-auto px-6 max-w-[90rem]">
      <table className="w-full min-w-[900px] text-left text-foreground dark:text-gray-300">
        {/* <thead>
          <tr>
            <th className="py-3 px-4 border-b border-border font-playfair text-sm font-semibold">
              #
            </th>
            <th className="py-3 px-4 border-b border-border font-playfair text-sm font-semibold">
              Name
            </th>
            <th className="py-3 px-4 border-b border-border font-playfair text-sm font-semibold">
              City
            </th>
            <th className="py-3 px-4 border-b border-border font-playfair text-sm font-semibold">
              Country
            </th>
          </tr>
        </thead> */}
        <tbody>
          {artists.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-muted-foreground font-semibold"
              >
                No artists found.
              </td>
            </tr>
          ) : (
            artists.map((artist, index) => (
              <tr
                key={artist.position || index}
                className="hover:bg-accent/20 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 border-b border-border font-semibold text-sm">
                  {artist.position || index + 1}.
                </td>
                <td className="py-3 px-4 border-b border-border font-medium text-sm">
                  {artist.name}
                </td>
                <td className="py-3 px-4 border-b border-border text-sm">
                  {artist.begin_area || "Unknown"}
                </td>
                <td className="py-3 px-4 border-b border-border text-sm">
                  {artist.country || "Unknown"}
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
