"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

type Assignment = {
  name: string
  table: string
}

type TableAssignmentsProps = {
  initialAssignments: Assignment[]
}

export function TableAssignments({ initialAssignments }: TableAssignmentsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  // Use useEffect to handle client-side only code
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only run filtering logic on the client side
  const filteredAssignments = mounted
    ? initialAssignments.filter((assignment) => assignment.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : initialAssignments

  // Group assignments by table - only run on client side
  const groupedByTable = mounted
    ? filteredAssignments.reduce(
        (acc, assignment) => {
          const table = assignment.table
          if (!acc[table]) {
            acc[table] = []
          }
          acc[table].push(assignment)
          return acc
        },
        {} as Record<string, Assignment[]>,
      )
    : {}

  // Sort tables numerically - only run on client side
  const sortedTables = mounted
    ? Object.keys(groupedByTable).sort((a, b) => {
        return Number.parseInt(a) - Number.parseInt(b)
      })
    : []

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return <div style={{ minHeight: "400px" }}></div>
  }

  return (
    <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
      <div style={{ position: "relative", maxWidth: "28rem", margin: "0 auto", marginBottom: "4rem" }}>
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            inset: "0",
            margin: "-0.25rem",
            borderRadius: "9999px",
            background:
              "linear-gradient(to right, rgba(219, 39, 119, 0.5), rgba(244, 114, 182, 1), rgba(219, 39, 119, 0.5))",
            filter: "blur(8px)",
            opacity: "0.8",
          }}
        />

        <div style={{ position: "relative" }}>
          <Search
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#f472b6",
            }}
            size={20}
          />
          <Input
            type="text"
            placeholder="Search for your name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: "3rem",
              paddingTop: "1.75rem",
              paddingBottom: "1.75rem",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderColor: "rgba(236, 72, 153, 0.5)",
              color: "white",
              borderRadius: "9999px",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
              fontFamily: "var(--font-playfair), serif",
              boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
            }}
          />
        </div>
      </div>

      {searchQuery && filteredAssignments.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              fontStyle: "italic",
              color: "#fbcfe8",
            }}
          >
            No matches found for "{searchQuery}", please contact Jaivir Singh 
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            opacity: "1",
            transition: "opacity 1000ms",
          }}
        >
          {sortedTables.map((tableNumber) => (
            <Card
              key={tableNumber}
              style={{
                overflow: "hidden",
                width: "100%",
                minWidth: "280px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
                borderColor: "rgba(236, 72, 153, 0.3)",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)",
                transition: "all 0.5s",
              }}
            >
              <div
                style={{
                  padding: "0.5rem 1.5rem",
                  borderBottom: "1px solid rgba(236, 72, 153, 0.3)",
                  position: "relative",
                  background:
                    "linear-gradient(to right, rgba(157, 23, 77, 0.4), rgba(131, 24, 67, 0.6), rgba(157, 23, 77, 0.4))",
                }}
              >
                {/* Top border glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "1px",
                    background: "linear-gradient(to right, transparent, #f472b6, transparent)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "url('/placeholder.svg?height=100&width=100')",
                    backgroundRepeat: "repeat",
                    opacity: "0.05",
                  }}
                />

                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "1.5rem",
                    lineHeight: "1.5rem",
                    fontWeight: "700",
                    textAlign: "center",
                    position: "relative",
                    zIndex: "10",
                    background: "linear-gradient(to right, #fbcfe8, #f9a8d4, #fbcfe8)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Table {tableNumber}
                </h2>
              </div>
              <CardContent style={{ padding: "0" }}>
                <ul style={{ borderColor: "rgba(236, 72, 153, 0.2)", margin: 0, padding: 0, listStyle: "none" }}>
                  {groupedByTable[tableNumber]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((assignment, index) => (
                      <li
                        key={index}
                        style={{
                          padding: "1.25rem 1.5rem",
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "1.125rem",
                          lineHeight: "1.75rem",
                          position: "relative",
                          overflow: "hidden",
                          borderBottom:
                            index < groupedByTable[tableNumber].length - 1
                              ? "1px solid rgba(236, 72, 153, 0.2)"
                              : "none",
                          backgroundColor:
                            searchQuery && assignment.name.toLowerCase().includes(searchQuery.toLowerCase())
                              ? "rgba(80, 7, 36, 0.5)"
                              : "transparent",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "500",
                            color: "#fce7f3",
                            position: "relative",
                            zIndex: "10",
                          }}
                        >
                          {assignment.name}
                        </span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
