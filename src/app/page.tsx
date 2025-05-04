import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"
import { TableAssignments } from "@/components/table-assignments"

type Assignment = {
  name: string
  table: string
}

export default async function Page() {
  // Read the CSV file
  const csvPath = path.join(process.cwd(), "public", "table-assignments.csv")
  let assignments = []

  try {
    const csvData = await fs.readFile(csvPath, "utf8")
    const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true })
    assignments = parsed.data.map((row: any) => ({
      name: row.name ?? "",
      table: row.table ?? "",
    })) as Assignment[]
  } catch (error) {
    console.error("Error reading CSV file:", error)
    // Provide sample data if file doesn't exist
    assignments = [
      { name: "John & Jane Smith", table: "1" },
      { name: "Robert & Emily Johnson", table: "1" },
      { name: "Michael & Sarah Brown", table: "1" },
      { name: "David & Jennifer Miller", table: "1" },
      { name: "William & Elizabeth Anderson", table: "2" },
      { name: "James & Patricia Martin", table: "2" },
      { name: "Richard & Linda Garcia", table: "3" },
      { name: "Charles & Barbara Robinson", table: "3" },
      { name: "Joseph & Susan Rodriguez", table: "4" },
      { name: "Thomas & Margaret Walker", table: "4" },
    ]
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        margin: 0,
        padding: 0,
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "url('/placeholder.svg?height=800&width=800')",
            backgroundRepeat: "repeat",
            opacity: 0.03,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "16rem",
            background: "linear-gradient(to bottom, rgba(236, 72, 153, 0.2), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "16rem",
            background: "linear-gradient(to top, rgba(236, 72, 153, 0.2), transparent)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "1rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        <div style={{ maxWidth: "64rem", margin: "0 auto", position: "relative" }}>
          {/* Decorative corner elements */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "8rem",
              height: "8rem",
              borderTop: "4px solid rgba(236, 72, 153, 0.5)",
              borderLeft: "4px solid rgba(236, 72, 153, 0.5)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "8rem",
              height: "8rem",
              borderTop: "4px solid rgba(236, 72, 153, 0.5)",
              borderRight: "4px solid rgba(236, 72, 153, 0.5)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "8rem",
              height: "8rem",
              borderBottom: "4px solid rgba(236, 72, 153, 0.5)",
              borderLeft: "4px solid rgba(236, 72, 153, 0.5)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "8rem",
              height: "8rem",
              borderBottom: "4px solid rgba(236, 72, 153, 0.5)",
              borderRight: "4px solid rgba(236, 72, 153, 0.5)",
              opacity: 0.5,
            }}
          />

          <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative" }}>
            {/* Top decorative element */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "10rem",
                  height: "2px",
                  background: "linear-gradient(to right, transparent, #ec4899, transparent)",
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "3rem",
                lineHeight: "1",
                marginBottom: "0.5rem",
                color: "#f472b6",
                textShadow: "0 2px 4px rgba(236, 72, 153, 0.3)",
              }}
            >
              Seating Arrangements
            </h2>

            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "4rem",
                lineHeight: "1",
                fontWeight: "900",
                marginBottom: "1.5rem",
                letterSpacing: "-0.025em",
                textShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                background: "linear-gradient(to right, #f9a8d4, #ec4899, #f9a8d4)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Find Your Table
            </h1>

            {/* Bottom decorative element */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
              <div
                style={{
                  width: "10rem",
                  height: "2px",
                  background: "linear-gradient(to right, transparent, #ec4899, transparent)",
                }}
              />
            </div>

            <p
              style={{
                maxWidth: "36rem",
                margin: "0 auto",
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontStyle: "italic",
                color: "#fce7f3",
              }}
            >
              Please find your assigned table below. We are honored to have you join us on our special day.
            </p>
          </div>

          <TableAssignments initialAssignments={assignments} />

          <div
            style={{
              textAlign: "center",
              marginTop: "5rem",
              position: "relative",
              color: "#fce7f3",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: "8rem",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(236, 72, 153, 0.5), transparent)",
                }}
              />
            </div>
            <p>With eternal love,</p>
            <p
              style={{
                fontFamily: "var(--font-dancing-script), cursive",
                fontSize: "2.5rem",
                lineHeight: "1",
                marginTop: "0.75rem",
                color: "#f472b6",
                textShadow: "0 2px 4px rgba(236, 72, 153, 0.3)",
              }}
            >
              Anhadvir & Varanpreet
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
              <div
                style={{
                  width: "8rem",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(236, 72, 153, 0.5), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
