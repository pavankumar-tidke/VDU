# List of all platforms (for reference)
PLATFORMS = [
    {"segment_id": "T-57", "platform_no": 1, "occupied": False},
    {"segment_id": "T-56", "platform_no": 2, "occupied": False},
    {"segment_id": "T-55", "platform_no": 3, "occupied": False},
    {"segment_id": "T-54", "platform_no": 4, "occupied": False},
    {"segment_id": "T-49", "platform_no": 5, "occupied": False},
    {"segment_id": "T-48", "platform_no": 6, "occupied": False},
    {"segment_id": "T-47", "platform_no": 7, "occupied": False},
]

# Main structure for all possible routes
POSSIBLE_ROUTES = [
    {
        "entry_segments": ["T-A1"],  # List, can be more than one
        "exit_segments": ["T-191"],
        "direction": "left_to_right",  # or "right_to_left", or "both"
        "train_types": ["passenger", "goods"],  # or ["all"]
        "platform_routes": [
            {
                "platform_no": 1,
                "platform_segment": "T-57",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-A1",
                            "T-3",
                            "T-5",
                            "T-10",
                            "T-27",
                            "T-17",
                            "T-28",
                            "T-43",
                            "T-44",
                            "T-57",
                        ],
                        "signals": [
                            {"signal_id": "S-A1", "protects": "T-3"},
                            {"signal_id": "S-11", "protects": "T-73"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-57",
                            "T-73",
                            "T-75",
                            "T-75B",
                            "T-76",
                            "T-77",
                            "T-78",
                            "T-79",
                            "T-91",
                            "T-163",
                            "T-168",
                            "T-173",
                            "T-178",
                            "T-185",
                            "T-185B",
                            "T-186",
                            "T-191",
                        ],
                        "signals": [
                            {"signal_id": "S-11", "protects": "T-73"},
                            {"signal_id": "S-22", "protects": "T-163"},
                            {"signal_id": "S-23", "protects": "T-173"},
                            {"signal_id": "S-41", "protects": "T-185"},
                            {"signal_id": "S-24", "protects": "T-191"},
                        ],
                        "occupied": False,
                    },
                    # ... more possible departure routes for this platform ...
                ],
            },
            # ... more platforms ...
        ],
    },
    {
        "entry_segments": ["T-A1"],  # List, can be more than one
        "exit_segments": ["T-246"],
        "direction": "left_to_right",  # or "right_to_left", or "both"
        "train_types": ["passenger", "goods"],  # or ["all"]
        "platform_routes": [
            {
                "platform_no": 1,
                "platform_segment": "T-57",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-A1",
                            "T-3",
                            "T-5",
                            "T-10",
                            "T-27",
                            "T-17",
                            "T-28",
                            "T-43",
                            "T-44",
                            "T-57",
                        ],
                        "signals": [
                            {"signal_id": "T-A1", "protects": "T-3"},
                            # ... more signals if needed ...
                        ],
                        "occupied": False,
                    },
                    # ... more possible arrival routes for this platform ...
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-57",
                            "T-44",
                            "T-43",
                            "T-28",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "T-A2", "protects": "T-4"},
                            # ... more signals if needed ...
                        ],
                        "occupied": False,
                    },
                    # ... more possible departure routes for this platform ...
                ],
            },
            # ... more platforms ...
        ],
    },
    {
        "entry_segments": ["T-227"],
        "exit_segments": ["T-A2"],
        "direction": "right_to_left",
        "train_types": ["passenger", "goods"],
        "platform_routes": [
            {
                "platform_no": 1,
                "platform_segment": "T-57",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-227",
                            "T-221",
                            "T-220",
                            "T-219",
                            "T-218",
                            "T-213",
                            "T-208",
                            "T-207",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-75B",
                            "T-75",
                            "T-73",
                            "T-57",
                        ],
                        "signals": [
                            {"signal_id": "S-43", "protects": "T-220"},
                            {"signal_id": "S-29", "protects": "T-207"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-8", "protects": "T-44"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-57",
                            "T-44",
                            "T-43",
                            "T-28",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-8", "protects": "T-44"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 2,
                "platform_segment": "T-56",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-227",
                            "T-221",
                            "T-220",
                            "T-219",
                            "T-218",
                            "T-213",
                            "T-208",
                            "T-207",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-75B",
                            "T-75",
                            "T-74",
                            "T-56",
                        ],
                        "signals": [
                            {"signal_id": "S-43", "protects": "T-220"},
                            {"signal_id": "S-29", "protects": "T-207"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-7", "protects": "T-42"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-56",
                            "T-42",
                            "T-28",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-7", "protects": "T-42"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 3,
                "platform_segment": "T-55",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-227",
                            "T-221",
                            "T-220",
                            "T-219",
                            "T-218",
                            "T-213",
                            "T-208",
                            "T-207",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-75B",
                            "T-66",
                            "T-55",
                        ],
                        "signals": [
                            {"signal_id": "S-43", "protects": "T-220"},
                            {"signal_id": "S-29", "protects": "T-207"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-6", "protects": "T-40"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-55",
                            "T-40",
                            "T-20",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-6", "protects": "T-40"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 4,
                "platform_segment": "T-54",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-227",
                            "T-221",
                            "T-220",
                            "T-219",
                            "T-218",
                            "T-213",
                            "T-208",
                            "T-207",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-72",
                            "T-54",
                        ],
                        "signals": [
                            {"signal_id": "S-43", "protects": "T-220"},
                            {"signal_id": "S-29", "protects": "T-207"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-5", "protects": "T-23"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-54",
                            "T-23",
                            "T-20",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-5", "protects": "T-23"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 5,
                "platform_segment": "T-53",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-227",
                            "T-221",
                            "T-220",
                            "T-219",
                            "T-218",
                            "T-213",
                            "T-208",
                            "T-207",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-83",
                            "T-85",
                            "T-53",
                        ],
                        "signals": [
                            {"signal_id": "S-43", "protects": "T-220"},
                            {"signal_id": "S-29", "protects": "T-207"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-3", "protects": "T-13"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-53",
                            "T-13",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-3", "protects": "T-13"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
        ],
    },
    {
        "entry_segments": ["T-246"],
        "exit_segments": ["T-A2"],
        "direction": "right_to_left",
        "train_types": ["passenger", "goods"],
        "platform_routes": [
            {
                "platform_no": 1,
                "platform_segment": "T-57",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-246",
                            "T-243",
                            "T-239",
                            "T-132",
                            "T-154",
                            "T-131",
                            "T-126",
                            "T-125",
                            "T-122",
                            "T-207B",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-75B",
                            "T-75",
                            "T-73",
                            "T-57",
                        ],
                        "signals": [
                            {"signal_id": "S-39", "protects": "T-132"},
                            {"signal_id": "S-30", "protects": "T-125"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-8", "protects": "T-44"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-57",
                            "T-44",
                            "T-43",
                            "T-28",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-8", "protects": "T-44"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 2,
                "platform_segment": "T-56",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-246",
                            "T-243",
                            "T-239",
                            "T-132",
                            "T-154",
                            "T-131",
                            "T-126",
                            "T-125",
                            "T-122",
                            "T-207B",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-75B",
                            "T-75",
                            "T-74",
                            "T-56",
                        ],
                        "signals": [
                            {"signal_id": "S-39", "protects": "T-132"},
                            {"signal_id": "S-30", "protects": "T-125"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-7", "protects": "T-42"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-56",
                            "T-42",
                            "T-28",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-7", "protects": "T-42"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 3,
                "platform_segment": "T-55",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-246",
                            "T-243",
                            "T-239",
                            "T-132",
                            "T-154",
                            "T-131",
                            "T-126",
                            "T-125",
                            "T-122",
                            "T-207B",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-75B",
                            "T-66",
                            "T-55",
                        ],
                        "signals": [
                            {"signal_id": "S-39", "protects": "T-132"},
                            {"signal_id": "S-30", "protects": "T-125"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-6", "protects": "T-40"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-55",
                            "T-40",
                            "T-20",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-6", "protects": "T-40"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 4,
                "platform_segment": "T-54",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-246",
                            "T-243",
                            "T-239",
                            "T-132",
                            "T-154",
                            "T-131",
                            "T-126",
                            "T-125",
                            "T-122",
                            "T-207B",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-77",
                            "T-76",
                            "T-72",
                            "T-54",
                        ],
                        "signals": [
                            {"signal_id": "S-39", "protects": "T-132"},
                            {"signal_id": "S-30", "protects": "T-125"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-5", "protects": "T-23"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-54",
                            "T-23",
                            "T-20",
                            "T-17",
                            "T-27",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-5", "protects": "T-23"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
            {
                "platform_no": 5,
                "platform_segment": "T-53",
                "arrival_routes": [
                    {
                        "segments": [
                            "T-246",
                            "T-243",
                            "T-239",
                            "T-132",
                            "T-154",
                            "T-131",
                            "T-126",
                            "T-125",
                            "T-122",
                            "T-207B",
                            "T-206",
                            "T-201",
                            "T-200",
                            "T-93",
                            "T-80",
                            "T-78",
                            "T-83",
                            "T-85",
                            "T-53",
                        ],
                        "signals": [
                            {"signal_id": "S-39", "protects": "T-132"},
                            {"signal_id": "S-30", "protects": "T-125"},
                            {"signal_id": "S-25", "protects": "T-200"},
                            {"signal_id": "S-3", "protects": "T-13"},
                        ],
                        "occupied": False,
                    },
                ],
                "departure_routes": [
                    {
                        "segments": [
                            "T-53",
                            "T-13",
                            "T-10",
                            "T-4",
                            "T-A2",
                        ],
                        "signals": [
                            {"signal_id": "S-3", "protects": "T-13"},
                            {"signal_id": "S-4", "protects": "T-27"},
                            {"signal_id": "S-2", "protects": "T-A2"},
                        ],
                        "occupied": False,
                    }
                ],
            },
        ],
    },
]
